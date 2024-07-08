const pool = require('../DB.js');

// async function getSites(age, area, difficulty, start, limit) {
//   try {
//     console.log("start" + start + " limit " + limit);
//     let sql = 'SELECT sites.id, site_name, url FROM sites';
//     console.log("sql1: "+sql);
//     let flag = false;
//     if(age!=null){
//       //sql+=`INNER JOIN age ON sites.id_age = '${age}'`;
//       sql+=` INNER JOIN age ON sites.id_age = age.id WHERE age.age_range = '${age}' `;
//       // flag=true;
//       console.log("sql2: "+sql);
//     }
//     if(area!=null){
//       // if(flag==true){
//       //   sql+=` AND `;
//       // }
//       sql+=` INNER JOIN area ON sites.id_area = area.id WHERE area.name_area = '${area}' `;
//       console.log("sql3: "+sql);
//     }
//     if(difficulty!=null){
//       // if(flag==true){
//       //   sql+=` AND `;
//       // }
//       sql+=` INNER JOIN difficulty ON sites.id_difficulty = difficulty.id WHERE difficulty.level = '${difficulty}' `;
//       console.log("sql4: "+sql);
//     }
//     sql+=` limit 0, 10 `
//     const result = await pool.query(sql, [start, limit]);
//     return result[0];
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }
async function getSites(age, area, difficulty, start, limit) {
  try {
    console.log("start: " + start + ", limit: " + limit);
    let sql = 'SELECT sites.id, site_name, url FROM sites';
    
    let joins = [];
    let conditions = [];

    if (age != null) {
      joins.push('INNER JOIN age ON sites.id_age = age.id');
      conditions.push(`age.age_range = '${age}'`);
    }
    if (area != null) {
      joins.push('INNER JOIN area ON sites.id_area = area.id');
      conditions.push(`area.name_area = '${area}'`);
    }
    if (difficulty != null) {
      joins.push('INNER JOIN difficulty ON sites.id_difficulty = difficulty.id');
      conditions.push(`difficulty.level = '${difficulty}'`);
    }

    if (joins.length > 0) {
      sql += ' ' + joins.join(' ');
    }
    
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    
    sql += ` LIMIT ${start}, ${limit}`;
    console.log("Final SQL: " + sql);

    const result = await pool.query(sql);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getSite(id) {
  try {
    console.log(id);
    const sql = "SELECT s.id, s.site_name, s.url, s.description, s.popularity, d.level AS difficulty_level, a.name_area AS area_name, ag.age_range AS age_range, s.price, s.opening_hour, s.closing_hour, s.latitude, s.longitude, s.track_length FROM sites s LEFT JOIN difficulty d ON s.id_difficulty = d.id LEFT JOIN area a ON s.id_area = a.id LEFT JOIN age ag ON s.id_age = ag.id WHERE s.id = ?;"
;
    const result = await pool.query(sql, [id]);
    console.log("result in get site: " );
    console.log( result[0][0]);
    console.log("get site in model ")
    return result[0][0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function createSite(site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length) {
  try {
    console.log("site_name  " + site_name);
    console.log("popularity " + popularity);
    console.log("id_area  " + id_area);
    console.log("id_difficulty" + id_difficulty);
    const sql = "INSERT INTO sites (`site_name`,`url`, `description`, `popularity`, `id_difficulty`, `id_area`, `price`, `id_age`, `opening_hour`, `closing_hour`, `latitude`, `longitude`, `track_length`) VALUES(?, ?, ?,?,?,?,?,?,?,?,?,?,?)";
    const result = await pool.query(sql, [site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length]);
    return result[0];

  } catch (err) {
    console.log(err);
  }
}


async function deleteSite(id) {

  try {
    const sqlBasket = 'DELETE FROM basket where site_id=?'
    await pool.query(sqlBasket, [id]);
    const sql = 'DELETE FROM sites WHERE id= ?'
    const result = await pool.query(sql, [id]);
    console.log("site deleted");
    return result[0];
  } catch (err) {

  }
}

async function updateSite(id, site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length) {
  try {
    const sql = `UPDATE sites SET site_name = ?,url = ?, description = ?, popularity = ?, id_difficulty = ?, id_area = ?, price = ?, id_age = ?, opening_hour = ?, closing_hour = ?, latitude = ?, longitude = ?, track_length = ? WHERE id = ?`
    const result = await pool.query(sql, [site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length, id]);
    console.log("result in update of site in model:  " + result[0].insertId);

    return result[0];

  } catch (err) {
    console.log(err);
  }
}

module.exports = { getSites, getSite, deleteSite, createSite, updateSite }