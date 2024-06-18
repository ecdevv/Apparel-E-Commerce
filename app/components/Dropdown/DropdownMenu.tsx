import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group'
import './DropdownMenu.css'

interface Item {
  name: string;
  type: 'component' | 'button' | 'link';
  component?: React.ReactElement;
  svg?: React.ReactElement;
}

interface DropdownMenuProps  {
  items: Item[];
  menuToggle: boolean;
  orientation: string;
  showPointer: boolean;
}

interface MenuCardProps {
  items: Item[];
}

const MenuCard = ({items}: MenuCardProps) => {
  return (
    <>
      {items.map((item, index) => (
        item.type === 'component'
        ? item.component
        : item.type === 'button' || item.type === 'link' 
          ? <Link key={index} href={`/${item.name.split(/[ ,]+/).join('').toLowerCase()}`} aria-label={`${item.name} Link`} className={`${item.type === 'button' ? 'dropdown-btn' : 'dropdown-link'}`}>
              {item.svg && item.svg}
              {`${item.name}`}
            </Link>
          : <></>
      ))}
    </>
  )
}

const DropdownMenu = ({items, menuToggle, orientation, showPointer} : DropdownMenuProps) => {
  const [timeoutDuration, setTimeoutDuration] = useState(0);
  const [menuFixed, setMenuFixed] = useState(false);

  useEffect(() => {
    if (orientation === 'mega') {
      setTimeoutDuration(300)
    } else {
      setTimeoutDuration(200)
    }
  }, [])

  // // Checks to see if Mega Menu is past the navbar when user scrolls, if it is, set it to fixed to the top of the screen right where it starts passing.
  // useEffect(() => {
  //   const handleScroll = () => {
  //       if (menuToggle) {
  //         const navbar = document.querySelector('.navbar');
  //         if (navbar) {
  //           const navbarRect = navbar.getBoundingClientRect();
  //           const isFixed = window.scrollY > (navbarRect.bottom + window.scrollY);
  //           setMenuFixed(isFixed);
  //         }
  //       }
  //       else {
  //         setMenuFixed(false)
  //       }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [menuToggle]);

  return (
    <>
      {/* Dropdown Menu ----- Get's transitioned whenever the menuToggle variable changes/toggled */}
      <CSSTransition
        in={menuToggle}
        timeout={timeoutDuration}
        classNames='menu'
        unmountOnExit
        style={{
          '--duration': `${timeoutDuration}ms`,
          '--keyframe-y-offset': orientation !== 'mega' ? '15px' : '',
        } as React.CSSProperties}
      >
        {orientation !== 'mega'
        ? <div className='dropdown-wrapper'>
            {showPointer ? <div className='dropdown-menu-pointer'></div> : null}
            <div aria-label='Dropdown Menu' className='dropdown-menu' style={{
              '--translate': orientation === 'left' ? '-50%' : orientation === 'center' ? '-50%' : '0%',
              '--left': orientation === 'left' ? '0%' : orientation === 'center' ? '50%' : '0%',
              } as React.CSSProperties}
            >
              <MenuCard items={items} />
            </div>
          </div>
        : <div className='dropdown-mega-menu'>
            <MenuCard items={items} />
          </div>
          
        // : <div className={`${menuFixed ? 'dropdown-mega-menu-fixed' : 'dropdown-mega-menu'}`}>
        //     <MenuCard items={items} />
        //   </div>
        }
      </CSSTransition>
    </>
  )
}

export default DropdownMenu