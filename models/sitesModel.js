const pool = require('../DB.js');

async function getSites(start, limit) {
  try {
    console.log("start" + start + " limit " + limit);
    const sql = 'SELECT id, site_name, url FROM sites limit ?, ?';
    const result = await pool.query(sql, [start, limit]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getSite(id) {
  try {
    const sql = 'SELECT * FROM sites  WHERE id = ? ';
    const result = await pool.query(sql, [id]);
    console.log("get site in model " + result[0][0].site_name)
    return result[0][0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function deleteSite(id) {

  try {
    const sql = 'DELETE FROM sites WHERE id= ? '
    const result = await pool.query(sql, [id]);
    console.log("site deleted");
    return result[0];
  } catch (err) {

  }
}


module.exports = { getSites, getSite, deleteSite }