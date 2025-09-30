import { Request, Response } from "express";
import { Note } from "../models";
import mongoose from "mongoose";

export const deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid note ID" })
        }
        const note = await Note.deleteOne({ _id: id })

        if (note.deletedCount === 0) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.json({
            message: "Note deleted",
        })

    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: (e as Error).message
        })
    }
}