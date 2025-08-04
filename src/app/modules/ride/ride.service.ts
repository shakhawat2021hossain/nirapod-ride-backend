import { JwtPayload } from "jsonwebtoken"
import AppError from "../../utils/AppError"
import { IRide, RideStatus } from "./ride.interface"
import httpStatus from 'http-status-codes'
import { Role } from "../user/user.interface"
import { Ride } from "./ride.model"
import { User } from "../user/user.model"
import { Types } from "mongoose"
/*================================= USER ====================================*/

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

const cancelRide = async(rideId: string, riderId: string) =>{
    const ride = await Ride.findById(rideId)
    if(!ride){
        throw new AppError(httpStatus.NOT_FOUND, "No ride found!")
    }

    if(ride.status === RideStatus.ACCEPTED || ride.status === RideStatus.IN_TRANSIT || ride.status === RideStatus.PICKED_UP || ride.status === RideStatus.COMPLETED){
        throw new AppError(httpStatus.BAD_REQUEST, "Ride cant be cancelled at this moment!")
    }

    if(riderId !== ride.rider.toString()){
        throw new AppError(httpStatus.BAD_REQUEST, "You are not allowed to cancelled other rides!")
    }


    ride.status = RideStatus.CANCELLED;
    await ride.save()
}



/*================================= DRIVER ==============================*/
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
        throw new AppError(httpStatus.BAD_REQUEST, "Ride is not in requested state!");
        // it may in cancelled state, or any other
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


const updateRideStatus = async (rideId: string, driverId: string, newStatus: RideStatus) => {
    const ride = await Ride.findById(rideId)
    if (!ride) {
        throw new AppError(httpStatus.NOT_FOUND, "Ride not found!");
    }
    // console.log(driverId);
    if (!driverId) {
        throw new AppError(httpStatus.NOT_FOUND, "No driver found for the ride!");

    }

    if (ride.driver?.toString() !== driverId) {
        throw new AppError(httpStatus.BAD_REQUEST, "You are not assigned for the ride")
    }

    switch (newStatus) {
        case "picked_up":
            ride.status = RideStatus.PICKED_UP;
            ride.pickedUpAt = new Date();
            break;
        case "in_transit":
            ride.status = RideStatus.IN_TRANSIT;
            break;
        case "completed":
            ride.status = RideStatus.COMPLETED;
            ride.completedAt = new Date();
            break;
        default:
            throw new AppError(httpStatus.BAD_REQUEST, "Unsupported status!");
    }

    await ride.save();
    return ride;

}




/*========================================== ADMIN ===========================================*/


const getAllRide = async () => {
    const rides = await Ride.find({})
    return rides
}


export const rideServices = {
    requestRide,
    getAllRide,
    getAvailableRides,
    acceptRide,
    updateRideStatus,
    cancelRide
}

// //   createRide,
//   getRideById,
//   getMyRides,
//   acceptRide,
//   completeRide,
//   cancelRide,
//   getAvailableRides,
//   getAllRides,
//   getRiderRideHistory,
//   getDriverRideHistory,
