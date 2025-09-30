import { Document, model, Schema, Types } from 'mongoose'

export interface IUser extends Document {
    name: string,
    email: string,
    dob?: Date,
    googleId?: string,
    imageURL?: string,
    createdAt: Date
}

export interface IOTP extends Document {
    email: string,
    otp: string,
    expiresAt: Date
}

export interface INOTE extends Document {
    title: string,
    description: string,
    userId: Types.ObjectId
}

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    dob: { type: Date},
    googleId: { type: String },
    imageURL: {type: String, default: ""},
    createdAt: { type: Date, default: Date.now }
})

const otpSchema = new Schema<IOTP>({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 2 * 60 * 1000) }
})
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })


const noteSchema = new Schema<INOTE>({
    title: { type: String, required: true },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

export const User = model<IUser>('User', userSchema)
export const OTP = model<IOTP>('OTP', otpSchema)
export const Note = model<INOTE>('Note', noteSchema)
