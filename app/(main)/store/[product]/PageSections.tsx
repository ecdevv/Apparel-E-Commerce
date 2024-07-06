'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Gallery from '@/app/components/Gallery/Gallery';
import Carousel from '@/app/components/Carousel/Carousel';
import Rating from '@/app/components/Rating/Rating';
import NumberStepper from '@/app/components/Input/NumberStepper/NumberStepper';
import AddToBagButton from '@/app/components/Buttons/AddToBag/AddToBag';
import AddToWishlistButton from '@/app/components/Buttons/AddToWishlist/AddToWishlist';
import AccordionMenu from '@/app/components/Accordion/AccordionMenu';
import { Product } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import { validateProduct, getSelectedOption } from '@/server/mockValidations';
import './product.css'

// Validation for refreshing the page and the url is invalid (incorrect name, options, and sizes)
const validateUrl = (product: Product, selectedOption: string, selectedSize: string) => {
  if (typeof window === 'undefined') return;

  // Create a new URL object and update the search params
  const newUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams({
    name: product.name.split(/[ ,]+/).join('-').toLowerCase(),
    id: product.product_id.toString(),
    option: selectedOption,
    size: selectedSize
  });

  // Update the search params in the URL
  newUrl.search = searchParams.toString();
  
  // Replace the current URL with the updated one
  window.history.replaceState({}, '', newUrl.toString());
};

const ProductError = ({text}: {text: string}) => {
  return (
    <div>{text}</div>
  )
}

const ProductDetails = () => {
  const [hoveredOption, setHoveredOption] = React.useState('');
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);
  const searchParams = useSearchParams();

  // Find and validate the product and product reviews
  const productResponse = validateProduct(searchParams);

  // Update the url on page load/refresh if product is found when searchParams changes
  React.useEffect(() => {
    if (!productResponse.error) {
      validateUrl(product, selectedOption, selectedSize);
    }
  }, [searchParams]);


  if (productResponse.error) {
    return <ProductError text="Product not found" />;
  }
  
  const product: Product = productResponse.product;
  const productReviews = productResponse.productReviews
  const averageRating = productResponse.averageRating;
  
  // Setting all of the selected option's details (and validates based on the search param)
  const selectedOptionResponse = getSelectedOption(searchParams, product);
  const selectedOption = selectedOptionResponse.name;                  
  const selectedSize = selectedOptionResponse.size;
  const Images = selectedOptionResponse.images;

  const discount = selectedOptionResponse.discount;
  const ogPrice = selectedOptionResponse.ogPrice;
  const price = selectedOptionResponse.price;
  
  const handleOnHover = (value: string) => {
    setHoveredOption(value);
  }

  const handleOnUnhover = () => {
    setHoveredOption(selectedOption);
  }

  const handleQuantityStepper = (value: number) => {
    setSelectedQuantity(value);
  }

  return (
    <section className='product-container'>
      <div className='product-gallery-container'><Gallery Images={Images as (string[])} /></div>
      <div className='product-carousel-container'><Carousel Images={Images} Width={100} BorderWidth={0} ShowDotBtns={true} dotSmall={true} /></div>
      <div className='product-content'>
        <div className='product-content-header'>
          {discount > 0 ? <div className='product-discount-badge'>{(discount * 100).toFixed(0)}% OFF</div> : <></>}
          <h2 className='product-h2'>{product.name}</h2>
          <Rating rating={averageRating} reviewCount={productReviews.length} />
          {discount <= 0 
            ? <div className='product-price-wrapper'>
               <h2 className='product-price'>
                  <span className='dollar-sign'>$</span>{price}
                </h2> 
              </div>
            : <div className='product-price-wrapper'>
                <h2 className='product-price-strike'>
                  <span className='dollar-sign'>$</span>{ogPrice.toFixed(2)}
                </h2>
                <h2 className='product-price-discounted'>
                  <span className='dollar-sign'>$</span>{price}
                </h2>
              </div>
          }
        </div>
        <div className='product-options-container'>
          <div className='product-options-header'>
            <h3 className='product-h3'>{`${capitalizeFirstLetter(product.options[0].type)}`}:</h3>
            <h4 className='product-h4'>{`${hoveredOption === '' ? capitalizeFirstLetter(selectedOption) : capitalizeFirstLetter(hoveredOption)}`}</h4>
          </div>
          <div className='product-options-btn-container'>
            {product.options.map((option, index) => (
              <Link 
                key={index} 
                href={`?${new URLSearchParams({
                  name: product.name.split(/[ ,]+/).join('-').toLowerCase(), 
                  id: product.product_id.toString(), 
                  option: option.name.toLowerCase(), 
                  size: option.sizes.find(sizeObj => sizeObj.size.toLowerCase() === selectedSize && sizeObj.stock > 0)?.size.toLowerCase() || option.sizes.find(sizeObj => sizeObj.stock > 0)?.size.toLowerCase() || 'oos'
                })}`}
                scroll={false}
                onMouseEnter={() => handleOnHover(option.name)}
                onMouseLeave={handleOnUnhover}
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
              sizeObj.stock > 0
              ? <Link 
                  key={index} 
                  href={`?${new URLSearchParams({
                    name: product.name.split(/[ ,]+/).join('-').toLowerCase(), 
                    id: product.product_id.toString(), 
                    option: selectedOption, 
                    size: sizeObj.size.toLowerCase()
                  })}`} 
                  scroll={false} 
                  aria-label={`Product Size Option: ${sizeObj.size}`} 
                  className={`product-option-btn size ${selectedSize === sizeObj.size.toLowerCase() ? 'selected' : ''}`} 
                  style={{'--bs-opacity': '0.15'} as React.CSSProperties}
                >
                  {sizeObj.size.toUpperCase()}
                </Link>
              : <div key={index} className='product-option-btn size disabled' style={{'--bs-opacity': '0.15'} as React.CSSProperties}>{sizeObj.size.toUpperCase()}</div>
            ))}
          </div>
        </div>

        <div className='product-options-container'>
          {selectedSize !== 'oos'
            ? <>
                <h3 className='product-h3'>Quantity:</h3>
                <div className='product-options-btn-container'>
                 <NumberStepper min={1} value={selectedQuantity} onChange={handleQuantityStepper} />
                </div>
              </>
            : <div className='product-out-of-stock'>Sorry, we're out of stock.</div>
          }
        </div>        

        <div className='product-btn-container'>
          <AddToBagButton id={product.product_id} option={selectedOption} size={selectedSize} quantity={selectedQuantity} />
          <AddToWishlistButton id={product.product_id} option={selectedOption} />
        </div>

        <div className='product-details-container'>
          <AccordionMenu title={'Details'} content={product.details ? [product.description, product.details] : [product.description]} />
          { product.care ? <AccordionMenu title={'Care'} content={['To maintain the luxurious quality of your leather jacket, we recommend following these care guidelines:', product.care]} /> : null }
          <AccordionMenu title={'Shipping & Returns'} content={["Complimentary shipping on all orders.", "Free returns within 30 days, excluding final sale items, underwear, bottles, and swimwear."]} />
        </div>
      </div>
    </section>
  )
}

export { ProductDetails }


// Photo by <a href="https://unsplash.com/@anomaly?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anomaly</a> on <a href="https://unsplash.com/photos/man-wearing-white-crew-neck-t-shirts-WWesmHEgXDs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@uyk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Haryo Setyadi</a> on <a href="https://unsplash.com/photos/white-crew-neck-t-shirt-acn5ERAeSb4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
 
// Photo by <a href="https://unsplash.com/@jibarox?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Luis Quintero</a> on <a href="https://unsplash.com/photos/man-wearing-black-crew-neck-t-shirt-3qqiMT2LdR8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@svenciupkab?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sven Ciupka</a> on <a href="https://unsplash.com/photos/man-in-black-crew-neck-t-shirt-standing-near-brick-wall-x8Vg7Up6TUc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

