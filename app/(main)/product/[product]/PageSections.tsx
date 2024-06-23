'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import Carousel from '@/app/components/Carousel/Carousel';
import Products from '../../../../data/products.json'
import './product.css'


interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface Option {
  type: string;
  name: string;
  media: MediaItem[];
}

interface Product {
  product_id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  weight: number;
  material: string;
  options: Option[];
  sizes: string[];
  tags: string[];
  custom_attributes: {
    [key: string]: string; // Allows any string key-value pair
  };
}

const ProductNotFound = () => {
  return (
    <div>Product not found</div>
  )
}

const ProductDetailsSection = () => {
  const searchParams = useSearchParams();
  const index = (parseInt(searchParams?.get('id') as string) - 1);
  const product: Product = Products[index] as Product;
  const selectedOption = searchParams.get('option') as string ?? product.options[0].name;
  const selectedSize = searchParams.get('size') as string ?? product.sizes[0];

  if (!product) {
    console.log(index);
    console.error('Product not found');
    return <ProductNotFound />;
  }

  const currentOption = product.options.find(option => option.name === selectedOption);
  const selectedImages = currentOption?.media.filter(item => item.type === "image").map(item => item.url);
  const Images = selectedImages;

  const handleOnHover = (string: string) => {
    const selectedOption = string;
    console.log(selectedOption)
  }

  const handleOnUnhover = () => {
    const selectedOption = searchParams.get('option') as string;
    console.log(selectedOption)
  }

  return (
    <section className='product-container'>
      <div className='product-content'>
        {Images ? <Carousel Images={Images as (string[])} Width={100} ShowThumbnails={true} /> : null}
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
              <Link key={index} href={`?id=${product.product_id}&option=${option.name}&size=${selectedSize}`} onMouseEnter={() => handleOnHover(option.name)} onMouseLeave={handleOnUnhover} aria-label={`Product Option: ${option.name}`} className={`${selectedOption === option.name ? 'product-option-btn-selected' : 'product-option-btn'}`} style={{'--width': '90px', '--height': '100px', '--bs-opacity': '0.5'} as React.CSSProperties}>
                <Image
                  src={option.media[0].url}
                  alt={option.name}
                  fill
                  className='product-option-image'
                />
              </Link>
            ))}
          </div>
        </div>
        <div className='product-options-container'>
          <h4>SIZE: </h4>
          <div className='product-options-btn-container'>
            {product.sizes.map((size, index) => (
              <Link key={index} href={`?id=${product.product_id}&option=${selectedOption}&size=${size}`} aria-label={`Product Size Option: ${size}`} className={`${selectedSize === size ? 'product-option-btn-selected' : 'product-option-btn'}`} style={{'--width': '50px', '--height': '50px', '--bs-opacity': '0.15'} as React.CSSProperties}>
                {size.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        <div className='product-btn-container'>
          <button className='product-btn'>Add to Bag</button>
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

