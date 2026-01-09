import dotenv from "dotenv"

dotenv.config()

export const envVars = {
    MONGO_URI: process.env.MONGO_URI as string,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
    ADMIN_PASS: process.env.ADMIN_PASS as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    REDIS_HOST: process.env.REDIS_HOST as string,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_USERNAME: process.env.REDIS_USERNAME as string,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,

}