'use client'
import React from 'react';
import Image from 'next/image';
import DropdownButton from '../Buttons/Dropdown/DropdownButton';
import { DropdownItem, ProductToBeAdded } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import { useBagContext } from '@/app/utility/useBagContext';
import './Bag.css'



const BagCard = ({item, bagItems, setBagItems}: {item: ProductToBeAdded; bagItems: ProductToBeAdded[] | []; setBagItems: React.Dispatch<React.SetStateAction<ProductToBeAdded[] | []>>}) => {
  // This function removes the item from the bagItems array by finding the index of the item in the array and then using the splice method to remove that item from the array.
  const handleRemoveClick = () => {
    const newBagItems = [...bagItems as ProductToBeAdded[]];
    const itemIndex = newBagItems.indexOf(item);
    newBagItems.splice(itemIndex, 1);
    setBagItems(newBagItems);
    localStorage.setItem('bagItems', JSON.stringify(newBagItems));
  }

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
    <div className='bag-card'>
      <Image
        src="/next.svg"
        alt='Logo'
        width='0'
        height='0'
        className='bag-image'
      />
      <div className='bag-info'>
        <h2>{item.selectedProduct.name} {item.selectedSize.toUpperCase()}, {capitalizeFirstLetter(item.selectedOption)}</h2>
        <div className='bag-info-second'>
          <h2>{item.selectedProduct.price}</h2>
          <h2>Qty: <button onClick={handleRemoveQuantity}> - </button> {item.selectedQuantity} <button onClick={handleAddQuantity}> + </button></h2>  {/* TODO: Proper layout/styling */}
        </div>
        <div className='bag-info-third'>
          <h2>Free Shipping</h2>
          <button onClick={handleRemoveClick}><h2>TRASH BIN</h2></button>
        </div>
      </div>
    </div>
  )
}

const BagItemList = ({bagItems, setBagItems}: {bagItems: ProductToBeAdded[] | []; setBagItems: React.Dispatch<React.SetStateAction<ProductToBeAdded[] | []>>}) => {
  // Check if the "bagItems" array is empty or undefined.
  if (!bagItems || bagItems.length === 0) {
    console.log('Your Bag is Empty');
    return <h2 className='bag-h2'>Your Bag is Empty</h2>;
  }
  
  // If the "bagItems" array is not empty, map over each item in the array and render a "BagCard" component for each item.
  return (
    <div className='bag-container'>
      {bagItems.map((item, index) => (
        <BagCard key={index} item={item} bagItems={bagItems} setBagItems={setBagItems}/>
      ))}
    </div>
  )
}

const Bag = () => {
  const {bagItems, setBagItems} = useBagContext();

  // This is an array of DropdownItem objects (the content of the dropdown) that will be passed to the DropdownButton component.
  const items: DropdownItem[] = [
    { name: 'Shopping Bag', type: 'component', component: <h2 className='bag-h2'>Shopping Bag ({bagItems.reduce((acc, item) => acc + item.selectedQuantity, 0)})</h2> },
    { name: 'Bag Items', type: 'component', component: <BagItemList bagItems={bagItems} setBagItems={setBagItems}/> },
    { name: 'View Bag', type: 'button' },
    { name: 'Checkout', type: 'button' },
  ]

  return (
    <DropdownButton label={'Bag'} items={items} hover={false} orientation={'left'} showPointer={true} classNames={['bag-btn', 'bag-btn-focus']}>
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        fill="currentColor"
        className='bag-icon'
      >
        <path d="M 16 3 C 13.253906 3 11 5.253906 11 8 L 11 9 L 6.0625 9 L 6 9.9375 L 5 27.9375 L 4.9375 29 L 27.0625 29 L 27 27.9375 L 26 9.9375 L 25.9375 9 L 21 9 L 21 8 C 21 5.253906 18.746094 3 16 3 Z M 16 5 C 17.65625 5 19 6.34375 19 8 L 19 9 L 13 9 L 13 8 C 13 6.34375 14.34375 5 16 5 Z M 7.9375 11 L 11 11 L 11 14 L 13 14 L 13 11 L 19 11 L 19 14 L 21 14 L 21 11 L 24.0625 11 L 24.9375 27 L 7.0625 27 Z"/>
      </svg>
      <h2>Bag</h2>
      <svg 
        aria-hidden
        fill="currentColor" 
        viewBox="0 0 24 24" 
        height="1em" 
        width="1em"
      >
        <path d="M6.343 7.757L4.93 9.172 12 16.242l7.071-7.07-1.414-1.415L12 13.414 6.343 7.757z" />
      </svg>
    </DropdownButton>
  )
}

export default Bag
export { BagItemList, BagCard }