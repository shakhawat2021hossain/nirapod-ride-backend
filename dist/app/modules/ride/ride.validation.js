"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRideZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createRideZodSchema = zod_1.default.object({
    startLocation: zod_1.default
        .string({ invalid_type_error: "Start Location must be a string" })
        .min(1, "Start Location is required"),
    endLocation: zod_1.default
        .string({ invalid_type_error: "End Location must be a string" })
        .min(1, "End Location is required"),
    fare: zod_1.default
        .number({ invalid_type_error: "Fare must be a number" })
        .positive("Fare must be greater than zero"),
});
