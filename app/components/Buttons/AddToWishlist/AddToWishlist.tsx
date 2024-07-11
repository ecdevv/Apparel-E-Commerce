'use client'
import React, { useState } from 'react'
import { GeneralButton } from '../General/General'
import { WishlistProduct } from '@/app/utility/types'
import { useWishlistContext } from '@/app/utility/contexts/WishlistContext'
import { validateWishlistProduct } from '@/server/mockValidations'

interface WishlistProps {
  id: number;
  option: string;
  icon?: boolean;
  forceMenu?: boolean;
  className?: string;
}

const AddToWishlistButton = ({ id, option, icon = false, forceMenu = true, className = 'btn second padding-lg' }: WishlistProps) => {
  const { wishItems, setWishItems, setForceOpen, forceElementRef, scrollableRef } = useWishlistContext();
  const [isClicked, setIsClicked] = useState(false);

  const productResponse = validateWishlistProduct(id, option);
  
  const handleClick = () => {
    // If the button is clicked, set the isClicked state to true to show the loading animation and set the forceOpen state to true to open the menu
    setIsClicked(true);
    setForceOpen(true);

    // Find the product from the "api" response
    const product = productResponse.wishlistProduct
    
    // Check if the product already exists in the wishItems array
    const existingItemIndex = wishItems.findIndex((item) => 
      item.id === product.id &&
      item.selectedOption == product.selectedOption
    );

    // If the product exists, update its index and update the wishItems array.
    if (existingItemIndex !== -1) {
      product.index = wishItems[existingItemIndex].index;
      const newWishItems = [...wishItems as WishlistProduct[]];
      setWishItems(newWishItems);
      localStorage.setItem('wishItems', JSON.stringify(newWishItems));
    } else { // If the product doesn't exist, add it to the wishItems array and update the wishItems array.
      product.index = wishItems.length;
      const newWishItems = [...wishItems as WishlistProduct[], product];
      setWishItems(newWishItems);
      localStorage.setItem('wishItems', JSON.stringify(newWishItems));
    }

    // Timeout to ensure this runs after product is added to wishItems to ensure element exists
    setTimeout(() => {
      const element = document.getElementById(product.index.toString());
      if (element && scrollableRef.current) {
        const scrollableElement = scrollableRef.current;
        const scrollableRect = scrollableElement.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        if (elementRect.top < scrollableRect.top || elementRect.bottom > scrollableRect.bottom) {
          scrollableElement.scrollTo({
            top: element.offsetTop - scrollableRect.top,
            behavior: 'smooth',
          });
        }
      }
    }, 0)
  }

  // Set the conditional to run the animation to false on animation end
  const onAnimationEnd = () => {
    setIsClicked(false);
  }

  return (
    <GeneralButton refProp={forceMenu ? forceElementRef : null} onClick={handleClick} onAnimationEnd={onAnimationEnd} aria-label={`Add ${productResponse.wishlistProduct.name} to wishlist`} className={`${className} ${isClicked ? 'active' : ''}`} >
      {icon &&
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          width={20}
          height={20}
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      }
      Wishlist
    </GeneralButton>
  )
}

export default AddToWishlistButton;


