// ai chat message controller

import Chat from "../modals/Chat";
import User from "../modals/User";

export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
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

    const reply={...choices[0].messages, timestamp: Date.now(),
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
    })
    } catch (error) {
        
    }
}