import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { authRouter } from './routes/auth'
import { noteRouter } from './routes/note'
import './config/googleStrategy'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/note', noteRouter)

const startServer = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL!)
        console.log('MongoDB connected')
        
        const port = process.env.PORT
        app.listen(port, ()=>{
            console.log("Server is running on port: ", port)
        })


    }catch(e){
        console.error('MongoDB connection error: ', e)
        process.exit(1)
    }
}

startServer()

