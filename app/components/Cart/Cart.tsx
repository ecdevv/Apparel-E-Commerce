import React from 'react';
import DropdownButton from '../Dropdown/DropdownButton';
import Image from 'next/image';
import './Cart.css'

// TODO: Accept props for store item (like a t-shirt)
const CartCard = () => {
  return (
    <div className='cart-card'>
      <Image
        src="/next.svg"
        alt='Logo'
        width='0'
        height='0'
        className='cart-image'
      />
      <div className='cart-info'>
        <h2>Item Name</h2>
        <div className='cart-info-second'>
          <h2>Item Price</h2>
          <h2>Qty: </h2>
        </div>
        <div className='cart-info-third'>
          <h2>Free Shipping</h2>
          <h2>TRASH BIN</h2>
        </div>
      </div>
    </div>
  )
}

// TODO: Implement a system to add items into an array from a database/api or .json file and map that data as props into CartCard; add conditional inside cart-container div for empty cart
const CartItemList = () => {
  return (
    <div className='cart-container'>
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
    </div>
  )
}

interface Item {
  name: string;
  type: 'component' | 'button' | 'link';
  component?: React.ReactElement;
  svg?: React.ReactElement;
}

const Cart = () => {
  const items: Item[] = [
    { name: 'Shopping Cart', type: 'component', component: <h2 className='cart-h2'>Shopping Cart</h2> },
    { name: 'Cart Items', type: 'component', component: <CartItemList /> },
    { name: 'View Cart', type: 'button' },
    { name: 'Checkout', type: 'button' },
  ]

  return (
    <DropdownButton label={'Cart'} items={items} hover={false} orientation={'left'} showPointer={true} classNames={['cart-btn', 'cart-btn-focus']}>
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        fill="currentColor"
        className='cart-icon'
      >
        <path d="M 16 3 C 13.253906 3 11 5.253906 11 8 L 11 9 L 6.0625 9 L 6 9.9375 L 5 27.9375 L 4.9375 29 L 27.0625 29 L 27 27.9375 L 26 9.9375 L 25.9375 9 L 21 9 L 21 8 C 21 5.253906 18.746094 3 16 3 Z M 16 5 C 17.65625 5 19 6.34375 19 8 L 19 9 L 13 9 L 13 8 C 13 6.34375 14.34375 5 16 5 Z M 7.9375 11 L 11 11 L 11 14 L 13 14 L 13 11 L 19 11 L 19 14 L 21 14 L 21 11 L 24.0625 11 L 24.9375 27 L 7.0625 27 Z"/>
      </svg>
      <h2>Cart</h2>
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

export default Cart
export { CartItemList, CartCard }