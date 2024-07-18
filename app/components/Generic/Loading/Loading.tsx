import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading"> 
      <svg
        aria-label='Loading svg image'
        fill="currentColor" 
        viewBox="0 0 32 32"
        className='loading-svg'
        style={{'--width': '32px', '--height': '32px'} as React.CSSProperties} 
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M16 1.25c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0c7.318 0.001 13.25 5.933 13.25 13.251 0 3.659-1.483 6.972-3.881 9.37v0c-0.14 0.136-0.227 0.327-0.227 0.537 0 0.414 0.336 0.75 0.75 0.75 0.212 0 0.403-0.088 0.539-0.228l0-0c2.668-2.669 4.318-6.356 4.318-10.428 0-8.146-6.604-14.751-14.75-14.751h-0z"></path>
        </g>
      </svg>
    </div>
  );
};

export default Loading;