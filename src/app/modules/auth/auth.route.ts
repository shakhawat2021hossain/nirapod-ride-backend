import { Router } from "express";
import { authControllers } from "./auth.controller";
import { validateReq } from "../../middleware/validateReq";
import { createUserZodSchema } from "./auth.validation";

const router = Router()

router.post('/register', validateReq(createUserZodSchema), authControllers.createUser)
router.post('/login', authControllers.credentialLogin)
router.post('/logout', authControllers.logOut)


export const authRoutes = router