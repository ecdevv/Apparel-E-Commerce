import React from 'react'
import { Product, ProductToBeAdded } from '@/app/utility/types'
import { useBagContext } from '@/app/utility/useBagContext'

interface AddToBagProps {
  product: Product;
  option: string;
  size: string;
  quantity: number;
  className: string;
}

const AddToBagButton = ({product, option, size, quantity, className}: AddToBagProps) => {
  const {bagItems, setBagItems} = useBagContext();
  const productToBeAdded: ProductToBeAdded = {
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
      const newBagItems = [...bagItems as ProductToBeAdded[]];
      newBagItems[existingItemIndex].selectedQuantity = Math.min(newBagItems[existingItemIndex].selectedQuantity + productDetails.selectedQuantity, 99);
      setBagItems(newBagItems);
      localStorage.setItem('bagItems', JSON.stringify(newBagItems));
    }
    else {
      const newBagItems = [...bagItems as ProductToBeAdded[], productDetails];
      setBagItems(newBagItems);
      localStorage.setItem('bagItems', JSON.stringify(newBagItems));
    }
  }

  return (
    <button onClick={() => {handleClick(productToBeAdded)}} className={`${className}`}>Add to Bag</button>
  )
}

export default AddToBagButton;

