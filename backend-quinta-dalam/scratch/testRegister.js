const pool = require('../database');

async function test() {
  try {
    await pool.query(
      `INSERT INTO usuarios (nombre, email, password_hash, rol, estado, creado_en) 
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      ['testuser', 'test@test.com', 'testhash123testhash123testhash123testhash123testhash123testhash123', 'cliente', 'Activo']
    );
    console.log("Success");
  } catch (err) {
    console.error("DB error:", err);
  } finally {
    pool.end();
  }
}

test();
