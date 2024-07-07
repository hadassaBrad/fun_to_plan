const pool = require('../DB');

async function getDifficulty() {
  try {
    const sql = 'SELECT * FROM difficulty';
    const result = await pool.query(sql, []);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
module.exports = { getDifficulty } 