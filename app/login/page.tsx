import React from 'react';
import './login.css'

const login = () => {
  return (
    <div className='login-container'>
      <h1>LOGIN</h1>
      <form action='/login' method='POST'>
        <div className='login-input-container'>
          <h2>Username</h2>
          <input className='login-input-field' type="text" id="username" name="username" placeholder='Type Your Username' required/>
        </div>
        <div className='login-input-container'>
          <h2>Password</h2>
          <input className='login-input-field' type="text" id="password" name="password" placeholder='Type Your Password' required/>
        </div>
        <button className='login-btn' aria-label='login'>Login</button>
      </form>
    </div>
  )  
}

export default login;