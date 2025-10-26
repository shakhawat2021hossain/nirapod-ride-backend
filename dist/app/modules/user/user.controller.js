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
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const token = req.headers.authorization
    // const decodedToken = jwt.verify(token as string, envVars.ACCESS_TOKEN_SECRET)
    const result = yield user_service_1.userServices.updateUser(req.params.id, req.body, req.user);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        messaage: "updated user data successfully!!!",
        statusCode: http_status_codes_1.default.OK,
        data: result
    });
}));
const getAllUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = req.query.role;
    const users = yield user_service_1.userServices.getAllUser(role);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        messaage: "Retrieved all users successfully!!!",
        statusCode: http_status_codes_1.default.OK,
        data: users
    });
}));
const becomeDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("body",req.body);
    const driver = yield user_service_1.userServices.becomeDriver(req.user, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        messaage: "updated role to driver!!!",
        statusCode: http_status_codes_1.default.OK,
        data: driver
    });
}));
const getDriverRequests = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("body",req.body);
    const result = yield user_service_1.userServices.getDriverRequests();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        messaage: "Retrived all user that request to be a driver!!!",
        statusCode: http_status_codes_1.default.OK,
        data: result
    });
}));
const approveDriverRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("params", req.params);
    const result = yield user_service_1.userServices.approveDriverRequest(req.params.id, req.user);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        messaage: "Update role to driver!!!",
        statusCode: http_status_codes_1.default.ACCEPTED,
        data: result
    });
}));
const setAvailabilityStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.setAvailabilityStatus(req.user);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        messaage: "Updated driver availability status!!!",
        statusCode: http_status_codes_1.default.ACCEPTED,
        data: result
    });
}));
const toggleBlock = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.toggleBlock(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        messaage: `Updated block status, BLOCKED: ${result.isBlocked}`,
        statusCode: http_status_codes_1.default.OK,
        data: result
    });
}));
const getMe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decoderToken = req.user;
    const result = yield user_service_1.userServices.getMe(decoderToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        messaage: "User Data retreived Successfully!",
        data: result,
        success: true
    });
}));
exports.userControllers = {
    getAllUser,
    updateUser,
    becomeDriver,
    getDriverRequests,
    approveDriverRequest,
    setAvailabilityStatus,
    toggleBlock,
    getMe
};
