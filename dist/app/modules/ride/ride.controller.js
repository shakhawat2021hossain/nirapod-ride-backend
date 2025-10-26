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
exports.rideControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const ride_service_1 = require("./ride.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const requestRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, req.user);
    const ride = yield ride_service_1.rideServices.requestRide(req.body, req.user);
    (0, sendResponse_1.sendResponse)(res, {
        messaage: "created a ride request",
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        data: ride
    });
}));
const getAllRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_service_1.rideServices.getAllRide();
    (0, sendResponse_1.sendResponse)(res, {
        messaage: "retrived all rides",
        success: true,
        statusCode: http_status_codes_1.default.OK,
        data: rides
    });
}));
const cancelRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield ride_service_1.rideServices.cancelRide(req.params.id, (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
    (0, sendResponse_1.sendResponse)(res, {
        messaage: "Ride is cancelled!",
        success: true,
        statusCode: http_status_codes_1.default.OK,
        data: result
    });
}));
const getMyRides = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield ride_service_1.rideServices.getMyRides((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
    (0, sendResponse_1.sendResponse)(res, {
        messaage: "Your all ride history!",
        success: true,
        statusCode: http_status_codes_1.default.OK,
        data: result
    });
}));
const getRideById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ride_service_1.rideServices.getRideById(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        messaage: "Retrived ride data successfully!",
        success: true,
        statusCode: http_status_codes_1.default.OK,
        data: result
    });
}));
/* DRIVER */
const getAvailableRides = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_service_1.rideServices.getAvailableRides();
    (0, sendResponse_1.sendResponse)(res, {
        messaage: "retrived all available rides",
        success: true,
        statusCode: http_status_codes_1.default.OK,
        data: rides
    });
}));
const acceptRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield ride_service_1.rideServices.acceptRide(req.params.id, (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
    (0, sendResponse_1.sendResponse)(res, {
        messaage: "Ride is accepted by Driver!",
        success: true,
        statusCode: http_status_codes_1.default.OK,
        data: result
    });
}));
const updateRideStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield ride_service_1.rideServices.updateRideStatus(req.params.id, (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId, req.body.status);
    (0, sendResponse_1.sendResponse)(res, {
        messaage: "Ride status updated!",
        success: true,
        statusCode: http_status_codes_1.default.OK,
        data: result
    });
}));
const earningsHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield ride_service_1.rideServices.earningsHistory((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
    (0, sendResponse_1.sendResponse)(res, {
        messaage: "Earning Histroey!",
        success: true,
        statusCode: http_status_codes_1.default.OK,
        data: result
    });
}));
exports.rideControllers = {
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
