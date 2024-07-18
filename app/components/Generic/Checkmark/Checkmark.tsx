'use client';
import { useEffect, useRef } from 'react';
import './Checkmark.css';

const Checkmark: React.FC = () => {
  const checkmarkRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (checkmarkRef.current) {
      const parentElement = checkmarkRef.current.parentElement;
      if (parentElement) {
        const bgColor = window.getComputedStyle(parentElement).backgroundColor;
        const [r, g, b] = bgColor.match(/\d+/g)?.map(Number) || [255, 255, 255];
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Change CSS variables based on luminance
        const checkmarkColor = luminance > 0.5 ? 'black' : 'white';
        const checkmarkInvert = luminance > 0.5 ? 1 : 0;

        checkmarkRef.current.style.setProperty('--checkmark-color', checkmarkColor);
        checkmarkRef.current.style.setProperty('--checkmark-invert', checkmarkInvert.toString());
      }
    }
  }, []);

  return (
    <svg
      ref={checkmarkRef}
      aria-hidden
      viewBox="0 0 1920 1920" 
      className='checkmark'
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z" fillRule="evenodd"></path>
      </g>
    </svg>
  );
};

export default Checkmark;