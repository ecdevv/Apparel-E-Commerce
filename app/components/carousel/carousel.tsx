'use client'
import React, { useEffect, useState } from 'react';
import Image, {StaticImageData} from 'next/image';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CarouselImage from '../../../public/images/carousel-item1.webp';
import CarouselImage2 from '../../../public/images/carousel-item2.webp';
import CarouselImage3 from '../../../public/images/carousel-item3.webp';
import CarouselImage4 from '../../../public/images/carousel-item4.webp';
import './carousel.css'

const Images = [CarouselImage, CarouselImage2, CarouselImage3, CarouselImage4]; 

// Helper function to get the wrapped images (so we can see the first and second image after the last image)
const getWrappedImages = (currentIndex:number, images:StaticImageData[], numberOfVisibleImages:number) => {
  const totalImages = images.length;
  const wrappedImages: StaticImageData[] = [];

  for (let i = 0; i < numberOfVisibleImages; i++) {
    const index = (currentIndex + i + totalImages) % totalImages; // Ensures index wraps around
    wrappedImages.push(images[index]);
  }

  return wrappedImages;
};

const carousel = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('')

  useEffect(() => {
    console.log(currentIndex)
    console.log(slideDirection)
  }, [currentIndex])

  const handlePrevClick = () => {
    setButtonDisabled(true);

    // Re-enable the button after 00 milliseconds)
    setTimeout(() => {
      setButtonDisabled(false);
    }, 200);

    setSlideDirection('slide-right')
    setTimeout (() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + Images.length) % Images.length)
    }, 0)
  }

  const handleNextClick = () => {
    setButtonDisabled(true);

    // Re-enable the button after 00 milliseconds)
    setTimeout(() => {
      setButtonDisabled(false);
    }, 200);

    setSlideDirection('slide-left')
    setTimeout (() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Images.length)
    }, 0)
  }

  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition
          key={currentIndex}
          timeout={300}
          classNames={slideDirection}
          unmountOnExit
        >
          <div className='carousel-image-container'>
            {getWrappedImages(currentIndex, Images, 3).map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`carousel-item${index + 1}`}
                width='0'
                height='0'
                placeholder='blur'
                className='carousel-image'
              />
            ))}
          </div>
        </CSSTransition>
      </TransitionGroup>
        
      <button onClick={handlePrevClick} disabled={buttonDisabled}>
        <svg
          fill="currentColor"
          viewBox="0 0 16 16"
          className='carousel-left-arrow'
        >
          <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 7.5a.5.5 0 010 1H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5z" />
        </svg>
      </button>
      <button onClick={handleNextClick} disabled={buttonDisabled}>
        <svg
          fill="currentColor"
          viewBox="0 0 16 16"
          className='carousel-right-arrow'
        >
          <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM4.5 7.5a.5.5 0 000 1h5.793l-2.147 2.146a.5.5 0 00.708.708l3-3a.5.5 0 000-.708l-3-3a.5.5 0 10-.708.708L10.293 7.5H4.5z" />
        </svg>
      </button>
    </>
  )




  //Photo by <a href="https://unsplash.com/@domjewel?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Dom Hill</a> on <a href="https://unsplash.com/photos/woman-in-yellow-tracksuit-standing-on-basketball-court-side-nimElTcTNyY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  //Photo by <a href="https://unsplash.com/@zinco?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Raul De Los Santos</a> on <a href="https://unsplash.com/photos/man-in-white-crew-neck-t-shirt-and-black-and-white-pants-standing-on-sidewalk-during-yf50syI_Dwg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  //Photo by <a href="https://unsplash.com/@forcemajeure?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Force Majeure</a> on <a href="https://unsplash.com/photos/man-and-woman-in-white-and-gray-force-majeure-printed-crew-neck-t-shirts-standing-near-gray-concrete-wall-00tlC0Clfrs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  //Photo by <a href="https://unsplash.com/@jcgellidon?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">JC Gellidon</a> on <a href="https://unsplash.com/photos/woman-leaning-on-wall-OGy5tojr7x8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  //Photo by <a href="https://unsplash.com/@demoya?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Michael DeMoya</a> on <a href="https://unsplash.com/photos/man-in-white-crew-neck-t-shirt-standing-beside-woman-in-white-t-shirt-nrleaaHWOUw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  


}

export default carousel;