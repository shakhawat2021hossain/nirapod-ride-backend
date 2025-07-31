import dotenv from "dotenv"

dotenv.config()

export const envVars = {
    MONGO_URI: process.env.MONGO_URI as string,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,

}