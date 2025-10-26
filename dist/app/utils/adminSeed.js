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
exports.adminSeed = void 0;
const user_interface_1 = require("../modules/user/user.interface");
const env_1 = require("../config/env");
const user_model_1 = require("../modules/user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const adminSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExist = yield user_model_1.User.findOne({ email: env_1.envVars.ADMIN_EMAIL });
        if (isExist) {
            console.log("Admin already exist!");
            return;
        }
        const porvider = {
            provider: "credentials",
            providerId: env_1.envVars.ADMIN_EMAIL
        };
        const hashedPass = yield bcryptjs_1.default.hash(env_1.envVars.ADMIN_PASS, 10);
        const admin = {
            email: env_1.envVars.ADMIN_EMAIL,
            name: "Admin",
            password: hashedPass,
            role: user_interface_1.Role.ADMIN,
            isVerified: true,
            auths: [porvider]
        };
        const result = yield user_model_1.User.create(admin);
        console.log("Super Admin Created Successfuly! \n");
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.adminSeed = adminSeed;
