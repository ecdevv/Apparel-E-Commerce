'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Dropdown from './dropdown'

interface Item {
  name: string;
  type: 'button' | 'other';
}

interface dropdownProps  {
  Items: Item[];
  label: string;
}

// Navigation section with the links of this navbar component
const hoverButton = ({Items, label} : dropdownProps) => {
  const [hover, setHover] = useState(false);

  return (
    <li>
      <Link href = "/" aria-label='Items On Sale' className='navbar-navigation-links' onMouseEnter={() => setHover(true)}>{label}</Link>
      <Dropdown Items={Items} menuToggle={hover} orientation={'other'}/>
    </li>
  )
}

export default hoverButton