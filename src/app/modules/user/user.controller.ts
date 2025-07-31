import { Request, Response } from "express"
import { userServices } from "./user.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"
import jwt, { JwtPayload } from "jsonwebtoken"
import { envVars } from "../../config/env"

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await userServices.createUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        messaage: "created a new user!!",
        success: true,
        data: user
    })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token as string, envVars.ACCESS_TOKEN_SECRET)
    const result = await userServices.updateUser(req.params.id, req.body, decodedToken as JwtPayload)
    sendResponse(res, {
        success: true,
        messaage: "updated user data successfully!!!",
        statusCode: httpStatus.OK,
        data: result
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
    getAllUser,
    updateUser
}