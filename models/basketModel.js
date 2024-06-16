
const pool = require('../DB');

async function getBasket(id) {
    try {
      const sql = `SELECT * from basket WHERE user_id= ?`;
      const result = await pool.query(sql, [id]);
      console.log("in model  getBasket "+ result[0]);
      return result[0];
    } catch (err) {
      console.error('Error deleting photo:', err);
      throw err;
    }
  }
  async function getSingleBasket(id){
    try {
        const sql = `SELECT * from basket WHERE id= ?`;
        const result = await pool.query(sql, [id]);
        console.log("in model  getSingleBasket "+ result[0]);
        return result[0];
      } catch (err) {
        console.error('Error deleting photo:', err);
        throw err;
      }
  }
async function createBasket(siteId,userid){
    try { 
      
              const sql = "INSERT INTO basket (`user_id`, `  site_id`) VALUES(?, ?)";
              const result = await pool.query(sql, [userid, siteId]);
              console.log("in model  createBasket "+ result[0]);
              return result[0];
            } catch (err) {
              console.log(err);
              throw err;
            }
}

async function deleteAllBasket(id){
    try {
              const sql = `DELETE FROM basket WHERE user_id = ?`;
              await pool.query(sql, [id]);
            } catch (err) {
              console.error('Error deleting basket:', err);
              throw err;
            }
}
async function deleteSingleBasket(user_id, site_id){
    try {
   
              const sql = `DELETE FROM basket WHERE   user_id= ? AND site_id= ?`;
              await pool.query(sql, [user_id,site_id]);
            } catch (err) {
              console.error('Error deleting basket:', err);
              throw err;
            }
}

module.exports = {getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket }