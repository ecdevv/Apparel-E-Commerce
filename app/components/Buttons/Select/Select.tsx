'use client'
import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import './Select.css'

enum SortCriteria {
  PRICE_ASC,
  PRICE_DESC,
  NEW_ARRIVALS,
  BEST_SELLERS
}
interface SelectProps {
  children?: React.ReactNode;
  value?: string | number;
  onChange: (value: string | number | SortCriteria) => void;
}

const Select = ({ children, value, onChange }: SelectProps) => {
  const [menuToggle, setMenuToggle] = useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  // If value is an integer number, it is an index in the children array
  const selectedLabel = React.Children.toArray(children).find((child) =>
    React.isValidElement(child) && (child as React.ReactElement).props.value === value
  ) as React.ReactElement | undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuToggle && !menuRef.current?.contains(event.target as Node)) {
        setMenuToggle(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuToggle, menuRef])

  const handleClick = () => {
    setMenuToggle(prev => !prev)
  }

  const handleOptionClick = (value: SortCriteria) => {
    setMenuToggle(false)
    onChange && onChange(value)
  }

  return (
    <div ref={menuRef} className='select-menu'>
      <button onClick={handleClick} className='select-btn'>
        <span>{typeof value === 'number' ? selectedLabel?.props.children : value}</span>
        <svg 
          aria-hidden
          fill="currentColor" 
          viewBox="0 0 24 24" 
          className={`select-chevron ${menuToggle ? 'rotated' : ''}`}
        >
          <path d="M6.343 7.757L4.93 9.172 12 16.242l7.071-7.07-1.414-1.415L12 13.414 6.343 7.757z" />
        </svg>
      </button>
      <CSSTransition 
        in={menuToggle} 
        timeout={200} 
        classNames="options-menu"
        unmountOnExit
      >
        <ul className="options">
          {React.Children.map(children, (child, index) => (
            <li key={index} onClick={() => handleOptionClick((child as React.ReactElement).props.value as SortCriteria)} className="option">
              {child}
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  )
}

export default Select
