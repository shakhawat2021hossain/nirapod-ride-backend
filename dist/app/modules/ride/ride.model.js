"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const ride_interface_1 = require("./ride.interface");
const rideSchema = new mongoose_1.Schema({
    rider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    driver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    fare: { type: Number, required: true },
    status: {
        type: String,
        enum: Object.values(ride_interface_1.RideStatus),
        default: ride_interface_1.RideStatus.REQUESTED,
    },
    requestedAt: Date,
    acceptedAt: Date,
    pickedUpAt: Date,
    completedAt: Date,
    cancelledAt: Date
}, {
    timestamps: true,
    // versionKey: false
});
exports.Ride = (0, mongoose_1.model)("Ride", rideSchema);
