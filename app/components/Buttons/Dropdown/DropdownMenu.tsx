import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group'
import { DropdownItem } from '@/app/utility/types';
import './DropdownMenu.css'

interface DropdownMenuProps  {
  items: DropdownItem[];
  menuToggle: boolean;
  orientation: string;
  showPointer: boolean;
}

const MenuCard = ({items}: {items: DropdownItem[]}) => {
  return (
    <>
      {items.map((item, index) => (
        item.type === 'component'
        ? item.component
        : item.type === 'button' || item.type === 'link' 
          ? <Link key={index} href={`/${item.name.split(/[ ,]+/).join('').toLowerCase()}`} aria-label={`${item.name}`} className={`${item.type === 'button' ? 'dropdown-btn' : 'dropdown-link'}`}>
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

  useEffect(() => {
    if (orientation === 'mega') {
      setTimeoutDuration(300)
    } else {
      setTimeoutDuration(200)
    }
  }, [])

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
          '--z-index': menuToggle === true ? '0' : '-1',
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
        }
      </CSSTransition>
    </>
  )
}

export default DropdownMenu