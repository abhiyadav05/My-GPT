import React, { useState } from 'react';
import Sidebar from '../src/components/Sidebar';
import Home from '../src/components/Home';
import Community from './pages/Community';
import Payment from './pages/Payment';
import { Route, Routes ,useLocation} from 'react-router-dom';
import { assets } from './assets/assets';
import './assets/prism.css'
import LoadingBar from './components/LoadingBar';
function App() {
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
    <div className='dark: bg-gradient-to-b from-[#fefefe]  to-[#dfdada] '>
      <div className='flex h-screen w-screen'>
     <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
     <Routes>
      <Route path='/' element={<Home/>}/>
       <Route path='/payment' element={<Payment/>}/>
        <Route path='/community' element={<Community/>}/>
     </Routes>
    </div>
    </div>
   </>
  )
}

export default App
