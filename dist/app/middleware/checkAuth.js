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
exports.checkAuth = void 0;
const verifyToken_1 = require("../utils/verifyToken");
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../utils/AppError"));
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(authRoles);
        const token = req.headers.authorization || req.cookies.accessToken;
        console.log("token in checkauth", token);
        if (!token) {
            throw new AppError_1.default(403, "No access token found!");
        }
        // here must be use await, either if block will be true
        const isVerified = yield (0, verifyToken_1.verifyToken)(token, env_1.envVars.ACCESS_TOKEN_SECRET);
        // console.log(isVerified);
        if (!authRoles.includes(isVerified.role)) {
            throw new AppError_1.default(403, "You are not permitted for accessing the route!");
        }
        // console.log(isVerified);
        req.user = isVerified;
        next();
    }
    catch (error) {
        // console.log(error);
        next(error);
    }
});
exports.checkAuth = checkAuth;
