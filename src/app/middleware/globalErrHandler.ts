/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went Wrong (Global)"

    res.status(statusCode).json({
        success: false,
        message,
        stack: envVars.NODE_ENV === "development" ? error.stack : null
    })

}