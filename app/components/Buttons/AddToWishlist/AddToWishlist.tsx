'use client'
import React, { useState } from 'react'
import { WishlistProduct } from '@/app/utility/types'
import { useWishlistContext } from '@/app/utility/contexts/WishlistContext'
import { validateWishlistProduct } from '@/server/mockValidations'
import './AddToWishlist.css'

interface WishlistProps {
  id: number;
  option: string;
}

const AddToWishlistButton = ({ id, option }: WishlistProps) => {
  const {wishItems, setWishItems, forceElementRef, scrollableRef} = useWishlistContext();
  const [isClicked, setIsClicked] = useState(false);

  const productResponse = validateWishlistProduct(id, option);
  
  const handleClick = (duration: number) => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, duration);
    
    const product = productResponse.wishlistProduct
    
    const existingItemIndex = wishItems.findIndex((item) => 
      item.id === product.id &&
      item.selectedOption == product.selectedOption
    );
    if (existingItemIndex !== -1) {
      product.index = wishItems[existingItemIndex].index;
      const newWishItems = [...wishItems as WishlistProduct[]];
      setWishItems(newWishItems);
      localStorage.setItem('wishItems', JSON.stringify(newWishItems));
    } else {
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

  return (
    <button ref={forceElementRef} onClick={() => {handleClick(100)}} className={`add-wish-btn ${isClicked ? 'active' : ''}`} style={{'--duration': '100ms'} as React.CSSProperties}>Wishlist</button>
  )
}

export default AddToWishlistButton;


