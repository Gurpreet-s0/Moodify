import React, { useContext, useEffect } from 'react'
import {AuthContext} from '../Context/auth.context'
import {register,login,logOut,get_me} from "../auth.services"
import Cookies from 'js-cookie';

const UseAuth = () => {

const {user,setuser,loading,setloading} = useContext(AuthContext)


async function registerHandler({username,email,password}){
    setloading(true)
    try {
      const res = await register({ username, email, password })
      setuser(res.user)
      return res
    } finally {
      setloading(false)
    }
}

async function loginHandler({email,password}){
    setloading(true)
   try {
    const res = await login({ email, password })
    setuser(res.user)
    return res
   } finally {
    setloading(false)
   }
}

async function get_me_Handler(){
    setloading(true)
    try {
      const res = await get_me()
      setuser(res.user)

      return res
    } finally {
      setloading(false)
    }
}

async function logOutHandler(){
    setloading(true)
    try {
      await logOut()
      setuser(null)
    } finally {
      setloading(false)
    }
} 
//  useEffect(()=>{
//   get_me_Handler()
// },[])
//r

  return (
    {registerHandler,loginHandler,get_me_Handler,logOutHandler,user,loading}
  )
}

export default UseAuth
