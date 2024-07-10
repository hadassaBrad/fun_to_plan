const pool = require('../DB');

async function getBasket(id) {
  try {
    const sql = `
     SELECT basket.site_id, sites.url ,sites.site_name
      FROM basket 
      JOIN sites ON basket.site_id = sites.id 
      WHERE basket.user_id = ?`;
    let result = await pool.query(sql, [id]);
    if (result[0].length === 0) {
      throw new Error('No sites found in the basket for the given user.');
    }
    return result[0];
  } catch (err) {
    console.error('Error geting basket:', err);
    throw err;
  }
}
async function getSingleBasket(id) {
  try {
    const sql = `SELECT * from basket WHERE id= ?`;
    const result = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    console.error('Error deleting photo:', err);
    throw err;
  }
}
async function createBasket(userid, siteId) {
  try {
    const sql = "INSERT INTO basket (`user_id`, `site_id`) VALUES(?, ?)";
    const result = await pool.query(sql, [userid, siteId]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function createMultyPileBasket(data) {
  try {
    let resArray = [];
    for (let i = 0; i < data.site.length; i++) {
      const res = createBasket(data.user.id, data.site[i].id);
      resArray = [...resArray, res];
    }

    return resArray;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteAllBasket(id) {
  try {
    const sql = `DELETE FROM basket WHERE user_id = ?`;
    await pool.query(sql, [id]);
  } catch (err) {
    console.error('Error deleting basket:', err);
    throw err;
  }
}
async function deleteSingleBasket(user_id, site_id) {
  try {
    const sql = `DELETE FROM basket WHERE   user_id= ? AND site_id= ?`;
    await pool.query(sql, [user_id, site_id]);
  } catch (err) {
    console.error('Error deleting basket:', err);
    throw err;
  }
}

module.exports = { getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket, createMultyPileBasket }