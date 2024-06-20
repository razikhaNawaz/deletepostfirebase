import React, { useState } from 'react';
import classes from './ForgotPassword.module.css';

const ForgotPssword = () => {
const [email, setEmail]=useState()
let url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDEEV5oe8QHzMWZ9RLhehZG6wu6Ez0agmQ'

const sendLinkPost=async()=>{
  try{
     const response=await fetch(url, {
      method:'POST',
      body:JSON.stringify({
        requestType: "PASSWORD_RESET",
        email:email
      }),
      header:{
        'Content-Type':'application/json'
      }
     })
     console.log(response)
  }
  catch(err){
    console.log(err)
  }
}

const emailHandler=(e)=>{
  setEmail(e.target.value)
}

  return (
    <div className={classes.parent}>
        <form className={classes.form}>
            <label>Enter the email with which u have registered</label>
        <input type="text" placeholder='enter email' value={email} onChange={emailHandler}></input>
        <button onClick={sendLinkPost} className='btn btn-primary'>
            Send Link
        </button>
        </form>

    </div>
  )
}

export default ForgotPssword;