const pool = require('../DB');
const basketModel = require('../models/basketModel');

async function getTripRouteForUser(id) {
  const sql = 'SELECT * FROM triproute WHERE id=?';
  const result = await pool.query(sql, [id]);
  console.log("result of getTripRouteForUser: ");
  console.log(result[0][0]);
  return result[0][0];
}

async function getBasketForTrip(userId) {
  console.log("userId in the modek trip:" + userId);
  const sql = 'SELECT b.site_id AS id, s.longitude, s.latitude,s.site_name, s.price AS cost FROM basket b JOIN sites s ON b.site_id = s.id WHERE b.user_id = ?';
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
 
  console.log("result of creating trip///");
  console.log(result[0]);
  return result[0];
}
async function getGuidesByDate(date) {
  try {
    console.log("in user model, getAllGuides by date");
    const sql = "SELECT users.id, users.user_name FROM users WHERE role_id = 3 AND users.id NOT IN ( SELECT guide_id FROM triproute WHERE trip_date = ?)"
    const result = await pool.query(sql, [date]);
    console.log("in getGuidesByDate")
    console.log(result[0]);
    if (result[0][0] == [])
      throw new Error("no guide for this date");
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
}

async function addGuideToTrip(tripId, guideId, tripDate) {
  console.log("trip id");
  console.log(tripId);
  console.log("in addGuideToTrip ");
  console.log("guideId: ")
  console.log(guideId);
  const sql = `UPDATE triproute SET guide_id = ?,trip_date = ? WHERE id = ?`
  const result = await pool.query(sql, [guideId, tripDate, tripId]);
  console.log("result in addGuideToTrip model:  ");
  console.log(result[0][0]);
  return result[0];
}

async function getAllRoutesForUser(userId) {
  try {
    console.log("in the tripd mode, getAllRoutesForUser")
    const sql = `SELECT * FROM triproute WHERE user_id=?`;
    const result = await pool.query(sql, [userId]);
    return result[0];
  }
  catch (err) {
    console.log(err);
  }
}

async function getAllRoutesFrGuide(guideId) {
  try {
    console.log("in the tripd mode, getAllRoutesForעמדריך       ")
    const sql = `SELECT * FROM triproute WHERE guide_id=?`;
    const result = await pool.query(sql, [guideId]);
    return result[0];
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = { getAllRoutesFrGuide, createTripRoute, getGuidesByDate, getBasketForTrip, addGuideToTrip, getTripRouteForUser, getAllRoutesForUser }