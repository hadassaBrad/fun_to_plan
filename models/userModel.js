const pool = require('../DB.js');
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // מוסיף 1 מכיוון שהחודשים בתוכנות מתחילים מ־0
const day = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

const currentDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
async function getAllUsers() {
  console.log("Users modal getAllUsers");
  try {
    const sql = `
      SELECT 
        u.id,
        u.user_name,
        u.email,
        u.phone_number,
        a.city,
        a.street,
        p.role,
        pw.loginAttempts,
        pw.lastLogin,
        pw.lastFailedLogin,
        pw.account_status 
      FROM 
        users u 
      LEFT JOIN 
        addresses a ON u.address_id = a.id 
      LEFT JOIN 
        permissions p ON u.role_id = p.id 
      LEFT JOIN 
        passwords pw ON u.password_id = pw.id
    `;
    const [rows] = await pool.query(sql);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getUsers() {
  try {
    console.log("Users modal.");
    const sql = 'SELECT id, user_name, email FROM users';
    const result = await pool.query(sql);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function createUser(role_id, password, userName, email) {
  try {
    console.log("create user in model");
    console.log("user details: " + email + "role_id " + role_id)

    const sqlPassword = "INSERT INTO passwords (`password`,`loginAttempts`,`lastLogin`,`lastFailedLogin`,`account_status`) VALUES(?,?,?,?,?)";
    const resultPassword = await pool.query(sqlPassword, [password, 1, currentDate, null, true]);
    const passwordId = resultPassword[0].insertId
    console.log("resulst" + resultPassword);
    const sql = "INSERT INTO users (`role_id`, `user_name`, `password_id`,`email` ) VALUES(?, ?, ?, ?)";
    const result = await pool.query(sql, [role_id, userName, passwordId, email]);

    console.log("result " + result)
    // Retrieve the role name from the permissions table
    const sqlRole = "SELECT role FROM permissions WHERE id = ?";
    const resultRole = await pool.query(sqlRole, [role_id]);
    console.log("resultRole " + resultRole);
    const roleName = resultRole[0][0].role;
    const user = {
      role: roleName,
      userName: userName,
      email: email,
      id: result[0].insertId
      //passwordId: passwordId
    };
    console.log("user " + user.id)
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

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
    const sql = 'SELECT users.id, users.role_id, users.user_name, users.email, passwords.password, permissions.role AS role_name FROM users INNER JOIN passwords ON users.password_id = passwords.id INNER JOIN permissions ON users.role_id = permissions.id WHERE users.email = ?';
    const result = await pool.query(sql, [email]);
    // console.log("modal result for login  " + result[0][0].id+"email: "+result[0][0].email);
    return result[0];
  } catch (err) {
    console.log("in login modael at catch of get user");
    throw new Error(err);
  }
}
async function getUserById(id) {
  try {
    console.log("in login modael");
    const sql = 'SELECT   users.id, users.role_id, users.user_name, users.email, passwords.password, permissions.role AS role_name FROM users INNER JOIN passwords ON users.password_id = passwords.id INNER JOIN permissions ON users.role_id = permissions.id WHERE users.id = ?';
    ;

    const result = await pool.query(sql, [id]);
    console.log("modal result for login  " + result[0][0].id + "email: " + result[0][0].email);

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
async function getAllWaitinGuides() {
  try {
    console.log("in user model, getAllWaitinGuides");
    const sql = 'SELECT users.id, users.user_name, users.email,  permissions.role AS role_name FROM users INNER JOIN permissions ON users.role_id = permissions.id WHERE role_id = ?';
    const result = await pool.query(sql, [4]);

    console.log(result[0]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}
async function updateUserPermition(id, role) {
  try {
    console.log("in user model, updateUserPermition role:  " + role);
    const sqlRoles = `SELECT id FROM permissions WHERE role=?`
    const resultRole = await pool.query(sqlRoles, [role]);
    console.log("role_id: ");
    console.log(resultRole);
    const role_id = resultRole[0][0].id;
    console.log(role_id);
    const sql = `UPDATE users SET  role_id = ? WHERE id = ?`;
    const result = await pool.query(sql, [role_id, id]);
    console.log(result[0])
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function getGuides() {
  try {
    console.log("in user model, getAllGuides");
    const sql = 'SELECT users.id, users.user_name, users.email, permissions.role AS role_name FROM users INNER JOIN permissions ON users.role_id = permissions.id WHERE role_id = ?';
    const result = await pool.query(sql, [3]);

    console.log(result[0]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function getGuidesByDate(date) {
  try {
    console.log("in user model, getAllGuides by date");


    //לכל טיול שבתאריך הזה לבדוק האם באחד מהם זה המדריך, להחזיר את כל שאר המדריכים

//מחזיר את כל המדריכים שלא יכולים לעשות טיול באותו התאריך
    const sql = "SELECT users.id, users.user_name FROM users WHERE role_id=? AND users.id NOT IN (SELECT guide_id FROM triproute WHERE trip_date=? "
    const resulst = await pool.query(sql, [3, date]);
 
    console.log(result[0][0]);
    if(result[0][0]==null)
      throw new Error("no guide for this date");
    return result[0][0];
  } catch (err) {
    throw new Error(err);
  }
}

async function getGuide(id){
  try {
    console.log("in user model, getAllGuides");
    const sql = 'SELECT users.id, users.user_name, users.email, permissions.role AS role_name FROM users INNER JOIN permissions ON users.role_id = permissions.id WHERE users.id = ?';
    const result = await pool.query(sql, [id]);
const guideDetails={
  user_name:result[0].user_name,
  email:result[0].email
}
    console.log(result[0]);
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { getGuide,getGuides, getGuidesByDate, getAllUsers, getUsers, createUser, putSuccsesLogin, getUserByEmail, getUser, getRole, putFailLogin, getUserById, getAllWaitinGuides, updateUserPermition };