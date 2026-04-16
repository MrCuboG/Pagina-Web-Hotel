const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    // Toma la URL completa de tu archivo .env
    connectionString: process.env.DATABASE_URL,

    // Configuración obligatoria para conectarse a Neon / Nube
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
    .then(() => console.log('✅ Conectado a la BD de Neon en la Nube ☁️'))
    .catch(err => console.error('❌ Error de conexión a la BD', err.stack));

module.exports = pool;