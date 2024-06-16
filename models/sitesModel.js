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

async function createSite(site_name,url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length) {
  try {
    console.log("site_name  "+site_name);
    console.log("popularity "+popularity);
    console.log("id_area  "+id_area);
    console.log("id_difficulty"+id_difficulty)
    const sql = "INSERT INTO sites (`site_name`,`url`, `description`, `popularity`, `id_difficulty`, `id_area`, `price`, `id_age`, `opening_hour`, `closing_hour`, `latitude`, `longitude`, `track_length`) VALUES(?, ?, ?,?,?,?,?,?,?,?,?,?,?)";
    const result = await pool.query(sql, [site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length]);
    return result[0];
  
  } catch (err) {
    console.log(err);
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


module.exports = { getSites, getSite, deleteSite,createSite }