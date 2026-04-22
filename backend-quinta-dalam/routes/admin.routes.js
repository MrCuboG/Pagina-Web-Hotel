const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllReservations, getAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser, reactivateAdminUser, updateReservationAdmin, updateRoomCleanliness, getRoomTypes, createRoomType, updateRoomType, deleteRoomType } = require('../controllers/admin.controller');
const verifyAdmin = require('../middlewares/verifyAdmin');

// =========== METRICAS Y RESERVAS ===========
// Rutas protegidas por middleware verifyAdmin
router.get('/dashboard', verifyAdmin, getDashboardStats);
router.get('/reservaciones', verifyAdmin, getAllReservations);
router.put('/reservaciones/:id', verifyAdmin, updateReservationAdmin);

// =========== HABITACIONES ===========
router.put('/habitaciones/:id/limpieza', verifyAdmin, updateRoomCleanliness);

// =========== TIPOS DE HABITACION (CMS) ===========
router.get('/tipo-habitacion', verifyAdmin, getRoomTypes);
router.post('/tipo-habitacion', verifyAdmin, createRoomType);
router.put('/tipo-habitacion/:id', verifyAdmin, updateRoomType);
router.delete('/tipo-habitacion/:id', verifyAdmin, deleteRoomType);

// =========== GESTION DE ADMINISTRADORES ===========
// Rutas protegidas por middleware verifyAdmin
router.get('/usuarios', verifyAdmin, getAdminUsers);
router.post('/usuarios', verifyAdmin, createAdminUser);
router.put('/usuarios/:id', verifyAdmin, updateAdminUser);
router.put('/usuarios/:id/reactivate', verifyAdmin, reactivateAdminUser);
router.delete('/usuarios/:id', verifyAdmin, deleteAdminUser);

module.exports = router;
