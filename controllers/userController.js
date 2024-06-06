const model = require('../models/userModel');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');


// const bcrypt = require("bcrypt")
const numSaltRoundss = 10;

const SECRET_KEY = process.env.SECRET_KEY;

async function createUser(role_id, password, userName, email) {
  try {
    const result = await model.getUserByEmail(email);//checkes if he exists
//מה לבדוק פה??
//מה בדיוק להחזיר בכלל???

//
    // if (result != 1) {
    //   throw err;
    // }
    const hash = 7587 //await bcrypt.hash(password, numSaltRoundss);
    const newUser = model.createUser(role_id, hash, userName, email);
 return newUser;

  } catch (err) {
    throw err;
  }
}
async function postLogin() {
  try {
    const result = await model.getUser(email);
    if (result.length == 0) {
      throw new Error("not Exsist");
    }
    const tablePassword = result[0].password;
    // if (!(await bcrypt.compare(password, tablePassword))) {
    //   throw new Error("not valid password");
    // }
  // else {
      return result[0];
   // }
  }
  catch (err) {
    throw err;
  }
}
async function authenticate(user) {
  console.log("in authenticate");
  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY,);
  console.log("token "+token);

  return token

};
async function getUser(id) {
  try {
    return model.getUser(id);
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    console.log("in create user get by id");

    return model.getUserByEmail(email);
  } catch (err) {
    throw err;
  }
}

async function updateUser() {

}
module.exports = { authenticate, createUser, getUser,postLogin,getUserByEmail,updateUser }