const pool = require('../database');

const crearReservacion = async (req, res) => {
    try {
        const { userId, checkIn, checkOut, roomType, guests, fullName, email, phone, address, specialRequests, total } = req.body;

        if (!checkIn || !checkOut || !fullName || !email) {
            return res.status(400).json({ message: 'Campos requeridos faltantes' });
        }

        // 1. Buscar o registrar al Huésped
        let huespedId;
        const searchHuesped = await pool.query('SELECT id FROM huespedes WHERE correo = $1', [email]);
        
        if (searchHuesped.rows.length > 0) {
            huespedId = searchHuesped.rows[0].id;
        } else {
            const insertHuesped = await pool.query(
                `INSERT INTO huespedes (nombre_completo, correo, telefono, estado) 
                 VALUES ($1, $2, $3, 'Activo') RETURNING id`,
                [fullName, email, phone || null]
            );
            huespedId = insertHuesped.rows[0].id;
        }

        // 2. Establecer la habitacion a usar (como prueba, tomamos la primera activa disponible si coincide el tipo_id, si no, cualquier activa)
        // Ya que probaremos con bypass, buscaremos una habitacion al azar que esté Activa.
        const habitacionData = await pool.query(`SELECT id FROM habitaciones WHERE estado = 'Activo' LIMIT 1`);
        if (habitacionData.rows.length === 0) {
            return res.status(404).json({ message: 'No hay habitaciones disponibles actualmente' });
        }
        const habitacionId = habitacionData.rows[0].id;

        // 3. Crear Reservación principal
        const insertRes = await pool.query(
            `INSERT INTO reservaciones (huesped_id, usuario_id, estado_reservacion, total_estimado, notas) 
             VALUES ($1, $2, 'Pendiente', $3, $4) RETURNING id`,
            [huespedId, userId || null, total, specialRequests || null]
        );
        const reservacionId = insertRes.rows[0].id;

        // 4. Crear Detalle de Reserva
        await pool.query(
            `INSERT INTO detalle_reservacion (reservacion_id, habitacion_id, check_in, check_out, precio_por_noche)
             VALUES ($1, $2, $3, $4, $5)`,
            [reservacionId, habitacionId, checkIn, checkOut, total] // en DB precio_por_noche es total por bypass, ajustar lógica real luego
        );

        res.status(201).json({
            message: 'Reserva creada con éxito',
            reservationId: `QD-${reservacionId}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno al registrar la reservación' });
    }
};

const obtenerMisReservaciones = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Vamos a retornar las reservaciones basandonos en el usuario logeado
        const query = `
            SELECT 
                r.id as reservacion_id, 
                r.estado_reservacion as status, 
                r.total_estimado as total, 
                r.fecha_reserva as booking_date,
                dr.check_in, 
                dr.check_out, 
                th.nombre as room_name,
                h.numero as room_number
            FROM reservaciones r
            JOIN detalle_reservacion dr ON dr.reservacion_id = r.id
            JOIN habitaciones h ON dr.habitacion_id = h.id
            JOIN tipo_habitacion th ON h.tipo_id = th.id
            WHERE r.usuario_id = $1
            ORDER BY r.fecha_reserva DESC
        `;
        
        const reservaciones = await pool.query(query, [userId]);
        
        res.json(reservaciones.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al consultar las reservaciones' });
    }
};

module.exports = { crearReservacion, obtenerMisReservaciones };
