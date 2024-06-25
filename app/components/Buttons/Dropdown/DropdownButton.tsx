'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Dropdown from './DropdownMenu'
import { DropdownItem } from '@/app/utility/types'

interface DropdownButtonProps  {
  children?: React.ReactNode;
  forceRef?: React.RefObject<HTMLButtonElement>;
  label?: string;
  items: DropdownItem[];
  hover: boolean;
  orientation: string;
  showPointer: boolean;
  classNames: string[];
}

// Navigation section with the links of this navbar component
const DropdownButton = ({children, forceRef, label, items, hover, orientation, showPointer, classNames} : DropdownButtonProps) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle clicks outside the element (mousedown)
    const handleClickOutside = (e: MouseEvent) => {
      // If the forceRef element exists
      if (menuRef.current && forceRef && forceRef.current) {
        if (!menuRef.current.contains(e.target as Node) && !forceRef.current.contains(e.target as Node)) {  // If the mouse click is not in the DropdownButton and not in the forceRef element, close the menu
          setMenuToggle(false);
        }                          
      } else if (menuRef.current && !menuRef.current.contains(e.target as Node)) {  // If the mouse click is not in the DropdownButton, close the menu
          setMenuToggle(false);
      }
    };

    // Function to handle clicks outside the element for the forceRef button elements (mouseup)
    const handleClickOutsideMouseUp = (e: MouseEvent) => {
      // If the forceRef element exists
      if (menuRef.current && forceRef && forceRef.current) {          
        if (forceRef.current.contains(e.target as Node)) {
          setMenuToggle(true);                                // If mouse click is on the forceRef element, open the menu              
        }
      }
    };
    
    // Add event listener to detect clicks outside the element
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mouseup', handleClickOutsideMouseUp);
    
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mouseup', handleClickOutsideMouseUp);
    };
  }, []);

  const onHover = () => {
    setMenuToggle(true);
  }

  const onUnhover = () => {
    setMenuToggle(false);
  }

  // Handle toggling the menu on icon clicked
  const handleClick = () => {
    setMenuToggle(!menuToggle);
  }

  return (
    <span ref={menuRef} onMouseEnter={hover ? onHover : undefined} onMouseLeave={hover ? onUnhover : undefined}>
      {hover 
      ? <Link href = {`/${label?.toLowerCase()}`} aria-label={`${label}`}
          className={`${menuToggle 
          ? classNames[1] ? classNames[1] : classNames[0] 
          : classNames[0]}`}
        >
          {children}
        </Link> 
      : <button onClick={handleClick} aria-label={`${label}`}
          className={`${menuToggle 
          ? classNames[1] ? classNames[1] : classNames[0] 
          : classNames[0]}`}
        >
          {children}
        </button>
      }
      
      <Dropdown items={items} menuToggle={menuToggle} orientation={orientation} showPointer={showPointer}/>
    </span>
  )
}

export default DropdownButton