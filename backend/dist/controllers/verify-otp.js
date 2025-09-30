"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTPSignin = exports.verifyOTPSignup = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const otp_1 = require("../utils/otp");
const verifyOTPSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, dob, otp } = req.body;
        if (!name || !email || !dob || !otp)
            return res.status(400).json({
                msg: "Missing fields"
            });
        const validOTP = yield (0, otp_1.verifyOTPInDB)(email, otp);
        if (!validOTP)
            return res.status(401).json({
                msg: "Invalid OTP"
            });
        const user = yield models_1.User.create({
            name,
            email,
            dob
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_STRING, { expiresIn: '7d' });
        res.json({
            msg: "User created successfully",
            token
        });
    }
    catch (e) {
        res.status(500).json({
            msg: "Something went wrong",
            error: e.message
        });
    }
});
exports.verifyOTPSignup = verifyOTPSignup;
const verifyOTPSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return res.status(403).json({
                message: "Invalid email id"
            });
        if (!otp)
            return res.status(403).json({ message: "No OTP provided" });
        const validOTP = yield (0, otp_1.verifyOTPInDB)(email, otp);
        if (!validOTP)
            return res.status(401).json({
                msg: "Invalid OTP"
            });
        const user = yield models_1.User.findOne({ email });
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user._id, name: user === null || user === void 0 ? void 0 : user.name }, process.env.JWT_STRING, { expiresIn: '7d' });
        res.json({
            msg: "User logged in successfully",
            token
        });
    }
    catch (e) {
        res.status(500).json({
            msg: "Something went wrong",
            error: e.message
        });
    }
});
exports.verifyOTPSignin = verifyOTPSignin;
