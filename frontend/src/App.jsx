import React from 'react';
import Sidebar from '../src/components/Sidebar';
import Home from '../src/components/Home';
import Community from './pages/Community';
import Payment from './pages/Payment';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
   <>
    <div className='dark: bg-gradient-to-b from-[#242124]  to-[#000000] '>
      <div className='flex h-screen w-screen'>
     <Sidebar/>
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
