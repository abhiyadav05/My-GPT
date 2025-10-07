// ai chat message controller

import Chat from "../modals/Chat.js";
import User from "../modals/User.js";
import axios from "axios";
import  openai  from "../configs/openai.js";
import imagekit from "../configs/imageKit.js";
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    // check credit
    if (req.user.credits < 1) {
      return res.json({
        success: false,
        message: "You dont have enough credit to use this feature",
      });
    }
    const { chatId, prompt } = req.body;
    const chat = await Chat.findOne({ userId, _id: chatId });
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const {choices} = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [ 
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // reply from the ai 

    const reply={...choices[0].message, timestamp: Date.now(),
      isImage: false,}
      res.json({success : true , reply})
      chat.messages.push(reply);
      await chat.save();

      await User.updateOne({_id: userId},{$inc:{credits:-1}})

     
  } catch (error) {
    res.json({success : false ,message : error.message})
  }
};


// image Generation Message Controller 

export const imageMessageController=async(req,res)=>{
    try {
        const userId=req.user._id;
        // check credit 
        if(req.user.credits<2){
            return res.json({success : false , message :"You dont have enough credit to use this feature"})
        }

        const {prompt,chatId,isPublished}=req.body;
        const chat =await Chat.findOne({userId,_id:chatId})

        // add user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });   
    
    // encode the prompt
    const encodedPrompt=encodeURIComponent(prompt);

    // generate image from image kit 
    const imageUrl=`${process.env.IMAGE_KIT_URL}/ik-genimg-prompt-${encodedPrompt}/MY-GPT/${Date.now()}.png?tr=w-800,h-800`;
   const aiImageResponse= await axios.get(imageUrl,{responseType:'arraybuffer'});

    // upload image to image kit
    const base64Image=`data:image/png;base64,${Buffer.from(aiImageResponse.data,'binary').toString('base64')}`;
    const uploadResponse= await imagekit.upload({
        file : base64Image,
        fileName : `${Date.now()}.png`,
        folder : "/MY-GPT"
    })
       const reply={role : 'assistant',
        content :uploadResponse.url,
        timestamp: Date.now(),
        isImage: true,
      isPublished}
        res.json({success : true , reply})

        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({_id:userId},{$inc:{credits:-2}})  

    } catch (error) {
        res.json({success : false , message : error.message});
    }
}