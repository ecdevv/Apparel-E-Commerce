'use client'
import React, { useState } from 'react';
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
    const index = (currentIndex + i + totalImages) % totalImages; // Add total images to ensure a positive number gets modded
    wrappedImages.push(images[index]);
  }

  return wrappedImages;
};

const carousel = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difference, setDifference] = useState(0);
  const [slideDirection, setSlideDirection] = useState('slide-left');

  const handlePrevClick = () => {
    // Disable and then re-enable the button after 300 milliseconds
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 300);

    // Set slideDirection to the right since we are going back an image; the index is only moving one image so difference is always 1
    setSlideDirection('slide-right');
    setDifference(1);

    // Set the current index AFTER (using setTimeout to achieve this) the slideDirection and difference are set.
    setTimeout (() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + Images.length) % Images.length);  // Add total images to ensure a positive number gets modded
    }, 0)
  }

  const handleNextClick = () => {
    // Disable and then re-enable the button after 300 milliseconds
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 300);

    // Set slide direction to the left since we are going back an image; the index is only moving one image so difference is always 1
    setSlideDirection('slide-left');
    setDifference(1);

    // Set the current index AFTER (using setTimeout to achieve this) the slideDirection and difference are set.
    setTimeout (() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Images.length);  // Always positive, so just mod by total length of images to ensure the index wraps back around
    }, 0)
  }

  const handleDotClick = (index:number) => {
    // Disable and then re-enable the button after 300 milliseconds
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 300);
    
    // Set slide direction based on if the index of the image clicked on is greater than the currentIndex of the current image
    if (index > currentIndex) {
      setSlideDirection('slide-left');
    }
    else {
      setSlideDirection('slide-right');
    }
    
    // Set the difference based on the difference between the current image's index and the target image's index (the image clicked on); modding by total image length to be safe and ensure it wraps
    setDifference(Math.abs((index - currentIndex) % Images.length));

    // Set the current index AFTER (using setTimeout to achieve this) the slideDirection and difference are set.
    setTimeout (() => {
      setCurrentIndex(index);
    }, 0)
  }

  return (
    <>
      {/* ACCESSIBILITY LINK to skip the carousel/image track component */}
      <a href='#skip-link' aria-label='Skip Past This Carousel Section' className='skip-link'>Skip Carousel</a> {/* Link does not work as intended for tab navigation so using <a> tag instead */}

      {/* The Image Carousel/Image Track ---- Get's transitioned based on the current image selected and the distance to the target image */}
      <TransitionGroup component={null}>
        <CSSTransition
          key={currentIndex}
          timeout={400}
          classNames={slideDirection}
          style={{'--index': difference} as React.CSSProperties}
          unmountOnExit
        >
          <div className='carousel-image-container'>
            {/* Only maps the primary image selected and the two surrounding images */}
            {getWrappedImages(currentIndex, Images, 3).map((image, index) => (
              <div key={index} className='carousel-image-wrapper'>
                <Image
                  key={index}
                  src={image}
                  alt={`Current Carousel Item - ${index + 1}`}
                  width='0'
                  height='0'
                  placeholder='blur'
                  className='carousel-image'
                  // style={{translate: `${-100 * currentIndex}%`}}
                />
              </div>
            ))}
          </div>
        </CSSTransition>
      </TransitionGroup>

      {/* The buttons on top of the surrounding images in order to go to the previous or next image in the carousel */}  
      <>
        <button onClick={handlePrevClick} disabled={buttonDisabled} aria-label="View Previous Image" className='carousel-left-btn'>
          <svg
            aria-hidden
            fill="currentColor"
            viewBox="0 0 24 24"
            className='carousel-left-arrow'
          >
            <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"/>
          </svg>
        </button>

        <button onClick={handleNextClick} disabled={buttonDisabled} aria-label="View Next Image" className='carousel-right-btn'>
          <svg
            aria-hidden
            fill="currentColor"
            viewBox="0 0 24 24"
            className='carousel-right-arrow'
          >
            <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"/>
          </svg>
        </button>
      </>

      {/* The dot buttons at the bottom of the carousel to select the specific images */}
      <div className='carousel-dots-wrapper'>
        {Images.map((_, index) => (
          <button key={index} onClick={() => {handleDotClick(index)}} disabled={buttonDisabled} aria-label={`View Image ${index + 1}`} className={`${index === currentIndex ? 'carousel-dot-selected' : 'carousel-dot'}`} style={{'--total': Images.length} as React.CSSProperties}></button>
        ))}
      </div>
      
      {/* ACCESSIBILITY ELEMENT that's skipped to from the skip <a> tag at the beginning of this component */}
      <div id="skip-link"/>
    </>
  )

  //Photo by <a href="https://unsplash.com/@forcemajeure?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Force Majeure</a> on <a href="https://unsplash.com/photos/man-and-woman-in-white-and-gray-force-majeure-printed-crew-neck-t-shirts-standing-near-gray-concrete-wall-00tlC0Clfrs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  //Photo by <a href="https://unsplash.com/@demoya?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Michael DeMoya</a> on <a href="https://unsplash.com/photos/2-women-standing-near-wall-during-daytime-qI8xWRvfgGg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  //Photo by <a href="https://unsplash.com/@jcgellidon?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">JC Gellidon</a> on <a href="https://unsplash.com/photos/woman-leaning-on-wall-OGy5tojr7x8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  //Photo by <a href="https://unsplash.com/@minusculemarie?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Marie-Michèle Bouchard</a> on <a href="https://unsplash.com/photos/man-in-white-shirt-and-pants-sitting-on-gray-concrete-floor-J_zYSwczKYA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

}

export default carousel;