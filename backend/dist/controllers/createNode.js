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
exports.createNote = void 0;
const models_1 = require("../models");
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is missing" });
        }
        const user = req.user;
        if (!user)
            return res.status(401).json({ message: "Unauthorized" });
        const note = yield models_1.Note.create({
            title,
            description,
            userId: user._id
        });
        return res.json({
            message: "Note created successfully",
            note
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal Server Error",
            error: e.message
        });
    }
});
exports.createNote = createNote;
