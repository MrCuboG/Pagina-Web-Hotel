const pool = require('../database');

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

        res.json({
            roomsInfo: {
                totalRooms: parseInt(cuartosTot.rows[0].total) || 0,
                occupiedRooms: parseInt(cuartosOcup.rows[0].ocupados) || 0
            },
            revenue: parseFloat(ingresos.rows[0].total_ingreso) || 0,
            activeReservations: parseInt(reservasActivas.rows[0].activas) || 0,
            pendingPayments: parseInt(pagosPendientes.rows[0].pendientes) || 0,
            cleanliness: limpiezaStats.rows // ej: [{estado_limpieza: 'Limpia', cantidad: 3}, ...]
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

module.exports = { getDashboardStats, getAllReservations };
