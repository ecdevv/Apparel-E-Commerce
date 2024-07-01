'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Dropdown from './DropdownMenu'
import { DropdownItem } from '@/app/utility/types'
import { useDropdownContext } from '@/app/utility/contexts/DropdownContext'
import './Dropdown.css'

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
  const { globalMenuToggle, setGlobalMenuToggle } = useDropdownContext();
  const [isTransitioning, setIsTransitioning] = useState(false);
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
    if (!isTransitioning) {setMenuToggle(true); setGlobalMenuToggle(true);}
  }

  const onUnhover = () => {
    setMenuToggle(false);
    setGlobalMenuToggle(false);
  }

  const onHoverLinkOnly = () => {
    setMenuToggle(true);
    setGlobalMenuToggle(true);
  }

  // Handle toggling the menu on icon clicked
  const handleClick = () => {
    setMenuToggle(!menuToggle);
  }

  const setTransitionState = (value : boolean) => {
    setIsTransitioning(value);
  }

  return (
    <span ref={menuRef} onMouseEnter={hover ? onHover : undefined} onMouseLeave={hover ? onUnhover : undefined}>
      {hover 
      ? <>
          <Link href = {`/${label?.toLowerCase()}`} aria-label={`${label}`}
            onMouseEnter={onHoverLinkOnly}
            className={`${menuToggle && globalMenuToggle
            ? classNames[1] ? classNames[1] : classNames[0] 
            : classNames[0]}`}
          >
            {children}
          </Link> 
          <Dropdown items={items} globalMenuToggle={globalMenuToggle} menuToggle={menuToggle} setTransitionState={setTransitionState} orientation={orientation} showPointer={showPointer}/>
        </>
      : <>
          <button onClick={handleClick} aria-label={`${label}`}
            className={`${menuToggle
            ? classNames[1] ? classNames[1] : classNames[0] 
            : classNames[0]}`}
          >
            {children}
            <svg 
              aria-hidden
              fill="currentColor" 
              viewBox="0 0 24 24" 
              height="1em" 
              width="1em"
              className={`${menuToggle ? 'dropdown-chevron-rotated' : 'dropdown-chevron'}`}
            >
              <path d="M6.343 7.757L4.93 9.172 12 16.242l7.071-7.07-1.414-1.415L12 13.414 6.343 7.757z" />
            </svg>
          </button>
          <Dropdown items={items} menuToggle={menuToggle} setTransitionState={setTransitionState} orientation={orientation} showPointer={showPointer}/>
        </>
      }
    </span>
  )
}

export default DropdownButton