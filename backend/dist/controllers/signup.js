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
exports.signup = void 0;
const validation_1 = require("../utils/validation");
const models_1 = require("../models");
const otp_1 = require("../utils/otp");
const mail_1 = require("../utils/mail");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, dob } = req.body;
        if (!name)
            return res.status(400).json({
                messgae: "Name required"
            });
        (0, validation_1.validateEmailSignUp)(email, dob);
        const existingUser = yield models_1.User.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                msg: "User already exist"
            });
        }
        const otp = (0, otp_1.generateOTP)();
        yield (0, otp_1.saveOTP)(email, otp);
        yield (0, mail_1.sendEmail)(email, 'Your OTP Code', `Your OTP is ${otp}. The OTP will expire in 2 minutes`);
        res.json({
            msg: "OTP sent to your email Successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            msg: "Something went wrong",
            error: e.message
        });
    }
});
exports.signup = signup;
