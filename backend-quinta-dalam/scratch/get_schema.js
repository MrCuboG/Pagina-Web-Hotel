const pool = require('../database');

async function checkTables() {
    try {
        const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
        console.log("Tables:");
        console.table(res.rows);

        for (const row of res.rows) {
            console.log(`\nColumns for ${row.table_name}:`);
            const cols = await pool.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name='${row.table_name}'`);
            console.table(cols.rows);
        }
    } catch(err) {
        console.error(err);
    } finally {
        pool.end();
    }
}
checkTables();
