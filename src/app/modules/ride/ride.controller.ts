import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { rideServices } from "./ride.service";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

const requestRide = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.body, req.user);
    const ride = await rideServices.requestRide(req.body, req.user as JwtPayload)
    sendResponse(res, {
        messaage: "created a ride request",
        success: true,
        statusCode: httpStatus.CREATED,
        data: ride
    })

})

const getAllRide = catchAsync(async (req: Request, res: Response) =>{
    const rides = await rideServices.getAllRide()
    sendResponse(res, {
        messaage: "retrived all rides",
        success: true,
        statusCode: httpStatus.OK,
        data: rides
    })
})

/* DRIVER */


const getAvailableRides = catchAsync(async (req: Request, res: Response) =>{
    const rides = await rideServices.getAvailableRides()
    sendResponse(res, {
        messaage: "retrived all available rides",
        success: true,
        statusCode: httpStatus.OK,
        data: rides
    })
})
const acceptRide = catchAsync(async (req: Request, res: Response) =>{
    const result = await rideServices.acceptRide(req.params.id, req.user?.userId)
    sendResponse(res, {
        messaage: "Ride is accepted by Driver!",
        success: true,
        statusCode: httpStatus.OK,
        data: result
    })
})

export const rideControllers = {
    requestRide,
    getAllRide,
    getAvailableRides,
    acceptRide
}