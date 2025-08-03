import AppError from "../../utils/AppError"
import { Availability, DriverRequestStatus, IAuthProvider, IUser, IVehicle, Role } from "./user.interface"
import { User } from "./user.model"
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs"
import { JwtPayload } from "jsonwebtoken"

const createUser = async (payload: IUser) => {
    const { email, password, ...rest } = payload
    const isExist = await User.findOne({ email: email })
    if (isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User ALready exist")
    }

    const hashedPass = await bcrypt.hash(password as string, 10)

    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }

    const user = await User.create({ email, password: hashedPass, auths: [authProvider], ...rest })
    return user

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

const getAllUser = async () => {
    const users = await User.find({})
    return users
}


const becomeDriver = async (decodedToken: JwtPayload, payload: Partial<IVehicle>) => {
    // console.log(decodedToken);
    if (decodedToken.role !== Role.RIDER) {
        throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized")
    }

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

const approveDriverRequest = async (id: string, decodedToken: JwtPayload) => {
    const user = await User.findById(id)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }

    if (!user.driverRequest || user.driverRequest.status !== DriverRequestStatus.PENDING) {
        throw new AppError(httpStatus.BAD_REQUEST, "No pending driver request to approve!")
    }

    user.role = Role.DRIVER
    user.vehicleInfo = user.driverRequest.vehicleInfo
    user.driverRequest.approvedAt = new Date();
    user.driverRequest.approvedBy = decodedToken.userId
    user.driverRequest.status = DriverRequestStatus.APPROVED;

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



export const userServices = {
    createUser,
    getAllUser,
    updateUser,
    becomeDriver,
    getDriverRequests,
    approveDriverRequest,
    setAvailabilityStatus
}