const pool = require('../DB');

async function getAge() {
  try {
    const sql = 'SELECT * FROM age';
    const result = await pool.query(sql, []);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
module.exports = { getAge } 