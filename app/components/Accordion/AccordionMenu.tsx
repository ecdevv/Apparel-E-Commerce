import React from "react";
import './AccordionMenu.css';

interface AccordionMenuProps {
  title: string;
  content: string;
}

const AccordionMenu = ({ title, content }: AccordionMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="accordion-menu-container">
      <div className="accordion-menu-header" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="accordion-menu-title">{title}</h3>
        <div className={`accordion-menu-icon ${isOpen ? 'accordion-menu-icon-rotated' : ''}`}>
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
      <div className={`accordion-menu-content ${isOpen ? 'show' : ''}`}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default AccordionMenu
