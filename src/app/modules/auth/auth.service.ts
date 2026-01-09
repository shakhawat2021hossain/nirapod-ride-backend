import AppError from "../../utils/AppError"
import { IAuthProvider, IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs"
import { generateTokens } from "../../utils/generateTokens"


const createUser = async (payload: IUser) => {
    const { email, password, role, ...rest } = payload
    const isExist = await User.findOne({ email: email })
    if (isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User ALready exist")
    }

    const hashedPass = await bcrypt.hash(password as string, 10)

    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }

    const user = await User.create({ email, password: hashedPass, role, auths: [authProvider], ...rest })
    return user

}

const credentialLogin = async (payload: Partial<IUser>) => {
    const isExist = await User.findOne({ email: payload.email })
    console.log("existed user:", isExist)
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid credentials")
    }

    const isMatched = await bcrypt.compare(payload.password as string, isExist.password as string)
    if (!isMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials")
    }

    const tokens = await generateTokens(isExist)

    const user = isExist.toObject()

    // delete user.password

    return {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    }

}


export const authServices = {
    createUser,
    credentialLogin
}