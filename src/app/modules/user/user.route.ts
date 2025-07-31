import { Router } from "express";
import { userControllers } from "./user.controller";

const router =  Router()
router.post('/create', userControllers.createUser)
router.get('/all-user', userControllers.getAllUser)
router.patch('/:id', userControllers.updateUser)

export const userRoutes = router