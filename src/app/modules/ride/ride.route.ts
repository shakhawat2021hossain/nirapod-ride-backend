import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { rideControllers } from "./ride.controller";

const router = Router()

router.post('/request', checkAuth(Role.RIDER), rideControllers.requestRide)
router.get(
    '/all-rides',
    checkAuth(Role.ADMIN),
    rideControllers.getAllRide
)
router.get('/available-rides', checkAuth(Role.DRIVER), rideControllers.getAvailableRides)
router.get('/earnings', checkAuth(Role.DRIVER), rideControllers.earningsHistory)
router.patch('/:id/cancel-ride', checkAuth(Role.RIDER), rideControllers.cancelRide)
router.patch('/:id/update-status', checkAuth(Role.DRIVER), rideControllers.updateRideStatus)
router.patch('/:id/accept-ride', checkAuth(Role.DRIVER), rideControllers.acceptRide)

export const rideRoutes = router