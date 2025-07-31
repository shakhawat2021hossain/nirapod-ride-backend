import { Router } from "express";
import { userControllers } from "./user.controller";

const router =  Router()
router.post('/create', userControllers.createUser)
router.get('/all-user', userControllers.getAllUser)

export const userRoutes = router