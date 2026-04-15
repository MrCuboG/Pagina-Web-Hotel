const pool = require('../database');

const verifyAdmin = async (req, res, next) => {
    const adminId = req.headers['x-admin-id'];

    if (!adminId) {
        return res.status(401).json({ message: 'No se proporcionó ID de administrador' });
    }

    try {
        const result = await pool.query('SELECT rol, estado FROM usuarios WHERE id = $1', [adminId]);
        
        if (result.rows.length === 0) {
            return res.status(403).json({ message: 'Acceso denegado: Usuario no encontrado' });
        }

        const user = result.rows[0];

        if (user.rol.toLowerCase() !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: Permisos insuficientes' });
        }

        if (user.estado !== 'Activo') {
            return res.status(403).json({ message: 'Acceso denegado: Cuenta inactiva' });
        }

        // Si pasa todas las validaciones, procedemos
        next();
    } catch (error) {
        console.error('Error verificando administrador:', error);
        res.status(500).json({ message: 'Error interno de validación' });
    }
};

module.exports = verifyAdmin;
