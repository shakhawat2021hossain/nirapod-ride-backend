import { NextFunction, Request, Response } from "express"
import { userServices } from "./user.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userServices.createUser(req.body)
        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            messaage: "created a new user!!",
            success: true,
            data: user
        })
    }
    catch (error) {
        // console.log(error);
        next(error) // now this err will handle by global error handler
    }
}
export const userControllers = {
    createUser
}