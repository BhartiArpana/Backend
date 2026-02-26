import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Login from '../pages/Login'
import '../styles/Auth.scss'
import { userAuth } from '../hooks/userAuth'


const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
const {user,loading,handleRegister} = userAuth()
const navigate = useNavigate()

  const handleForm = async(e)=>{
     e.preventDefault()
     await handleRegister(username,email,password)
     navigate('/login')
}

if(loading){
  return <main><h1>Loading.....</h1></main>
}

  return (
    <main>
        <div className="auth-container">
            <h1>Register</h1>
            <form onSubmit={handleForm}>
                <input 
                type="text"
                value={username}
                onInput={(e)=>setUsername(e.target.value)}
                placeholder='Enter username'
                />
                <input
                type="email"
                value={email}
                onInput={(e)=>setEmail(e.target.value)}
                placeholder='Enter email'
                />
                <input
                type="text" 
                value={password}
                onInput={(e)=>setPassword(e.target.value)}
                placeholder='Enter password'
                />
                <button type='submit'>Register</button>
            </form>
            <p>Already have an account ? <Link to='/login'className='link' >Login</Link></p>
        </div>
    </main>
  )
}

export default Register