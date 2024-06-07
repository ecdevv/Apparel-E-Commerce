'use client'
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import './profile.css'

const profile = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle clicks outside the element
    const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setMenuToggle(false);
        }
    };

    // Add event listener to detect clicks outside the element
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event listener on component unmount
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

  // Handle toggling the menu on icon clicked
  const handleClick = () => {
    setMenuToggle(!menuToggle)
  }

  return (
    <div ref={menuRef} className='profile'>
      <button onClick = {handleClick}>
        <svg
          fill="currentColor"
          viewBox="0 0 16 16"
          className='navbar-icon'
        >
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      </button>

      {menuToggle 
        ? <div className='profile-content'>
            <Link onClick={handleClick} href='/login' aria-label='Login' className="profile-content-button">Login</Link>
            <Link onClick={handleClick} href='/register' aria-label='register' className="profile-content-button">Register</Link>
          </div>
        : null
      }
    </div>
  )
}

export default profile