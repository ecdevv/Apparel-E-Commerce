'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/app/components/Loading/Loading';
import { CustomLink } from '@/app/components/Buttons/General/General';
import NumberStepper from '@/app/components/Input/NumberStepper/NumberStepper';
import AddToWishlistButton from '@/app/components/Buttons/AddToWishlist/AddToWishlist';
import { BagProduct, WishlistProduct } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import { useBagContext } from '@/app/utility/contexts/BagContext';
import { useWishlistContext } from '@/app/utility/contexts/WishlistContext';
import { calculateCosts } from '@/server/mockValidations';


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
      (wishItem) => wishItem.id === item.id && wishItem.optionType === item.optionType && wishItem.selectedOption === item.selectedOption && wishItem.selectedSize === item.selectedSize
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
      <div className='cart-page-image-wrapper cart-desktop'>
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
            alt={`${item.name} - option: ${item.selectedOption} - image`}
            fill
            sizes="(100vw)"
            className='cart-page-image'
          />
        </Link>
      </div>
      <div className='cart-page-info-container-wrapper'>
        <div className='cart-page-info-header'>
          <div className='cart-page-image-wrapper cart-mobile-1024'>
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
                alt={`${item.name}`}
                fill
                sizes="(100vw)"
                className='cart-page-image'
              />
            </Link>
          </div>
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
              <span>{capitalizeFirstLetter(item.optionType)}</span>
              <span>{capitalizeFirstLetter(item.selectedOption)}</span>
            </div>
            <div className='cart-page-info'>
              <span>{capitalizeFirstLetter('Size')}</span>
              <span>{item.selectedSize.toUpperCase()}</span>
            </div>
          </div>
          <div className='cart-page-info qty'>
            {item.selectedQuantity > 0 
                ? <>
                  <div className='cart-desktop'><NumberStepper min={1} value={item.selectedQuantity} onChange={handleQuantityStepper} size={28} /></div>
                  <div className='cart-mobile-1024 ns'><NumberStepper min={1} value={item.selectedQuantity} onChange={handleQuantityStepper} size={24} /></div>
                  <div className='cart-mobile-450'><NumberStepper min={1} value={item.selectedQuantity} onChange={handleQuantityStepper} size={21} /></div>
                  </>
                : <h3 className='cart-page-qty oos'>Sorry, this item is unavailable</h3>
            }
            {item.discount <= 0
              ? <div className='cart-page-price-wrapper'>
                  <h4 className='cart-page-price'>
                    <span className='dollar-sign'>$</span>{(item.price * Math.max(1, item.selectedQuantity)).toFixed(2)}
                  </h4> 
                </div>
              : <div className='cart-page-price-container'>
                  <div className='cart-page-discount-badge'>{(item.discount * 100).toFixed(0)}% OFF</div>
                  <div className='cart-page-price-wrapper'>
                    <h4 className='cart-page-price-strike'>
                      <span className='dollar-sign'>$</span>{(item.ogPrice * Math.max(1, item.selectedQuantity)).toFixed(2)}
                    </h4>
                    <h4 className='cart-page-price-discounted'>
                      <span className='dollar-sign'>$</span>{(item.price * Math.max(1, item.selectedQuantity)).toFixed(2)}
                    </h4>
                  </div>
                </div>
            }
          </div>
        </div>
        <div className='cart-page-buttons'>
          {wishItems.some(wishItem => wishItem.id === item.id && wishItem.optionType === item.optionType && wishItem.selectedOption === item.selectedOption && wishItem.selectedSize === item.selectedSize) // Check if the item is already in the wishlist
            ? <button onClick={handleWishRemoveClick} aria-label={`Remove ${item.name} from wishlist`} className='cart-page-btn'>
                <svg
                  aria-hidden
                  viewBox="0 0 25 25" 
                  fill="currentColor"
                  stroke="currentColor"
                  className='cart-page-btn-svg'
                > 
                  <path d="M18 7L7 18M7 7L18 18" strokeWidth="1.2" />
                </svg>
                Remove from Wishlist
              </button>
            : <AddToWishlistButton id={item.id} option={item.selectedOption} size={item.selectedSize} icon={true} className='cart-page-btn'>Add to Bag</AddToWishlistButton>
          }
          <button onClick={handleRemoveClick} aria-label={`Remove ${item.name} from bag`} className='cart-page-btn'>
            <svg
              aria-hidden
              viewBox="0 0 25 25" 
              fill="currentColor"
              stroke="currentColor"
              className='cart-page-btn-svg'
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
  const { bagItems, setBagItems, isLoading } = useBagContext();
  
  // Display values to the hundredths place of the costs of the bagItems calculated from the mock backend:
  const calculateCostsResponse = calculateCosts(bagItems);
  const subTotal = calculateCostsResponse.subTotal.toFixed(2);
  const totalDiscount = calculateCostsResponse.totalDiscount.toFixed(2);
  const totalCost = calculateCostsResponse.total.toFixed(2);
  const taxCost = calculateCostsResponse.taxCost.toFixed(2);
  const shippingCost = calculateCostsResponse.shippingCost.toFixed(2);
  const grandTotal = calculateCostsResponse.grandTotal.toFixed(2);
  const totalQuantity = bagItems.some(item => item.selectedQuantity === 0)
    ? 'An Item is Unavailable'
    : bagItems.reduce((acc, item) => acc + item.selectedQuantity, 0);

  if (isLoading) {
    return <section className='cart-page-container'><div className='loading-page'>Loading...<Loading /></div></section>
  }

  // If the bagItems array is empty, return an empty cart message.
  return (
    <section className='cart-page-container'>
      {bagItems.length !== 0
        ? <div className='cart-page-content'>
            <div className='cart-page-card-container'>
              <div className='cart-page-header'>
                <h1 className='cart-page-header-h1'>Your Bag ({totalQuantity})</h1>
                <Link href='#summary' className='cart-page-header-link'>View Summary</Link>
              </div>
              {bagItems.map((item, index) => (
                <CartCard key={index} item={item} bagItems={bagItems} setBagItems={setBagItems}/>
              ))}
            </div>
            <div className='cart-page-summary-container'>
              <h1 id='summary' className='cart-page-summary-header'>Summary</h1>
              <div className='cart-page-summary-content'>
                <div className='cart-page-costs-info'><h2>Subtotal</h2><h2><span className='dollar-sign margin-right'>$</span>{subTotal}</h2></div>
                <div className='cart-page-costs-info'><h2>Discount</h2><h2 className='discount'><span className='dollar-sign margin-right'>-$</span>{totalDiscount}</h2></div>
                <div className='cart-page-costs-info'><h2>Total</h2><h2><span className='dollar-sign margin-right'>$</span>{totalCost}</h2></div>
                <div>
                  <div className='cart-page-costs-info'><h2>Tax</h2><h2><span className='dollar-sign margin-right'>$</span>{taxCost}</h2></div>
                  <div className='cart-page-tax-info'>Will be calculated based on the delivery location</div>
                </div>
                <div>
                  <div className='cart-page-costs-info'><h2>Shipping</h2><h2><span className='dollar-sign margin-right'>$</span>{shippingCost}</h2></div>
                  <div className='cart-page-tax-info'>Will be calculated based on the delivery location</div>
                </div>
                <div className='cart-page-costs-info grand-total'><h2>Grand Total</h2><h2><span className='dollar-sign margin-right'>$</span>{grandTotal}</h2></div>
                <div className='cart-page-summary-btns'>
                  <CustomLink href='/checkout' className='btn'>Checkout</CustomLink>
                  <CustomLink href='/store' className='btn second'>Continue Shopping</CustomLink>
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
        : <div className='empty-cart'>
            <div className="circle-background">
              <svg 
                aria-label="Empty bag svg image"
                viewBox="0 0 280.028 280.028" 
                fill="currentColor"
                className='empty-svg-box'
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <g>
                    <path fill="#444444" d="M35.004,0h210.02v78.758H35.004V0z"></path>
                    <path fill="#AAAAAA" d="M262.527,61.256v201.27c0,9.626-7.876,17.502-17.502,17.502H35.004 c-9.626,0-17.502-7.876-17.502-17.502V61.256H262.527z"></path>
                    <path fill="#AAAAAA" d="M35.004,70.007h26.253V26.253L35.004,0V70.007z M218.771,26.253v43.754h26.253V0L218.771,26.253z"></path>
                    <path fill="#666666" d="M61.257,61.256V26.253L17.503,61.256H61.257z M218.771,26.253v35.003h43.754L218.771,26.253z"></path>
                    <path fill="#444444" d="M65.632,105.01c-5.251,0-8.751,3.5-8.751,8.751s3.5,8.751,8.751,8.751s8.751-3.5,8.751-8.751 C74.383,108.511,70.883,105.01,65.632,105.01z M214.396,105.01c-5.251,0-8.751,3.5-8.751,8.751s3.5,8.751,8.751,8.751 s8.751-3.5,8.751-8.751C223.148,108.511,219.646,105.01,214.396,105.01z"></path>
                    <path fill="#444444" d="M65.632,121.637c5.251,0,6.126,6.126,6.126,6.126c0,39.379,29.753,70.882,68.257,70.882 s68.257-31.503,68.257-70.882c0,0,0.875-6.126,6.126-6.126s6.126,6.126,6.126,6.126c0,46.38-35.003,83.133-80.508,83.133 s-80.508-37.629-80.508-83.133C59.507,127.762,60.382,121.637,65.632,121.637z"></path>
                    <path fill="#FFFFFF" d="M65.632,112.886c5.251,0,6.126,6.126,6.126,6.126c0,39.379,29.753,70.882,68.257,70.882 s68.257-31.503,68.257-70.882c0,0,0.875-6.126,6.126-6.126s6.126,6.126,6.126,6.126c0,46.38-35.003,83.133-80.508,83.133 s-80.508-37.629-80.508-83.133C59.507,119.012,60.382,112.886,65.632,112.886z"></path> 
                  </g> 
                </g>
              </svg>
            </div>
            <h1 className='empty-h1'>Your Bag is Empty</h1>
            <CustomLink href='/store' className='btn'>Shop Now</CustomLink>
          </div>
      }
    </section>
  )
}

export default CartDetails
