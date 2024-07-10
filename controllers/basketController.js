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
    
        return model.createBasket(userid,siteId);
    } catch (err) {
        throw err;
    }
}
async function createMultyPileBasket(data){
    try {
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
        const response= model.deleteSingleBasket(user_id, site_id);
        return response;
    } catch (err) {
        throw err;
    }
}
module.exports = {getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket,createMultyPileBasket }