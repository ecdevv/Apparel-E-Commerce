'use client'
import React, { useEffect, useState, useRef } from "react";
import './AccordionMenu.css';

interface AccordionMenuProps {
  title: string;
  content: (string | [string, string][])[];
}

const AccordionMenu = ({ title, content }: AccordionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
    if (contentRef.current) {
      const updateHeight = () => {
        if (contentRef.current) {const { height } = contentRef.current.getBoundingClientRect();
        setContentHeight(height);}
      };

      updateHeight();

      // Update the height on window resize
      window.addEventListener('resize', updateHeight);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', updateHeight);
      };
    }
  }, [content]);

  const toggleMenu = (event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    // Check if the event is a keyboard event
    if ('key' in event) {
      // Check if the pressed key is "Tab"
      if (event.key === 'Tab') {
        return;
      }
      // Toggle menu on "Enter" or "Space"
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    } else {
      // Handle click events (the default)
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <div role='button' tabIndex={0} onKeyDown={toggleMenu} className={`accordion-menu-container ${isOpen ? 'open' : ''}`} style={{ '--height': `${contentHeight}px` } as React.CSSProperties}>
        <div className="accordion-menu-header" onClick={toggleMenu} role='button' tabIndex={0}>
          <h2 className="accordion-menu-title">{title}</h2>
          <div className={`${isOpen ? 'accordion-menu-icon-rotated' : 'accordion-menu-icon'}`}>
            <svg 
              aria-hidden
              fill="currentColor" 
              viewBox="0 0 24 24" 
              height="1em" 
              width="1em"
            >
              <path d="M6.343 7.757L4.93 9.172 12 16.242l7.071-7.07-1.414-1.415L12 13.414 6.343 7.757z" />
            </svg>
          </div>
        </div>
        <div ref={contentRef} className='accordion-menu-content'>
          {content.map((item, index) => {
            if (typeof item === 'string') {
              return <p key={index} className='accordion-description'>{item}</p>;
            } else {
              return (
                <div key={index} className={'ul-list-wrapper'}>
                  <ul className='ul-list'>
                    {item.map(([key, value], subIndex) => (
                      <li key={subIndex}>
                        <h3 className="accordion-key">{key}:</h3> <p className='accordion-value'>{value}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
          })}
        </div>
      </div>
      <hr className='accordion-hr'></hr>
    </>
  );
};

export default AccordionMenu

