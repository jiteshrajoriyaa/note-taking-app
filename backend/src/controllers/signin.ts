import { Request, Response } from "express";
import { validateEmailSignUp } from "../utils/validation";
import { User } from "../models";
import jwt from 'jsonwebtoken'
import { deleteOldOTP, generateOTP, saveOTP } from "../utils/otp";
import { sendEmail } from "../utils/mail";

export const signin = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) return res.status(403).json({
            message: "Invalid email id"
        })

        const user = await User.findOne({
            email
        })

        if (!user) {
            return res.status(400).json({
                msg: "Invalid credentials"
            })
        }
        await deleteOldOTP(email)
        const otp: string = generateOTP();
        await saveOTP(email, otp)
        res.json({ msg: "OTP generated. Check your email." });

        // 🚀 Send email in background
        sendEmail(email, "Your OTP Code", `Your OTP is ${otp}. The OTP will expire in 2 minutes`)
            .then(() => console.log("Email sent successfully"))
            .catch((err) => console.error("Email failed:", err));
        return res.json({
            msg: "OTP send successfully",

        })

    } catch (e) {
        return res.status(500).json({
            msg: "Something went wrong",
            error: (e as Error).message
        })
    }
}
