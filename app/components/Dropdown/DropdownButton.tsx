'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Dropdown from './DropdownMenu'

interface Item {
  svg?: React.ReactElement;
  name: string;
  type: 'section' | 'cart' | 'button' | 'link' | 'text';
}

interface DropdownButtonProps  {
  children?: React.ReactNode;
  link?: string;
  items: Item[];
  hover: boolean;
  orientation: string;
  showPointer: boolean;
  classNames: string[];
}

// Navigation section with the links of this navbar component
const DropdownButton = ({children, link, items, hover, orientation, showPointer, classNames} : DropdownButtonProps) => {
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

  const onHover = () => {
    setMenuToggle(true)
  }

  const onUnhover = () => {
    setMenuToggle(false)
  }

  return (
    <div ref={menuRef} className='dropdown' onMouseEnter={hover ? onHover : undefined} onMouseLeave={hover ? onUnhover : undefined}>
      {hover 
      ? <Link href = {`${link?.toLowerCase()}`} aria-label={`${link}`}
          className={`${menuToggle 
          ? classNames[1] ? classNames[1] : classNames[0] 
          : classNames[0]}`}
        >
          {children}
      </Link> 
      : <button onClick={handleClick} aria-label={`${link}`}
          className={`${menuToggle 
          ? classNames[1] ? classNames[1] : classNames[0] 
          : classNames[0]}`}
        >
          {children}
        </button>
      }
      
      <Dropdown items={items} menuToggle={menuToggle} translate={orientation} showPointer={showPointer}/>
    </div>
  )
}

export default DropdownButton