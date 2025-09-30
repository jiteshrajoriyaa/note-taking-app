"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const signup_1 = require("../controllers/signup");
const verify_otp_1 = require("../controllers/verify-otp");
const signin_1 = require("../controllers/signin");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const resendOtp_1 = require("../controllers/resendOtp");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/signup', signup_1.signup);
exports.authRouter.post('/signin', signin_1.signin);
exports.authRouter.post('/verify-otp-signup', verify_otp_1.verifyOTPSignup);
exports.authRouter.post('/verify-otp-signin', verify_otp_1.verifyOTPSignin);
exports.authRouter.post('/resend-otp', resendOtp_1.resendOTP);
exports.authRouter.get('/google', passport_1.default.authenticate('google', { scope: ["email", "profile"] }));
exports.authRouter.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
    const user = req.user;
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_STRING, { expiresIn: '7d' });
    res.redirect(`${process.env.FRONTEND_URL}/auth/google/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`);
});
