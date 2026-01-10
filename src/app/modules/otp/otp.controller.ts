import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"
import { otpServices } from "./otp.service"

const sendOtp = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body
    console.log("body", req.body)
    await otpServices.sendOtp(email)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        messaage: "Send OTP successfully",
        data: null,
        success: true
    })
})

const verifyOtp = catchAsync(async (req: Request, res: Response) => {

    const { email, otp } = req.body;
    await otpServices.verifyOtp(email, otp)


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