const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllReservations } = require('../controllers/admin.controller');

// Obtener todas las metricas y kpis
router.get('/dashboard', getDashboardStats);

// Obtener todas las reservaciones
router.get('/reservaciones', getAllReservations);

module.exports = router;
