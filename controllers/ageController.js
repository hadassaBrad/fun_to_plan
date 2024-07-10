const model = require('../models/ageModel');

async function getAge() {
    try {
        return model.getAge();
    } catch (err) {
        throw err;
    }
}

module.exports={getAge}