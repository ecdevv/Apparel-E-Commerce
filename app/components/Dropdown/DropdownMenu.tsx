import React from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group'
import './DropdownMenu.css'
import { CartItemList } from '../Cart/Cart';

interface Item {
  svg?: React.ReactElement;
  name: string;
  type: 'section' | 'cart' | 'button' | 'link' | 'text';
}

interface DropdownMenuProps  {
  items: Item[];
  menuToggle: boolean;
  translate: string;
  showPointer: boolean;
}

const DropdownMenu = ({items, menuToggle, translate, showPointer} : DropdownMenuProps) => {
  return (
    <>
      {/* Dropdown Menu ----- Get's transitioned whenever the menuToggle variable changes/toggled */}
      <CSSTransition
        in={menuToggle}
        timeout={100}
        classNames='menu'
        unmountOnExit
      >
        <div className='dropdown-menu-wrapper'>
          {showPointer ? <div className='dropdown-menu-pointer'></div> : null}
          <div aria-label='Dropdown Menu' className='dropdown-menu' style={{
            '--translate': translate === 'left' ? '-50%' : translate === 'center' ? '-50%' : '0%',
            '--left': translate === 'left' ? '0%' : translate === 'center' ? '50%' : '0%',
            } as React.CSSProperties}
          >
            {items.map((item, index) => (
              item.type === 'button' || item.type === 'link' 
                ? <Link key={index} href={`/${item.name.split(/[ ,]+/).join('').toLowerCase()}`} aria-label={`${item.name}`} className={`${item.type === 'button' ? 'dropdown-btn' : 'dropdown-link'}`}>
                    {item.svg && item.svg}
                    {`${item.name}`}
                  </Link>
                : item.type === 'text' 
                  ? <h2 className='dropdown-other'>{item.name}</h2>
                  : <CartItemList />
            ))}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default DropdownMenu