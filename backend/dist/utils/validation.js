"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmailSignUp = void 0;
const validateEmailSignUp = (email, dob) => {
    if (!email || !dob)
        throw new Error('Email and password required');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        throw new Error('Invalid email format');
    const date = new Date(dob);
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date of birth format");
    }
    const today = new Date();
    if (date > today) {
        throw new Error("Date of birth cannot be in the future");
    }
};
exports.validateEmailSignUp = validateEmailSignUp;
