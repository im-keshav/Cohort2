import {BrowserRouter, Route, Routes } from 'react-router'
import Login from './features/auth/pages/Login'
import Resigter from './features/auth/pages/Resigter'

function AppRouters(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<h1>Welcome to the App</h1>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Resigter/>} />
    </Routes>
    

    </BrowserRouter>
  )
}

export default AppRouters