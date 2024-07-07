const model = require('../models/difficultyModel');

async function getDifficulty(id) {
    try {
        return model.getDifficulty(id);
    } catch (err) {
        throw err;
    }
}

module.exports={getDifficulty}