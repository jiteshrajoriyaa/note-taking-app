import { Request, Response } from "express";
import { IUser, Note } from "../models";

export interface AuthRequest extends Request {
    user?: IUser
}
export const createNote = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is missing" })
        }

        const user = req.user;
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        const note = await Note.create({
            title,
            description,
            userId: user!._id
        })

        return res.json({
            message: "Note created successfully",
            note
        })
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error",
            error: (e as Error).message
        })
    }
}