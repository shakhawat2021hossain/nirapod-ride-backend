import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"

const sendOtp = catchAsync(async (req: Request, res: Response) => {

    

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        messaage: "Send OTP successfully",
        data: null,
        success: true
    })
})

const verifyOtp = catchAsync(async (req: Request, res: Response) => {

   
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        messaage: "verify otp successfully!",
        data: null,
        success: true
    })
})





export const otpControllers = {
    sendOtp,
    verifyOtp
}