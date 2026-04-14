// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// 1. Middlewares
app.use(cors());
app.use(express.json());

// 2. Importar Rutas
const rutasContenidos = require('./routes/contenidos.routes');
const rutasHabitaciones = require('./routes/habitaciones.routes');

// 3. Usar Rutas (Definimos el prefijo de la URL)
app.use('/api/contenidos', rutasContenidos);
app.use('/api/habitaciones', rutasHabitaciones);

// Ruta de prueba base
app.get('/', (req, res) => {
    res.send('Servidor de Quinta Dalam funcionando al 100% y modularizado');
});

// 4. Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto http://localhost:${PORT}`);
});