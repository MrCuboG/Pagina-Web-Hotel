const pool = require('../database');
const bcrypt = require('bcryptjs');

const getDashboardStats = async (req, res) => {
    try {
        // 1. Ocupación Hoy (Activas vs Totales de cuartos)
        // Para este proyecto vamos a usar todas las habitaciones configuradas en 'habitaciones'
        const cuartosTot = await pool.query(`SELECT COUNT(*) as total FROM habitaciones WHERE estado = 'Activo'`);
        const cuartosOcup = await pool.query(`SELECT COUNT(DISTINCT habitacion_id) as ocupados FROM detalle_reservacion dr JOIN reservaciones r ON dr.reservacion_id = r.id WHERE r.estado_reservacion IN ('En Curso', 'Pendiente')`);
        
        // 2. Ingresos (Suma del total estimado de reservaciones pendientes/en curso o completadas)
        const ingresos = await pool.query(`SELECT SUM(total_estimado) as total_ingreso FROM reservaciones WHERE estado_reservacion != 'Cancelada'`);
        
        // 3. Reservas activas (Pendientes + En Curso)
        const reservasActivas = await pool.query(`SELECT COUNT(*) as activas FROM reservaciones WHERE estado_reservacion IN ('Pendiente', 'En Curso')`);

        // 4. Pagos Pendientes (Reservas en estado Pendiente)
        // Ya que el estado "Pendiente" significa que no se le ha acreditado pago o no ha pasado.
        const pagosPendientes = await pool.query(`SELECT COUNT(*) as pendientes FROM reservaciones WHERE estado_reservacion = 'Pendiente'`);

        // 5. Estadísticas de Limpieza para el gráfico (Pastel)
        const limpiezaStats = await pool.query(`SELECT estado_limpieza, COUNT(*) as cantidad FROM habitaciones WHERE estado = 'Activo' GROUP BY estado_limpieza`);

        // 6. Lista detallada de habitaciones para el inventario
        const cuartosDetalle = await pool.query(`
            SELECT h.id, h.numero as name, t.capacidad_maxima as capacity, h.estado_limpieza 
            FROM habitaciones h 
            JOIN tipo_habitacion t ON h.tipo_id = t.id 
            WHERE h.estado = 'Activo'
            ORDER BY h.id ASC
        `);

        res.json({
            roomsInfo: {
                totalRooms: parseInt(cuartosTot.rows[0].total) || 0,
                occupiedRooms: parseInt(cuartosOcup.rows[0].ocupados) || 0
            },
            revenue: parseFloat(ingresos.rows[0].total_ingreso) || 0,
            activeReservations: parseInt(reservasActivas.rows[0].activas) || 0,
            pendingPayments: parseInt(pagosPendientes.rows[0].pendientes) || 0,
            cleanliness: limpiezaStats.rows, // ej: [{estado_limpieza: 'Limpia', cantidad: 3}, ...]
            roomsList: cuartosDetalle.rows // ej: [{id: 1, name: '101', capacity: 2, estado_limpieza: 'Limpia'}, ...]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno al jalar métricas del dashboard' });
    }
};

const getAllReservations = async (req, res) => {
    try {
        // Traer todas las reservaciones en general (con su huésped y habitación)
        const query = `
            SELECT 
                r.id as id,
                COALESCE(h.nombre_completo, u.nombre) as guestName,
                th.nombre as room,
                dr.check_in as checkIn,
                dr.check_out as checkOut,
                1 as guests, -- Simplificado por ahora
                r.estado_reservacion as status,
                r.total_estimado as total,
                'pending' as paymentStatus -- Por defecto si está Pendiente
            FROM reservaciones r
            LEFT JOIN huespedes h ON r.huesped_id = h.id
            LEFT JOIN usuarios u ON r.usuario_id = u.id
            LEFT JOIN detalle_reservacion dr ON r.id = dr.reservacion_id
            LEFT JOIN habitaciones hab ON dr.habitacion_id = hab.id
            LEFT JOIN tipo_habitacion th ON hab.tipo_id = th.id
            ORDER BY r.fecha_reserva DESC
        `;
        const reservas = await pool.query(query);
        
        // Mapear status para que el panel de control React los coloree (confirmed, pending, cancelled)
        const mapped = reservas.rows.map(r => ({
            id: `R-${r.id}`,
            guestName: r.guestname,
            room: r.room,
            checkIn: r.checkin ? new Date(r.checkin).toISOString().split('T')[0] : '',
            checkOut: r.checkout ? new Date(r.checkout).toISOString().split('T')[0] : '',
            guests: 2, 
            status: r.status === 'Confirmada' || r.status === 'Completada' ? 'confirmed' : (r.status === 'Cancelada' ? 'cancelled' : 'pending'),
            total: `$${Number(r.total).toLocaleString('es-MX')} MXN`,
            paymentStatus: r.status === 'Pendiente' ? 'pending' : 'paid'
        }));

        res.json(mapped);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al consultar todas las reservaciones del sistema' });
    }
};

// ================= GESTION DE ADMINISTRADORES =================

const getAdminUsers = async (req, res) => {
    try {
        const query = `
            SELECT id, nombre as username, email, rol as role, estado 
            FROM usuarios 
            ORDER BY id DESC;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

const createAdminUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    
    // Por si no mandan email, podemos asignar uno dummy o dejarlo nulo basado en esquema. Supondremos que email puede ser util para 'recepcion', asi que usaremos un fallback si no viene.
    const userEmail = email || `${username}@hotel.com`;

    try {
        const checkExists = await pool.query('SELECT id FROM usuarios WHERE nombre = $1', [username]);
        if (checkExists.rows.length > 0) {
            return res.status(400).json({ message: 'El nombre de usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            `INSERT INTO usuarios (nombre, email, password_hash, rol, estado, creado_en) 
             VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id, nombre as username, email, rol as role, estado`,
            [username, userEmail, passwordHash, role, 'Activo']
        );

        res.status(201).json({ message: 'Usuario creado', user: newUser.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear usuario administrativo' });
    }
};

const updateAdminUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role, password } = req.body;

    try {
        let updateQuery = 'UPDATE usuarios SET nombre = $1, email = $2, rol = $3';
        const values = [username, email, role];
        
        let paramCount = 4;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            updateQuery += `, password_hash = $${paramCount}`;
            values.push(passwordHash);
            paramCount++;
        }
        
        updateQuery += ` WHERE id = $${paramCount} RETURNING id, nombre as username, email, rol as role, estado`;
        values.push(id);

        const updatedUser = await pool.query(updateQuery, values);
        
        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado', user: updatedUser.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};

const deleteAdminUser = async (req, res) => {
    const { id } = req.params;
    try {
        // Soft delete: cambiar estado a inactivo
        const deleteRes = await pool.query(
            'UPDATE usuarios SET estado = $1, eliminado_en = NOW() WHERE id = $2 RETURNING id',
            ['Inactivo', id]
        );

        if (deleteRes.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario dado de baja exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al dar de baja el usuario' });
    }
};

const reactivateAdminUser = async (req, res) => {
    const { id } = req.params;
    try {
        const reactivateRes = await pool.query(
            'UPDATE usuarios SET estado = $1, eliminado_en = NULL WHERE id = $2 RETURNING id',
            ['Activo', id]
        );
        if (reactivateRes.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario dado de alta exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al dar de alta el usuario' });
    }
};

const updateReservationAdmin = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updateRes = await pool.query(
            'UPDATE reservaciones SET estado_reservacion = $1 WHERE id = $2 RETURNING id',
            [status, id]
        );
        if (updateRes.rows.length === 0) {
            return res.status(404).json({ message: 'Reservación no encontrada' });
        }
        res.json({ message: 'Estado de reservación modificado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno al actualizar la reservación' });
    }
};

const updateRoomCleanliness = async (req, res) => {
    const { id } = req.params;
    const { estado_limpieza } = req.body;
    try {
        // estado_limpieza can be Limpia, Sucia, Mantenimiento
        const cleanRes = await pool.query(
            'UPDATE habitaciones SET estado_limpieza = $1 WHERE id = $2 RETURNING id',
            [estado_limpieza, id]
        );
        if (cleanRes.rows.length === 0) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }
        res.json({ message: 'Estado de limpieza actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar habitación' });
    }
};

const getRoomTypes = async (req, res) => {
    try {
        const query = `SELECT id, nombre, descripcion, precio_base, capacidad_maxima, estado FROM tipo_habitacion WHERE estado = 'Activo' ORDER BY id ASC`;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener tipos de habitación' });
    }
};

const createRoomType = async (req, res) => {
    const { nombre, descripcion, precio_base, capacidad_maxima } = req.body;
    if (!nombre || !precio_base || !capacidad_maxima) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    try {
        const result = await pool.query(
            `INSERT INTO tipo_habitacion (nombre, descripcion, precio_base, capacidad_maxima, estado) 
             VALUES ($1, $2, $3, $4, 'Activo') RETURNING *`,
            [nombre, descripcion, precio_base, capacidad_maxima]
        );
        res.status(201).json({ message: 'Tipo de habitación creado', roomType: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear tipo de habitación' });
    }
};

const updateRoomType = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio_base, capacidad_maxima } = req.body;
    try {
        const updateQuery = `
            UPDATE tipo_habitacion 
            SET nombre = $1, descripcion = $2, precio_base = $3, capacidad_maxima = $4 
            WHERE id = $5 RETURNING *
        `;
        const result = await pool.query(updateQuery, [nombre, descripcion, precio_base, capacidad_maxima, id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Tipo de habitación no encontrado' });
        }
        res.json({ message: 'Tipo de habitación actualizado', roomType: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar tipo de habitación' });
    }
};

const deleteRoomType = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE tipo_habitacion SET estado = $1 WHERE id = $2 RETURNING id',
            ['Inactivo', id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Tipo de habitación no encontrado' });
        }
        res.json({ message: 'Tipo de habitación eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar tipo de habitación' });
    }
};

module.exports = { getDashboardStats, getAllReservations, getAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser, reactivateAdminUser, updateReservationAdmin, updateRoomCleanliness, getRoomTypes, createRoomType, updateRoomType, deleteRoomType };
