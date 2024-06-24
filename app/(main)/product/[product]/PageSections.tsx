'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Carousel from '@/app/components/Carousel/Carousel';
import NumberStepper from '@/app/components/Input/NumberStepper/NumberStepper';
import AddToBagButton from '@/app/components/Buttons/AddToBag/AddToBag';
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
  const searchParams = useSearchParams();
  const index = (parseInt(searchParams?.get('id') as string) - 1);
  const product: Product = Products[index] as Product;

  // Valdiation check if product exists; if it does not exist, return ProductError component
  if (!product) {
    console.log('Product not found: ', index);
    return <ProductError text="Product not found." />;
  }

  // Valdiation check if each option of the product is unique; if not unique, return ProductError component // Handle product options not being unique
  const optionNames = product.options.map(option => option.name);
  if (new Set(optionNames).size !== optionNames.length) {
    console.error('Duplicate option name found; each option name must be unique.');
    return <ProductError text="Duplicate option name found; each option name must be unique." />;
  }

  const [selectedQuantity, setSelectedQuantity] = React.useState(1);
  const selectedOption = product.options.find(option => option.name === (searchParams.get('option') as string))?.name || product.options[0].name;     // Find's the option in the array that is equivalent to the 'option' url param; set to the first option if not found
  const selectedSize = product.sizes.find(sizes => sizes === (searchParams.get('size') as string)) || product.sizes[0];                               // Find's the size in the array that is equivalent to the 'size' url param; set to the first size if not found
  const Images = product.options.find(option => option.name === selectedOption)?.media.filter(item => item.type === "image").map(item => item.url);   // Find's the option in the array that is equivalent to the selectedOption; filters for images in the media array; maps the string image urls

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
      <div className='product-content'>
        <Carousel Images={Images as (string[])} Width={100} ShowThumbnails={true} />
      </div>
      <div className='product-content'>
        <div className='product-content-header'>
          <h2>{product.name}</h2>
          <h3>${product.price}</h3>
          <p>{product.description}</p>
        </div>
        <div className='product-options-container'>
          <span className='product-options-header'>
            <h4>{`${(product.options[0].type).toUpperCase()}:`}</h4>
            <p>{`${capitalizeFirstLetter(selectedOption)}`}</p>
          </span>
          <div className='product-options-btn-container'>
            {product.options.map((option, index) => (
              <Link key={index} href={`?${new URLSearchParams({id: product.product_id.toString(), option: option.name, size: selectedSize})}`} scroll={false} onMouseEnter={() => handleOnHover(option.name)} onMouseLeave={handleOnUnhover} aria-label={`Product ${capitalizeFirstLetter(option.type)} Option: ${option.name}`} className={`${selectedOption === option.name ? 'product-option-btn-selected' : 'product-option-btn'}`} style={{'--width': '90px', '--height': '100px', '--bs-opacity': '0.5'} as React.CSSProperties}>
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
          <h4>SIZE: </h4>
          <div className='product-options-btn-container'>
            {product.sizes.map((size, index) => (
              <Link key={index} href={`?${new URLSearchParams({id: product.product_id.toString(), option: selectedOption, size: size})}`} scroll={false} aria-label={`Product Size Option: ${size}`} className={`${selectedSize === size ? 'product-option-btn-selected' : 'product-option-btn'}`} style={{'--width': '50px', '--height': '50px', '--bs-opacity': '0.15'} as React.CSSProperties}>
                {size.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        <div className='product-options-container'>
          <h4>QUANTITY: </h4>
          <div className='product-options-btn-container'>
            <NumberStepper min={1} value={selectedQuantity} onChange={handleQuantityStepper}/>
          </div>
        </div>        

        <div className='product-btn-container'>
          <AddToBagButton product={product} option={selectedOption} size={selectedSize} quantity={selectedQuantity} className={'product-btn'} />
          <button className='product-btn2'>Wishlist</button>
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

