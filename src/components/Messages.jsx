import React from 'react'
import './Messages.css'
import { Navigate, useNavigate } from 'react-router-dom'
const Messages = () => {
  const navigate = useNavigate();
   const Home =()=>{
    navigate("/")
   }

   
  return (
    <div>
    <div className='alert'>
   <h2>We are Working on this Sections<br/> Sorry for inconvenience</h2>
   <p onClick={Home}>Back to You-Tube</p>
     
   </div>
    </div>
  )
}

export default Messages
