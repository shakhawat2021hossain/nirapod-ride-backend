import crypto from "crypto"
import { redisClient } from "../../config/redis.config";
import { sendEmail } from "../../utils/sendEmail";
import AppError from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";

const otpExpiration = 2 * 60;

const generateOtp = (length = 6) => {
    const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString()
    return otp
}
const sendOtp = async (email: string) => {
    console.log(email)
    const otp = generateOtp()
    const redisKey = `otp:${email}`
    await redisClient.set(redisKey, otp, {
        expiration: {
            type: "EX",
            value: otpExpiration
        }
    })
    await sendEmail({
        to: email,
        subject: "Verify Your Account",
        html: `
            <h3>Email Verification</h3>
            <p>Your OTP is:</p>
            <h2>${otp}</h2>
            <p>This OTP will expire in 2 minutes.</p>
        `,
    })
}


const verifyOtp = async (email: string, otp: string) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError(404, "User not found")
    }

    if (user.isVerified) {
        throw new AppError(401, "You are already verified")
    }

    const redisKey = `otp:${email}`
    const savedOTP = await redisClient.get(redisKey)
    if (!savedOTP) {
        throw new AppError(StatusCodes.NOT_FOUND, "Invalid User!")
    }

    if (savedOTP !== otp) {
        throw new AppError(StatusCodes.CONFLICT, "Invalid OTP key!")
    }
    await Promise.all([
        User.updateOne({ email }, { isVerified: true }, { runValidators: true }),
        redisClient.del([redisKey])
    ])



}

export const otpServices = {
    sendOtp,
    verifyOtp
}