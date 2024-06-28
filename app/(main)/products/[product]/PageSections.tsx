'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Gallery from '@/app/components/Gallery/Gallery';
import NumberStepper from '@/app/components/Input/NumberStepper/NumberStepper';
import AddToBagButton from '@/app/components/Buttons/AddToBag/AddToBag';
import AccordionMenu from '@/app/components/Accordion/AccordionMenu';
import Products from '../../../../data/products.json'
import { Product } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import './product.css'


const ProductError = ({text}: {text: string}) => {
  return (
    <div>{text}</div>
  )
}

const ProductDetailsSection = () => {
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);
  const searchParams = useSearchParams();
  const name = (searchParams?.get('name') as string).split(/[-]+/).join(' ').toLowerCase();
  const id = (parseInt(searchParams?.get('id') as string));
  const product: Product = Products.find(product => product.name.toLowerCase() === name && product.product_id === id) as Product;

  // Valdiation check if product exists; if it does not exist, return ProductError component
  if (!product) {
    return <ProductError text="Product not found." />;
  }

  // Valdiation check if product IDs are unique; if not unique, return ProductError component (only necessary because using mock JSON data)
  const productIDs = Products.map(product => product.product_id);
  const duplicateIDs = productIDs.filter((id, index) => productIDs.indexOf(id) !== index);
  if (duplicateIDs.length > 0 && duplicateIDs.includes(product.product_id)) {
    return <ProductError text={`The following product IDs are duplicate: ${duplicateIDs.join(', ')}`} />;
  }

  // Valdiation check if each option of the product is unique; if not unique, return ProductError component // Handle product options not being unique
  const optionNames = product.options.map(option => option.name);
  if (new Set(optionNames).size !== optionNames.length) {
    console.error('Duplicate option name found; each option name must be unique.');
    return <ProductError text="Duplicate option name found; each option name must be unique." />;
  }
  
  const selectedOptionData = product.options.find(option => option.name === (searchParams.get('option') as string)) || product.options[0];   // Find's the option in the array that is equivalent to the 'option' url param; set to the first option if not found
  const selectedOption = selectedOptionData.name.toLowerCase(); // Set's the name of the selected option                    
  const selectedSize = selectedOptionData.data.sizes.find(sizes => sizes.size.toLowerCase() === (searchParams.get('size') as string))?.size.toLowerCase() || selectedOptionData.data.sizes[0].size.toLowerCase();   // Find's the size in the data object of optins that is equivalent to the 'size' url param; set to the first size if not found
  const Images = selectedOptionData.media.filter(item => item.type === "image").map(item => item.url);   // Find's the option in the array that is equivalent to the selectedOption; filters for images in the media array; maps the string image urls

  let price;
  const currentOption = selectedOptionData.data.sizes.find(sizes => sizes.size.toLowerCase() === selectedSize) || selectedOptionData.data.sizes[0];
  const discount = currentOption.discount;
  const ogPrice = currentOption.price;
  if (discount != 0) {
    console.log(currentOption)
    price = (ogPrice * (1 - discount)).toFixed(2);
  } else {
    price = (ogPrice).toFixed(2);
  }

  // TODO - Figure out how to update url on hover and unhover so the option text can also update
  const handleOnHover = (string: string) => {
    const selectedOption = string;
    console.log(selectedOption)
  }
  const handleOnUnhover = () => {
    const selectedOption = searchParams.get('option') as string;
    console.log(selectedOption)
  }

  const handleQuantityStepper = (value: number) => {
    setSelectedQuantity(value);
  }

  return (
    <section className='product-container'>
      <div className='product-gallery-container'><Gallery Images={Images as (string[])} /></div>
      {/* <div className='product-gallery-container'>
        <Carousel Images={Images as (string[])} Width={100} ShowThumbnails={true} />
      </div> */}
      <div className='product-content'>
        <div className='product-content-header'>
          {discount > 0 ? <div className='product-discount-badge'>{discount * 100}% OFF</div> : <></>}
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
        </div>
        <div className='product-options-container'>
          <div className='product-options-header'><h3 className='product-h3'>{`${capitalizeFirstLetter(product.options[0].type)}`}:</h3><h4 className='product-h4'>{`${capitalizeFirstLetter(selectedOption)}`}</h4></div>
          <div className='product-options-btn-container'>
            {product.options.map((option, index) => (
              <Link 
                key={index} 
                href={`?${new URLSearchParams({name: product.name.split(/[ ,]+/).join('-').toLowerCase(), id: product.product_id.toString(), option: option.name.toLowerCase(), size: selectedSize})}`} 
                scroll={false} 
                onMouseEnter={() => handleOnHover(option.name)} 
                onMouseLeave={handleOnUnhover} 
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
            {selectedOptionData.data.sizes.map((sizeObj, index) => {
              const size = sizeObj.size.toLowerCase()
              const inStock = sizeObj.stock > 0
              return inStock
                ? <Link 
                    key={index} 
                    href={`?${new URLSearchParams({name: product.name.split(/[ ,]+/).join('-').toLowerCase(), id: product.product_id.toString(), option: selectedOption, size: size})}`} 
                    scroll={false} 
                    aria-label={`Product Size Option: ${size}`} 
                    className={`${selectedSize === size ? 'product-option-btn-selected' : 'product-option-btn'}`} 
                    style={{'--width': '65px', '--height': '65px', '--bs-opacity': '0.15'} as React.CSSProperties}
                  >
                    {size.toUpperCase()}
                  </Link>
                : <div>{size.toUpperCase()}</div>
            })}
          </div>
        </div>

        <div className='product-options-container'>
          <h3 className='product-h3'>Quantity:</h3>
          <div className='product-options-btn-container'>
            <NumberStepper min={1} value={selectedQuantity} onChange={handleQuantityStepper}/>
          </div>
        </div>        

        <div className='product-btn-container'>
          <AddToBagButton product={product} option={selectedOption} size={selectedSize} quantity={selectedQuantity} price={parseFloat(price)} className={'product-btn'} />
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

