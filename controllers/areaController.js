const model = require('../models/areaModel');

async function getAreas() {
    try {
        return model.getAreas();
    } catch (err) {
        throw err;
    }
}

module.exports={getAreas}