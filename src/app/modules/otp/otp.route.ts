import { Router } from "express";
import { otpControllers } from "./otp.controller";

const router = Router()

router.post('/send-otp', otpControllers.sendOtp)

export const otpRoutes = router