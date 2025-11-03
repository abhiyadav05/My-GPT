// User Register 
import bcrypt from "bcryptjs";
import User from "../modals/User.js";
import jwt from 'jsonwebtoken'
import Chat from "../modals/Chat.js";



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

// To get Published Images

export const getPublishedImages= async(req,res)=>{
    try {
        const publishedImageMessages= await Chat.aggregate([{
            $unwind : "$messages",
            $match : {
                "messages.isImage" : true,
                "messages.isPublished" : true
            }
            },
            {
                $project : {
                    _id : 0,
                    imageUrl : "$messages.content",   
                    userNmae:  "$userName",
            }
        }])
         res.json({success:true,images : publishedImageMessages.reverse()})
    } catch (error) {
         res.json({success: false,message : error.message})
    }
}