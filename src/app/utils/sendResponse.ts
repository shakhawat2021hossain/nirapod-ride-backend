import { Response } from "express";

interface IResData<T> {
    statusCode: number;
    success: boolean;
    messaage: string;
    data: T;

}

export const sendResponse = <T>(res: Response, resData: IResData<T>) =>{
    res.status(resData.statusCode).json({
        success: resData.success,
        message: resData.messaage,
        data: resData.data
    })
}