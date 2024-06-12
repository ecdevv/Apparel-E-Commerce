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

// Helper function to get the wrapped images (first index here will correspond to the the image at currentIndex - 1)
const getWrappedImages = (currentIndex:number, images:StaticImageData[], numberOfVisibleImages:number) => {
  const totalImages = images.length;
  const wrappedImages: StaticImageData[] = [];

  for (let i = -1; i < numberOfVisibleImages - 1; i++) {
    const index = (currentIndex + i + totalImages) % totalImages; // Ensures index wraps around
    wrappedImages.push(images[index]);
  }

  return wrappedImages;
};

const carousel = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('slide-left');

  const handlePrevClick = () => {
    // Disable and then re-enable the button after 300 milliseconds
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 300);

    setSlideDirection('slide-right')
    setTimeout (() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + Images.length) % Images.length)
    }, 0)
  }

  const handleNextClick = () => {
    // Disable and then re-enable the button after 300 milliseconds
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 300);

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
          timeout={400}
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
        
      <button onClick={handlePrevClick} disabled={buttonDisabled} className='carousel-left-btn'>
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          className='carousel-left-arrow'
        >
          <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"/>
        </svg>
      </button>
      <button onClick={handleNextClick} disabled={buttonDisabled} className='carousel-right-btn'>
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          className='carousel-right-arrow'
        >
          <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"/>
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