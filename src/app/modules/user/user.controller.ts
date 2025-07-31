import { Request, Response } from "express"
import { userServices } from "./user.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await userServices.createUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        messaage: "created a new user!!",
        success: true,
        data: user
    })
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const users = await userServices.getAllUser()
    sendResponse(res, {
        success: true,
        messaage: "Retrieved all users successfully!!!",
        statusCode: httpStatus.OK,
        data: users
    })
})
export const userControllers = {
    createUser,
    getAllUser
}