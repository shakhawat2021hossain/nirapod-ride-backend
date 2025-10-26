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
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const generateTokens = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtPayload = {
        userId: payload._id,
        email: payload.email,
        role: payload.role
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, env_1.envVars.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, env_1.envVars.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
    return {
        accessToken,
        refreshToken
    };
});
exports.generateTokens = generateTokens;
