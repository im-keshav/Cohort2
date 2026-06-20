import React from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { useState } from 'react'



const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleFormSubmit(e) {
    e.preventDefault()

    
  }
  return (
    <>
    <main>

      <div className="form-container">
      <h1>Register</h1>

        <form onSubmit={(e)=>handleFormSubmit(e)}>
          <input
          onInput={(e)=>{setUsername(e.target.value)}}
           type="text"
            placeholder='Enter the username'
             name='username'/>
          <input
          onInput={(e)=>{setEmail(e.target.value)}}
           type="email"
            placeholder='Enter the email'
             name='email'/>
          <input
          onInput={(e)=>{setPassword(e.target.value)}}
           type="password"
            placeholder='Enter the password'
             name='password'/>
          <button type="submit">Register</button>
        </form>
        <p>already have an account ?<Link to="/login" className='toggleAuthForm'>Login</Link></p>
      </div>
    </main>
    </>
  )
}

export default Register