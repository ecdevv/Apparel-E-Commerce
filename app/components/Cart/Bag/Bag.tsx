'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { CustomLink } from '../../Buttons/Links/Links';
import DropdownButton from '../../Buttons/Dropdown/DropdownButton';
import NumberStepper from '../../Input/NumberStepper/NumberStepper';
import { DropdownItem, BagProduct } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import { useBagContext } from '@/app/utility/contexts/BagContext';
import { calculateCosts } from '@/server/mockValidations';
import '../Cart.css'

const BagCard = ({item, bagItems, setBagItems}: {item: BagProduct; bagItems: BagProduct[] | []; setBagItems: React.Dispatch<React.SetStateAction<BagProduct[] | []>>}) => {
  // This function removes the item from the bagItems array by finding the index of the item in the array and then using the splice method to remove that item from the array.
  const handleRemoveClick = () => {
    const newBagItems = [...bagItems as BagProduct[]];
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

  // This function updates the quantity of the item in the bagItems array.
  const handleQuantityStepper = (value: number) => {
    const newBagItems = [...bagItems as BagProduct[]];
    const itemIndex = newBagItems.indexOf(item);
    newBagItems[itemIndex].selectedQuantity = value
    setBagItems(newBagItems);
    localStorage.setItem('bagItems', JSON.stringify(newBagItems));
  }

  return (
    <div id={item.index.toString()} className='cart-card'>
      <CustomLink 
        href={`/store/p?${new URLSearchParams({
          name: `${item.name.split(/[ ,]+/).join('-').toLowerCase()}`, 
          id: item.id.toString() || '', 
          option: item.selectedOption, 
          size: item.selectedSize})}`
        } 
        className='cart-image-wrapper'
      >
        <Image
          src={item.defaultMedia}
          alt='Logo'
          fill
          sizes="(100vw)"
          className='cart-image'
        />
      </CustomLink>
      <div className='cart-info-container'>
        {item.discount > 0 && <div className='cart-info'><div className='cart-discount-badge'>{(item.discount * 100).toFixed(0)}% OFF</div></div> }
        <div className='cart-info'>
          <CustomLink 
            href={`/store/p?${new URLSearchParams({
              name: `${item.name.split(/[ ,]+/).join('-').toLowerCase()}`, 
              id: item.id.toString() || '', 
              option: item.selectedOption, 
              size: item.selectedSize})}`
            } 
            className='cart-image-wrapper'
          >
            <h2>{item.name}</h2>
          </CustomLink>
        </div>
        <div className='cart-info'>
          <h3>{capitalizeFirstLetter(item.optionType)}: {capitalizeFirstLetter(item.selectedOption)}</h3>
        </div>
        <div className='cart-info'>
          <h3>{capitalizeFirstLetter('Size')}: {item.selectedSize.toUpperCase()}</h3>
        </div>
        <div className='cart-info'>
          {item.discount <= 0 
            ? <div className='cart-price-wrapper'>
               <h4 className='cart-price'>
                  <span className='dollar-sign'>$</span>{(item.price * Math.max(1, item.selectedQuantity)).toFixed(2)}
                </h4> 
              </div>
            : <div className='cart-price-wrapper'>
                <h4 className='cart-price-strike'>
                  <span className='dollar-sign'>$</span>{(item.ogPrice * Math.max(1, item.selectedQuantity)).toFixed(2)}
                </h4>
                <h4 className='cart-price-discounted'>
                  <span className='dollar-sign'>$</span>{(item.price * Math.max(1, item.selectedQuantity)).toFixed(2)}
                </h4>
              </div>
          }
          {item.selectedQuantity > 0 
            ? <div className='cart-qty-container'><h3>Qty: </h3><NumberStepper min={1} value={item.selectedQuantity} onChange={handleQuantityStepper} size={20} doubleWidth={true} /></div>
            : <h3 className='cart-qty-oos'>Sorry, this item is unavailable</h3>
          }
        </div>
      </div>
      <button onClick={handleRemoveClick} aria-label='Remove item from bag' className='cart-close'>
        <svg
          aria-hidden
          viewBox="0 0 25 25" 
          fill="currentColor"
          stroke="currentColor"
          width={25}
          height={25}
        > 
          <path d="M18 7L7 18M7 7L18 18" strokeWidth="1.2" />
        </svg>
      </button>
    </div>
  )
}

const BagItemList = ({bagItems, setBagItems}: {bagItems: BagProduct[] | []; setBagItems: React.Dispatch<React.SetStateAction<BagProduct[] | []>>}) => {
  const { scrollableRef } = useBagContext();

  // Check if the "bagItems" array is empty or undefined.
  if (!bagItems || bagItems.length === 0) {
    return <h2 className='cart-header'>Your Bag is Empty</h2>;
  }

  // If the "bagItems" array is not empty, map over each item in the array and render a "BagCard" component for each item.
  return (
    <div ref={scrollableRef} className='cart-container'>
      {bagItems.map((item, index) => (
        <BagCard key={index} item={item} bagItems={bagItems} setBagItems={setBagItems}/>
      ))}
    </div>
  )
}

const Bag = () => {
  const {bagItems, setBagItems, forceOpen, forceElementRef} = useBagContext();
  const calculateCostsResponse = calculateCosts(bagItems);
  const roundedTotal = calculateCostsResponse.total.toFixed(2);
  const totalQuantity = bagItems.some(item => item.selectedQuantity === 0)
    ? '!'
    : bagItems.reduce((acc, item) => acc + item.selectedQuantity, 0);

  // This is an array of DropdownItem objects (the content of the dropdown) that will be passed to the DropdownButton component.
  const items: DropdownItem[] = [
    { name: 'Shopping Bag', type: 'component', component: <div className='cart-header'><h2>Your Bag</h2><h3>Total: <span className='dollar-sign'>$</span>{roundedTotal}</h3></div> },
    { name: 'Bag Items', type: 'component', component: <BagItemList bagItems={bagItems} setBagItems={setBagItems}/> },
    { name: 'View Bag', type: 'component', component: <CustomLink href='/cart' className='cart-dropdown-btn'>View Bag</CustomLink> },
    { name: 'Checkout', type: 'component', component: <CustomLink href='/checkout' className='cart-dropdown-btn'>Checkout</CustomLink> },
    // { name: 'Log', type: 'component', component: <button onClick={() => console.log(bagItems)}>Log</button>}
  ]

  return (
    <>
      <DropdownButton label={'Bag'} forceOpen={forceOpen} forceRef={forceElementRef} items={items} hover={false} orientation={'left'} showPointer={true} classNames={['cart-btn', 'cart-btn-focus']}>
        <span className='cart-icon-wrapper'>
          <svg
            aria-hidden
            viewBox="0 0 32 32"
            fill="currentColor"
            className='cart-icon'
          >
            <path d="M 16 3 C 13.253906 3 11 5.253906 11 8 L 11 9 L 6.0625 9 L 6 9.9375 L 5 27.9375 L 4.9375 29 L 27.0625 29 L 27 27.9375 L 26 9.9375 L 25.9375 9 L 21 9 L 21 8 C 21 5.253906 18.746094 3 16 3 Z M 16 5 C 17.65625 5 19 6.34375 19 8 L 19 9 L 13 9 L 13 8 C 13 6.34375 14.34375 5 16 5 Z M 7.9375 11 L 11 11 L 11 14 L 13 14 L 13 11 L 19 11 L 19 14 L 21 14 L 21 11 L 24.0625 11 L 24.9375 27 L 7.0625 27 Z"/>
          </svg>
          <CSSTransition
            in={totalQuantity === '!' || totalQuantity > 0}
            timeout={300}
            classNames="badge"
            unmountOnExit
          >
            <span className='cart-badge'>{totalQuantity !== '!' && totalQuantity > 99 ? '99+' : totalQuantity}</span>
          </CSSTransition>
        </span>
        <h2>Bag</h2>
      </DropdownButton>

      <Link href='/cart' aria-label='View Bag' className='cart-btn-mobile'>
        <svg
          aria-hidden
          viewBox="0 0 32 32"
          fill="currentColor"
          className='cart-icon'
        >
          <path d="M 16 3 C 13.253906 3 11 5.253906 11 8 L 11 9 L 6.0625 9 L 6 9.9375 L 5 27.9375 L 4.9375 29 L 27.0625 29 L 27 27.9375 L 26 9.9375 L 25.9375 9 L 21 9 L 21 8 C 21 5.253906 18.746094 3 16 3 Z M 16 5 C 17.65625 5 19 6.34375 19 8 L 19 9 L 13 9 L 13 8 C 13 6.34375 14.34375 5 16 5 Z M 7.9375 11 L 11 11 L 11 14 L 13 14 L 13 11 L 19 11 L 19 14 L 21 14 L 21 11 L 24.0625 11 L 24.9375 27 L 7.0625 27 Z"/>
        </svg>
        <CSSTransition
          in={totalQuantity === '!' || totalQuantity > 0}
          timeout={300}
          classNames="badge"
          unmountOnExit
        >
          <span className='cart-badge'>{totalQuantity !== '!' && totalQuantity > 99 ? '99+' : totalQuantity}</span>
        </CSSTransition>
      </Link>
    </>
  )
}

export default Bag
export { BagItemList, BagCard }