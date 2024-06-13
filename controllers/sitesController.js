const model = require('../models/galleryModel');

async function getSites(start, limit) {
    try {
      
        return model.getGallery(start, limit);
    } catch (err) {
        throw err;
    }

}

module.exports={getSites}