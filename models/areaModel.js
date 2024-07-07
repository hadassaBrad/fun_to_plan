const pool = require('../DB');

async function getAreas() {
  try {
    const sql = 'SELECT * FROM area';
    const result = await pool.query(sql, []);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
module.exports = { getAreas } 