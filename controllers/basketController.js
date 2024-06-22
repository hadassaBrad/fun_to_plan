getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket 
const model = require('../models/basketModel');

async function getBasket(id) {
    try {
        return model.getBasket(id);
    } catch (err) {
        throw err;
    }
}
async function createBasket(userid,siteId) {
    try {
        console.log("basket controller.. in single basket"+userid+" "+siteId);
        return model.createBasket(userid,siteId);
    } catch (err) {
        throw err;
    }
}
async function createMultyPileBasket(data){
    try {
        console.log("basket controller. MultyPileBasket.");
        console.log(data);
        return model.createMultyPileBasket(data);
    } catch (err) {
        throw err;
    }
}
async function getSingleBasket(id) {
    try {
        return model.getSingleBasket(id);
    } catch (err) {
        throw err;
    }
}
async function deleteAllBasket(id) {
    try {
        return model.deleteAllBasket(id);
    } catch (err) {
        throw err;
    }
}
async function deleteSingleBasket (user_id,site_id) {
    try {
        console.log("in delete controler basket")
        
        const response= model.deleteSingleBasket(user_id, site_id);

        console.log("deleted user...  ");
        console.log(response);
        return response;
    } catch (err) {
        throw err;
    }
}
module.exports = {getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket,createMultyPileBasket }