'use client'
import React, { useEffect, useRef, useState } from 'react';
import { CustomLink } from '../Buttons/General/General';
import { CSSTransition } from 'react-transition-group';
import MultiLevelMenu from '../Buttons/MultiLevelMenu/MultiLevelMenu';
import { useMenuContext } from '@/app/utility/contexts/MenuContext';
import './MobileNavbar.css';

const menuItems = [
  {
    label: 'New',
    href: '/store?category=new',
    subMenu: [
      {
        label: 'Limited Exclusives',
        href: '/store?category=limited-exclusives',
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
            productID: 6,
          },
          { label: 'Luxe Neptune',
            productID: 5,
          },
        ],
      },
      {
        label: 'Best Sellers',
        href: '/store?category=trending',
        subMenu: [
          { label: 'Atelier x Luxe Limited Edition Jacket',
            productID: 1,
          },
          { label: 'Luxe Mercury',
            productID: 2,
          },
          { label: 'Luxe Neptune',
            productID: 5,
          },
          { label: 'Atelier x Luxe Denim Jeans',
            productID: -1,
          },
          { label: 'Atelier x Luxe Joggers',
            productID: -1,
          },
          { label: 'Luxe Jupiter',
            productID: 3,
          },
          { label: 'Luxe Saturn',
            productID: 6,
          },
        ],
      },
      {
        label: 'Collections',
        href: '/',
        subMenu: [
          { label: 'Atelier x Luxe Collection' },
          { label: 'Summer Breeze Collection' },
          { label: 'Urban Edge Collection' },
        ],
      },
      {
        label: 'Men',
        href: '/store?category=men',
        subMenu: [
          { label: 'Apparel', href: '/store?category=new+men+apparel' },
          { label: 'Shoes', href: '/store?category=new+men+shoes' },
          { label: 'Accessories', href: '/store?category=new+men+accessories' },
        ],
      },
      {
        label: 'Women',
        href: '/store?category=women',
        subMenu: [
          { label: 'Apparel', href: '/store?category=new+women+apparel' },
          { label: 'Shoes', href: '/store?category=new+women+shoes' },
          { label: 'Accessories', href: '/store?category=new+women+accessories' },
        ],
      },
    ],
  },
  {
    label: 'Sales',
    href: '/store?category=sales',
    subMenu: [
      {
        label: 'Collections',
        href: '/',
        subMenu: [
          { label: 'Office Elegance Collection' },
          { label: 'Spring Blossom Collection' },
          { label: 'Holiday Collection' },
        ],
      },
      {
        label: 'Men',
        href: '/store?category=men',
        subMenu: [
          { label: 'Apparel', href: '/store?category=sales+men+apparel' },
          { label: 'Shoes', href: '/store?category=sales+men+shoes' },
          { label: 'Accessories', href: '/store?category=sales+men+accessories' },
        ],
      },
      {
        label: 'Women',
        href: '/store?category=women',
        subMenu: [
          { label: 'Apparel', href: '/store?category=sales+women+apparel' },
          { label: 'Shoes', href: '/store?category=sales+women+shoes' },
          { label: 'Accessories', href: '/store?category=sales+women+accessories' },
        ],
      },
    ],
  },
  {
    label: 'Men',
    href: '/store?category=men',
    subMenu: [
      { label: 'Apparel', href: '/store?category=men+apparel' },
      { label: 'Shoes', href: '/store?category=men+shoes' },
      { label: 'Accessories', href: '/store?category=men+accessories' },
    ],
  },
  {
    label: 'Women',
    href: '/store?category=women',
    subMenu: [
      { label: 'Apparel', href: '/store?category=women+apparel' },
      { label: 'Shoes', href: '/store?category=women+shoes' },
      { label: 'Accessories', href: '/store?category=women+accessories' },
    ],
  },
  {
    label: 'Collections',
    href: '/',
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
    setMenuToggle(prev => !prev)
    setGlobalMenuToggle(true);
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

      <div className={`dimmer ${menuToggle ? 'toggled' : ''}`}></div>
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
            <li>
              <CustomLink href='/login' className='mobile-nav-custom-link'>
                <svg
                  aria-hidden
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className='mobile-nav-svg-icon'
                >
                  <path d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z"/>
                  <path d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"/>
                </svg>
                Sign-In
              </CustomLink>
            </li>
            <li>
              <CustomLink href='/wishlist' className='mobile-nav-custom-link'>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className='mobile-nav-svg-icon'
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
                Wishlist
              </CustomLink>
            </li>
            <li>
              <CustomLink href='/cart' className='mobile-nav-custom-link'>
                <svg
                  aria-hidden
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className='mobile-nav-svg-icon'
                >
                  <path d="M 16 3 C 13.253906 3 11 5.253906 11 8 L 11 9 L 6.0625 9 L 6 9.9375 L 5 27.9375 L 4.9375 29 L 27.0625 29 L 27 27.9375 L 26 9.9375 L 25.9375 9 L 21 9 L 21 8 C 21 5.253906 18.746094 3 16 3 Z M 16 5 C 17.65625 5 19 6.34375 19 8 L 19 9 L 13 9 L 13 8 C 13 6.34375 14.34375 5 16 5 Z M 7.9375 11 L 11 11 L 11 14 L 13 14 L 13 11 L 19 11 L 19 14 L 21 14 L 21 11 L 24.0625 11 L 24.9375 27 L 7.0625 27 Z"/>
                </svg>
                Bag
              </CustomLink>
            </li>
            <li>
              <CustomLink href='/' className='mobile-nav-custom-link'>
                <svg 
                  aria-hidden
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke='currentColor' 
                  className='mobile-nav-svg-icon'
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M12 18H12.01M9.2 21H14.8C15.9201 21 16.4802 21 16.908 20.782C17.2843 20.5903 17.5903 20.2843 17.782 19.908C18 19.4802 18 18.9201 18 17.8V6.2C18 5.0799 18 4.51984 17.782 4.09202C17.5903 3.71569 17.2843 3.40973 16.908 3.21799C16.4802 3 15.9201 3 14.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V17.8C6 18.9201 6 19.4802 6.21799 19.908C6.40973 20.2843 6.71569 20.5903 7.09202 20.782C7.51984 21 8.07989 21 9.2 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </g>
                </svg>
                Contact
              </CustomLink>
            </li>
            <li>
              <CustomLink href='https://github.com/ecdevv/Apparel-E-Commerce/tree/main' ariaLabel='Github' target='_blank' className='mobile-nav-custom-link'>
                <svg 
                  aria-hidden
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 98 96" 
                  fill="currentColor" 
                  className='mobile-nav-svg-icon'
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"></path>
                </svg>
                  Github
              </CustomLink>
            </li>
          </ul>
        </section>
      </CSSTransition>
    </>
  )
}

export default MobileNavigation
