const pool = require('../database');

async function test() {
  try {
    const tipos = await pool.query('SELECT id, nombre FROM tipo_habitacion');
    console.table(tipos.rows);
    const habs = await pool.query('SELECT id, tipo_id, numero FROM habitaciones LIMIT 5');
    console.table(habs.rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
test();
