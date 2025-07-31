import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs"

export const adminSeed = async () => {
    try {
        const isExist = await User.findOne({ email: envVars.ADMIN_EMAIL })
        if (isExist) {
            console.log("Admin already exist!");
            return

        }
        const porvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVars.ADMIN_EMAIL
        }

        const hashedPass = await bcrypt.hash(envVars.ADMIN_PASS, 10)
        const admin: IUser = {
            email: envVars.ADMIN_EMAIL,
            name: "Admin",
            password: hashedPass,
            role: Role.ADMIN,
            isVerified: true,
            auths: [porvider]
        }

        const result = await User.create(admin)
        console.log("Super Admin Created Successfuly! \n");
        console.log(result);

    }
    catch (error) {
        console.log(error);
    }

}