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
exports.verifyOTPInDB = exports.deleteOldOTP = exports.saveOTP = exports.generateOTP = void 0;
const models_1 = require("../models");
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
exports.generateOTP = generateOTP;
const saveOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.OTP.create({
            email,
            otp
        });
    }
    catch (e) {
        console.error('Error while saving otp');
        throw new Error(String(e));
    }
});
exports.saveOTP = saveOTP;
const deleteOldOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.OTP.deleteOne({
            email
        });
    }
    catch (e) {
        console.error('Error while deleting otp');
        throw new Error(String(e));
    }
});
exports.deleteOldOTP = deleteOldOTP;
const verifyOTPInDB = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield models_1.OTP.findOne({
        email,
        otp
    });
    if (!record)
        return false;
    if (record.expiresAt < new Date())
        return false;
    yield models_1.OTP.deleteOne({ email, otp });
    return true;
});
exports.verifyOTPInDB = verifyOTPInDB;
