const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
    stopName: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    isValid: {
        type: Boolean,
        default: false,
    },
});

const Stop = mongoose.model('Stop', stopSchema);

module.exports = Stop;
