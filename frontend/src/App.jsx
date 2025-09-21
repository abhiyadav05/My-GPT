import React, { useState } from 'react';
import Sidebar from '../src/components/Sidebar';
import Home from '../src/components/Home';
import Community from './pages/Community';
import Payment from './pages/Payment';
import { Route, Routes ,useLocation} from 'react-router-dom';
import { assets } from './assets/assets';
import './assets/prism.css'
import LoadingBar from './components/LoadingBar';
import { useAppContext } from './context/Creatcontext';
import Login from './pages/Login';
function App() {
  const {user}=useAppContext();
  const [isMenuOpen,setIsMenuOpen]=useState(false)
  const {pathname}=useLocation();
  if(pathname==='/loading') {
    return <LoadingBar/>
  }
  return (
   <>
   {!isMenuOpen && <img src={assets.menu_icon} className='absolute top-3 left-3
    w-8 h-8 cursor-pointer md:hidden not-dark:invert' onClick={()=>{
      setIsMenuOpen(true);
    }}/> }
    {user ? (  <div className='dark: bg-gradient-to-b from-[#fefefe]  to-[#dfdada] '>
      <div className='flex h-screen w-screen'>
     <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
     <Routes>
      <Route path='/' element={<Home/>}/>
       <Route path='/payment' element={<Payment/>}/>
        <Route path='/community' element={<Community/>}/>
     </Routes>
    </div>
    </div>
  ) : (
    <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
      <Login/>
    </div>
  )}
  
   </>
  )
}

export default App
