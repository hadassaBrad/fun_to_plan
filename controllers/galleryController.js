const model = require('../models/galleryModel');

async function createPhoto(id, url, name) {
    try {
        return model.createPhoto(id,url, name);
    } catch (err) {
        throw err;
    }
}

async function getGallery(start, limit) {
    try {
        return model.getGallery(start, limit);
    } catch (err) {
        throw err;
    }

}

async function deletePhoto(id) {
    try {
        return model.deletePhoto(id);
    } catch (err) {
        throw err;
    }
}

module.exports = { deletePhoto, getGallery, createPhoto}