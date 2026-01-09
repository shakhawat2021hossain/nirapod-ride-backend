import nodemailer from "nodemailer";
import { envVars } from "../config/env";
import AppError from "./AppError";

const transporter = nodemailer.createTransport({
    secure: false,
    auth: {
        user: envVars.NODEMAILER?.SMTP_USER,
        pass: envVars.NODEMAILER.SMTP_PASS
    },
    port: Number(envVars.NODEMAILER.SMTP_PORT),
    host: envVars.NODEMAILER.SMTP_HOST,
    tls: {
        rejectUnauthorized: false
    }
})

interface SendEmailOptions {
    to: string,
    subject: string;
    html: string;
}

export const sendEmail = async ({
    to,
    subject,
    html
}: SendEmailOptions) => {
    try {
        console.log(envVars.NODEMAILER)
        const info = await transporter.sendMail({
            from: envVars.NODEMAILER.SMTP_USER,
            to: to,
            subject: subject,
            html: html,
        })
        console.log(`\u2709\uFE0F Email sent to ${to}: ${info.messageId}`);
    } catch (error: any) {
        console.log("email sending error", error.message);
        throw new AppError(401, "Email error")
    }

}