import { Request, Response } from "express";
import { User } from "../models";
import jwt from 'jsonwebtoken'
import { verifyOTPInDB } from "../utils/otp";

export const verifyOTPSignup = async (req: Request, res: Response) => {
    try {
        const { name, email, dob, otp } = req.body;
        if (!name || !email || !dob || !otp) return res.status(400).json({
            msg: "Missing fields"
        })

        const validOTP = await verifyOTPInDB(email, otp);
        if (!validOTP) return res.status(401).json({
            msg: "Invalid OTP"
        })


        const user = await User.create({
            name,
            email,
            dob
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_STRING!, {expiresIn: '7d'})
        return res.json({
            msg: "User created successfully",
            token,
            user
        })

    } catch (e) {
        return res.status(500).json({
            msg: "Something went wrong",
            error: (e as Error).message
        })
    }
}

export const verifyOTPSignin = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) return res.status(403).json({
            message: "Invalid email id"
        })
        if(!otp) return res.status(403).json({message: "No OTP provided"})

        const validOTP = await verifyOTPInDB(email, otp);
        if (!validOTP) return res.status(401).json({
            msg: "Invalid OTP"
        })

        const user = await User.findOne({email})
        const token = jwt.sign({ id: user?._id }, process.env.JWT_STRING!, {expiresIn: '7d'})
        return res.json({
            msg: "User logged in successfully",
            token,
            user
        })

    } catch (e) {
        return res.status(500).json({
            msg: "Something went wrong",
            error: (e as Error).message
        })
    }
}