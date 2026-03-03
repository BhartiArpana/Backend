import React, { useState } from 'react'
import FormGroup from '../components/FormGroup'
import '../styles/login.scss'
import '../../shared/formGruop.scss'
import '../../shared/button.scss'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../hooks/userAuth'

const Login = () => {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()

const {loading,handleLogin} = userAuth()
   async function handleSubmit(e){
        e.preventDefault()
       await handleLogin(username,password)
       navigate('/')
    }
    if(loading){
      return <main><h1>Loading....</h1></main>
    }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup
                 label={"Username"}
                 placeholder={"Enter Username"} 
                 className="form-group" 
                 value={username}
                 onChange={(e)=>setUsername(e.target.value)}
                 />
                <FormGroup 
                label={"Password"} 
                placeholder={"Enter Password"} className="form-group" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
               <button className='button' type='submit'>Login</button>
            </form>
            <p>Don't have an account? go to <Link to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login