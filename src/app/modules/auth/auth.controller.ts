import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

const credentialLogin = catchAsync(async(req: Request, res: Response) =>{
    const result = await authServices.credentialLogin(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        messaage: "logged in successfully!",
        data: result,
        success: true
    })
})

export const authControllers = {
    credentialLogin
}