const pool = require('../DB');

async function getGallery(start, limit) {
  try {
    const sql = 'SELECT * FROM gallery limit ?, ?';
    const result = await pool.query(sql, [start, limit]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function createPhoto(id, url, name) {
  try {
    const sql = "INSERT INTO gallery (`id`, `url`, `name`) VALUES(?, ?, ?)";
    const result = await pool.query(sql, [id, url, name]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}


module.exports = { getGallery, createPhoto } 