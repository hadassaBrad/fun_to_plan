
// const pool = require('../DB');

// async function getBasket(id) {
//     try {
//       const sql = `
//       SELECT basket.site_id, sites.url 
//       FROM basket 
//       JOIN sites ON basket.site_id = sites.id 
//       WHERE basket.user_id = ?;
//   `;
//   let result = await pool.query(sql, [id]);
//   console.log("result of get basket: "+result);
// //    result = result[0].map(row => ({
// //     site_id: row.site_id,
// //     url: row.url
// // }));
//   if (result[0].length === 0) {
//       throw new Error('No sites found in the basket for the given user.');
//   }
//       console.log("in model  getBasket "+ result[0][0].url);
//       return result[0];
//     } catch (err) {
//       console.error('Error deleting photo:', err);
//       throw err;
//     }
//   }
//   async function getSingleBasket(id){
//     try {
//         const sql = `SELECT * from basket WHERE id= ?`;
//         const result = await pool.query(sql, [id]);
//         console.log("in model  getSingleBasket "+ result[0]);
//         return result[0];
//       } catch (err) {
//         console.error('Error deleting photo:', err);
//         throw err;
//       }
//   }
// async function createBasket(userid,siteId){
//     try { 

//               const sql = "INSERT INTO basket (`user_id`, `site_id`) VALUES(?, ?)";
//               const result = await pool.query(sql, [userid, siteId]);
//               console.log("in model  createBasket "+ result[0]);
//               return result[0];
//             } catch (err) {
//               console.log(err);
//               throw err;
//             }
// }
// async function createMultyPileBasket(data){
//   try { 
//     console.log("in createMultyPileBasket "+data);
//     let resArrey=[];
//      for (let i=0;i<data.length;i++ ) {
//       const res = createBasket(data[i].userid, data[i].siteId);
//       resArray = [...resArray, res];      
//      }

//     return resArrey;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// async function deleteAllBasket(id){
//     try {
//               const sql = `DELETE FROM basket WHERE user_id = ?`;
//               await pool.query(sql, [id]);
//             } catch (err) {
//               console.error('Error deleting basket:', err);
//               throw err;
//             }
// }
// async function deleteSingleBasket(user_id, site_id){
//     try {
//    console.log("in modek basket. deleting "+user_id+" "+site_id)
//               const sql = `DELETE FROM basket WHERE   user_id= ? AND site_id= ?`;
//               await pool.query(sql, [user_id,site_id]);
//               console.log("after deletingggggggggg");
//             } catch (err) {
//               console.error('Error deleting basket:', err);
//               throw err;
//             }
// }

// module.exports = {getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket ,createMultyPileBasket}

const pool = require('../DB');

async function getBasket(id) {
  try {
    const sql = `
      SELECT basket.site_id, sites.url 
      FROM basket 
      JOIN sites ON basket.site_id = sites.id 
      WHERE basket.user_id = ?`;
    let result = await pool.query(sql, [id]);
    console.log("result of get basket: " + result);
    //    result = result[0].map(row => ({
    //     site_id: row.site_id,
    //     url: row.url
    // }));
    if (result[0].length === 0) {
      throw new Error('No sites found in the basket for the given user.');
    }
    console.log("in model  getBasket " + result[0]);
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
    console.log("in model  getSingleBasket " + result[0]);
    console.log(result[0]);
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
    console.log("in model  createBasket " + result[0]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function createMultyPileBasket(data) {
  try {
    console.log("in createMultyPileBasket " + data);
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
    console.log("deleted all basket!!!!! of current user");
  } catch (err) {
    console.error('Error deleting basket:', err);
    throw err;
  }
}
async function deleteSingleBasket(user_id, site_id) {
  try {
    console.log("in modek basket. deleting " + user_id + " " + site_id)
    const sql = `DELETE FROM basket WHERE   user_id= ? AND site_id= ?`;
    await pool.query(sql, [user_id, site_id]);
    console.log("after deletingggggggggg");
  } catch (err) {
    console.error('Error deleting basket:', err);
    throw err;
  }
}

module.exports = { getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket, createMultyPileBasket }