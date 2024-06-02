const pool = require('../DB.js');


async function createUser(role_id,  password, userName, email) {
    try {
     const  datetime = new Date();
        const sqlPassword = "INSERT INTO password (`password`,`loginAttempts`,`lastLogin`,`lastFailedLogin`,`account_status`) VALUES(?,?,?,?,?)";
        const resultPassword = await pool.query(sqlPassword, [password,1,datetime.getDate(),null,true ]);
        const passwordId = resultPassword[0].insertId
        
        //מאיפה אני מקבלת את הרול איידי, זה מגיע תמיד כ0 או משהו כזה
        const sql = "INSERT INTO users (`role_id`, `user_name`, `password_id`,`email` ) VALUES(?, ?, ?, ?)";
        const result = await pool.query(sql, [role_id, userName, passwordId, email]);
        return result[0];
        //לבדוק בפוסטמן מה חוזר ומה צריך לקחת בחזרה
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getUserByEmail(email) {
    try {
      const sql = 'SELECT * FROM users where email=?';
      const result = await pool.query(sql, [email]);


      return result[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getUser(id) {
    try {
      const sql = 'SELECT * FROM users  WHERE id = ?';
      const result = await pool.query(sql, [id]);
      return result[0];
    } catch (err) {
      throw new Error(err);
    }
  }
  
  async function getRole(id) {
    try {
      const sql = 'SELECT * FROM permissions  WHERE id = ?';
      const result = await pool.query(sql, [id]);
      return result[0];
    } catch (err) {
      throw new Error(err);
    }
  }
module.exports = { createUser ,getUserByEmail, getUser, getRole} 