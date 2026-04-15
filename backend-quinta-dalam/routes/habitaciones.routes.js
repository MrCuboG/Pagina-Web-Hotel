const express = require('express');
const router = express.Router();
const { obtenerHabitacionesCards, obtenerHabitaciones } = require('../controllers/habitaciones.controller');

// Esta ruta será para las 3 tarjetas
router.get('/cards', obtenerHabitacionesCards);

// Ruta para obtener TODAS las habitaciones
router.get('/', obtenerHabitaciones);

module.exports = router;