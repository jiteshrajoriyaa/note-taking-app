"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.OTP = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date },
    googleId: { type: String },
    imageURL: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});
const otpSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 2 * 60 * 1000) }
});
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const noteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }
});
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.OTP = (0, mongoose_1.model)('OTP', otpSchema);
exports.Note = (0, mongoose_1.model)('Note', noteSchema);
