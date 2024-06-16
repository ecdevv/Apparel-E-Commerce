import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group'
import { CartItemList } from '../Cart/Cart';
import './DropdownMenu.css'

interface Item {
  svg?: React.ReactElement;
  name: string;
  type: 'section' | 'cart' | 'button' | 'link' | 'text';
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
        item.type === 'section'
        ? <></>
        : item.type === 'cart'
          ? <CartItemList key={index}/>
          : item.type === 'button' || item.type === 'link' 
            ? <Link key={index} href={`/${item.name.split(/[ ,]+/).join('').toLowerCase()}`} aria-label={`${item.name}`} className={`${item.type === 'button' ? 'dropdown-btn' : 'dropdown-link'}`}>
                {item.svg && item.svg}
                {`${item.name}`}
              </Link>
            : item.type === 'text' 
              ? <h2 key={index} className='dropdown-other'>{item.name}</h2>
              : <></>
      ))}
    </>
  )
}

const DropdownMenu = ({items, menuToggle, orientation, showPointer} : DropdownMenuProps) => {
  const [menuFixed, setMenuFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        if (menuToggle) {
          const navbar = document.querySelector('.navbar');
          if (navbar) {
            const navbarRect = navbar.getBoundingClientRect();
            const isFixed = window.scrollY > navbarRect.bottom;
            console.log(navbarRect)
            setMenuFixed(isFixed);
          }
        }
        else {
          setMenuFixed(false)
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuToggle]);

  return (
    <>
      {/* Dropdown Menu ----- Get's transitioned whenever the menuToggle variable changes/toggled */}
      <CSSTransition
        in={menuToggle}
        timeout={100}
        classNames='menu'
        unmountOnExit
      >
        {orientation !== 'screen'
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
        : <div className={`${menuFixed ? 'dropdown-mega-menu-fixed' : 'dropdown-mega-menu'}`}>
            <MenuCard items={items} />
          </div>
        }
      </CSSTransition>
    </>
  )
}

export default DropdownMenu