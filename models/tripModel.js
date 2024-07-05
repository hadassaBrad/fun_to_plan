const pool = require('../DB');
const basketModel = require('../models/basketModel');

async function getTripRouteForUser(id){
  const sql = 'SELECT * FROM triproute WHERE id=?';
  const result=await pool.query(sql, [id]);
  return result[0][0];
}

async function getBasketForTrip(userId) {
  const sql = 'SELECT b.site_id AS id, s.longitude, s.latitude, s.price AS cost FROM basket b JOIN sites s ON b.site_id = s.id WHERE b.user_id = ?';
  const result = await pool.query(sql, [userId]);
  console.log("result in getBasketForTrip model:  ");
  console.log(result[0]);
  return result[0];
}
async function createTripRoute(userId, bestRoute) {
  console.log("in the trip model");
  //console.log("bestRoute: "+bestRoute);
  console.log(JSON.stringify(bestRoute));

  const sql = "INSERT INTO triproute (`user_id`, `route` ) VALUES(?, ?)";
  const result = await pool.query(sql, [userId, JSON.stringify(bestRoute)]);
  await basketModel.deleteAllBasket(userId);//when user get his trip- he dosnt need any more his old basket
  console.log("result of creating trip///");
  console.log(result[0]);
  return result[0];
}
async function getGuidesByDate(tripId, date) {
  try {
    console.log("in user model, getAllGuides by date");


    //לכל טיול שבתאריך הזה לבדוק האם באחד מהם זה המדריך, להחזיר את כל שאר המדריכים

    // מחזיר את כל המדריכים שלא יכולים לעשות טיול באותו התאריך
    // const sql = "SELECT users.id, users.user_name FROM users WHERE role_id=? AND users.id NOT IN (SELECT guide_id FROM triproute WHERE trip_date=?)";

    const sql = "SELECT users.id, users.user_name FROM users WHERE role_id = 3 AND users.id NOT IN ( SELECT guide_id FROM triproute WHERE trip_date = ?)"


    const result = await pool.query(sql, [date]);


    console.log(result[0][0]);
    if (result[0][0] == [])
      throw new Error("no guide for this date");
    return result[0][0];
  } catch (err) {
    throw new Error(err);
  }
}

async function addGuideToTrip(tripId, guideId, tripDate) {
  console.log("trip id");
  console.log(tripId);
  const sql = `UPDATE triproute SET guide_id = ?,trip_date = ? WHERE id = ?`
  const result = await pool.query(sql, [guideId, tripDate, tripId]);
  console.log("result in getBasketForTrip model:  ");
  console.log(result[0]);
  return result[0];
}

async function getAllRoutesForUser(userId){
  try{ console.log("in the tripd mode, getAllRoutesForUser")
     const sql = `SELECT * FROM triproute WHERE user_id=?`;
  const result = await pool.query(sql, [userId]);
  return result[0];
  }
 catch(err){
  console.log(err);
 }
}

async function getAllRoutesFrGuide(guideId){
  try{ console.log("in the tripd mode, getAllRoutesForעמדריך       ")
     const sql = `SELECT * FROM triproute WHERE guide_id=?`;
  const result = await pool.query(sql, [guideId]);
  return result[0];
  }
 catch(err){
  console.log(err);
 }
}

module.exports = {getAllRoutesFrGuide, createTripRoute, getGuidesByDate, getBasketForTrip, addGuideToTrip, getTripRouteForUser,getAllRoutesForUser }