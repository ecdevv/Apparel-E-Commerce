import React from 'react'
import Image from 'next/image'
import { ImageData } from '@/app/utility/types'
import './Gallery.css'

interface GalleryProps {
  Images: ImageData[]
}

const Gallery = ({ Images }: GalleryProps) => {
  return (
    <div className='gallery'>
      {Images.map((image, index) => (
        <div key={index} className="gallery-image-wrapper">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes='(100vw, 100vh)'
            className="gallery-image"
            placeholder='blur'
            blurDataURL={image.blurDataUrl}
            priority
          />
        </div>
      ))}
    </div>
  )
}

export default Gallery
