import { Request, Response } from "express";
import { deleteOldOTP, generateOTP, saveOTP } from "../utils/otp";
import { sendEmail } from "../utils/mail";

export const resendOTP = async (req: Request, res: Response) => {
    const email = req.body.email

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return res.status(401).json({
        message: 'Invalid email format'
    })

    await deleteOldOTP(email)
    const otp: string = generateOTP();
    await saveOTP(email, otp)
    await sendEmail(email, 'Your OTP Code', `Your OTP is ${otp}. The OTP will expire in 5 minutes`)

    res.json({
        msg: "OTP resent to your email Successfully"
    })
}