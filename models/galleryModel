const pool = require('../DB.js');

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
    const sql = "INSERT INTO comments (`id`, `url`, `name`) VALUES(?, ?, ?)";
    const result = await pool.query(sql, [id, url, name]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deletePhoto(id) {
  try {
    const sql = `DELETE FROM comments WHERE id = ?`;
    await pool.query(sql, [id]);
  } catch (err) {
    console.error('Error deleting photo:', err);
    throw err;
  }
}


module.exports = { getGallery, createPhoto, deletePhoto } 