import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { rideRoutes } from "../modules/ride/ride.route";
import { otpRoutes } from "../modules/otp/otp.route";

export const router = Router()
const apiRoutes = [
    {
        path: '/user',
        routes: userRoutes
    },
    {
        path: '/auth',
        routes: authRoutes
    },
    {
        path: '/ride',
        routes: rideRoutes
    },
    {
        path: '/otp',
        routes: otpRoutes
    },
]

apiRoutes.forEach(route =>{
    router.use(route.path, route.routes)
})