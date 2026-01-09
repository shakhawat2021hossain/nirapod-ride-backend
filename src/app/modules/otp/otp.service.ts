import crypto from "crypto"
import { redisClient } from "../../config/redis.config";
import { sendEmail } from "../../utils/sendEmail";
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


const verifyOtp = async () => {

}

export const otpServices = {
    sendOtp,
    verifyOtp
}