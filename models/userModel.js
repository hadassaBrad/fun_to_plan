const pool = require('../DB.js');


async function createUser(role_id, password, userName, email) {
  try {
    console.log("create user in model");

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // מוסיף 1 מכיוון שהחודשים בתוכנות מתחילים מ־0
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const currentDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    console.log(currentDate);
    // עכשיו אתה יכול להשתמש במשתנה currentDate בפנים של הפונקציה pool.query
    const sqlPassword = "INSERT INTO passwords (`password`,`loginAttempts`,`lastLogin`,`lastFailedLogin`,`account_status`) VALUES(?,?,?,?,?)";
    const resultPassword = await pool.query(sqlPassword, [password, 1, currentDate, null, true]);
    // const sqlPassword = "INSERT INTO passwords (`password`,`loginAttempts`,`lastLogin`,`lastFailedLogin`,`account_status`) VALUES(?,?,?,?,?)";
    // const resultPassword = await pool.query(sqlPassword, [password, 1, datetime.getDate(), null, true]);
    const passwordId = resultPassword[0].insertId
    console.log(passwordId);




    const sql = "INSERT INTO users (`role_id`, `user_name`, `password_id`,`email` ) VALUES(?, ?, ?, ?)";
    const result = await pool.query(sql, [role_id, userName, passwordId, email]);
console.log("result  "+result)
    // Retrieve the role name from the permissions table
    const sqlRole = "SELECT role FROM permissions WHERE id = ?";
    const resultRole = await pool.query(sqlRole, [role_id]);
    const roleName = resultRole[0][0].role;
    const user = {
      role: roleName,
      userName: userName,
      email: email,
      passwordId: passwordId
    };
console.log(user)
    return user;

    //לבדוק בפוסטמן מה חוזר ומה צריך לקחת בחזרה
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    console.log("in create user get by id in user model 1     " + email);

    const sql = 'SELECT * FROM users where email=?';
    const result = await pool.query(sql, [email]);
    console.log("in create user get by id in user model 2");
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