const pool = require('../database');

async function alterTable() {
    try {
        await pool.query('ALTER TABLE usuarios DROP CONSTRAINT IF EXISTS usuarios_rol_check;');
        await pool.query("ALTER TABLE usuarios ADD CONSTRAINT usuarios_rol_check CHECK (rol IN ('Admin', 'Recepcion', 'Cliente'));");
        console.log("Constraint updated successfully.");
    } catch (err) {
        console.error("Error updating constraint:", err);
    } finally {
        pool.end();
    }
}
alterTable();
