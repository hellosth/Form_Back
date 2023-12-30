const mongoose = require('mongoose');

const busRouteSchema = new mongoose.Schema({
    busServiceName: {
        type: String,
        required: true,
    },
    startPoint: {
        type: String,
        required: true,
    },
    stops: [{
        type: String,
        required: true,
    }],
    endPoint: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },
    isValid: {
        type: Boolean,
        default: false,
    },
	 isTransferred: {
        type: Boolean,
        default: false,
    },

    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const BusRoute = mongoose.model('BusRoute', busRouteSchema);

module.exports = BusRoute;
