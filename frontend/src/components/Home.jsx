import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/Creatcontext'
import { assets } from '../assets/assets';
import MessageBox from './MessageBox';

const Home=() =>{
  const {selectedChat,theme}=useAppContext();
  const [messages,setMessages]=useState([]);
  const [loading,setLoading]=useState(false);

  const [prompt,setPromt]=useState('');
  const [mode,setMode]=useState('text');
  const [isPublished,setIsPublished]=useState(false);

  const onSubmit=async (e)=>{
      e.preventDefault();
  }
  useEffect(()=>{
      if(selectedChat){
        setMessages(selectedChat.messages);
      }
  },[selectedChat])
  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10
     xl:mx-30'>
      {/* Chat message */}
      <div className='flex-1 mb-5 overflow-y-scroll'>
        {messages.length==0 && (
          <div>
            <img src={theme==='dark' ? assets.technology_logo : assets.technology_logo} alt="" className='w-full max-w-56 sm:max-w-68'/>
          <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 
           dark:text-white'>Ask me anything</p>
          </div>
        )}
        {messages.map((message,index)=> <MessageBox key={index} message={message}/>)}


        {/* Loading  */}
        {
          loading && <div className='loader flex items-center
           gap-1.5'>
           <div className='w-1.5 h-1.5 rounded-full bg-gray-500 
            dark:bg-white animate-bounce'>
            </div> 
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 
            dark:bg-white animate-bounce'>
            </div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 
            dark:bg-white animate-bounce'>
            </div>
           </div>
        }


      </div>
      {/* promt of input  */}
      <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 bordeer border-primary dark:border-[#80609F]/30
       rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>
      <select className='text-sm pl-3 pr-2 outline-none' onChange={(e)=>setMode(e.target.value)} value={mode}>
        <option value="text" className='dark:bg-purple-900'>Text</option>
        <option value="image" className='dark:bg-purple-900'>Image</option>
      </select>
      <input onChange={(e)=>setPromt(e.target.value)}type="text" value={prompt} placeholder='Ask Anything' className='flex-1 w-full text-sm outline-none' required/>
      <button disabled={loading}>
        <img src={loading ? assets.stop_icon : assets.send_icon} alt="" className='w-8 cursor-pointer'/>
      </button>
      </form>
      
    </div>
  )
}

export default Home
