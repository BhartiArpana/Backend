import {register,login,getMe,logout} from '../services/auth.api'
import { AuthContext } from '../auth.context'
import { useContext, useEffect } from 'react'

export const userAuth = ()=>{
    const context = useContext(AuthContext)
    const {loading,setloading,user,setUser} = context

    const handleRegister = async(username,email,password)=>{
        setloading(true)
        const data = await register(username,email,password )
        setUser(data.user)
        setloading(false)
    }
     const handleLogin = async(username,email,password)=>{
        setloading(true)
        const data = await login(username,email,password )
        setUser(data.user)
        setloading(false)
    }
     const handleGetMe = async()=>{
        setloading(true)
        const data = await getMe()
        setUser(data.user)
        setloading(false)
    }
     const handleLogout = async()=>{
        setloading(true)
        await logout()
        setUser(null)
        setloading(false)
    }

    useEffect(()=>{
        handleGetMe()
    },[])
   
    return {loading,user,handleGetMe,handleLogin,handleLogout,handleRegister}
}