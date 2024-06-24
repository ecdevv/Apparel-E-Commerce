'use client'
import React from 'react';
import Image from 'next/image';
import DropdownButton from '../Buttons/Dropdown/DropdownButton';
import { CSSTransition } from 'react-transition-group';
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

  // TODO: Proper card styling and button aria-labels
  return (
    <div className='bag-card'>
      <div className='bag-image-wrapper'>
        <Image
          src={item.selectedProduct.options.find(option => option.name === item.selectedOption)?.media[0].url || item.selectedProduct.options[0].media[0].url}
          alt='Logo'
          fill
          className='bag-image'
        />
      </div>
      <div className='bag-info-container'>
        <div className='bag-info'>
          <h2>{item.selectedProduct.name} {item.selectedSize.toUpperCase()}, {capitalizeFirstLetter(item.selectedOption)}</h2>
          <button onClick={handleRemoveClick} className='bag-close'>
            <svg 
              viewBox="0 0 24 24" 
              fill="none"
              className='bag-icon'
            > 
              <rect width="24" height="24" fill="white"></rect> 
              <path d="M7 17L16.8995 7.10051" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> 
              <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
        </div>
        <div className='bag-info'>
          <h2>{item.selectedProduct.price}</h2>
          <h2>Qty: <button onClick={handleRemoveQuantity}> - </button> {item.selectedQuantity} <button onClick={handleAddQuantity}> + </button></h2>  {/* TODO: Proper qty layout/styling */}
        </div>
        <div className='bag-info'>
          <h2>Free Shipping</h2>
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
  const totalQuantity = bagItems.reduce((acc, item) => acc + item.selectedQuantity, 0);

  // This is an array of DropdownItem objects (the content of the dropdown) that will be passed to the DropdownButton component.
  const items: DropdownItem[] = [
    { name: 'Shopping Bag', type: 'component', component: <h2 className='bag-h2'>Shopping Bag ({totalQuantity})</h2> },
    { name: 'Bag Items', type: 'component', component: <BagItemList bagItems={bagItems} setBagItems={setBagItems}/> },
    { name: 'View Bag', type: 'button' },
    { name: 'Checkout', type: 'button' },
  ]

  return (
    <DropdownButton label={'Bag'} items={items} hover={false} orientation={'left'} showPointer={true} classNames={['bag-btn', 'bag-btn-focus']}>
      <span className='bag-icon-wrapper'>
        <svg
          aria-hidden
          viewBox="0 0 32 32"
          fill="currentColor"
          className='bag-icon'
        >
          <path d="M 16 3 C 13.253906 3 11 5.253906 11 8 L 11 9 L 6.0625 9 L 6 9.9375 L 5 27.9375 L 4.9375 29 L 27.0625 29 L 27 27.9375 L 26 9.9375 L 25.9375 9 L 21 9 L 21 8 C 21 5.253906 18.746094 3 16 3 Z M 16 5 C 17.65625 5 19 6.34375 19 8 L 19 9 L 13 9 L 13 8 C 13 6.34375 14.34375 5 16 5 Z M 7.9375 11 L 11 11 L 11 14 L 13 14 L 13 11 L 19 11 L 19 14 L 21 14 L 21 11 L 24.0625 11 L 24.9375 27 L 7.0625 27 Z"/>
        </svg>
        <CSSTransition
          in={totalQuantity > 0}
          timeout={300}
          classNames="badge"
          unmountOnExit
        >
          <span className='bag-quantity'>{totalQuantity}</span>
        </CSSTransition>
      </span>
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