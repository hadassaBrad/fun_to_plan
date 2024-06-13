const pool = require('../DB.js');

async function getSites(start, limit) {
    try {
      console.log("start"+start+" limit "+limit);
      const sql = 'SELECT site_name, url FROM gallery limit ?, ?';
      const result = await pool.query(sql, [start, limit]);
      return result[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  
    
    
    
module.exports={getSites}