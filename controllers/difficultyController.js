const model = require('../models/difficultyModel');

async function getDifficulty() {
    try {
        return model.getDifficulty();
    } catch (err) {
        throw err;
    }
}

module.exports={getDifficulty}