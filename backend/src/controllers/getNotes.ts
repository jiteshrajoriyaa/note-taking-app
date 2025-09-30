import { Request, Response } from "express";
import { Note } from "../models";
import mongoose from "mongoose";

export const getNotes = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid note ID" })

    } try {
        const notes = await Note.find({ userId: id })
        return res.json({
            notes
        })
    } catch (e) {
        return res.status(500).json({
            message: "Something went wrong",
            error: (e as Error).message
        })
    }
}