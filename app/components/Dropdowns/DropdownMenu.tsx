'use client'
import React from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group'
import './Dropdown.css'

interface Item {
  name: string;
  type: 'button' | 'other';
}

interface dropdownProps  {
  Items: Item[];
  menuToggle: boolean;
  orientation: string;
}

const DropdownMenu = ({Items, menuToggle, orientation} : dropdownProps) => {
  return (
    <>
      {/* Dropdown Menu ----- Get's transitioned whenever the menuToggle variable changes/toggled */}
      <CSSTransition
        in={menuToggle}
        timeout={100}
        classNames='menu'
        unmountOnExit
      >
        <div className='dropdown-menu-container'>
          <div className='dropdown-menu-pointer'></div>
          <ul aria-label='Dropdown Menu' className='dropdown-menu' style={{'--orientation': orientation === 'right' ? '-50%' : '0%'} as React.CSSProperties}>
            {Items.map((item, index) => (
              <li key={index}><Link  href={`/${item.name.split(/[ ,]+/).join('').toLowerCase()}`} aria-label={`${item.name}`} className={`${item.type === 'button' ? 'dropdown-menu-btn' : null}`}>{`${item.name}`}</Link></li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </>
  )
}

export default DropdownMenu