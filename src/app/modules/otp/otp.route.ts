import { Router } from "express";
import { otpControllers } from "./otp.controller";

const router = Router()

router.post('/send-otp', otpControllers.sendOtp)
router.post('/verify-otp', otpControllers.verifyOtp)

export const otpRoutes = router