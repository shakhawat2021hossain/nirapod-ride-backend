import { Response } from "express"
import { Role } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model"
import { generateTokens } from "./generateTokens"

export const updateToken = async(id: string, res: Response) =>{
    const user = await User.findById(id)
    if(user?.role === Role.DRIVER){
        const tokens = await generateTokens(user)
        res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    }
}