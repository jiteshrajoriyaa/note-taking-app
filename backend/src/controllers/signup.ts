import { Request, Response } from "express";
import { validateEmailSignUp } from "../utils/validation";
import { User } from "../models";
import { generateOTP, saveOTP } from "../utils/otp";
import { sendEmail } from "../utils/mail";

export const signup = async (req: Request, res: Response) => {
    try {

        const { name, email, dob } = req.body;
        if (!name) return res.status(400).json({
            messgae: "Name required"
        })

        validateEmailSignUp(email, dob);

        const existingUser = await User.findOne({
            email
        })

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exist"
            })
        }

        const otp: string = generateOTP();
        await saveOTP(email, otp)
        await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}. The OTP will expire in 2 minutes`)
        res.json({ msg: "OTP generated. Check your email." });

    } catch (e) {
        return res.status(500).json({
            msg: "Something went wrong",
            error: (e as Error).message
        })
    }
}

