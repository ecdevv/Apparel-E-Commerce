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

  useEffect(() => {
    console.log(menuToggle, globalMenuToggle)
  }, [menuToggle, globalMenuToggle])

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
              <li><CustomLink href='/wishlist'>Wishlist</CustomLink></li>
              <li><CustomLink href='/cart'>Bag</CustomLink></li>
              <li><CustomLink href='/'>Contact</CustomLink></li>
            </ul>
          </section>
        </CSSTransition>
    </>
  )
}

export default MobileNavigation
