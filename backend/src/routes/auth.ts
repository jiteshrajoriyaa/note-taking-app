import { Router } from "express";
import { signup } from "../controllers/signup";
import { verifyOTPSignin, verifyOTPSignup } from "../controllers/verify-otp";
import { signin } from "../controllers/signin";
import passport from "passport";
import jwt from 'jsonwebtoken'
import { resendOTP } from "../controllers/resendOtp";
export const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin)
authRouter.post('/verify-otp-signup', verifyOTPSignup)
authRouter.post('/verify-otp-signin', verifyOTPSignin)
authRouter.post('/resend-otp', resendOTP)

authRouter.get('/google', passport.authenticate('google', {scope: ["email", "profile"]}))
authRouter.get('/google/callback', passport.authenticate('google', {failureRedirect: `${process.env.FRONTEND_URL}/`, session: false}),
    (req,res)=>{
        const user = req.user as any
        const token = jwt.sign({id: user._id}, process.env.JWT_STRING!, {expiresIn: '7d'})

        res.redirect(`${process.env.FRONTEND_URL}/auth/google/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`)
    }
    )