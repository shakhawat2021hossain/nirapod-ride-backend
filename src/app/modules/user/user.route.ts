import { Router } from "express";
import { userControllers } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";

const router =  Router()

router.get('/all-user', checkAuth(Role.ADMIN), userControllers.getAllUser)
router.patch('/become-driver', checkAuth(Role.RIDER), userControllers.becomeDriver)
router.get('/driver-request', checkAuth(Role.ADMIN), userControllers.getDriverRequests)
router.patch('/availability', checkAuth(Role.DRIVER), userControllers.setAvailabilityStatus)
router.patch('/driver-request/:id/approve', checkAuth(Role.ADMIN), userControllers.approveDriverRequest)
router.patch('/:id/toggle-block', checkAuth(Role.ADMIN), userControllers.toggleBlock)
router.patch('/:id', checkAuth(...Object.values(Role)), userControllers.updateUser)
router.get('/me', checkAuth(...Object.values(Role)), userControllers.getMe)

export const userRoutes = router