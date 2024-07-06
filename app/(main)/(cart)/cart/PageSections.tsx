'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { CustomLink } from '@/app/components/Buttons/Links/Links';
import NumberStepper from '@/app/components/Input/NumberStepper/NumberStepper';
import AddToWishlistButton from '@/app/components/Buttons/AddToWishlist/AddToWishlist';
import { BagProduct, WishlistProduct } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import { useBagContext } from '@/app/utility/contexts/BagContext';
import { useWishlistContext } from '@/app/utility/contexts/WishlistContext';
import { calculateCosts } from '@/server/mockValidations';
import '../cart.css';


const CartCard = ({item, bagItems, setBagItems}: {item: BagProduct; bagItems: BagProduct[] | []; setBagItems: React.Dispatch<React.SetStateAction<BagProduct[] | []>>}) => {
  const { wishItems, setWishItems, setForceOpen } = useWishlistContext();

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

  // This function removes the item from the wishItems array by finding the index of the item in the array and then using the splice method to remove that item from the array.
  const handleWishRemoveClick = () => {
    setForceOpen(true);
    const newWishItems = [...wishItems as WishlistProduct[]];
    const itemIndex = newWishItems.findIndex(
      (wishItem) => wishItem.id === item.id && wishItem.optionType === item.optionType && wishItem.selectedOption === item.selectedOption
    );

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

  // This function updates the quantity of the item in the bagItems array.
  const handleQuantityStepper = (value: number) => {
    const newBagItems = [...bagItems as BagProduct[]];
    const itemIndex = newBagItems.indexOf(item);
    newBagItems[itemIndex].selectedQuantity = value
    setBagItems(newBagItems);
    localStorage.setItem('bagItems', JSON.stringify(newBagItems));
  }

  return (
    <div id={item.index.toString()} className='cart-page-card'>
      <div className='cart-page-image-wrapper'>
        <Link 
          href={`/store/p?${new URLSearchParams({
            name: `${item.name.split(/[ ,]+/).join('-').toLowerCase()}`, 
            id: item.id.toString() || '', 
            option: item.selectedOption, 
            size: item.selectedSize})}`
          } 
          className='cart-page-link'
        >
          <Image
            src={item.defaultMedia}
            alt='Logo'
            fill
            sizes="(100vw)"
            className='cart-page-image'
          />
        </Link>
      </div>
      <div className='cart-page-info-container-wrapper'>
        <div className='cart-page-info-header'>
          <Link 
            href={`/store/p?${new URLSearchParams({
              name: `${item.name.split(/[ ,]+/).join('-').toLowerCase()}`, 
              id: item.id.toString() || '', 
              option: item.selectedOption, 
              size: item.selectedSize})}`
            } 
            className='cart-page-link'
          >
            {item.name}
          </Link>
        </div>
        <div className='cart-page-info-container'>
          <div className='cart-page-info-wrapper'>
            <div className='cart-page-info'>
              <h3>{capitalizeFirstLetter(item.optionType)}</h3>
              <h3>{capitalizeFirstLetter(item.selectedOption)}</h3>
            </div>
            <div className='cart-page-info'>
              <h3>{capitalizeFirstLetter('Size')}</h3>
              <h3>{item.selectedSize.toUpperCase()}</h3>
            </div>
          </div>
          <div className='cart-page-info'>
            {item.selectedQuantity > 0 
                ? <div className='cart-page-qty-container'><NumberStepper min={1} value={item.selectedQuantity} onChange={handleQuantityStepper} size={32} /></div>
                : <h3 className='cart-page-qty-oos'>Sorry, this item is unavailable</h3>
            }
            {item.discount <= 0
              ? <div className='cart-page-price-wrapper'>
                <h4 className='cart-page-price'>
                    <span className='dollar-sign'>$</span>{(item.price * Math.max(1, item.selectedQuantity)).toFixed(2)}
                  </h4> 
                </div>
              : <div className='cart-page-price-wrapper'>
                  <div className='cart-page-info'><div className='cart-page-discount-badge'>{(item.discount * 100).toFixed(0)}% OFF</div></div>
                  <h4 className='cart-page-price-strike'>
                    <span className='dollar-sign'>$</span>{(item.ogPrice * Math.max(1, item.selectedQuantity)).toFixed(2)}
                  </h4>
                  <h4 className='cart-page-price-discounted'>
                    <span className='dollar-sign'>$</span>{(item.price * Math.max(1, item.selectedQuantity)).toFixed(2)}
                  </h4>
                </div>
            }
          </div>
        </div>
        <div className='cart-page-buttons'>
          {wishItems.some(wishItem => wishItem.id === item.id && wishItem.selectedOption === item.selectedOption) // Check if the item is already in the wishlist
            ? <button onClick={handleWishRemoveClick} aria-label={`Remove ${item.name} from wishlist`} className='cart-page-btn'>
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
                Remove from Wishlist
              </button>
            : <AddToWishlistButton id={item.id} option={item.selectedOption} icon={true} className='cart-page-btn' />
          }
          <button onClick={handleRemoveClick} aria-label={`Remove ${item.name} from bag`} className='cart-page-btn'>
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
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

const CartDetails = () => {
  const { bagItems, setBagItems } = useBagContext();

  // If the bagItems array is empty, return an empty cart message.
  if (!bagItems || bagItems.length === 0) {
    return (
      <div className='empty-cart'>
        <h1>Cart is empty</h1>
        <Link href='/store'>Shop Now</Link> 
      </div>
    )
  }
  
  // Rounded values of the costs of the bagItems calculated from the mock backend:
  const calculateCostsResponse = calculateCosts(bagItems);
  const roundedSubTotal = calculateCostsResponse.subTotal.toFixed(2);
  const roundedTotalDiscount = calculateCostsResponse.totalDiscount.toFixed(2);
  const roundedTotal = calculateCostsResponse.total.toFixed(2);
  const roundedTax = calculateCostsResponse.taxAmount.toFixed(2);
  const roundedShipping = calculateCostsResponse.shippingCost.toFixed(2);
  const roundedGrandTotal = calculateCostsResponse.grandTotal.toFixed(2);
  const totalQuantity = bagItems.some(item => item.selectedQuantity === 0)
    ? 'An Item is Unavailable'
    : bagItems.reduce((acc, item) => acc + item.selectedQuantity, 0);

  return (
    <section className='cart-page-container'>
      <div className='cart-page-content'>
        <div className='cart-page-card-container'>
          <h1 className='cart-page-header'>Your Bag ({totalQuantity})</h1>
          {bagItems.map((item, index) => (
            <CartCard key={index} item={item} bagItems={bagItems} setBagItems={setBagItems}/>
          ))}
        </div>
        <div className='cart-page-summary-container'>
          <h1 className='cart-page-summary-header'>Summary</h1>
          <div className='cart-page-summary-content'>
            <div className='cart-page-costs-info'><h2>Subtotal</h2><h2><span className='dollar-sign margin-right'>$</span>{roundedSubTotal}</h2></div>
            <div className='cart-page-costs-info'><h2>Discount</h2><h2 className='discount'><span className='dollar-sign margin-right'>-$</span>{roundedTotalDiscount}</h2></div>
            <div className='cart-page-costs-info'><h2>Total</h2><h2><span className='dollar-sign margin-right'>$</span>{roundedTotal}</h2></div>
            <div>
              <div className='cart-page-costs-info'><h2>Tax</h2><h2><span className='dollar-sign margin-right'>$</span>{roundedTax}</h2></div>
              <div className='cart-page-tax-info'>Will be calculated based on the delivery location</div>
            </div>
            <div>
              <div className='cart-page-costs-info'><h2>Shipping</h2><h2><span className='dollar-sign margin-right'>$</span>{roundedShipping}</h2></div>
              <div className='cart-page-tax-info'>Will be calculated based on the delivery location</div>
            </div>
            <div className='cart-page-costs-info grand-total'><h2>Grand Total</h2><h2><span className='dollar-sign margin-right'>$</span>{roundedGrandTotal}</h2></div>
            <div className='cart-page-summary-btns'>
              <CustomLink href='/checkout' className='cart-page-dropdown-btn'>Checkout</CustomLink>
              <CustomLink href='/store' className='cart-page-dropdown-btn second'>Continue Shopping</CustomLink>
            </div>
            <div className='cart-page-payment-icons'>
              <Image src='/images/payment/Visa-card-dark.svg' alt='Visa' width={50} height={30} />
              <Image src='/images/payment/MasterCard-dark.svg' alt='Mastercard' width={50} height={30} />
              <Image src='/images/payment/AmericanExpress-dark.svg' alt='American Express' width={50} height={30} />
              <Image src='/images/payment/Paypal-card-dark.svg' alt='Paypal' width={50} height={30} />
              <Image src='/images/payment/Apple-card-dark.svg' alt='Apple Pay' width={50} height={30} />
              <Image src='/images/payment/Klarna-card-dark.svg' alt='Klarna' width={50} height={30} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartDetails
