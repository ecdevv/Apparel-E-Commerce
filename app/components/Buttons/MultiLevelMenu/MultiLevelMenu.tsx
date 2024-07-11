'use client'
import React, { useEffect, useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CustomLink } from '../General/General';
import './MultiLevelMenu.css';

interface MenuItem {
  label: string;
  subMenu?: MenuItem[];
  productID?: number;
}

interface MenuStackItem {
  items: MenuItem[];
  parentLabel: string | null;
}

interface MultiLevelMenuProps {
  menuItems: MenuItem[];
  className: string;
  backClassName: string;
  setMultiMenuHeight: (height: number) => void;
}


const MultiLevelMenu = ({ menuItems, className, backClassName, setMultiMenuHeight }: MultiLevelMenuProps) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');
  const [menuStack, setMenuStack] = useState<MenuStackItem[]>([
    { items: menuItems, parentLabel: null }
  ]);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentMenu = menuStack[menuStack.length - 1];
  const isLastSubMenu = currentMenu.items.every(item => !item.subMenu || item.subMenu.length === 0);

  useEffect(() => {
    if (contentRef.current) {
      const updateHeight = () => {
        if (contentRef.current) {
          const { height } = contentRef.current.getBoundingClientRect();
          setMultiMenuHeight(height);
        }
      };

      updateHeight();

      // Update the height on window resize
      window.addEventListener('resize', updateHeight);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', updateHeight);
      };
    }
  }, [menuStack]);

  // Add to the submenu of the clicked button to the menu stack (will display the current menu/submenu)
  const handleMenuClick = (item: MenuItem) => {
    // Disable and then re-enable the button after 300 milliseconds
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 300);

    // Set slide direction to the left since we are going up the stack; timeout to ensure the slideDirection is set before the menuStack is set
    setSlideDirection('slide-in');
    setTimeout(() => {
      if (item.subMenu) {
        setMenuStack((prevStack) => [...prevStack, { items: item.subMenu!, parentLabel: item.label }]);
      }
    }, 0);
  };

  // Pop the menu stack (will display the current menu/submenu)
  const handleBackClick = () => {
    // Disable and then re-enable the button after 300 milliseconds
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 300);

    // Set slide direction to the right since we are going back an item; timeout to ensure the slideDirection is set before the menuStack is set
    setSlideDirection('slide-out');
    setTimeout(() => {
      setMenuStack((prevStack) => prevStack.slice(0, -1));
    }, 0);
  };

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={menuStack.length - 1}
        timeout={300}
        classNames={slideDirection}
        unmountOnExit 
      >
        <div ref={contentRef} className={`${className} absolute`}>
          {menuStack.length > 1 && (
            <button className={`${backClassName}`} aria-label='Back' onClick={handleBackClick} disabled={buttonDisabled}>
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
          <ul>
            {menuStack.length > 1 && <CustomLink href={`/${menuStack[menuStack.length - 1].parentLabel}`} className='multi-button'>{menuStack[menuStack.length - 1].parentLabel}</CustomLink> }
            {currentMenu.items.map((item, index) => (
              <li key={index}>
                {isLastSubMenu && item.productID 
                  ? <CustomLink href={`${item.label}`} productID={item.productID} className={`multi-button ${isLastSubMenu ? 'multi-sub' : ''}`}>{item.label}</CustomLink>
                  : isLastSubMenu 
                    ? <CustomLink href={`/${item.label}`} className={`multi-button ${isLastSubMenu ? 'multi-sub' : ''}`}>{item.label}</CustomLink>
                    : <button onClick={() => handleMenuClick(item)} disabled={buttonDisabled} aria-label='Open Submenu' className={`multi-button ${isLastSubMenu ? 'multi-sub' : ''}`}>
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
                }
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
  
};

export default MultiLevelMenu;