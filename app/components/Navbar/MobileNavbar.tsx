'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import MultiLevelMenu from '../Buttons/MultiLevelMenu/MultiLevelMenu';
import './MobileNavbar.css';

const menuItems = [
  {
    label: 'New Arrivals',
    subMenu: [
      {
        label: 'Men',
        subMenu: [
          { label: 'Clothing' },
          { label: 'Shoes' },
        ],
      },
      {
        label: 'Women',
        subMenu: [
          { label: 'Clothing' },
          { label: 'Shoes' },
        ],
      },
    ],
  },
  {
    label: 'Sales',
    subMenu: [
      {
        label: 'Men',
        subMenu: [
          { label: 'Clothing' },
          { label: 'Shoes' },
        ],
      },
      {
        label: 'Women',
        subMenu: [
          { label: 'Clothing' },
          { label: 'Shoes' },
        ],
      },
    ],
  },
  {
    label: 'Men',
    subMenu: [
      { label: 'Clothing' },
      { label: 'Shoes' },
    ],
  },
  {
    label: 'Women',
    subMenu: [
      { label: 'Clothing' },
      { label: 'Shoes' },
    ],
  },
  {
    label: 'Collections',
    subMenu: [
      {
        label: 'Men',
        subMenu: [
          { label: 'Clothing' },
          { label: 'Shoes' },
        ],
      },
      {
        label: 'Women',
        subMenu: [
          { label: 'Clothing' },
          { label: 'Shoes' },
        ],
      },
    ],
  },
];

const MobileNavigation = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Function to handle clicks outside the element (mousedown)
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && buttonRef.current && (!menuRef.current.contains(e.target as Node) && !buttonRef.current.contains(e.target as Node))) {  // If the mouse click is not in the DropdownButton, close the menu
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

  // useEffect(() => {
  //   if (menuToggle) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, [menuToggle]);

  const handleClick = () => {
    setMenuToggle(!menuToggle);
  }

  return (
    <>
      <button ref={buttonRef} onClick={handleClick} aria-label='Open Navigation Menu' className='navbar-hamburger-container'>
        {menuToggle 
          ? <svg
              aria-hidden
              viewBox="0 0 25 25" 
              fill="currentColor"
              stroke="currentColor" 
              width={30}
              height={30}
            > 
              <path d="M18 7L7 18M7 7L18 18" strokeWidth="1.2" />
            </svg>
          : <svg
              aria-hidden
              viewBox="0 0 64 64"
              fill="none"
              strokeWidth="3" stroke="currentColor"
              className='navbar-hamburger' 
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <line x1="7.68" y1="32" x2="56.32" y2="32"></line>
                <line x1="7.68" y1="15.97" x2="56.32" y2="15.97"></line>
                <line x1="7.68" y1="48.03" x2="56.32" y2="48.03"></line>
              </g>
            </svg>
        }
      </button>

      <CSSTransition
        in={menuToggle}
        timeout={300}
        classNames="mobile"
        unmountOnExit
      >
        <section ref={menuRef} className='nav-mobile-menu-container'>
          <MultiLevelMenu menuItems={menuItems} className='nav-mobile-menu' backClassName='nav-mobile-menu-back'/>
          <ul className='nav-user-menu'>
            <li><Link href='/login'>Sign-In</Link></li>
            <li><Link href='/'>Wishlist</Link></li>
            <li><Link href='/'>Bag</Link></li>
            <li><Link href='/'>Contact</Link></li>
          </ul>
        </section>
      </CSSTransition>
    </>
  )
}

export default MobileNavigation
