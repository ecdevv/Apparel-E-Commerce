'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/app/components/Loading/Loading';
import { CustomLink } from '@/app/components/Buttons/General/General';
import AddToBagButton from '@/app/components/Buttons/AddToBag/AddToBag';
import { BagProduct, WishlistProduct } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import { useWishlistContext } from '@/app/utility/contexts/WishlistContext';
import { useBagContext } from '@/app/utility/contexts/BagContext';

const WishlistCard = ({item, wishItems, setWishItems}: {item: WishlistProduct; wishItems: WishlistProduct[] | []; setWishItems: React.Dispatch<React.SetStateAction<WishlistProduct[] | []>>;}) => {
  const { bagItems, setBagItems, setForceOpen } = useBagContext();
  
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

  // This function removes the item from the BagItems array by finding the index of the item in the array and then using the splice method to remove that item from the array.
  const handleBagRemoveClick = () => {
    setForceOpen(true);
    const newBagItems = [...bagItems as BagProduct[]];
    const itemIndex = newBagItems.findIndex(
      (bagItem) => bagItem.id === item.id && bagItem.optionType === item.optionType && bagItem.selectedOption === item.selectedOption && bagItem.selectedSize === item.selectedSize
    );
    // Decrement the index of all items after the removed item.
    newBagItems.forEach((item, index) => {
      if (index > itemIndex) {
        item.index -= 1;
      }
    });
    newBagItems.splice(itemIndex, 1);
    setBagItems(newBagItems);
    localStorage.setItem('BagItems', JSON.stringify(newBagItems));
  }

  return (
    <div id={item.index.toString()} className='cart-page-card wishlist-card'>
      <div className='cart-page-image-wrapper cart-desktop'>
        <Link 
          href={`/store/p?${new URLSearchParams({
            name: `${item.name.split(/[ ,]+/).join('-').toLowerCase()}`, 
            id: item.id.toString() || '', 
            option: item.selectedOption
          })}`
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
        <div className='cart-page-info-header wishlist-card'>
          <div className='cart-page-image-wrapper cart-mobile'>
            <Link 
              href={`/store/p?${new URLSearchParams({
                name: `${item.name.split(/[ ,]+/).join('-').toLowerCase()}`, 
                id: item.id.toString() || '', 
                option: item.selectedOption,
                size: item.selectedSize
              })}`
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
              size: item.selectedSize
            })}`
            } 
            className='cart-page-link'
          >
            {item.name}
          </Link>
        </div>
        <div className='cart-page-info-container wishlist-card'>
          <div className='cart-page-info-wrapper'>
            <div className='cart-page-info'>
              <span>{capitalizeFirstLetter(item.optionType)}</span>
              <span>{capitalizeFirstLetter(item.selectedOption)}</span>
            </div>
            <div className='cart-page-info'>
              <span>{capitalizeFirstLetter('size')}</span>
              <span>{item.selectedSize.toUpperCase()}</span>
            </div>
          </div>
          <div className='cart-page-info qty'>
            {item.inStock === true 
                ? <h3 className='cart-page-qty'>This item is currently in stock!</h3>
                : <h3 className='cart-page-qty oos'>Sorry, this item is unavailable</h3>
            }
            {item.discount <= 0
              ? <div className='cart-page-price-wrapper'>
                  <h4 className='cart-page-price'>
                    <span className='dollar-sign'>$</span>{(item.price).toFixed(2)}
                  </h4> 
                </div>
              : <div className='cart-page-price-container'>
                  <div className='cart-page-discount-badge'>{(item.discount * 100).toFixed(0)}% OFF</div>
                  <div className='cart-page-price-wrapper'>
                    <h4 className='cart-page-price-strike'>
                      <span className='dollar-sign'>$</span>{(item.ogPrice).toFixed(2)}
                    </h4>
                    <h4 className='cart-page-price-discounted'>
                      <span className='dollar-sign'>$</span>{(item.price ).toFixed(2)}
                    </h4>
                  </div>
                </div>
            }
          </div>
        </div>
        <div className='cart-page-buttons wishlist-card'>
          {bagItems.some(bagItem => bagItem.id === item.id && bagItem.optionType === item.optionType && bagItem.selectedOption === item.selectedOption && bagItem.selectedSize === item.selectedSize) // Check if the item is already in the Bag
            ? <button onClick={handleBagRemoveClick} aria-label={`Remove ${item.name} from bag`} className='cart-page-btn'>
                <svg
                  aria-hidden
                  viewBox="0 0 25 25" 
                  fill="currentColor"
                  stroke="currentColor"
                  className='cart-page-btn-svg'
                > 
                  <path d="M18 7L7 18M7 7L18 18" strokeWidth="1.2" />
                </svg>
                Remove from Bag
              </button>
            : item.inStock === true 
                ? <AddToBagButton id={item.id} option={item.selectedOption} size={item.selectedSize} icon={true} className='cart-page-btn'>Add to Bag</AddToBagButton>
                : <AddToBagButton id={item.id} option={item.selectedOption} size={item.selectedSize} icon={false} className='cart-page-btn'>
                    <svg 
                      aria-hidden
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      width={20}
                      height={20}
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </g>
                    </svg>
                    Unavailable
                  </AddToBagButton>
          }
          <button onClick={handleRemoveClick} aria-label={`Remove ${item.name} from wishlist`} className='cart-page-btn'>
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

const WishlistDetails = () => {
  const { wishItems, setWishItems, isLoading } = useWishlistContext();
  const totalQuantity = wishItems.length;

  if (isLoading) {
    return <section className='cart-page-container'><div className='loading-page'>Loading...<Loading /></div></section>
  }

  // If the wishItems array is empty, return an empty cart message.
  return (
    <section className='cart-page-container'>
      {wishItems.length !== 0
        ? <div className='wish-page-content'>
            <div className='cart-page-card-container'>
              <div className='cart-page-header'>
                <h1 className='cart-page-header-h1'>Your Wishlist ({totalQuantity})</h1>
              </div>
              {wishItems.map((item, index) => (
                <WishlistCard key={index} item={item} wishItems={wishItems} setWishItems={setWishItems} />
              ))}
            </div>
          </div>
        : <div className='empty-cart'>
            <div className="circle-background">
              <svg 
                aria-label="Empty wishlist svg image"
                viewBox="0 -1.96 82.142 82.142" 
                fill="currentColor"
                className='empty-svg-star'
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g id="star_gold_orange" data-name="star gold orange" transform="translate(-462.47 -619.736)">
                    <rect id="Rectangle_18" data-name="Rectangle 18" width="0.003" height="0.004" transform="translate(503.588 662.924) rotate(-29.055)" fill="gray"></rect>
                    <rect id="Rectangle_19" data-name="Rectangle 19" width="0.002" height="0.002" transform="translate(503.591 662.923)" fill="gray"></rect>
                    <path id="Path_72" data-name="Path 72" d="M503.592,662.926Z" fill="gray"></path>
                    <path id="Path_73" data-name="Path 73" d="M503.592,662.923v0l41.02-13.494-27.587-5.138-13.433,18.629Z" fill="#BBBBBB"></path>
                    <rect id="Rectangle_20" data-name="Rectangle 20" width="0.002" height="0.002" transform="translate(503.591 662.925)" fill="gray"></rect>
                    <path id="Path_74" data-name="Path 74" d="M503.592,662.923Z" fill="gray"></path>
                    <path id="Path_75" data-name="Path 75" d="M525.465,669.942l19.147-20.51-41.02,13.494Z" fill="#AAAAAA"></path>
                    <path id="Path_76" data-name="Path 76" d="M503.592,662.923Z" fill="gray"></path> <path id="Path_77" data-name="Path 77" d="M481.772,670.1,478.33,697.95l25.256-35.023Z" fill="#BBBBBB"></path>
                    <path id="Path_78" data-name="Path 78" d="M503.586,662.926,478.33,697.95l25.345-12.057-.083-22.967Z" fill="#999999"></path>
                    <path id="Path_79" data-name="Path 79" d="M517.025,644.294l-13.588-24.559.155,43.188Z" fill="#999999"></path>
                    <path id="Path_80" data-name="Path 80" d="M503.592,662.926h0L529.1,697.77l-3.632-27.828Z" fill="#999999"></path>
                    <path id="Path_81" data-name="Path 81" d="M503.592,662.926l.083,22.967L529.1,697.77l-25.505-34.844Z" fill="#AAAAAA"></path>
                    <path id="Path_82" data-name="Path 82" d="M503.592,662.923h0l-.155-43.187-13.416,24.652,13.57,18.535Z" fill="#BBBBBB"></path>
                    <path id="Path_83" data-name="Path 83" d="M490.021,644.388l-27.551,5.336,41.122,13.2Z" fill="#AAAAAA"></path>
                    <path id="Path_84" data-name="Path 84" d="M503.592,662.923h0l-41.122-13.2,19.3,20.375,21.814-7.173Z" fill="#999999"></path>
                  </g> 
                </g>
              </svg>
            </div>
            <h1 className='empty-h1'>Your Wishlist is Empty</h1>
            <CustomLink href='/store' className='btn'>Shop Now</CustomLink>
          </div>
      }
    </section>
  )
}

export default WishlistDetails
