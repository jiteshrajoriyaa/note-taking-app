import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import Input from "../components/Innput"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom"

export interface FormState {
    name?: string
    email: string
    dob?: string
}

export interface ErrorState {
    name?: string
    email?: string
    dob?: string
    general?: string
}

export const Signup = () => {
    const [form, setForm] = useState<FormState>({ email: "" })
    const [errors, setErrors] = useState<ErrorState>({})
    const [loading, setLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [timer, setTimer] = useState(120)
    const [otp, setOTP] = useState('')
    const [resendOTP, setResendOTP] = useState(false)
    const navigate = useNavigate()

    const handleChange = (key: keyof FormState, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
        setErrors(prev => ({ ...prev, [key]: undefined }))
    }

    const handleSendOTP = async () => {
        setErrors({})

        if (!form.name) return setErrors(prev => ({ ...prev, name: "Name required" }))
        if (!form.email) return setErrors(prev => ({ ...prev, email: "Email required" }))
        if (!form.dob) return setErrors(prev => ({ ...prev, password: "Date of Birth required" }))

        try {
            setLoading(true)
            await axios.post(`${BACKEND_URL}/auth/signup`, form)
            setOtpSent(true)
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval)
                        setResendOTP(true)
                        return 120
                    }
                    return prev - 1
                })
            }, 1000)
        } catch (e: any) {
            setErrors(prev => ({ ...prev, general: e.response?.data?.message || "Invalid data/User exist" }))
        } finally {
            setLoading(false)
        }
    }

    const handleVerify = async () => {
        if (!otp) return setErrors(prev => ({ ...prev, general: "OTP field is empty" }))
        try {
            setLoading(true)
            const payload = { ...form, otp }
            const response = await axios.post(`${BACKEND_URL}/auth/verify-otp-signup`, payload)
            const token = response.data.token
            const user = response.data.user
            localStorage.setItem('token', "Bearer " + token)
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/dashboard')
        } catch (e: any) {
            setErrors(prev => ({ ...prev, general: e.response?.data?.message || "Invalid OTP" }))
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        try {
            setResendOTP(false)
            await axios.post(`${BACKEND_URL}/auth/resend-otp`, {
                email: form.email
            })
            setOtpSent(true)
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval)
                        setResendOTP(true)
                        return 120
                    }
                    return prev - 1
                })
            }, 1000)
        } catch (e: any) {
            setErrors(prev => ({ ...prev, general: e.response?.data?.message || "Internal Server Error" }))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if (token && user) {
            navigate('/dashboard')
        }
    }, [])

    return (
        <div className="min-h-screen w-full">
            <div className="w-full px-4 py-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Form */}
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="flex items-center">
                    <img src="./top.png" alt="" /> 
<span className="font-bold  text-xl">HD</span>
                        </div>
                        <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
                            <h1 className="text-2xl font-bold mb-4 text-primary">Sign Up</h1>

                            {errors.general && <p className="text-red-500 mb-2">{errors.general}</p>}

                            <Input
                                label="Name"
                                value={form.name || ""}
                                onChange={val => handleChange('name', val)}
                                error={errors.name}
                            />
                            <Input
                                label="Email"
                                value={form.email}
                                onChange={val => handleChange("email", val)}
                                error={errors.email}
                            />
                            <Input
                                label="Date of Birth"
                                type="date"
                                value={form.dob || ""}
                                onChange={val => handleChange('dob', val)}
                                error={errors.dob}
                            />

                            {!otpSent && (
                                <div className="flex gap-2 flex-col">
                                    <Link
                                        className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
                                        to={`https://note-taking-app-vert-three.vercel.app/auth/google`}
                                    >
                                        Signup with Google
                                    </Link>
                                    <Button
                                        text={loading ? "OTP sending" : 'Send OTP'}
                                        onClick={handleSendOTP}
                                        disabled={loading}
                                    />
                                </div>
                            )}

                            {otpSent && (
                                <div className="flex gap-2 flex-col">
                                    <Input
                                        label="OTP"
                                        value={otp}
                                        onChange={setOTP}
                                    />
                                    {resendOTP ? (
                                        <div className="flex gap-2 flex-col">
                                            <Button
                                                onClick={handleResend}
                                                text={'Resend OTP'}
                                            />
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={handleVerify}
                                            text={"Sign Up"}
                                        />
                                    )}
                                    <p>Resend OTP after <span className="text-blue-500 font-semibold">{timer}</span></p>
                                </div>
                            )}
                            <div className="font-semibold mt-4 text-gray-500 text-xl">Already have an account ?? <Link className="text-blue-500" to={'/signin'} >Sign in</Link> </div>
                        </form>
                    </div>

                    {/* Right Column - Image */}
                    <div className="hidden lg:block w-full">
                        <img
                            src="./right-column.png"
                            className="w-full h-full object-cover rounded-2xl"
                            alt="Signup illustration"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}