const express = require('express');
const router = express.Router();
const { obtenerContenidos, actualizarContenidos } = require('../controllers/contenidos.controller');

// La ruta raíz '/' aquí significa lo que definamos en server.js + '/'
router.get('/', obtenerContenidos);
router.put('/', actualizarContenidos);

module.exports = router;