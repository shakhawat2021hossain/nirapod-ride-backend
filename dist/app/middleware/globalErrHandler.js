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
exports.globalErrHandler = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../config/env");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrHandler = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = http_status_codes_1.default.BAD_REQUEST;
    const message = "Something went Wrong (Global)";
    res.status(statusCode).json({
        success: false,
        message,
        error,
        stack: env_1.envVars.NODE_ENV === "development" ? error.stack : null
    });
});
exports.globalErrHandler = globalErrHandler;
