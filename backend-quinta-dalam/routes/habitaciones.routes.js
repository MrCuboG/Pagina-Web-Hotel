const express = require('express');
const router = express.Router();
const { obtenerHabitacionesCards } = require('../controllers/habitaciones.controller');

// Esta ruta será para las 3 tarjetas
router.get('/cards', obtenerHabitacionesCards);

module.exports = router;