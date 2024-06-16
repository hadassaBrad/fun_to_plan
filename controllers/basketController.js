getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket 
const model = require('../models/basketModel');

async function getBasket(id) {
    try {
        return model.getBasket(id);
    } catch (err) {
        throw err;
    }
}
async function createBasket(siteId,userid) {
    try {
        console.log("basket controller..");
        return model.createBasket(siteId,userid);
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
async function deleteSingleBasket (user_id, site_id) {
    try {
        console.log("in delete controler basket")
        return model.deleteSingleBasket(user_id, site_id);
    } catch (err) {
        throw err;
    }
}
module.exports = {getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket }