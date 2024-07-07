const model = require('../models/sitesModel');

async function getSites(age, area, difficulty, start, limit) {
    try {
        console.log("in controller' haddasssa is sweet");
        return model.getSites(age, area, difficulty, start, limit);
    } catch (err) {
        throw err;
    }
}

async function getSite(id) {
    try {
        console.log("get several site");
        return model.getSite(id);
    } catch (err) {
        throw err;
    }
}

async function createSite(site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length) {
    try {
        console.log("poar several site    " + id_difficulty);
        return model.createSite(site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length);
    } catch (err) {
        throw err;
    }
}

async function updateSite(id,site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length)
{
    try {
        console.log("poar several site    " + site_name);
        return await model.updateSite(id,site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length);
    } catch (err) {
        console.log(err);
        throw err;
    }
}
async function deleteSite(id) {
    try {
        console.log("in delete function");
        return model.deleteSite(id);
    } catch (err) {
        throw err;
    }
}

module.exports = { getSites, getSite, deleteSite, createSite, updateSite }