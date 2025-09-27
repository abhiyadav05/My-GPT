import { json } from "express";
import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        mongoose.connection.on('connected',()=>console.log("DATABASE Connected"))
        await mongoose.connect(`${process.env.MONGODB_URL}/MY-GPT`)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;