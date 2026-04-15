const express = require('express');
const router = express.Router();
const { loginUsuario, registrarUsuario } = require('../controllers/auth.controller');

// Ruta para registro de usuario
router.post('/register', registrarUsuario);

// Ruta para inicio de sesión
router.post('/login', loginUsuario);

module.exports = router;
