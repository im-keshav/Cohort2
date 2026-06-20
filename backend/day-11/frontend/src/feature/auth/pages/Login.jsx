import React from 'react'
import "../style/form.scss"
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


const {handleLogin,loading} = useAuth()
const navigate = useNavigate()
  
if(loading){
  return ( <h1>Loading..... </h1>)
}


  function handleSubmit(e){
    e.preventDefault()

    handleLogin(username, password)
    .then(()=>{
      console.log(" login successfully")
      navigate("/")
    })


    
    
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
          onInput={(e)=>{setUsername(e.target.value)}}
         
          type="text" name="username" placeholder='Enter username' />
          <input 
          onInput={(e)=>{setPassword(e.target.value)}}
          
          type="password" name="password" placeholder='Enter password' />
          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account ? <Link to="/register" className='toggleAuthForm'>Register</Link></p>
        
      </div>
    </main>
  )
}

export default LoginForm