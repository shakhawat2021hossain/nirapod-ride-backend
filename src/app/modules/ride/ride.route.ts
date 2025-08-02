import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { rideControllers } from "./ride.controller";

const router = Router()

router.post('/request', checkAuth(Role.RIDER), rideControllers.requestRide)
router.get('/all-rides', checkAuth(Role.ADMIN), rideControllers.getAllRide)
router.get('/available-rides', checkAuth(Role.DRIVER), rideControllers.getAvailableRides)

export const rideRoutes = router