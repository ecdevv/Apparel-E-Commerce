'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
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
  chevron?: boolean;
  classNames: string[];
}

// Navigation section with the links of this navbar component (globalMenu used to toggle all menus forcefully by other means)
const DropdownButton = ({children, forceOpen, forceRef, label, items, hover, orientation, showPointer, chevron = false, classNames} : DropdownButtonProps) => {
  const { globalMenuToggle, setGlobalMenuToggle } = useMenuContext();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    if (forceOpen) {setMenuToggle(true); setGlobalMenuToggle(true);}
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

  // Used on the link/dropdownbutton itself to prevent isTransitioning from preventing the menu from opening when the animation is onExit (exiting)
  const onLinkHover = () => {
    setMenuToggle(true); 
    setGlobalMenuToggle(true);
  }

  // Handle toggling the menu on unhover
  const onUnhover = () => {
    setMenuToggle(false);
  }

  // Handle opening the menu on click and if clicked again, it will link to the specified page; on desktop, hover sets menuToggle true so it will always navigate to the link
  const handleHoverClick = () => {
    if (menuToggle === true) {
      router.push(`/store?category=${label?.toLowerCase()}`);
      setGlobalMenuToggle(false);
    } else {
      setMenuToggle(true);
      setGlobalMenuToggle(true);
    }
  }

  // Handle toggling the menu on icon clicked (globalMenuToggle always true until set false from elsewhere)
  const handleClick = () => {
    setMenuToggle(!menuToggle);
    setGlobalMenuToggle(true);
  }

  // NOTE: Hover and onLinkHover are running during MEdge's touch simulation even though they shouldn't be, which is causing router to push too early when clicking on a different handleHoverClick button
  return (
    <>
      {hover 
      ? <div ref={menuRef} onMouseEnter={hover ? onHover : undefined} onMouseLeave={hover ? onUnhover : undefined} className='dropdown-display hover'>
          <button 
            onClick={handleHoverClick} 
            onMouseEnter={onLinkHover} 
            aria-label={label}
            className={`${menuToggle ? (classNames[1] || classNames[0]) : classNames[0]}`}
          >
            {children}
            {chevron 
              ? <svg 
                  aria-hidden
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  className={`${menuToggle ? 'dropdown-chevron-rotated' : 'dropdown-chevron'}`}
                >
                  <path d="M6.343 7.757L4.93 9.172 12 16.242l7.071-7.07-1.414-1.415L12 13.414 6.343 7.757z" />
                </svg>
              : <></> 
            }
          </button> 
          <Dropdown items={items} menuToggle={menuToggle} orientation={orientation} showPointer={showPointer} setTransitionState={setTransitionState} />
        </div>
      : <div ref={menuRef} onMouseEnter={hover ? onHover : undefined} onMouseLeave={hover ? onUnhover : undefined} className='dropdown-display nohover'>
          <button 
            onClick={handleClick}
            aria-label={label}
            className={`${menuToggle ? (classNames[1] || classNames[0]) : classNames[0]}`}
          >
            {children}
            {chevron 
              ? <svg 
                  aria-hidden
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  className={`${menuToggle ? 'dropdown-chevron-rotated' : 'dropdown-chevron'}`}
                >
                  <path d="M6.343 7.757L4.93 9.172 12 16.242l7.071-7.07-1.414-1.415L12 13.414 6.343 7.757z" />
                </svg>
              : <></> 
            }
          </button>
          <Dropdown items={items} menuToggle={menuToggle} orientation={orientation} showPointer={showPointer} setTransitionState={setTransitionState} />
        </div>
      }
    </>
  )
}

export default DropdownButton