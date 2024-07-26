import React from 'react'
import { CustomLink } from './components/Buttons/General/General'

const Custom404 = () => {
  return (
    <section id = "404" className = "custom-not-found-section">
      <div className='custom-404-overlay'></div>
      <div className = "custom-not-found-container">
        <h1 className = "custom-h1">404 PAGE NOT FOUND</h1>
        <CustomLink href= "/" className='btn'>Return Home</CustomLink>
      </div>
    </section>
  )
}

export default Custom404