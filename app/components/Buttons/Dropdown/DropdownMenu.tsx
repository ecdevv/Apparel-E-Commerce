import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group'
import { DropdownItem } from '@/app/utility/types';

interface DropdownMenuProps  {
  items: DropdownItem[];
  menuToggle: boolean;
  orientation: string;
  showPointer: boolean;
  setTransitionState: (value: boolean) => void;
}

const MenuCard = ({items}: {items: DropdownItem[]}) => {
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.type === 'component'
          ? item.component
          : <></>}
        </React.Fragment>
      ))}
    </>
  )
}

const DropdownMenu = ({items, menuToggle, orientation, showPointer, setTransitionState } : DropdownMenuProps) => {
  const [timeoutDuration, setTimeoutDuration] = useState(0);

  // Just a simple useEffect to set the timeoutDuration based on the orientation to my liking
  useEffect(() => {
    if (orientation === 'mega') {
      setTimeoutDuration(300)
    } else {
      setTimeoutDuration(200)
    }

    // Disable eslint rule for missing dependency orientation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* Dropdown Menu ----- Get's transitioned whenever the menuToggle variable changes/toggled */}
      <CSSTransition
        in={menuToggle}
        timeout={timeoutDuration}
        classNames='menu'
        onEnter={() => setTransitionState(false)}
        onExit={() => setTransitionState(true)}
        onExited={() => setTransitionState(false)}
        unmountOnExit
        style={{
          '--duration': `${timeoutDuration}ms`,
          '--keyframe-y-offset': orientation !== 'mega' ? '15px' : '',
          '--z-index': menuToggle === true ? '1' : '0',
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