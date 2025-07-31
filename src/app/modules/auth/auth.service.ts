import AppError from "../../utils/AppError"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs"
import { generateTokens } from "../../utils/generateTokens"

const credentialLogin = async (payload: Partial<IUser>) => {
    const isExist = await User.findOne({ email: payload.email })
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid credentials")
    }

    const isMatched = await bcrypt.compare(payload.password as string, isExist.password as string)
    if (!isMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials")
    }

    const tokens = await generateTokens(isExist)

    const user = isExist.toObject()

    delete user.password

    return {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    }




}
export const authServices = {
    credentialLogin
}