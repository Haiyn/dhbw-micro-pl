const mongoose = require('mongoose');

// Define schema and model for mongodb
const measurementSchema = new mongoose.Schema({
    id: {
        type: String
    },
    data: {
        devid: {
            type: String
        },
        date: {
            type: String
        },
        time: {
            type: String
        },
        co2value: {
            type: String
        },
        noofpeopleinroom: {
            type: String
        },
        lon: {
            type: String
        },
        lat: {
            type: String
        }
    }
});

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = { Measurement };