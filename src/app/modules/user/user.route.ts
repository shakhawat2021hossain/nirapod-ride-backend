import { Router } from "express";
import { userControllers } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";

const router =  Router()
router.post('/create', userControllers.createUser)
router.get('/all-user', userControllers.getAllUser)
router.patch('/:id', checkAuth(...Object.values(Role)), userControllers.updateUser)

export const userRoutes = router