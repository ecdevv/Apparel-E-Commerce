'use client'
import React from 'react';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import DropdownButton from '../Buttons/Dropdown/DropdownButton';
import NumberStepper from '../Input/NumberStepper/NumberStepper';
import { DropdownItem, ProductToBeAdded } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import { useBagContext } from '@/app/utility/contexts/BagContext';
import './Bag.css'

const BagCard = ({item, bagItems, setBagItems}: {item: ProductToBeAdded; bagItems: ProductToBeAdded[] | []; setBagItems: React.Dispatch<React.SetStateAction<ProductToBeAdded[] | []>>}) => {
  // This function removes the item from the bagItems array by finding the index of the item in the array and then using the splice method to remove that item from the array.
  const handleRemoveClick = () => {
    const newBagItems = [...bagItems as ProductToBeAdded[]];
    const itemIndex = newBagItems.indexOf(item);
    // Decrement the index of all items after the removed item.
    newBagItems.forEach((item, index) => {
      if (index > itemIndex) {
        item.index -= 1;
      }
    });
    newBagItems.splice(itemIndex, 1);
    setBagItems(newBagItems);
    localStorage.setItem('bagItems', JSON.stringify(newBagItems));
  }

  const handleQuantityStepper = (value: number) => {
    const newBagItems = [...bagItems as ProductToBeAdded[]];
    const itemIndex = newBagItems.indexOf(item);
    newBagItems[itemIndex].selectedQuantity = value
    setBagItems(newBagItems);
    localStorage.setItem('bagItems', JSON.stringify(newBagItems));
  }

  return (
    <div id={item.index.toString()} className='bag-card'>
      <div className='bag-image-wrapper'>
        <Image
          src={item.selectedProduct.options.find(option => option.name === item.selectedOption)?.media[0].url || item.selectedProduct.options[0].media[0].url}
          alt='Logo'
          fill
          sizes="(100vw)"
          className='bag-image'
        />
      </div>
      <div className='bag-info-container'>
        <div className='bag-info'>
          <h2>{item.selectedProduct.name}</h2>
          <button onClick={handleRemoveClick} aria-label='Remove item from bag' className='bag-close'>
            <svg
              aria-hidden
              viewBox="0 0 25 25" 
              fill="currentColor"
              width={27.5}
              height={27.5}
            > 
              <path d="M18 7L7 18M7 7L18 18" stroke="#121923" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
        <div className='bag-info'>
          <h3>{capitalizeFirstLetter(item.selectedProduct.options.find(option => option.name === item.selectedOption)?.type || '')}: {capitalizeFirstLetter(item.selectedOption)}</h3>
        </div>
        <div className='bag-info'>
          <h3>{capitalizeFirstLetter('Size')}: {item.selectedSize.toUpperCase()}</h3>
        </div>
        <div className='bag-info'>
          <h3><span className='dollar-sign'>$</span>{((Number((item.selectedProduct.price * item.selectedProduct.discount).toFixed(2)) * item.selectedQuantity).toFixed(2))}</h3>
          <div className='bag-qty-container'><h3>Qty: </h3><NumberStepper min={1} value={item.selectedQuantity} onChange={handleQuantityStepper} className='bag-qty-stepper'/></div>
        </div>
      </div>
    </div>
  )
}

const BagItemList = ({bagItems, setBagItems}: {bagItems: ProductToBeAdded[] | []; setBagItems: React.Dispatch<React.SetStateAction<ProductToBeAdded[] | []>>}) => {
  const {scrollableRef} = useBagContext();

  // Check if the "bagItems" array is empty or undefined.
  if (!bagItems || bagItems.length === 0) {
    return <h2 className='bag-header'>Your Bag is Empty</h2>;
  }

  // If the "bagItems" array is not empty, map over each item in the array and render a "BagCard" component for each item.
  return (
    <div ref={scrollableRef} className='bag-container'>
      {bagItems.map((item, index) => (
        <BagCard key={index} item={item} bagItems={bagItems} setBagItems={setBagItems}/>
      ))}
    </div>
  )
}

const Bag = () => {
  const {bagItems, setBagItems, forceElementRef} = useBagContext();
  const totalQuantity = bagItems.reduce((acc, item) => acc + item.selectedQuantity, 0);
  const subTotal = bagItems.reduce((acc, item) => acc + Number((item.selectedProduct.price * item.selectedProduct.discount).toFixed(2)) * item.selectedQuantity, 0.00).toFixed(2);

  // This is an array of DropdownItem objects (the content of the dropdown) that will be passed to the DropdownButton component.
  const items: DropdownItem[] = [
    { name: 'Shopping Bag', type: 'component', component: <div className='bag-header'><h2>Shopping Bag ({totalQuantity})</h2><h3>Subtotal: <span className='dollar-sign'>$</span>{subTotal}</h3></div> },
    { name: 'Bag Items', type: 'component', component: <BagItemList bagItems={bagItems} setBagItems={setBagItems}/> },
    { name: 'View Bag', type: 'button' },
    { name: 'Checkout', type: 'button' },
    { name: 'Log', type: 'component', component: <button onClick={() => {console.log(bagItems, bagItems.map((item) => item.selectedQuantity))}}>Log</button>}
  ]

  return (
    <DropdownButton label={'Bag'} forceRef={forceElementRef} items={items} hover={false} orientation={'left'} showPointer={true} classNames={['bag-btn', 'bag-btn-focus']}>
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
          <span className='bag-badge'>{totalQuantity > 99 ? '99+' : totalQuantity}</span>
        </CSSTransition>
      </span>
      <h2>Bag</h2>
    </DropdownButton>
  )
}

export default Bag
export { BagItemList, BagCard }