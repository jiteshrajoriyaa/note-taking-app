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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOTP = void 0;
const otp_1 = require("../utils/otp");
const mail_1 = require("../utils/mail");
const resendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        return res.status(401).json({
            message: 'Invalid email format'
        });
    yield (0, otp_1.deleteOldOTP)(email);
    const otp = (0, otp_1.generateOTP)();
    yield (0, otp_1.saveOTP)(email, otp);
    yield (0, mail_1.sendEmail)(email, 'Your OTP Code', `Your OTP is ${otp}. The OTP will expire in 5 minutes`);
    res.json({
        msg: "OTP resent to your email Successfully"
    });
});
exports.resendOTP = resendOTP;
