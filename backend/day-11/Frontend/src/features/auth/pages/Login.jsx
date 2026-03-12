import React from 'react'
import "../style/form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import { login } from '../services/auth.api'



function Login() {

    const[username,setUsername]=useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate()
    const {handleLogin ,loading}= useAuth()

    if(loading){
        return(<h1>Loading...</h1>)
    }




     function submitHandler(e){
        e.preventDefault()
       handleLogin(username , password)
       .then(res=>{
        console.log(res);
        navigate("/")
        
       }) 
    }

   
    
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form action="" onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <input
                onInput={(e)=>{setUsername(e.target.value)}}
                type="email" name="email" placeholder='Enter email' />
                <input 
                onInput={(e)=>{setPassword(e.target.value)}}
                type="password" name="password" placeholder='Enter password' />

                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account. <Link className="toggleAuthForm" to="/register">Register</Link> </p>
        </div>
    </main>
  )
}

export default Login
