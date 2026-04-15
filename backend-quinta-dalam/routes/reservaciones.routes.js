const express = require('express');
const router = express.Router();
const { crearReservacion, obtenerMisReservaciones, cancelarReservacionCliente } = require('../controllers/reservaciones.controller');

// Ruta para crear una reservación nueva
router.post('/', crearReservacion);

// Ruta para consultar mis reservaciones usando ID de usuario de PostgreSQL
router.get('/usuario/:userId', obtenerMisReservaciones);

// Ruta para cancelar reservación (cliente)
router.put('/:id/cancelar', cancelarReservacionCliente);

module.exports = router;
