const express = require('express');
const router = express.Router();
const { crearReservacion, obtenerMisReservaciones } = require('../controllers/reservaciones.controller');

// Ruta para crear una reservación nueva
router.post('/', crearReservacion);

// Ruta para consultar mis reservaciones usando ID de usuario de PostgreSQL
router.get('/usuario/:userId', obtenerMisReservaciones);

module.exports = router;
