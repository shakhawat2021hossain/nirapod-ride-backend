import { Request, Response } from "express"
import { userServices } from "./user.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"
import { JwtPayload } from "jsonwebtoken"



const updateUser = catchAsync(async (req: Request, res: Response) => {
    // const token = req.headers.authorization
    // const decodedToken = jwt.verify(token as string, envVars.ACCESS_TOKEN_SECRET)

    const result = await userServices.updateUser(req.params.id, req.body, req.user as JwtPayload)
    sendResponse(res, {
        success: true,
        messaage: "updated user data successfully!!!",
        statusCode: httpStatus.OK,
        data: result
    })
})


const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const role = req.query.role as string | undefined;
    const users = await userServices.getAllUser(role)
    sendResponse(res, {
        success: true,
        messaage: "Retrieved all users successfully!!!",
        statusCode: httpStatus.OK,
        data: users
    })
})


const becomeDriver = catchAsync(async (req: Request, res: Response) => {
    // console.log("body",req.body);
    const driver = await userServices.becomeDriver(req.user as JwtPayload, req.body)
    sendResponse(res, {
        success: true,
        messaage: "updated role to driver!!!",
        statusCode: httpStatus.OK,
        data: driver
    })
})


const getDriverRequests = catchAsync(async (req: Request, res: Response) => {
    // console.log("body",req.body);
    const result = await userServices.getDriverRequests()
    sendResponse(res, {
        success: true,
        messaage: "Retrived all user that request to be a driver!!!",
        statusCode: httpStatus.OK,
        data: result
    })
})


const approveDriverRequest = catchAsync(async (req: Request, res: Response) => {
    // console.log("params", req.params);
    const result = await userServices.approveDriverRequest(req.params.id, req.user as JwtPayload)
    sendResponse(res, {
        success: true,
        messaage: "Update role to driver!!!",
        statusCode: httpStatus.ACCEPTED,
        data: result
    })
})


const setAvailabilityStatus = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.setAvailabilityStatus(req.user as JwtPayload)
    sendResponse(res, {
        success: true,
        messaage: "Updated driver availability status!!!",
        statusCode: httpStatus.ACCEPTED,
        data: result
    })
})


const toggleBlock = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.toggleBlock(req.params.id)
    sendResponse(res, {
        success: true,
        messaage: `Updated block status, BLOCKED: ${result.isBlocked}`,
        statusCode: httpStatus.OK,
        data: result
    })
})

const getMe = catchAsync(async (req: Request, res: Response) => {

    const decoderToken = req.user as JwtPayload
    const result = await userServices.getMe(decoderToken.userId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        messaage: "User Data retreived Successfully!",
        data: result,
        success: true
    })
})

export const userControllers = {
    getAllUser,
    updateUser,
    becomeDriver,
    getDriverRequests,
    approveDriverRequest,
    setAvailabilityStatus,
    toggleBlock,
    getMe
}