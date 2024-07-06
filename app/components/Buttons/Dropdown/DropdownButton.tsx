'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Dropdown from './DropdownMenu'
import { DropdownItem } from '@/app/utility/types'
import { useMenuContext } from '@/app/utility/contexts/MenuContext'
import './Dropdown.css'

interface DropdownButtonProps  {
  children?: React.ReactNode;
  forceOpen?: boolean;
  forceRef?: React.RefObject<HTMLButtonElement>;
  label?: string;
  items: DropdownItem[];
  hover: boolean;
  orientation: string;
  showPointer: boolean;
  classNames: string[];
}

// Navigation section with the links of this navbar component (globalMenu used to toggle all menus forcefully by other means)
const DropdownButton = ({children, forceOpen, forceRef, label, items, hover, orientation, showPointer, classNames} : DropdownButtonProps) => {
  const { globalMenuToggle, setGlobalMenuToggle } = useMenuContext();
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

  // If the forceOpen value changes, open the menu
  useEffect(() => {
    if (forceOpen) {setMenuToggle(true);}
  }, [forceOpen])

  // Force close the menu if the globalMenuToggle gets set to false from elsewhere
  useEffect(() => {
    if (globalMenuToggle === false) {setMenuToggle(false);}
  }, [globalMenuToggle])

  // Set transition state from the DropdownMenu based on the animation's duration/unmounting
  const setTransitionState = (value : boolean) => {
    setIsTransitioning(value);
  }

  // Handle toggling the menu on hover (can only be triggered when not transitioning to prevent repetitive toggles; globalMenuToggle needs to be set true to be set false from elsewhere)
  const onHover = () => {
    if (!isTransitioning) {setMenuToggle(true); setGlobalMenuToggle(true);}
  }

  // Handle toggling the menu on unhover
  const onUnhover = () => {
    setMenuToggle(false);
  }

  // Handle toggling the menu on icon clicked (globalMenuToggle always true until set false from elsewhere)
  const handleClick = () => {
    setMenuToggle(!menuToggle);
    setGlobalMenuToggle(true);
  }

  return (
    <>
      {hover 
      ? <div ref={menuRef} onMouseEnter={hover ? onHover : undefined} onMouseLeave={hover ? onUnhover : undefined} className='dropdown-display hover'>
          <Link href = {`/${label?.toLowerCase()}`} aria-label={`${label}`}
            className={`${menuToggle
            ? classNames[1] ? classNames[1] : classNames[0] 
            : classNames[0]}`}
          >
            {children}
          </Link> 
          <Dropdown items={items} menuToggle={menuToggle} orientation={orientation} showPointer={showPointer} setTransitionState={setTransitionState} />
        </div>
      : <div ref={menuRef} onMouseEnter={hover ? onHover : undefined} onMouseLeave={hover ? onUnhover : undefined} className='dropdown-display nohover'>
          <button onClick={handleClick} aria-label={`${label}`}
            className={`${menuToggle
            ? classNames[1] ? classNames[1] : classNames[0] 
            : classNames[0]}`}
          >
            {children}
          </button>
          <Dropdown items={items} menuToggle={menuToggle} orientation={orientation} showPointer={showPointer} setTransitionState={setTransitionState} />
        </div>
      }
    </>
  )
}

export default DropdownButton