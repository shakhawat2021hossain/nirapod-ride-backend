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
exports.userServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const updateUser = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(userId);
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found!");
    }
    if (payload.role) {
        if (decodedToken.role !== user_interface_1.Role.ADMIN) {
            throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "You are not authorized to update role");
        }
    }
    if (payload.availability || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === user_interface_1.Role.RIDER || decodedToken.role === user_interface_1.Role.DRIVER) {
            throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "You are not authorized!");
        }
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, payload, { returnDocument: "after", runValidators: true });
    return result;
});
const changePass = (payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(decodedToken.userId);
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found!");
    }
    const isMatched = yield bcryptjs_1.default.compare(payload.oldPass, isExist.password);
    if (!isMatched) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid Credentials");
    }
    const changedPass = yield bcryptjs_1.default.hash(payload.newPass, 10);
    const result = yield user_model_1.User.findByIdAndUpdate(decodedToken.userId, { password: changedPass }, { returnDocument: "after", runValidators: true });
    return result;
});
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const filter = query ? { role: query } : {};
    const users = yield user_model_1.User.find(filter);
    return users;
});
const becomeDriver = (decodedToken, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(decodedToken);
    if (decodedToken.role !== user_interface_1.Role.RIDER) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not authorized");
    }
    console.log("payload", payload);
    const result = yield user_model_1.User.findByIdAndUpdate(decodedToken.userId, {
        driverRequest: {
            status: user_interface_1.DriverRequestStatus.PENDING,
            vehicleInfo: payload,
            requestedAt: new Date(),
        },
    }, {
        new: true,
        runValidators: true,
        returnDocument: "after"
    }).select("-password");
    return result;
});
const getDriverRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    const pending = yield user_model_1.User.find({ "driverRequest.status": "pending" })
        .select("name email driverRequest")
        .sort({ "driverRequest.requestedAt": -1 });
    return pending;
});
const approveDriverRequest = (id, decodedToken, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found!");
    }
    if (!user.driverRequest || user.driverRequest.status !== user_interface_1.DriverRequestStatus.PENDING) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "No pending driver request to approve!");
    }
    user.driverRequest.status = payload;
    if (payload === user_interface_1.DriverRequestStatus.APPROVED) {
        user.role = user_interface_1.Role.DRIVER;
        user.vehicleInfo = user.driverRequest.vehicleInfo;
        user.driverRequest.approvedAt = new Date();
        user.driverRequest.approvedBy = decodedToken.userId;
    }
    yield user.save();
    return user;
});
const setAvailabilityStatus = (decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (decodedToken.role !== user_interface_1.Role.DRIVER) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You cant set availaibility status!!");
    }
    const driver = yield user_model_1.User.findById(decodedToken.userId);
    if (!driver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Driver not found!!");
    }
    if (!driver.isApproved) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Driver not approved yet!!");
    }
    driver.availability = driver.availability === user_interface_1.Availability.ONLINE
        ? user_interface_1.Availability.OFFLINE
        : user_interface_1.Availability.ONLINE;
    yield driver.save();
    return driver;
});
const toggleBlock = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found!");
    }
    user.isBlocked = user.isBlocked ? false : true;
    yield user.save();
    return user;
});
const getMe = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId).select("-password");
    return user;
});
exports.userServices = {
    getAllUser,
    updateUser,
    becomeDriver,
    getDriverRequests,
    approveDriverRequest,
    setAvailabilityStatus,
    toggleBlock,
    getMe,
    changePass
};
