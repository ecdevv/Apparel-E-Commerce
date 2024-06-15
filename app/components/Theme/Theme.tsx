'use client'
import React, { useEffect, useState } from "react";
import './Theme.css'

const Theme = () => {
  const [theme, setTheme] = useState('light')

  // Set's the theme based on saved 'theme' setting based on user's preference on component mount
  useEffect(() => {
    const storageTheme = localStorage.getItem('theme')
    
    if (storageTheme) {
      setTheme(storageTheme);
      document.body.classList.remove('light', 'dark')
      document.body.classList.add(storageTheme)
    }
    else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.body.classList.remove('light', 'dark')
      document.body.classList.add('light')
    }
  }, [])

  // Change the theme on click (light or dark)
  const handleClick = () => {
    const storageTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(storageTheme);
    localStorage.setItem('theme', storageTheme);

    document.body.classList.remove('light', 'dark')
    document.body.classList.add(storageTheme)
  }

  return (
    <button onClick = {handleClick} aria-label = "Change Theme">
      <svg
        aria-hidden
        fill="currentColor"
        viewBox="0 0 16 16"
        className='theme-icon'
      >
        <path d="M8 12a4 4 0 100-8 4 4 0 000 8zM8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2A.5.5 0 013 8zm10.657-5.657a.5.5 0 010 .707l-1.414 1.415a.5.5 0 11-.707-.708l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L3.05 13.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM4.464 4.465a.5.5 0 01-.707 0L2.343 3.05a.5.5 0 11.707-.707l1.414 1.414a.5.5 0 010 .708z" />
      </svg>
    </button>
  )
}

export default Theme;