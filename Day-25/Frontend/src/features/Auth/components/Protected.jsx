import React, { useEffect } from 'react'
import { userAuth } from '../hooks/userAuth'
import { useNavigate } from 'react-router-dom'

const Protected = ({children}) => {
  
    const {user,loading} = userAuth()
    const navigate = useNavigate()

    if(loading){
        return <main><h1>Loading...</h1></main>
    }
        if(!user){
        return navigate('/login')
        }

   

  return (
    children
  )
}

export default Protected