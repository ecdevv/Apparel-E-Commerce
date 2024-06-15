import React from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group'
import './DropdownMenu.css'

interface Item {
  name: string;
  type: 'button' | 'other';
}

interface DropdownMenuProps  {
  Items: Item[];
  menuToggle: boolean;
  translate: string;
  showPointer: boolean;
}

const DropdownMenu = ({Items, menuToggle, translate, showPointer} : DropdownMenuProps) => {
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
          <ul aria-label='Dropdown Menu' className='dropdown-menu' style={{
            '--translate': translate === 'left' ? '-50%' : translate === 'center' ? '-50%' : '0%',
            '--left': translate === 'left' ? '0%' : translate === 'center' ? '50%' : '0%',
            } as React.CSSProperties}
          >
            {Items.map((item, index) => (
              <li key={index}><Link  href={`/${item.name.split(/[ ,]+/).join('').toLowerCase()}`} aria-label={`${item.name}`} className={`${item.type === 'button' ? 'dropdown-menu-btn' : 'dropdown-menu-other'}`}>{`${item.name}`}</Link></li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </>
  )
}

export default DropdownMenu