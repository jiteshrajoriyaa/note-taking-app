import { OTP } from "../models"

export const generateOTP = () => Math.floor(100000 + Math.random()*900000).toString()

export const saveOTP = async (email: string, otp: string) => {    
    try{
        const existOTP = await OTP.findOne({email})
        if(existOTP){
            throw new Error("OTP already exist")
        }
        await OTP.create({
            email,
            otp
        })
    }catch(e){
        console.error('Error while saving otp')
        throw new Error(String(e))
    }
}
export const deleteOldOTP = async (email: string) => {    
    try{
        await OTP.deleteOne({
            email
        })
    }catch(e){
        console.error('Error while deleting otp')
        throw new Error(String(e))
    }
}

export const verifyOTPInDB = async (email: string, otp:string) => {
    const record = await OTP.findOne({
        email,
        otp
    })

    if(!record) return false
    if(record.expiresAt < new Date()) return false
    await OTP.deleteOne({ email, otp });
    return true
}