import { Request, Response } from "express"
import { userServices } from "./user.service"

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userServices.createUser(req.body)
        res.json({
            success: true,
            message: "created a new user",
            user
        })
    }
    catch (error) {
        console.log(error);
    }
}
export const userControllers = {
    createUser
}