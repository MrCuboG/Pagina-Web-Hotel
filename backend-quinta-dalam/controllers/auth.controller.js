const pool = require('../database');
const bcrypt = require('bcryptjs');

const registrarUsuario = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario o email ya existe usando la columna "nombre" de "usuarios"
        const userExists = await pool.query(
            'SELECT * FROM usuarios WHERE nombre = $1 OR email = $2',
            [username, email]
        );

        if (userExists.rows.length > 0) {
            const isEmail = userExists.rows[0].email === email;
            return res.status(400).json({ 
                message: isEmail ? 'El correo electrónico ya está registrado' : 'El nombre de usuario ya está en uso' 
            });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Insertar usuario
        const newUser = await pool.query(
            `INSERT INTO usuarios (nombre, email, password_hash, rol, estado, creado_en) 
             VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id, nombre, email, rol`,
            [username, email, passwordHash, 'Cliente', 'Activo']
        );

        res.status(201).json({
            message: 'Registro exitoso',
            user: {
                id: newUser.rows[0].id.toString(),
                username: newUser.rows[0].nombre,
                email: newUser.rows[0].email,
                role: newUser.rows[0].rol.toLowerCase()
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error interno del servidor al registrar usuario' });
    }
};

const loginUsuario = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Proporcione usuario y contraseña' });
    }

    try {
        // Buscar el usuario en la base de datos (por nombre o correo)
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE nombre = $1 OR email = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = result.rows[0];

        // Revisar si el usuario está activo
        if (user.estado !== 'Activo') {
            return res.status(403).json({ message: 'Esta cuenta está inactiva o suspendida' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        res.json({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user.id.toString(),
                username: user.nombre,
                email: user.email,
                role: user.rol.toLowerCase()
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error interno del servidor al iniciar sesión' });
    }
};

module.exports = { loginUsuario, registrarUsuario };
