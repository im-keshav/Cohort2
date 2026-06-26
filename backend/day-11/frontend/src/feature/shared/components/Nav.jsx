import React from 'react'
import { NavLink } from 'react-router-dom'
import"../../auth/style/form.scss"
import "../style/nav.scss"
import { useNavigate } from 'react-router'


const Nav = () => {
    const navigate = useNavigate()
  return (
   <nav className='nav-bar'>
    <p>Instagram</p>
    <button onClick={()=>{navigate("/create-post")}} className='button '>
        Create Post
    </button>
   </nav>
  )
}

export default Nav