"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const ride_route_1 = require("../modules/ride/ride.route");
exports.router = (0, express_1.Router)();
const apiRoutes = [
    {
        path: '/user',
        routes: user_route_1.userRoutes
    },
    {
        path: '/auth',
        routes: auth_route_1.authRoutes
    },
    {
        path: '/ride',
        routes: ride_route_1.rideRoutes
    },
];
apiRoutes.forEach(route => {
    exports.router.use(route.path, route.routes);
});
