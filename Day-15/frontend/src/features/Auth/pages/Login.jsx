import React, { useState } from 'react'
import '../styles/Auth.scss'
import { Link, Links, useNavigate } from 'react-router-dom'
import Register from './Register'
import { userAuth } from '../hooks/userAuth'

const Login = () => {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const {user,loading,handleLogin}=userAuth()
const navigate = useNavigate()

const handleForm = async(e)=>{
     e.preventDefault()
     await handleLogin(username,password)
     navigate('/')
     
}
if(loading){
  return(
    <main>
      <h1>Loading.......</h1>
    </main>
  )
}

  return(

    <main>
        <div className="auth-container">
            <h1>Login</h1>
            <form onSubmit={handleForm}>
                <input
                type="text"
                value={username}
                onInput={(e)=>setUsername(e.target.value)}
                placeholder='Enter username'
                />
                <input
                type="password" 
                value={password}
                onInput={(e)=>setPassword(e.target.value)}
                placeholder='Enter password'
                />
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account ? <Link to='/register'className='link'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login