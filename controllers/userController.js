const { error } = require('npmlog');
const model = require('../models/userModel');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
const bcrypt = require("bcrypt")
const numSaltRoundss = 10;

const SECRET_KEY = process.env.SECRET_KEY;

async function createUser(role_id, password, userName, email) {
  try {
    const result = await model.getUserByEmail(email);//checkes if he exists
    console.log("RESULT CHECKING:   "+result.length);
    if (result.length != 0) {
      console.log("the user already exist")
      throw new Error("user already exists, please login");
    }
    const hash = await bcrypt.hash(password, numSaltRoundss);
    const newUser = model.createUser(role_id, hash, userName, email);
    return newUser;

  } catch (err) {
    throw err;
  }
}

async function postLogin(email, password) {
  try {
    const result = await model.getUser(email);
    console.log("get the user in login ");
    if (result.length == 0) {
      console.log("this user does not exist, please signup ")
      throw new Error("this user does not exist, please signup");
    }

    const tablePassword = result[0].password;

    console.log(result);
    if (!(await bcrypt.compare(password, tablePassword))) {
      console.log("not Exist")
      await model.putFailLogin(email);
      throw new Error("not valid password");
    }
    else {
      console.log(result);
      console.log("returns the user     vvbhnjhgfghjkjhg");
      const user = {
        id:result[0].id,
        role: result[0].role,
        userName: result[0].user_name,
        email: result[0].email,
      };
      console.log("user " + user);
      await model.putSuccsesLogin(user.email);
      console.log("user " + user.userName);
      return user;

    }
  }
  catch (err) {
    console.log(err);
    throw err;

  }
}

async function authenticate(user) {
  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY,);
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
module.exports = { authenticate, createUser, getUser, postLogin, getUserByEmail, }