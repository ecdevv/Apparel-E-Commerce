import React from 'react'
import { CustomLink } from './components/Buttons/General/General'

const Custom404 = () => {
  return (
    <section id = "404" className = "">
      <div className = "">
        <div className = "">
          <h1 className = "">404 PAGE NOT FOUND</h1>
          <CustomLink href= "/" className='btn'>Return Home</CustomLink>
        </div>
      </div>
    </section>
  )
}

export default Custom404