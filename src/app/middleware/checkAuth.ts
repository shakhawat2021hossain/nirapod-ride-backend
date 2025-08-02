import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../utils/verifyToken";
import { envVars } from "../config/env";
import AppError from "../utils/AppError";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(authRoles);
        const token = req.headers.authorization;
        // console.log(token);
        if (!token) {
            throw new AppError(403, "No access token found!")
        }

        // here must be use await, either if block will be true
        const isVerified = await verifyToken(token, envVars.ACCESS_TOKEN_SECRET) as JwtPayload;
        // console.log(isVerified);
        if (!authRoles.includes(isVerified.role)) {
            throw new AppError(403, "You are not permitted for accessing the route!")
        }
        // console.log(isVerified);
        req.user = isVerified
        next()
    }
    catch (error) {
        // console.log(error);
        next(error)
    }

}