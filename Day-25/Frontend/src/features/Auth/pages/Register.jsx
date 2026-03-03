import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormGroup } from '../components/FormGroup'
import { userAuth } from '../hooks/userAuth'

const Register = () => {

    const [username, setUsername] = useState('second')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {loading,handleRegister} = userAuth()
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        await handleRegister(username,email,password)
        navigate('/')
    }

    if(loading){
        return <main><h1>Loading...</h1></main>
    }

  return (
    <main>
        <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
           <FormGroup 
           label="username" 
           placeholder="Enter username" 
           value={username}
              onChange={(e)=>setUsername(e.target.value)}
           />
           <FormGroup label="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
           <FormGroup label="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
           <button className='button' type='submit'>Register</button>
        </form>
        <p>Already have an account? go to <Link to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register