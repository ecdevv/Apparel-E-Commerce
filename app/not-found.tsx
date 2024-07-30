import React from 'react'
import Image from 'next/image'
import { CustomLink } from './components/Buttons/General/General'
import getBlurDataUrls from './utility/getBlurDataUrls'

async function Custom404(){
  const blurDataURL = getBlurDataUrls()

  return (
    <section id = "404" className = "custom-not-found-section">
      <div className='custom-desktop'>
        <Image 
          src="/images/not-found.webp" 
          alt="Not Found" 
          fill 
          sizes='(100vw, 100vh)'
          className="custom-not-found-bg"
          placeholder='blur'
          blurDataURL={blurDataURL['/images/not-found.webp']}
        />
      </div>
      <div className='custom-mobile'>
        <Image 
          src="/images/not-found-mobile.webp" 
          alt="Not Found" 
          fill 
          sizes='(100vw, 100vh)'
          className="custom-not-found-bg"
          placeholder='blur'
          blurDataURL={blurDataURL['/images/not-found-mobile.webp']}
        />
      </div>
      <div className = "custom-not-found-container">
        <h1 className = "custom-h1">404 PAGE NOT FOUND</h1>
        <CustomLink href= "/" className='btn'>Return Home</CustomLink>
      </div>
    </section>
  )
}

export default Custom404