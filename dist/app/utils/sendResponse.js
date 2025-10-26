"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, resData) => {
    res.status(resData.statusCode).json({
        success: resData.success,
        message: resData.messaage,
        data: resData.data
    });
};
exports.sendResponse = sendResponse;
