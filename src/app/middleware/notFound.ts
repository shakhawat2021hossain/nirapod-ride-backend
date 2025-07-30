import { Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import httpStatus from "http-status-codes"

export const notFound = async(req: Request, res: Response) =>{
    sendResponse(res, {
        messaage: "No Route found!!",
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        data: null
    })
}