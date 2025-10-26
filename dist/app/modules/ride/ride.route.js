"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("../user/user.interface");
const ride_controller_1 = require("./ride.controller");
// import { validateReq } from "../../middleware/validateReq";
// import { createRideZodSchema } from "./ride.validation";
const router = (0, express_1.Router)();
router.post('/request', 
// validateReq(createRideZodSchema),
(0, checkAuth_1.checkAuth)(user_interface_1.Role.RIDER), ride_controller_1.rideControllers.requestRide);
router.get('/all-rides', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), ride_controller_1.rideControllers.getAllRide);
router.get('/available-rides', (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.rideControllers.getAvailableRides);
router.get('/earnings', (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.rideControllers.earningsHistory);
router.get('/my-rides', (0, checkAuth_1.checkAuth)(user_interface_1.Role.RIDER), ride_controller_1.rideControllers.getMyRides);
router.get('/driver-rides', (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.rideControllers.getDriverdRides);
router.get('/:id', (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), ride_controller_1.rideControllers.getRideById);
router.patch('/:id/cancel-ride', (0, checkAuth_1.checkAuth)(user_interface_1.Role.RIDER), ride_controller_1.rideControllers.cancelRide);
router.patch('/:id/update-status', (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.rideControllers.updateRideStatus);
router.patch('/:id/accept-ride', (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), ride_controller_1.rideControllers.acceptRide);
exports.rideRoutes = router;
