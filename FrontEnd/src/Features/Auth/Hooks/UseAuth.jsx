import React, { useContext } from 'react'
import {AuthContext} from '../Context/auth.context'
import {register,login,logOut,get_me} from "../auth.services"

const UseAuth = () => {

const {user,setuser,loading,setloading} = useContext(AuthContext)


async function registerHandler({username,email,password}){
    setloading(true)
    const res = await register(username,email,password)
    setuser(res.data)
    setloading(false)
}

async function loginHandler({username,password}){
    setloading(true)
   const res =  await login(username,password)
    setuser(res.data)
    setloading(false)
}

async function get_me_Handler(){
    setloading(true)
    const res = await get_me()
    setuser(res.data)
    setloading(false)
}

async function logOutHandler(){
    setloading(true)
    await logOut()
    setuser(null)
    setloading(false)
}  

  return (
    {registerHandler,loginHandler,get_me_Handler,logOutHandler,user,loading}
  )
}

export default UseAuth