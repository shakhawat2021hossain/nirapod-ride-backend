import AppError from "../../utils/AppError"
import { IAuthProvider, IUser, Role } from "./user.interface"
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
export const userServices = {
    createUser,
    getAllUser,
    updateUser
}