// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// 1. Middlewares
app.use(cors({
  origin: [
    'https://pagina-web-hotel.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true
}));
app.use(express.json());

// 2. Importar Rutas
const rutasContenidos = require('./routes/contenidos.routes');
const rutasHabitaciones = require('./routes/habitaciones.routes');
const rutasAuth = require('./routes/auth.routes');
const rutasReservaciones = require('./routes/reservaciones.routes');
const rutasAdmin = require('./routes/admin.routes');

// 3. Usar Rutas (Definimos el prefijo de la URL)
app.use('/api/contenidos', rutasContenidos);
app.use('/api/habitaciones', rutasHabitaciones);
app.use('/api/auth', rutasAuth);
app.use('/api/reservaciones', rutasReservaciones);
app.use('/api/admin', rutasAdmin);

// Ruta de prueba base
app.get('/', (req, res) => {
    res.send('Servidor de Quinta Dalam funcionando al 100% y modularizado');
});

// 4. Iniciar servidor

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en el puerto http://localhost:${PORT}`);
    });
}

// ESTO ES CLAVE PARA VERCEL: Exportar la app
module.exports = app;
