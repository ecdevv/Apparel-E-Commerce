import React from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group'
import './dropdown.css'

interface Item {
  name: string;
  type: 'button' | 'other';
}

interface dropdownProps  {
  Items: Item[];
  menuToggle: boolean;
}

const dropdown = ({Items, menuToggle} : dropdownProps) => {
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
          <ul className='dropdown-menu' aria-label='Dropdown Menu'>
            {Items.map((item, index) => (
              <li key={index}><Link  href={`/${item.name.split(/[ ,]+/).join('').toLowerCase()}`} aria-label={`${item.name}`} className={`${item.type === 'button' ? 'dropdown-menu-btn' : null}`}>{`${item.name}`}</Link></li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </>
  )
}

export default dropdown