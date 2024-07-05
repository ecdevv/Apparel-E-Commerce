'use client'
import React, { useState } from 'react';
import './MultiLevelMenu.css';

interface MenuItem {
  label: string;
  subMenu?: MenuItem[];
}

interface MenuStackItem {
  items: MenuItem[];
  parentLabel: string | null;
}

interface MultiLevelMenuProps {
  menuItems: MenuItem[];
  className: string;
  backClassName: string;
}


const MultiLevelMenu = ({ menuItems, className, backClassName }: MultiLevelMenuProps) => {
  const [menuStack, setMenuStack] = useState<MenuStackItem[]>([
    { items: menuItems, parentLabel: null }
  ]);
  const currentMenu = menuStack[menuStack.length - 1];
  const isLastSubMenu = currentMenu.items.every(item => !item.subMenu || item.subMenu.length === 0);

  const handleMenuClick = (item: MenuItem) => {
    if (item.subMenu) {
      setMenuStack((prevStack) => [...prevStack, { items: item.subMenu!, parentLabel: item.label }]);
    }
  };

  const handleBackClick = () => {
    setMenuStack((prevStack) => prevStack.slice(0, -1));
  };

  return (
    <>
      {menuStack.length > 1 && (
        <button className={`${backClassName}`} aria-label='Back' onClick={handleBackClick}>
          <svg 
            aria-hidden
            fill="currentColor" 
            viewBox="0 0 24 24" 
            height="1rem" 
            width="1rem"
          >
            <path d="M16.243 6.343L14.828 4.93 7.758 12l7.07 7.071 1.415-1.414L10.586 12l5.657-5.657z" />
          </svg>
          Back
        </button>
      )}
      <ul className={`${className}`}>
        {menuStack.length > 1 && <h2>{menuStack[menuStack.length - 1].parentLabel}</h2> }
        {currentMenu.items.map((item) => (
          <li key={item.label}>
            <button className={`multi-button ${isLastSubMenu ? 'multi-sub' : ''}`} aria-label='Open Submenu' onClick={() => handleMenuClick(item)}>
              {item.label}
              {item.subMenu && 
                <svg 
                  aria-hidden
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  height="1rem" 
                  width="1rem"
                >
                  <path d="M10.586 6.343L12 4.93 19.071 12 12 19.071l-1.414-1.414L16.243 12l-5.657-5.657z" />
                </svg>
              }
            </button>
          </li>
        ))}
      </ul>
    </>
  )
  
};

export default MultiLevelMenu;