'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Gallery from '@/app/components/Gallery/Gallery';
import Rating from '@/app/components/Rating/Rating';
import NumberStepper from '@/app/components/Input/NumberStepper/NumberStepper';
import AddToBagButton from '@/app/components/Buttons/AddToBag/AddToBag';
import AccordionMenu from '@/app/components/Accordion/AccordionMenu';
import Products from '../../../../data/products.json'
import Reviews from '../../../../data/reviews.json'
import { Product } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import './product.css'

const validateProduct = (searchParams: URLSearchParams): { error: boolean, product: Product, productReviews: any, averageRating: number } => {
  const id = (parseInt(searchParams?.get('id') as string));
  const product: Product = Products.find(product => product.product_id === id) as Product;
  const productReviews = Reviews.filter(review => review.product_id === id);
  const averageRating = parseFloat((productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length).toFixed(2)) || -1;

  // Valdiation check if product exists
  if (!product) {
    console.error('Product not found.');
    return { error: true, product: {} as Product, productReviews: [], averageRating: -1 };
  }

  // Valdiation check if product IDs are unique
  const productIDs = Products.map(product => product.product_id);
  const duplicateIDs = productIDs.filter((id, index) => productIDs.indexOf(id) !== index);
  if (duplicateIDs.length > 0 && duplicateIDs.includes(product.product_id)) {
    console.error(`The following product IDs are duplicate: ${duplicateIDs.join(', ')}`);
    return { error: true, product: {} as Product, productReviews: [], averageRating: -1 };
  }

  // Valdiation check if each option of the product is unique and if the product options are empty or falsy
  const optionNames = product.options.map(option => option.name);
  if (new Set(optionNames).size !== optionNames.length) {
    console.error('Duplicate option name found; each option name must be unique.');
    return { error: true, product: {} as Product, productReviews: [], averageRating: -1 };
  } else if (optionNames.length === 0 || optionNames.every(name => !name)) {
    console.error('No options found.');
    return { error: true, product: {} as Product, productReviews: [], averageRating: -1 };
  }

  return { error: false, product, productReviews, averageRating };
};

const setProductDetails = (searchParams: URLSearchParams, product: Product): { name: string, size: string, images: string[], ogPrice: number, discount: number, price: number } => {
  /*
   *  Find the option element in the array that is equivalent to the 'option' url param and set the name, 
   *  then validate and set the size from the 'size' url param or set the first size that has stock > 0 or set 'oos' if all sizes are stock <= 0, 
   *  then set the images for the selected option,
   *  and finally set the ogPrice, discount, and price of the selected option 
  */
  const selectedOptionElement = product.options.find(option => option.name === (searchParams.get('option') as string)) || product.options[0];
  const name = selectedOptionElement.name.toLowerCase();
  const size = selectedOptionElement.sizes.find(sizes => sizes.size.toLowerCase() === (searchParams.get('size') as string) && sizes.stock > 0)?.size.toLowerCase() || selectedOptionElement.sizes.find(size => size.stock > 0)?.size.toLowerCase() || 'oos';
  const images = selectedOptionElement.media.filter(item => item.type === "image").map(item => item.url);
  const ogPrice = selectedOptionElement.price;
  const discount = selectedOptionElement.discount;

  let price = ogPrice - (ogPrice * discount / 100);
  if (discount != 0) {
    price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
  } else {
    price = parseFloat((ogPrice).toFixed(2));
  }
  
  return {name, size, images, ogPrice, discount, price};
}

const ProductError = ({text}: {text: string}) => {
  return (
    <div>{text}</div>
  )
}

const ProductDetailsSection = () => {
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);
  const searchParams = useSearchParams();

  // Find and validate the product and product reviews
  const productResponse = validateProduct(searchParams);
  if (productResponse.error) {
    return <ProductError text="Product not found" />;
  }
  const product: Product = productResponse.product;
  const productReviews = productResponse.productReviews
  const averageRating = productResponse.averageRating;
  
  // Setting all of the product details (and validates based on the search param)
  const productOptionResponse = setProductDetails(searchParams, product);
  const selectedOption = productOptionResponse.name;                  
  const selectedSize = productOptionResponse.size;
  const Images = productOptionResponse.images;

  const discount = productOptionResponse.discount;
  const ogPrice = productOptionResponse.ogPrice;
  const price = productOptionResponse.price;

  // Valdation for refreshing the page and the url is invalid (incorrect options and sizes)
  const updateUrl = () => {
    if (typeof window === 'undefined') return;
    // Timeout is used to wait for the url to update with the properties above
    setTimeout(() => {
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
    }, 10);
  };
  updateUrl();

  const handleQuantityStepper = (value: number) => {
    setSelectedQuantity(value);
  }

  return (
    <section className='product-container'>
      <div className='product-gallery-container'><Gallery Images={Images as (string[])} /></div>
      <div className='product-content'>
        <div className='product-content-header'>
          {discount > 0 ? <div className='product-discount-badge'>{(discount * 100).toFixed(0)}% OFF</div> : <></>}
          <h2 className='product-h2'>{product.name}</h2>
          {discount <= 0 
            ? <div className='product-price-wrapper'>
               <h2 className='product-price'>
                  <span className='dollar-sign'>$</span>{price}
                </h2> 
              </div>
            : <div className='product-price-wrapper'>
                <h2 className='product-price-strike'>
                  <span className='dollar-sign'>$</span>{ogPrice}
                </h2>
                <h2 className='product-price-discounted'>
                  <span className='dollar-sign'>$</span>{price}
                </h2>
              </div>
          }
          <Rating rating={averageRating} reviewCount={productReviews.length} />
        </div>
        <div className='product-options-container'>
          <div className='product-options-header'><h3 className='product-h3'>{`${capitalizeFirstLetter(product.options[0].type)}`}:</h3><h4 className='product-h4'>{`${capitalizeFirstLetter(selectedOption)}`}</h4></div>
          <div className='product-options-btn-container'>
            {product.options.map((option, index) => (
              <Link 
                key={index} 
                href={`?${new URLSearchParams({
                  name: product.name.split(/[ ,]+/).join('-').toLowerCase(), 
                  id: product.product_id.toString(), 
                  option: option.name.toLowerCase(), 
                  size: selectedSize
                })}`}
                scroll={false} 
                aria-label={`Product ${capitalizeFirstLetter(option.type)} Option: ${option.name}`} 
                className={`${selectedOption === option.name ? 'product-option-btn-selected' : 'product-option-btn'}`} 
                style={{'--width': '100px', '--height': '110px', '--bs-opacity': '0.5'} as React.CSSProperties}
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
            {product.options.find((option) => option.name === selectedOption)?.sizes.map((sizeObj, index) => {
              const size = sizeObj.size.toLowerCase()
              const inStock = sizeObj.stock > 0
              return inStock
                ? <Link 
                    key={index} 
                    href={`?${new URLSearchParams({
                      name: product.name.split(/[ ,]+/).join('-').toLowerCase(), 
                      id: product.product_id.toString(), 
                      option: selectedOption, 
                      size: size
                    })}`} 
                    scroll={false} 
                    aria-label={`Product Size Option: ${size}`} 
                    className={`${selectedSize === size ? 'product-option-btn-selected' : 'product-option-btn'}`} 
                    style={{'--width': '60px', '--height': '60px', '--bs-opacity': '0.15'} as React.CSSProperties}
                  >
                    {size.toUpperCase()}
                  </Link>
                : <div key={index} className='product-option-btn-disabled' style={{'--width': '60px', '--height': '60px', '--bs-opacity': '0.15'} as React.CSSProperties}>{size.toUpperCase()}</div>
            })}
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
            : <div className='product-out-of-stock'>Sorry, we're temporarily out of stock.</div>
          }
        </div>        

        <div className='product-btn-container'>
          <AddToBagButton product={product} option={selectedOption} size={selectedSize} quantity={selectedQuantity} price={price} ogPrice={ogPrice} discount={discount} />
          <button className='product-btn2'>Wishlist</button>
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

export { ProductDetailsSection }


// Photo by <a href="https://unsplash.com/@anomaly?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anomaly</a> on <a href="https://unsplash.com/photos/man-wearing-white-crew-neck-t-shirts-WWesmHEgXDs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@uyk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Haryo Setyadi</a> on <a href="https://unsplash.com/photos/white-crew-neck-t-shirt-acn5ERAeSb4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
 
// Photo by <a href="https://unsplash.com/@jibarox?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Luis Quintero</a> on <a href="https://unsplash.com/photos/man-wearing-black-crew-neck-t-shirt-3qqiMT2LdR8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@svenciupkab?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sven Ciupka</a> on <a href="https://unsplash.com/photos/man-in-black-crew-neck-t-shirt-standing-near-brick-wall-x8Vg7Up6TUc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

