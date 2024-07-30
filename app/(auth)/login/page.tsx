import React from 'react';
import Link from 'next/link';
import '../auth.css';

export default function Login() {
  return (
    <section className='auth-section'>
      <div className='auth-container'>
        <h1 className='auth-header'>LOGIN</h1>

        {/* Form for inputting the Username and Password */}
        <form id='auth-form' action='/auth' method='POST'>
          {/* Username Input */}
          <div className='input-container'>
            <h2>Username</h2>
            <div className='input-wrapper'>
              <label htmlFor="username" className='visually-hidden'>Username</label>
              <input className='input-field' type="text" id="username" name="username" placeholder='Type Your Username' required/>

              <svg
                aria-hidden
                viewBox="0 0 448 512"
                fill="currentColor"
                className='input-icon'
              >
                <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32 0-97.2-78.8-176-176-176zM48.99 464c7.9-63.1 61.81-112 127.01-112h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128S294.69 0 224 0 96 57.31 96 128c0 70.7 57.3 128 128 128zm0-208c44.11 0 80 35.89 80 80s-35.89 80-80 80-80-35.9-80-80c0-44.11 35.9-80 80-80z" />
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div className='input-container'>
            <h2>Password</h2>
            <div className='input-wrapper'>
              <label htmlFor="password" className='visually-hidden'>Password</label>
              <input className='input-field' type="password" id="password" name="password" placeholder='Type Your Password' required/>

              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="currentColor"
                className='input-icon'
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M18 8h2a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1h2V7a6 6 0 1112 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 10-8 0v1h8z" />
              </svg>
            </div>
          </div>
          <button className='auth-btn' aria-label='auth' type="submit">Login</button>
        </form>
        
        {/* Additional actions including: Forgot Password Link and Register Button */}
        <div className="additional-actions">
          <Link href="/forgot-password" aria-label='Forgot Password' className='auth-link'>Forgot Password?</Link>
          <Link href="/register" aria-label='Register' className="other-btn">Register</Link>
        </div>
      </div>
    </section>
  )  
}