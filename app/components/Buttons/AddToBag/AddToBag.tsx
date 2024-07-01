'use client'
import React, { useState } from 'react'
import { Product, ProductToBeAdded, Option } from '@/app/utility/types'
import { useBagContext } from '@/app/utility/contexts/BagContext'
import Products from '../../../../data/products.json'
import './AddToBag.css'

interface AddToBagProps {
  id: number;
  option: string;
  size: string;
  quantity: number;
}

// Validate if product is in stock that I assume would normally be done through fetching from the backend
const validateProduct = (id: number, option: string, size: string, quantity: number): { inStock: boolean, productToBeAdded: ProductToBeAdded} => {
  const product: Product = Products.find(product => product.product_id === id) as Product;
  const currentOption = product.options.find(opt => opt.name === option) as Option;
  const inStock = currentOption.sizes.find(sizeObj => sizeObj.size.toLowerCase() === size.toLowerCase() && sizeObj.stock > 0)
  const discount = currentOption.discount;
  const ogPrice = currentOption.price;
  
  let price = ogPrice - (ogPrice * discount / 100);
  if (discount != 0) {
    price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
  } else {
    price = parseFloat((ogPrice).toFixed(2));
  }

  if (!inStock) {
    return { inStock: false, productToBeAdded: {} as ProductToBeAdded };
  }

  const productToBeAdded: ProductToBeAdded = {
    index: 0,
    id: product.product_id,
    name: product.name,
    optionType: currentOption.type,
    selectedOption: option, 
    selectedSize: size, 
    selectedQuantity: quantity,
    discount: discount,
    ogPrice: price,
    price: price,
    defaultMedia: currentOption.media[0].url
  }

  return { inStock: true, productToBeAdded };
}


const AddToBagButton = ({ id, option, size, quantity }: AddToBagProps) => {
  const {bagItems, setBagItems, forceElementRef, scrollableRef} = useBagContext();
  const [isClicked, setIsClicked] = useState(false);

  const productResponse = validateProduct(id, option, size, quantity);
  
  const handleClick = (duration: number) => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, duration);
    
    if (productResponse.inStock === false) return;
    const product = productResponse.productToBeAdded
    
    const existingItemIndex = bagItems.findIndex((item) => 
      item.id === product.id &&
      item.selectedOption == product.selectedOption &&
      item.selectedSize == product.selectedSize
    );
    if (existingItemIndex !== -1) {
      product.index = bagItems[existingItemIndex].index;
      const newBagItems = [...bagItems as ProductToBeAdded[]];
      newBagItems[existingItemIndex].selectedQuantity = Math.min(newBagItems[existingItemIndex].selectedQuantity + product.selectedQuantity, 99);
      setBagItems(newBagItems);
      localStorage.setItem('bagItems', JSON.stringify(newBagItems));
    } else {
      product.index = bagItems.length;
      const newBagItems = [...bagItems as ProductToBeAdded[], product];
      setBagItems(newBagItems);
      localStorage.setItem('bagItems', JSON.stringify(newBagItems));
    }

    // Timeout to ensure this runs after product is added to bagItems to ensure element exists
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
    <>
      {productResponse.inStock
        ? <button ref={forceElementRef} onClick={() => {handleClick(100)}} className={`add-btn ${isClicked ? 'active' : ''}`} style={{'--duration': '100ms'} as React.CSSProperties}>Add to Bag</button>
        : <div className={'add-btn-disabled'}>Add to Bag</div>
      }
    </>
  )
}

export default AddToBagButton;


