import React from 'react'
import { ProductToBeAdded } from '@/app/utility/types';

const QuantityInput = ({item, bagItems, setBagItems}: {item: ProductToBeAdded; bagItems: ProductToBeAdded[] | []; setBagItems: React.Dispatch<React.SetStateAction<ProductToBeAdded[] | []>>}) => {
  const handleRemoveQuantity = () => {
    const newBagItems = [...bagItems as ProductToBeAdded[]];
    const itemIndex = newBagItems.indexOf(item);
    newBagItems[itemIndex].selectedQuantity = Math.max(newBagItems[itemIndex].selectedQuantity - 1, 0);
    if (newBagItems[itemIndex].selectedQuantity === 0) {
      newBagItems.splice(itemIndex, 1);                                     // TODO: Popup to confirm removal
    }
    setBagItems(newBagItems);
    localStorage.setItem('bagItems', JSON.stringify(newBagItems));
  }

  const handleAddQuantity = () => {
    const newBagItems = [...bagItems as ProductToBeAdded[]];
    const itemIndex = newBagItems.indexOf(item);
    newBagItems[itemIndex].selectedQuantity = Math.min(newBagItems[itemIndex].selectedQuantity + 1, 99);
    setBagItems(newBagItems);
    localStorage.setItem('bagItems', JSON.stringify(newBagItems));
  }
  
  return (
    <>
      <button onClick={handleRemoveQuantity}> 
        - 
      </button> 
      {item.selectedQuantity} 
      <button onClick={handleAddQuantity}> 
        + 
      </button>
    </>
  )
}

export default QuantityInput