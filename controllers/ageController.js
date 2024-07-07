const model = require('../models/ageModel');

async function getAge(id) {
    try {
        return model.getAge(id);
    } catch (err) {
        throw err;
    }
}

module.exports={getAge}