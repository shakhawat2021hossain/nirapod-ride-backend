import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"


const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await authServices.createUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        messaage: "created a new user!!",
        success: true,
        data: user
    })
})


const credentialLogin = catchAsync(async (req: Request, res: Response) => {
    const result = await authServices.credentialLogin(req.body)

    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000

    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        messaage: "logged in successfully!",
        data: result,
        success: true
    })
})

const logOut = catchAsync(async (req: Request, res: Response) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",

    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        messaage: "logged out in successfully!",
        data: null,
        success: true
    })
})





export const authControllers = {
    createUser,
    credentialLogin,
    logOut
}