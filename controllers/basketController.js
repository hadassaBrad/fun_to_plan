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
async function deleteSingleBasket (id) {
    try {
        return model.deleteSingleBasket(id);
    } catch (err) {
        throw err;
    }
}
module.exports = {getBasket, createBasket, getSingleBasket, deleteAllBasket, deleteSingleBasket }