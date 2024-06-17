const pool = require('../DB.js');
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // מוסיף 1 מכיוון שהחודשים בתוכנות מתחילים מ־0
const day = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

const currentDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

async function createUser(role_id, password, userName, email) {
  try {
    console.log("create user in model");


    const sqlPassword = "INSERT INTO passwords (`password`,`loginAttempts`,`lastLogin`,`lastFailedLogin`,`account_status`) VALUES(?,?,?,?,?)";
    const resultPassword = await pool.query(sqlPassword, [password, 1, currentDate, null, true]);
    // const sqlPassword = "INSERT INTO passwords (`password`,`loginAttempts`,`lastLogin`,`lastFailedLogin`,`account_status`) VALUES(?,?,?,?,?)";
    // const resultPassword = await pool.query(sqlPassword, [password, 1, datetime.getDate(), null, true]);
    const passwordId = resultPassword[0].insertId

    const sql = "INSERT INTO users (`role_id`, `user_name`, `password_id`,`email` ) VALUES(?, ?, ?, ?)";
    const result = await pool.query(sql, [role_id, userName, passwordId, email]);
    // Retrieve the role name from the permissions table
    const sqlRole = "SELECT role FROM permissions WHERE id = ?";
    const resultRole = await pool.query(sqlRole, [role_id]);
    const roleName = resultRole[0][0].role;
    const user = {
      role: roleName,
      userName: userName,
      email: email,
      id:id
      //passwordId: passwordId
    };
    console.log("user "+user)
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
// async function putFailLogin (email) {
//   try {
//     const sql = "SELECT  password_id  FROM users where users.email =?"
//     const result = await pool.query(sql, [email]);
//     const sql3 = "SELECT  loginAttempts  FROM passwords where id =?"
//     const newresult = await pool.query(sql3, [result[0][0].password_id]);
//     if (newresult[0] > 5) {
//       throw new Error("to Mach Incorrect access requests")
//     }
//     const sql2 = `UPDATE passwords SET lastFailedLogin = ?, loginAttempts= ? WHERE id = ?`;
//     const result3 = await pool.query(sql2, [currentDate, newresult[0][0].loginAttempts + 1, result[0][0].password_id]);
//   }
//   catch (err) {
//     console.log(err)
//     throw err;

//   }
// }
async function putFailLogin(email) {
  try {
    // עדכון מספר ניסיונות הכניסה ותאריך הכשלון האחרון
    const updateSql = `
      UPDATE passwords p
      JOIN users u ON u.password_id = p.id
      SET p.loginAttempts = p.loginAttempts + 1, 
          p.lastFailedLogin = NOW()
      WHERE u.email = ?;
    `;
    await pool.query(updateSql, [email]);

    // קבלת מספר ניסיונות הכניסה המעודכן
    const selectSql = `
      SELECT p.loginAttempts 
      FROM passwords p
      JOIN users u ON u.password_id = p.id
      WHERE u.email = ?;
    `;
    const [rows] = await pool.query(selectSql, [email]);

    // אם נמצא משתמש, החזר את מספר הניסיונות המעודכן
    if (rows.length > 0) {
      return rows[0].loginAttempts;
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    throw err;
  }
}

async function putSuccsesLogin(email) {
  try {
    console.log("in seccess login")
    const sql = "SELECT  password_id  FROM users where  users.email =?"
    const result = await pool.query(sql, [email]);
    console.log(result[0]);
    console.log("second success")
    const sql2 = `UPDATE passwords SET lastLogin = ? WHERE id = ?`;
    const result2 = await pool.query(sql2, [currentDate, result[0].password_id]);
    console.log("third success");
  }
  catch {
    throw new Error;
  }
}

async function getUserByEmail(email) {
  try {
    console.log("in get by id in user model 1  dddddddd   " + email);
    const sql = 'SELECT * FROM users where email=?';
    const result = await pool.query(sql, [email]);
    console.log("ddddddddddddddddddddddddddddddddddddd");
    console.log(result[0]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}


async function getUser(email) {
  try {
    console.log("in login modael");
    const sql = 'SELECT* FROM users   INNER JOIN passwords ON users.password_id = passwords.id INNER JOIN  permissions ON  users.role_id = permissions.id WHERE  users.email = ?';
    const result = await pool.query(sql, [email]);
    console.log("modal result " + result[0])
    return result[0];
  } catch (err) {
    console.log("in login modael");
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




module.exports = { createUser, putSuccsesLogin, getUserByEmail, getUser, getRole, putFailLogin };
