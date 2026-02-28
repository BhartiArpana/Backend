import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router'


const Nav = () => {
    const navigate = useNavigate()
  return (
    <div className='navbar'>
      <p>Insta</p>
      <button
      onClick={()=>navigate('/create-post')}
      >New post</button>
    </div>
  )
}

export default Nav