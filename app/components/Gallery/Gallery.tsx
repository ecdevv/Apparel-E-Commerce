import React from 'react'
import Image, { StaticImageData} from 'next/image'
import './Gallery.css'

interface GalleryProps {
  Images: StaticImageData[] | string[]
}

const Gallery = ({ Images }: GalleryProps) => {
  return (
    <div className='gallery'>
      {Images.map((image, index) => (
        <div key={index} className="gallery-image-wrapper">
          <Image
            src={image}
            alt={image + ' ' + index}
            fill
            sizes='(100vw, 100vh)'
            className="gallery-image"
            priority
          />
        </div>
      ))}
    </div>
  )
}

export default Gallery
