'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { CustomLink } from '../../Buttons/General/General';
import DropdownButton from '../../Buttons/Dropdown/DropdownButton';
import { DropdownItem, WishlistProduct } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import { useWishlistContext } from '@/app/utility/contexts/WishlistContext';
import '../Cart.css'

const WishlistCard = ({item, wishItems, setWishItems}: {item: WishlistProduct; wishItems: WishlistProduct[] | []; setWishItems: React.Dispatch<React.SetStateAction<WishlistProduct[] | []>>}) => {
  // This function removes the item from the wishItems array by finding the index of the item in the array and then using the splice method to remove that item from the array.
  const handleRemoveClick = () => {
    const newWishItems = [...wishItems as WishlistProduct[]];
    const itemIndex = newWishItems.indexOf(item);
    // Decrement the index of all items after the removed item.
    newWishItems.forEach((item, index) => {
      if (index > itemIndex) {
        item.index -= 1;
      }
    });
    newWishItems.splice(itemIndex, 1);
    setWishItems(newWishItems);
    localStorage.setItem('wishItems', JSON.stringify(newWishItems));
  }

  return (
    <div id={item.index.toString()} className='cart-card wish'>
      <CustomLink 
        href={`/store/p?${new URLSearchParams({
          name: `${item.name.split(/[ ,]+/).join('-').toLowerCase()}`, 
          id: item.id.toString() || '', 
          option: item.selectedOption,
          size: item.selectedSize
        })}`} 
        className='cart-image-wrapper'
      >
        <Image
          src={item.defaultMedia}
          alt={`${item.name} - option: ${item.selectedOption} - image`}
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
              size: item.selectedSize
            })}`} 
          >
            <h2>{item.name}</h2>
          </CustomLink>
        </div>
        <h3>{capitalizeFirstLetter(item.optionType)}: {capitalizeFirstLetter(item.selectedOption)}</h3>
        <h3>{capitalizeFirstLetter('size')}: {item.selectedSize.toUpperCase()}</h3>
        <div className='cart-info'>
          {item.discount <= 0 
            ? <div className='cart-price-wrapper'>
               <h4 className='cart-price'>
                  <span className='dollar-sign'>$</span>{item.price.toFixed(2)}
                </h4> 
              </div>
            : <div className='cart-price-wrapper'>
                <h4 className='cart-price-strike'>
                  <span className='dollar-sign'>$</span>{item.ogPrice.toFixed(2)}
                </h4>
                <h4 className='cart-price-discounted'>
                  <span className='dollar-sign'>$</span>{item.price.toFixed(2)}
                </h4>
              </div>
          }
        </div>
      </div>
      <button onClick={handleRemoveClick} aria-label='Remove item from wishlist' className='cart-close'>
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

const WishlistItemList = ({wishItems, setWishItems}: {wishItems: WishlistProduct[] | []; setWishItems: React.Dispatch<React.SetStateAction<WishlistProduct[] | []>>}) => {
  const { scrollableRef } = useWishlistContext();

  // Check if the "wishItems" array is empty or undefined.
  if (!wishItems || wishItems.length === 0) {
    return <h2 className='cart-header'>Your Wishlist is Empty</h2>;
  }

  // If the "wishItems" array is not empty, map over each item in the array and render a "WishCard" component for each item.
  return (
    <div ref={scrollableRef} className='cart-container'>
      {wishItems.map((item, index) => (
        <WishlistCard key={index} item={item} wishItems={wishItems} setWishItems={setWishItems}/>
      ))}
    </div>
  )
}

const Wishlist = () => {
  const {wishItems, setWishItems, forceOpen, forceElementRef} = useWishlistContext();
  const totalItems = wishItems.length;

  // This is an array of DropdownItem objects (the content of the dropdown) that will be passed to the DropdownButton component.
  const items: DropdownItem[] = [
    { name: 'Wishlist', type: 'component', component: <div className='cart-header'><h2>Your Wishlist</h2></div> },
    { name: 'Wish Items', type: 'component', component: <WishlistItemList wishItems={wishItems} setWishItems={setWishItems}/> },
    { name: 'View Wishlist', type: 'component', component: <CustomLink href='/wishlist' className='btn'>View Wishlist</CustomLink> },
    // { name: 'Log', type: 'component', component: <button onClick={() => console.log(wishItems)}>Log</button>}
  ]

  return (
    <>
      <DropdownButton label={'Wishlist'} forceOpen={forceOpen} forceRef={forceElementRef} items={items} hover={false} orientation={'left'} showPointer={true} classNames={['wish-btn', 'cart-btn-focus']}>
        <span className='cart-icon-wrapper'>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className='cart-icon'
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <CSSTransition
            in={totalItems > 0}
            timeout={300}
            classNames="badge"
            unmountOnExit
          >
            <span className='cart-badge'>{totalItems}</span>
          </CSSTransition>
        </span>
        <h2>Wishlist</h2>
      </DropdownButton>
  
      <Link href='/wishlist' aria-label='View Wishlist' className='cart-btn-mobile'>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className='cart-icon'
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <CSSTransition
          in={totalItems > 0}
          timeout={300}
          classNames="badge"
          unmountOnExit
        >
          <span className='cart-badge'>{totalItems}</span>
        </CSSTransition>
      </Link>
    </>
  )
}

export default Wishlist
export { WishlistItemList, WishlistCard }