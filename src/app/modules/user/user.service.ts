import AppError from "../../utils/AppError"
import { Availability, DriverRequestStatus, IUser, IVehicle, Role } from "./user.interface"
import { User } from "./user.model"
import httpStatus from "http-status-codes"
import { JwtPayload } from "jsonwebtoken"
import bcrypt from "bcryptjs"


interface IPassChange {
    oldPass: string;
    newPass: string
}


const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
    const isExist = await User.findById(userId)
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }

    if (payload.role) {
        if (decodedToken.role !== Role.ADMIN) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized to update role")
        }
    }

    if (payload.availability || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.RIDER || decodedToken.role === Role.DRIVER) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }
    }


    const result = await User.findByIdAndUpdate(userId, payload, { returnDocument: "after", runValidators: true })
    return result;
}


const changePass = async ( payload: IPassChange, decodedToken: JwtPayload) => {
    const isExist = await User.findById(decodedToken.userId)

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }

    const isMatched = await bcrypt.compare(payload.oldPass, isExist.password)
    if (!isMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials")
    }

    const changedPass = await bcrypt.hash(payload.newPass, 10)

    const result = await User.findByIdAndUpdate(decodedToken.userId, {password: changedPass}, { returnDocument: "after", runValidators: true })
    return result;
}



const getAllUser = async (query?: string) => {
    console.log(query)
    const filter = query ? { role: query } : {};
    const users = await User.find(filter)
    return users
}


const becomeDriver = async (decodedToken: JwtPayload, payload: Partial<IVehicle>) => {
    // console.log(decodedToken);
    if (decodedToken.role !== Role.RIDER) {
        throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized")
    }
    console.log("payload", payload)

    const result = await User.findByIdAndUpdate(
        decodedToken.userId,
        {
            driverRequest: {
                status: DriverRequestStatus.PENDING,
                vehicleInfo: payload,
                requestedAt: new Date(),
            },
        },
        {
            new: true,
            runValidators: true,
            returnDocument: "after"
        }
    ).select("-password");


    return result;


}

const getDriverRequests = async () => {
    const pending = await User.find({ "driverRequest.status": "pending" })
        .select("name email driverRequest")
        .sort({ "driverRequest.requestedAt": -1 })
    return pending
}

const approveDriverRequest = async (id: string, decodedToken: JwtPayload, payload: DriverRequestStatus) => {
    const user = await User.findById(id)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }

    if (!user.driverRequest || user.driverRequest.status !== DriverRequestStatus.PENDING) {
        throw new AppError(httpStatus.BAD_REQUEST, "No pending driver request to approve!")
    }

    user.driverRequest.status = payload;
    if (payload === DriverRequestStatus.APPROVED) {
        user.role = Role.DRIVER
        user.vehicleInfo = user.driverRequest.vehicleInfo
        user.driverRequest.approvedAt = new Date();
        user.driverRequest.approvedBy = decodedToken.userId
    }

    await user.save();

    return user;
}


const setAvailabilityStatus = async (decodedToken: JwtPayload) => {
    if (decodedToken.role !== Role.DRIVER) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cant set availaibility status!!")
    }

    const driver = await User.findById(decodedToken.userId)

    if (!driver) {
        throw new AppError(httpStatus.NOT_FOUND, "Driver not found!!");
    }

    if (!driver.isApproved) {
        throw new AppError(httpStatus.FORBIDDEN, "Driver not approved yet!!");
    }

    driver.availability = driver.availability === Availability.ONLINE
        ? Availability.OFFLINE
        : Availability.ONLINE

    await driver.save()
    return driver

}

const toggleBlock = async (userId: string) => {
    const user = await User.findById(userId)

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }

    user.isBlocked = user.isBlocked ? false : true

    await user.save()

    return user

}



const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password")
    return user

}

export const userServices = {
    getAllUser,
    updateUser,
    becomeDriver,
    getDriverRequests,
    approveDriverRequest,
    setAvailabilityStatus,
    toggleBlock,
    getMe,
    changePass
}