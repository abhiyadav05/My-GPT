// User Register 
import bcrypt from "bcryptjs";
import User from "../modals/User.js";
import jwt from 'jsonwebtoken'



// Generate the json web token

const generateToken=(id)=>{
        return jwt.sign({id},process.env.JWT_KEY,{
            expiresIn: '30d'
        })
}
export const registerUser= async (req,res)=>{
    const {name,email,password}=req.body;

    try {
        const userExist=await User.findOne({email});
        if(userExist){
            return res.json({success : false, message : "User already exits"})
        }

        const user=await User.create({name,email,password});
        
        const token=generateToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        return res.json({success: false,message : error.message})
    }
}


// Login user 

export const loginUser= async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(user){
            const isMatch=await bcrypt.compare(password,user.password);

            if(isMatch){
                const token=generateToken(user._id);
                return res.json({success:true,token})
            }
        }
        return res.json({success:false,message :"Invalid email or password"})
    } catch (error) {
         return res.json({success: false,message : error.message})
    }
}


export const getUser= async(req,res)=>{
        try {
            const user=req.user;
            return res.json({success:true,user})
        } catch (error) {
            return res.json({success: false,message : error.message})
        }
}