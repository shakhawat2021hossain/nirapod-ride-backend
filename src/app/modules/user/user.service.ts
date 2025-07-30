import { IUser } from "./user.interface"
import { User } from "./user.model"

const createUser = async(payload: IUser) =>{
    const isExist = await User.findOne({email: payload.email})
    if(isExist){
        throw new Error("User ALready exist")
    }
    const user = await User.create(payload)
    return user
}
export const userServices = {
    createUser
}