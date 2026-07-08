import React from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router'
import EmotionDetectPage from './Features/Emotions Detection /Pages/EmotionDetectPage'
import Login from './Features/Auth/Pages/Login'
import Register from './Features/Auth/Pages/Register'
import UseAuth from './Features/Auth/Hooks/UseAuth'

const AppRoutes = () => {
 const { user } = UseAuth();
   const navigate = useNavigate()
if(user){
 navigate("/")
}
return (
  // <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          user
            ? <EmotionDetectPage />
            : <Navigate to="/login" replace />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  // </BrowserRouter>
);
}

export default AppRoutes
