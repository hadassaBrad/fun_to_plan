const pool = require('../DB.js');

// id int AI PK 
// role_id int 
// user_name varchar(225) 
// password_id int 
// email varchar(225)  
// address_id


// password varchar(225) 
// loginAttempts int 
// lastLogin datetime 
// lastFailedLogin datetime 
// account_status
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

module.exports = { createUser } 