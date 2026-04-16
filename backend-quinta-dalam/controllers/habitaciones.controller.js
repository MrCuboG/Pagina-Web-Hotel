const pool = require('../database');

const obtenerHabitacionesCards = async (req, res) => {
    try {
        const query = `
            SELECT 
                h.id, h.numero, h.nombre, t.nombre as tipo, t.descripcion, 
                t.precio_base as precio, t.capacidad_maxima as capacidad
            FROM habitaciones h
            JOIN tipo_habitacion t ON h.tipo_id = t.id
            WHERE h.estado = 'Activo'
            LIMIT 3
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al obtener habitaciones');
    }
};
const obtenerHabitaciones = async (req, res) => {
    try {
        const query = `
            SELECT 
                h.id, h.numero, h.nombre, t.nombre as tipo, t.descripcion, 
                t.precio_base as precio, t.capacidad_maxima as capacidad
            FROM habitaciones h
            JOIN tipo_habitacion t ON h.tipo_id = t.id
            WHERE h.estado = 'Activo'
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al obtener habitaciones');
    }
};

module.exports = { obtenerHabitacionesCards, obtenerHabitaciones };