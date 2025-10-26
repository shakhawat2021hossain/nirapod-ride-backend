"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const ride_interface_1 = require("./ride.interface");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_interface_1 = require("../user/user.interface");
const ride_model_1 = require("./ride.model");
const user_model_1 = require("../user/user.model");
const mongoose_1 = require("mongoose");
/*================================= RIDER ====================================*/
const requestRide = (payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("decodedToken", decodedToken)
    // console.log("body", payload)
    if (!payload.endLocation || !payload.startLocation || !payload.fare) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "You missed any required field!");
    }
    if (decodedToken.role !== user_interface_1.Role.RIDER) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "you are not authorized for request a ride!");
    }
    console.log("xyz");
    const isExist = yield ride_model_1.Ride.findOne({
        rider: decodedToken.userId,
        status: { $in: ["requested", "accepted", "picked_up", "in_transit"] }
    });
    console.log(isExist);
    if (isExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are already in a ride");
    }
    const { fare, startLocation, endLocation } = payload;
    const ride = yield ride_model_1.Ride.create({
        rider: decodedToken.userId,
        startLocation,
        endLocation,
        fare,
        status: "requested",
        requestedAt: new Date(),
    });
    console.log(ride);
    return ride;
});
const cancelRide = (rideId, riderId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "No ride found!");
    }
    if (ride.status === ride_interface_1.RideStatus.ACCEPTED || ride.status === ride_interface_1.RideStatus.IN_TRANSIT || ride.status === ride_interface_1.RideStatus.PICKED_UP || ride.status === ride_interface_1.RideStatus.COMPLETED) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Ride cant be cancelled at this moment!");
    }
    if (riderId !== ride.rider.toString()) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not allowed to cancelled other rides!");
    }
    ride.status = ride_interface_1.RideStatus.CANCELLED;
    yield ride.save();
});
const getMyRides = (riderId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!riderId) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Only riders can view their ride history!");
    }
    const rides = yield ride_model_1.Ride.find({ rider: riderId })
        .sort({ createdAt: -1 });
    return rides;
});
const getRideById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(id);
    if (!ride) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "No ride found for the given id");
    }
    return ride;
});
/*================================= DRIVER ==============================*/
const getAvailableRides = () => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.Ride.find({ status: "requested" });
    return rides;
});
const acceptRide = (rideId, driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "No ride found");
    }
    if (ride.status !== ride_interface_1.RideStatus.REQUESTED) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Ride is not in requested state!");
        // it may in cancelled state, or any other
    }
    const driver = yield user_model_1.User.findById(driverId);
    if (!driver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "No driver Found!");
    }
    if (driver.role !== user_interface_1.Role.DRIVER || !driver.isApproved) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Driver is not approved or not updated role!");
    }
    const existing = yield ride_model_1.Ride.findOne({
        driver: driverId,
        status: { $in: [ride_interface_1.RideStatus.ACCEPTED, ride_interface_1.RideStatus.IN_TRANSIT, ride_interface_1.RideStatus.PICKED_UP] },
    });
    if (existing) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Driver already has an active ride!");
    }
    ride.driver = new mongoose_1.Types.ObjectId(driverId);
    ride.status = ride_interface_1.RideStatus.ACCEPTED;
    ride.acceptedAt = new Date();
    yield ride.save();
    return ride;
});
const updateRideStatus = (rideId, driverId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Ride not found!");
    }
    // console.log(driverId);
    if (!driverId) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "No driver found for the ride!");
    }
    if (((_a = ride.driver) === null || _a === void 0 ? void 0 : _a.toString()) !== driverId) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not assigned for the ride");
    }
    switch (newStatus) {
        case "picked_up":
            ride.status = ride_interface_1.RideStatus.PICKED_UP;
            ride.pickedUpAt = new Date();
            break;
        case "in_transit":
            ride.status = ride_interface_1.RideStatus.IN_TRANSIT;
            break;
        case "completed":
            ride.status = ride_interface_1.RideStatus.COMPLETED;
            ride.completedAt = new Date();
            break;
        default:
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Unsupported status!");
    }
    yield ride.save();
    return ride;
});
const earningsHistory = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!mongoose_1.Types.ObjectId.isValid(driverId)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid driver ID");
    }
    const match = {
        driver: new mongoose_1.Types.ObjectId(driverId),
        status: ride_interface_1.RideStatus.COMPLETED,
    };
    const rides = yield ride_model_1.Ride.find(match)
        .sort({ completedAt: -1 })
        .select("startLocation endLocation fare completedAt")
        .lean();
    const totalAgg = yield ride_model_1.Ride.aggregate([
        { $match: match },
        {
            $group: {
                _id: "$driver",
                total: { $sum: "$fare" },
            },
        },
    ]);
    // console.log(totalAgg);
    const totalEarnings = ((_a = totalAgg[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
    return {
        earnings: rides.map((ride) => ({
            rideId: ride._id,
            startLocation: ride.startLocation,
            endLocation: ride.endLocation,
            fare: ride.fare,
            completedAt: ride.completedAt,
        })),
        totalEarnings,
    };
});
/*================================= ADMIN ===================================*/
const getAllRide = () => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.Ride.find({});
    return rides;
});
exports.rideServices = {
    requestRide,
    getAllRide,
    getRideById,
    getAvailableRides,
    acceptRide,
    updateRideStatus,
    cancelRide,
    earningsHistory,
    getMyRides
};
//   getRideById,
//   getRiderRideHistory,
//   getDriverRideHistory,
