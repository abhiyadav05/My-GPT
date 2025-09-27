// User Register 

import User from "../modals/User";

export const registerUser= async (req,res)=>{
    const {name,email,password}=req.body;

    try {
        const userExist=await User.findOne({email});
        if(userExist){
            return res.json({success : false, message : "User already exits"})
        }

        const user=await User.create({name,email,password});
        
    } catch (error) {
        
    }
}