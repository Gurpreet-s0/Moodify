import React from 'react'
import {BrowserRouter, Route ,Routes} from 'react-router'
import EmotionDetectPage from './Features/Emotions Detection /Pages/EmotionDetectPage'
import Login from './Features/Auth/Pages/Login'
import Register from './Features/Auth/Pages/Register'

const AppRoutes = () => {
  return (
   <BrowserRouter>
    <Routes>
        <Route path='/' element={<EmotionDetectPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>} ></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes