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
const express_1 = __importDefault(require("express"));
const routes_1 = require("./app/routes");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFound_1 = require("./app/middleware/notFound");
const globalErrHandler_1 = require("./app/middleware/globalErrHandler");
const app = (0, express_1.default)();
// middleware
app.use((0, cookie_parser_1.default)());
app.set("trust proxy", 1);
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://nirapod-ride-frontend.vercel.app'],
    credentials: true
}));
app.use(express_1.default.json());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "Hello from Server"
    });
}));
app.use("/api/v1", routes_1.router);
// global error handler
app.use(globalErrHandler_1.globalErrHandler);
// not found
app.use(notFound_1.notFound);
exports.default = app;
