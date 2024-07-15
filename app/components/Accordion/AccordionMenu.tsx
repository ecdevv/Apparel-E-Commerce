'use client'
import React, { useEffect, useState, useRef } from "react";
import { useMenuContext } from "@/app/utility/contexts/MenuContext";
import './AccordionMenu.css';

interface AccordionMenuProps {
  children?: React.ReactNode;
  title: string;
  content?: (string | [string, string][])[];
  headerPadding?: number;
  titleClassName?: string;
  svgClassName?: string;
  hrClassName?: string;
}

const AccordionMenu = ({ children, title, content, headerPadding=15, titleClassName='accordion-menu-title', svgClassName='accordion-menu-icon-svg', hrClassName='accordion-hr' }: AccordionMenuProps) => {
  const { globalMenuToggle } = useMenuContext();
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Collapse the menu when globalMenuToggle is false (i.e a CustomLink is clicked)
  useEffect(() => {
    if (globalMenuToggle === false) {
      setIsOpen(false);
    }
  }, [globalMenuToggle])

  // Update the content height when the content changes to set the correct height of the menu container (used to transition/animate)
  useEffect(() => {
    if (headerRef.current &&contentRef.current) {
      const updateHeight = () => {
        if (headerRef.current && contentRef.current) {
          const { height: headerHeight } = headerRef.current.getBoundingClientRect();
          const { height: contentHeight } = contentRef.current.getBoundingClientRect();
          setHeaderHeight(headerHeight);
          setContentHeight(contentHeight);
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
  }, [content]);

  // Toggle the menu; also checks for keyboard event "Enter" or "Space" to toggle the menu when focused and ignore "Tab"
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
        setIsOpen(prev => !prev);
      }
    } else {
      // Handle click events (the default)
      setIsOpen(prev => !prev);
    }
  };

  return (
    <>
      <div role='button' tabIndex={0} onKeyDown={toggleMenu} className={`accordion-menu-container ${isOpen ? 'open' : ''}`} style={{ '--height': `${headerHeight}px`, '--content-height': `${contentHeight}px`, '--padding': `${headerPadding}px` } as React.CSSProperties}>
        <div ref={headerRef} className='accordion-menu-header' onClick={toggleMenu} role='button' tabIndex={0}>
          <h2 className={titleClassName}>{title}</h2>
          <div className={`${isOpen ? 'accordion-menu-icon-rotated' : 'accordion-menu-icon'}`}>
            <svg 
              aria-hidden
              fill="currentColor" 
              viewBox="0 0 24 24" 
              className={svgClassName}
            >
              <path d="M6.343 7.757L4.93 9.172 12 16.242l7.071-7.07-1.414-1.415L12 13.414 6.343 7.757z" />
            </svg>
          </div>
        </div>
        <div ref={contentRef} className={'accordion-menu-content'}>
          {content?.map((item, index) => {
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
          {children}
        </div>
      </div>
      <hr className={hrClassName}></hr>
    </>
  );
};

export default AccordionMenu


