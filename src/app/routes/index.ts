import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";

export const router = Router()
const apiRoutes = [
    {
        path: '/user',
        routes: userRoutes
    }
]

apiRoutes.forEach(route =>{
    router.use(route.path, route.routes)
})