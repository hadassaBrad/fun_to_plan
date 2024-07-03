const pool = require('../DB');
const basketModel = require('../models/basketModel');

async function getBasketForTrip(userId){
  const sql ='SELECT b.site_id AS id, s.longitude, s.latitude, s.price AS cost FROM basket b JOIN sites s ON b.site_id = s.id WHERE b.user_id = ?';
  const result = await pool.query(sql, [userId]);
  console.log("result in getBasketForTrip model:  " );
  console.log(result[0]);
  return result[0];
}
async function createTripRoute(userId,bestRoute){
  console.log("in the trip model");
  //console.log("bestRoute: "+bestRoute);
  console.log(JSON.stringify(bestRoute));

    const sql = "INSERT INTO triproute (`user_id`, `route` ) VALUES(?, ?)";
    const result = await pool.query(sql, [userId, JSON.stringify(bestRoute)]);
       await  basketModel.deleteAllBasket(userId);//when user get his trip- he dosnt need any more his old basket
    return result[0];
}
async function getGuidesByDate(tripId,date) {
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
module.exports = {createTripRoute,  getGuidesByDate, getBasketForTrip}