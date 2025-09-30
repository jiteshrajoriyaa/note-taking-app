import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from "../models";

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No Authorization Header provide" })
        }
        const token = authHeader?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Token is missing" })
        }
        const decoded = jwt.verify(token as string, process.env.JWT_STRING!) as JwtPayload;
        const user = await User.findById(decoded.id)

        if (!user) return res.status(401).json({ message: "Invalid token user" })
        req.user = user;
        next()

    } catch (e) {
        console.error(e)
        throw new Error("Unauthorized to create or delete notes")
    }

}