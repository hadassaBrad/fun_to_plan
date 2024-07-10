const model = require('../models/sitesModel');

async function getSites(age, area, difficulty, start, limit) {
    try {
        return model.getSites(age, area, difficulty, start, limit);
    } catch (err) {
        throw err;
    }
}

async function getSite(id) {
    try {
        return model.getSite(id);
    } catch (err) {
        throw err;
    }
}

async function createSite(site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length) {
    try {
        return model.createSite(site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length);
    } catch (err) {
        throw err;
    }
}

async function updateSite(id,site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length)
{
    try {
        return await model.updateSite(id,site_name, url, description, popularity, id_difficulty, id_area, price, id_age, opening_hour, closing_hour, latitude, longitude, track_length);
    } catch (err) {
        throw err;
    }
}
async function deleteSite(id) {
    try {
        return model.deleteSite(id);
    } catch (err) {
        throw err;
    }
}

module.exports = { getSites, getSite, deleteSite, createSite, updateSite }