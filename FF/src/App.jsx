import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Auth from './Pages/Auth'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Auth/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </div>
      
  
  )
}

export default App
