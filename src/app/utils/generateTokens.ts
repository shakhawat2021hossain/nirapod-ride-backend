import jwt, { JwtPayload } from "jsonwebtoken"
import { envVars } from "../config/env"
export const generateTokens = async (payload: JwtPayload) => {
    const jwtPayload = {
        userId: payload._id,
        email: payload.email,
        role: payload.role
    }

    const accessToken = jwt.sign(jwtPayload, envVars.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
    const refreshToken = jwt.sign(jwtPayload, envVars.ACCESS_TOKEN_SECRET, { expiresIn: '30d' })

    return {
        accessToken,
        refreshToken
    }
}