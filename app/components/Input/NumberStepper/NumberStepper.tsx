'use client'
import React, { useState, ChangeEvent } from 'react'
import './NumberStepper.css'

interface NumberStepperProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  className? : string;
}
const NumberStepper = ({min = 0, max = 99, value: initialValue = 0, onChange, className = 'number-stepper'}: NumberStepperProps) => {
  const [value, setValue] = useState(initialValue);

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
    <div className={className}>
      <button onClick={handleDecrement} disabled={value <= min} aria-label='Decrement'>
        - 
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
        + 
      </button>
    </div>
  )
}

export default NumberStepper

