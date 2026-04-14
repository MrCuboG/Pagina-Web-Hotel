const pool = require('../database');

const obtenerContenidos = async (req, res) => {
    try {
        const result = await pool.query("SELECT clave, valor FROM contenidos");
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al obtener los contenidos');
    }
};

module.exports = { obtenerContenidos };