'use client'
import React from 'react'
import { Product, ProductToBeAdded } from '@/app/utility/types'
import { useBagContext } from '@/app/utility/contexts/BagContext'

interface AddToBagProps {
  product: Product;
  option: string;
  size: string;
  quantity: number;
  className: string;
}

const AddToBagButton = ({product, option, size, quantity, className}: AddToBagProps) => {
  const {bagItems, setBagItems, forceElementRef, scrollableRef} = useBagContext();

  const productToBeAdded: ProductToBeAdded = {
    index: 0,
    selectedProduct: product, 
    selectedOption: option, 
    selectedSize: size, 
    selectedQuantity: quantity
  }
  
  const handleClick = (productDetails: ProductToBeAdded) => {
    const existingItemIndex = bagItems.findIndex((item) => 
      item.selectedProduct.product_id === productDetails.selectedProduct.product_id &&
      item.selectedOption == productDetails.selectedOption &&
      item.selectedSize == productDetails.selectedSize
    );
    if (existingItemIndex !== -1) {
      productDetails.index = bagItems[existingItemIndex].index;
      const newBagItems = [...bagItems as ProductToBeAdded[]];
      newBagItems[existingItemIndex].selectedQuantity = Math.min(newBagItems[existingItemIndex].selectedQuantity + productDetails.selectedQuantity, 99);
      setBagItems(newBagItems);
      localStorage.setItem('bagItems', JSON.stringify(newBagItems));
    }
    else {
      productDetails.index = bagItems.length;
      const newBagItems = [...bagItems as ProductToBeAdded[], productDetails];
      setBagItems(newBagItems);
      localStorage.setItem('bagItems', JSON.stringify(newBagItems));
    }

    // Timeout to ensure this runs after product is added to bagItems to ensure element exists
    setTimeout(() => {
      const element = document.getElementById(productDetails.index.toString());
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
    <button ref={forceElementRef} onClick={() => {handleClick(productToBeAdded)}} className={`${className}`}>Add to Bag</button>
  )
}

export default AddToBagButton;


