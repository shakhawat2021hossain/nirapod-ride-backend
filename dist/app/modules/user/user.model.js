"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const authProviderSchema = new mongoose_1.Schema({
    provider: { type: String },
    providerId: { type: String },
}, {
    versionKey: false,
    _id: false,
});
const vehicleSchema = new mongoose_1.Schema({
    model: { type: String, required: true },
    type: {
        type: String,
        enum: Object.values(user_interface_1.VehicleType),
        required: true,
    },
    plateNum: { type: String, required: true },
}, {
    versionKey: false,
    _id: false,
});
const driverRequestSchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: Object.values(user_interface_1.DriverRequestStatus),
        default: user_interface_1.DriverRequestStatus.PENDING,
    },
    vehicleInfo: vehicleSchema,
    requestedAt: { type: Date },
    approvedAt: { type: Date },
    approvedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    _id: false,
    versionKey: false,
});
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.RIDER,
    },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    vehicleInfo: vehicleSchema,
    availability: {
        type: String,
        enum: Object.values(user_interface_1.Availability)
    },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    auths: [authProviderSchema],
    driverRequest: driverRequestSchema,
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
