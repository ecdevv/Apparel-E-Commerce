'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import './NumberStepper.css'

interface NumberStepperProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  size?: number;
  doubleWidth?: boolean;
}
const NumberStepper = ({min = 0, max = 99, value: initialValue = 0, onChange, size = 40, doubleWidth = false}: NumberStepperProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Handle decrementing the value
  const handleDecrement = () => {
    if (value > min) {
      setValue(value - 1);
      onChange && onChange(value - 1);
    }
  };

  // Handle incrementing the value
  const handleIncrement = () => {
    if (value < max) {
      setValue(value + 1);
      onChange && onChange(value + 1);
    }
  };

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const newValue = inputValue === '' ? min : Math.min(Math.max(parseInt(inputValue, 10), min), max);
    setValue(newValue);
    onChange && onChange(newValue);
  };
  
  return (
    <div className='number-stepper' style={{'--size': `${size}px`, '--size2': doubleWidth ? `${size / 2}px` : '0px'} as React.CSSProperties}>
      <button onClick={handleDecrement} disabled={value <= min} aria-label='Decrement'>
        <svg 
          aria-hidden
          viewBox="0 0 24 24" 
          fill="none" 
          stroke='currentColor'
          className='svg-icon'
        >
          <path d="M6 12L18 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button> 
      <label htmlFor="stepper" className='visually-hidden'>Number Stepper</label>
      <input 
        id="stepper"
        type="text" 
        value={value} 
        onChange={handleChange}
        pattern="[0-9]*"
        inputMode="numeric"
        min={min}
        max={max}
      />
      <button onClick={handleIncrement} disabled={value >= max} aria-label='Increment'>
        <svg 
          aria-hidden
          viewBox="0 0 24 24" 
          fill="none" 
          stroke='currentColor'
          className='svg-icon'
        >
          <path d="M4 12H20M12 4V20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg> 
      </button>
    </div>
  )
}

export default NumberStepper

