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

const actualizarContenidos = async (req, res) => {
    try {
        const body = req.body;
        for (const [clave, valor] of Object.entries(body)) {
            // Intenta actualizar
            const updateRes = await pool.query("UPDATE contenidos SET valor = $1, actualizado_en = CURRENT_TIMESTAMP WHERE clave = $2", [valor, clave]);
            // Si no existía la clave, la inserta
            if (updateRes.rowCount === 0) {
                await pool.query("INSERT INTO contenidos (clave, valor) VALUES ($1, $2)", [clave, valor]);
            }
        }
        res.json({ message: "Contenidos actualizados exitosamente" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al actualizar los contenidos');
    }
};

module.exports = { obtenerContenidos, actualizarContenidos };