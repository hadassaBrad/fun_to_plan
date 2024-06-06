const pool = require('../DB');


async function createUser(role_id,  password, userName, email) {
    try {
     const  datetime = new Date();
        const sqlPassword = "INSERT INTO password (`password`,`loginAttempts`,`lastLogin`,`lastFailedLogin`,`account_status`) VALUES(?,?,?,?,?)";
        const resultPassword = await pool.query(sqlPassword, [password,1,datetime.getDate(),null,true ]);
        const passwordId = resultPassword[0].insertId
        
       
        const sql = "INSERT INTO users (`role_id`, `user_name`, `password_id`,`email` ) VALUES(?, ?, ?, ?)";
        const result = await pool.query(sql, [role_id, userName, passwordId, email]);
       
          // Retrieve the role name from the permissions table
          const sqlRole = "SELECT role FROM permissions WHERE id = ?";
          const resultRole = await pool.query(sqlRole, [role_id]);
          const roleName = resultRole[0][0].role;
          const user = {
            id: userId,
            role: roleName,
            userName: userName,
            email: email,
            passwordId: passwordId
        };

        return user;

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


  async function getUser(email) {
    try {
      const sql = 'SELECT * FROM users NATURAL JOIN addresses NATURAL JOIN passwords NATURAL JOIN permissions WHERE users.email = ?';
      const result = await pool.query(sql, [email]);
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