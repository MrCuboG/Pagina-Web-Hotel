const express = require('express');
const router = express.Router();
const { obtenerContenidos } = require('../controllers/contenidos.controller');

// La ruta raíz '/' aquí significa lo que definamos en server.js + '/'
router.get('/', obtenerContenidos);

module.exports = router;