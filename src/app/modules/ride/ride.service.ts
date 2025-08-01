import { JwtPayload } from "jsonwebtoken"
import AppError from "../../utils/AppError"
import { IRide } from "./ride.interface"
import httpStatus from 'http-status-codes'
import { Role } from "../user/user.interface"
import { Ride } from "./ride.model"

const requestRide = async (payload: IRide, decodedToken: JwtPayload) => {
    
    if (!payload.endLocation || !payload.startLocation || !payload.fare) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You missed any required field!")
    }
    if (decodedToken.role !== Role.RIDER) {
        throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized for request a ride!")
    }

    const isExist = await Ride.findOne({
        rider: decodedToken.userId,
        status: { $in: ["requested", "accepted", "picked_up", "in_transit"] }
    })
    if (isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "You are already in a ride")
    }

    const {fare, startLocation, endLocation} = payload

    const ride = await Ride.create({
        rider: decodedToken.userId,
        startLocation,
        endLocation,
        fare,
        status: "requested",
        requestedAt: new Date(),
    })
    return ride;

}

const getAllRide = async() =>{
    const rides = await Ride.find({})
    return rides
}

export const rideServices = {
    requestRide,
    getAllRide
}