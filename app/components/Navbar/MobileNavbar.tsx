'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CustomLink } from '../Buttons/Links/Links';
import { CSSTransition } from 'react-transition-group';
import MultiLevelMenu from '../Buttons/MultiLevelMenu/MultiLevelMenu';
import { useMenuContext } from '@/app/utility/contexts/MenuContext';
import './MobileNavbar.css';

const menuItems = [
  {
    label: 'New',
    subMenu: [
      {
        label: 'Limited Exclusives',
        subMenu: [
          { label: 'Atelier x Luxe Limited Edition Jacket',
            productID: 1,
          },
          { label: 'Luxe Mercury',
            productID: 2,
          },
          { label: 'Luxe Jupiter',
            productID: 3,
          },
          { label: 'Luxe Saturn',
            productID: 4,
          },
          { label: 'Luxe Neptune',
            productID: 5,
          },
        ],
      },
      {
        label: 'Best Sellers',
        subMenu: [
          { label: 'Atelier x Luxe Limited Edition Jacket',
            productID: 1,
          },
        ],
      },
      {
        label: 'Collections',
        subMenu: [
          { label: 'Atelier x Luxe Collection' },
          { label: 'Summer Breeze Collection' },
          { label: 'Urban Edge Collection' },
        ],
      },
      {
        label: 'Men',
        subMenu: [
          { label: 'Apparel' },
          { label: 'Shoes' },
          { label: 'Accessories' },
        ],
      },
      {
        label: 'Women',
        subMenu: [
          { label: 'Apparel' },
          { label: 'Shoes' },
          { label: 'Accessories' },
        ],
      },
    ],
  },
  {
    label: 'Sales',
    subMenu: [
      {
        label: 'Collections',
        subMenu: [
          { label: 'Office Elegance Collection' },
          { label: 'Spring Blossom Collection' },
          { label: 'Holiday Collection' },
        ],
      },
      {
        label: 'Men',
        subMenu: [
          { label: 'Apparel' },
          { label: 'Shoes' },
          { label: 'Accessories' },
        ],
      },
      {
        label: 'Women',
        subMenu: [
          { label: 'Apparel' },
          { label: 'Shoes' },
          { label: 'Accessories' },
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
      { label: 'Atelier x Luxe Collection' },
      { label: 'Summer Breeze Collection' },
      { label: 'Urban Edge Collection' },
      { label: 'Vox Luxe Collection' },
      { label: 'Royal Elegance Collection' },
      { label: 'Haute Couture Collection' },
      { label: 'Opulent Oasis Collection' },
      { label: 'Office Elegance Collection' },
      { label: 'Spring Blossom Collection' },
      { label: 'Holiday Collection' },
    ],
  },
];

// Using globalMenuToggle to be able to close the menu from outside of this component
const MobileNavigation = () => {
  const { globalMenuToggle, setGlobalMenuToggle } = useMenuContext();
  const [multiMenuHeight, setMultiMenuHeight] = useState(0);
  const [menuToggle, setMenuToggle] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Function to handle clicks outside the element (mousedown)
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && buttonRef.current && (!menuRef.current.contains(e.target as Node) && !buttonRef.current.contains(e.target as Node))) {  // If the mouse click is not in the menu, close the menu
        setMenuToggle(false);
        setGlobalMenuToggle(false);
      }
    };
    
    // Add event listener to detect clicks outside the element
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle the menu to close if the globalMenuToggle gets set to false from elsewhere
  useEffect(() => {
    if (globalMenuToggle === false) {
      setMenuToggle(false);
    }
  }, [globalMenuToggle])

  // If the menu is open, disable scrolling
  useEffect(() => {
    if (menuToggle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuToggle]);

  // Handle toggling the menu on icon clicked (globalMenuToggle needs to be toggled to be set false from elsewhere)
  const handleClick = () => {
    setMenuToggle(!menuToggle);
    setGlobalMenuToggle(!menuToggle);
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
            <div className='multi-menu-wrapper' style={{'--height': `${multiMenuHeight}px`} as React.CSSProperties}>
              <MultiLevelMenu menuItems={menuItems} className='multi-menu' backClassName='multi-menu-back-btn' setMultiMenuHeight={setMultiMenuHeight} />
            </div>
            <ul className='user-menu'>
              <li><CustomLink href='/login'>Sign-In</CustomLink></li>
              <li><CustomLink href='/'>Wishlist</CustomLink></li>
              <li><CustomLink href='/cart'>Bag</CustomLink></li>
              <li><CustomLink href='/'>Contact</CustomLink></li>
            </ul>
          </section>
        </CSSTransition>
    </>
  )
}

export default MobileNavigation
