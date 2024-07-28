import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Gallery from '@/app/components/Gallery/Gallery';
import Carousel from '@/app/components/Carousel/Carousel';
import Rating from '@/app/components/Rating/Rating';
import NumberStepper from '@/app/components/Input/NumberStepper/NumberStepper';
import AddToBagButton from '@/app/components/Buttons/AddToBag/AddToBag';
import AddToWishlistButton from '@/app/components/Buttons/AddToWishlist/AddToWishlist';
import AccordionMenu from '@/app/components/Accordion/AccordionMenu';
import { Product } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import './product.css'

interface ProductDetailsProps {
  product: Product,
  productReviews: any,
  averageRating: number
  selectedOption: string
  selectedSize: string
  optionInStock: boolean
  Images: string[]
  discount: number
  ogPrice: number
  price: number
}

const ProductDetails = ( {
  product, productReviews, averageRating, selectedOption, selectedSize, optionInStock, Images, discount, ogPrice, price
}: ProductDetailsProps ) => {  

  // Accordion menu items
  const detailsAccordion = product.details ? [product.description, product.details] : [product.description];
  const careAccordion = product.care ? ['To maintain the luxurious quality of your leather jacket, we recommend following these care guidelines:', product.care] : [];
  const shippingAccordion = ["Complimentary shipping on all orders.", "Free returns within 30 days, excluding final sale items, underwear, bottles, and swimwear."];

  return (
    <section className='product-container'>
      <div className='product-gallery-container'><Gallery Images={Images as (string[])} /></div>
      <div className='product-carousel-container'><Carousel Images={Images} Width={100} BorderWidth={0} ShowDotBtns={true} /></div>
      <div className='product-content'>
        <div className='product-content-header'>
          {discount > 0 ? <div className='product-discount-badge'>{(discount * 100).toFixed(0)}% OFF</div> : <></>}
          <h2 className='product-h2'>{product.name}</h2>
          <Rating rating={averageRating} reviewCount={productReviews.length} />
          {discount <= 0 
            ? <div className='product-price-wrapper'>
                <h2 className='product-price'>
                  ${price.toFixed(2)}
                </h2> 
              </div>
            : <div className='product-price-wrapper'>
                <h2 className='product-price-strike'>
                  ${ogPrice.toFixed(2)}
                </h2>
                <h2 className='product-price-discounted'>
                  ${price.toFixed(2)}
                </h2>
              </div>
          }
        </div>
        <div className='product-options-container'>
          <div className='product-options-header'>
            <h3 className='product-h3'>{`${capitalizeFirstLetter(product.options[0].type)}`}:</h3>
            <h4 className='product-h4'>{`${capitalizeFirstLetter(selectedOption)}`}</h4>
          </div>
          <div className='product-options-btn-container'>
            {product.options.map((option, index) => (
              <Link 
                key={index} 
                href={`?${new URLSearchParams({
                  name: product.name.split(/[ ,]+/).join('-').toLowerCase(), 
                  id: product.product_id.toString(), 
                  option: option.name.toLowerCase(), 
                  size: selectedSize.toLowerCase()
                })}`}
                scroll={false}
                replace
                aria-label={`Product ${capitalizeFirstLetter(option.type)} Option: ${option.name}`} 
                className={`product-option-btn option ${selectedOption === option.name ? 'selected' : ''}`} 
                style={{'--bs-opacity': '0.5'} as React.CSSProperties}
              >
                <Image
                  src={option.media[0].url}
                  alt={option.name}
                  fill
                  sizes="(100vw, 100vh)"
                  className='product-option-image'
                  priority
                />
              </Link>
            ))}
          </div>
        </div>
        <div className='product-options-container'>
          <h3 className='product-h3'>Size:</h3>
          <div className='product-options-btn-container'>
            {product.options.find((option) => option.name === selectedOption)?.sizes.map((sizeObj, index) => (
              <Link 
                key={index} 
                href={`?${new URLSearchParams({
                  name: product.name.split(/[ ,]+/).join('-').toLowerCase(), 
                  id: product.product_id.toString(), 
                  option: selectedOption, 
                  size: sizeObj.name.toLowerCase()
                })}`} 
                scroll={false} 
                replace
                aria-label={`Product Size Option: ${sizeObj.name}`} 
                className={`product-option-btn size ${selectedSize === sizeObj.name.toLowerCase() ? 'selected' : ''} ${sizeObj.stock <= 0 ? 'disabled' : ''}`} 
                style={{'--bs-opacity': '0.15'} as React.CSSProperties}
              >
                {sizeObj.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        <div className='product-options-container'>
          {optionInStock === true
            ? <>
                <h3 className='product-h3'>Quantity:</h3>
                <div className='product-options-btn-container'>
                  <NumberStepper min={1} value={1} product={true} />
                </div>
              </>
            : <div className='product-out-of-stock'>Sorry, we&apos;re out of stock.</div>
          }
        </div>        

        <div className='product-btn-container'>
          <AddToBagButton id={product.product_id} option={selectedOption} size={selectedSize}>Add to Bag</AddToBagButton>
          <AddToWishlistButton id={product.product_id} option={selectedOption} size={selectedSize}>Add to Wishlist</AddToWishlistButton>
        </div>

        <div className='product-details-container'>
          <AccordionMenu title={'Details'} content={detailsAccordion} />
          { product.care ? <AccordionMenu title={'Care'} content={careAccordion} /> : null }
          <AccordionMenu title={'Shipping & Returns'} content={shippingAccordion} />
        </div>
      </div>
    </section>
  )
}

export default ProductDetails

