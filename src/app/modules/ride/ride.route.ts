import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { rideControllers } from "./ride.controller";
// import { validateReq } from "../../middleware/validateReq";
// import { createRideZodSchema } from "./ride.validation";

const router = Router()

router.post(
    '/request',
    // validateReq(createRideZodSchema),
    checkAuth(Role.RIDER),
    rideControllers.requestRide
)

router.get(
    '/all-rides',
    checkAuth(Role.ADMIN),
    rideControllers.getAllRide
)
router.get('/available-rides', checkAuth(Role.DRIVER), rideControllers.getAvailableRides)
router.get('/earnings', checkAuth(Role.DRIVER), rideControllers.earningsHistory)
router.get('/my-rides', checkAuth(Role.RIDER), rideControllers.getMyRides)
router.get('/:id', checkAuth(...Object.values(Role)), rideControllers.getRideById)
router.patch('/:id/cancel-ride', checkAuth(Role.RIDER), rideControllers.cancelRide)
router.patch('/:id/update-status', checkAuth(Role.DRIVER), rideControllers.updateRideStatus)
router.patch('/:id/accept-ride', checkAuth(Role.DRIVER), rideControllers.acceptRide)

export const rideRoutes = router