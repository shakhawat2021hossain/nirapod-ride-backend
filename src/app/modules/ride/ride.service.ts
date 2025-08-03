import { JwtPayload } from "jsonwebtoken"
import AppError from "../../utils/AppError"
import { IRide, RideStatus } from "./ride.interface"
import httpStatus from 'http-status-codes'
import { Role } from "../user/user.interface"
import { Ride } from "./ride.model"
import { User } from "../user/user.model"
import { Types } from "mongoose"

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

    const { fare, startLocation, endLocation } = payload

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

const getAllRide = async () => {
    const rides = await Ride.find({})
    return rides
}



/* DRIVER */
const getAvailableRides = async () => {
    const rides = await Ride.find({ status: "requested" })
    return rides
}


const acceptRide = async (rideId: string, driverId: string) => {
    const ride = await Ride.findById(rideId)
    if (!ride) {
        throw new AppError(httpStatus.NOT_FOUND, "No ride found")
    }
    if (ride.status !== RideStatus.REQUESTED) {
        throw new AppError(httpStatus.BAD_REQUEST, "Ride is not in requested state");
    }

    const driver = await User.findById(driverId);
    if (!driver) {
        throw new AppError(httpStatus.NOT_FOUND, "No driver Found!");
    }

    if (driver.role !== Role.DRIVER || !driver.isApproved) {
        throw new AppError(httpStatus.BAD_REQUEST, "Driver is not approved or not updated role!");
    }

    const existing = await Ride.findOne({
        driver: driverId,
        status: { $in: [RideStatus.ACCEPTED, RideStatus.IN_TRANSIT, RideStatus.PICKED_UP] },
    });

    if (existing) {
        throw new AppError(httpStatus.CONFLICT, "Driver already has an active ride!");
    }

    ride.driver = new Types.ObjectId(driverId);
    ride.status = RideStatus.ACCEPTED;
    ride.acceptedAt = new Date();
    await ride.save();

    return ride;
}

export const rideServices = {
    requestRide,
    getAllRide,
    getAvailableRides,
    acceptRide
}