'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
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

const ProductCard = () => {
  const searchParams = useSearchParams();
  const index = (parseInt(searchParams?.get('id') as string) - 1);
  const product: Product = Products[index] as Product;
  const [Images, setImages] = useState<string[]>([]);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [currentSizeIndex, setCurrentSizeIndex] = useState(0);

  if (!product) {
    console.log(index);
    console.error('Product not found');
    return <ProductNotFound />;
  }

  // Effect to update Images state when currentOptionIndex changes
  useEffect(() => {
    if (product.options[currentOptionIndex]) {
      const selectedOption = product.options[currentOptionIndex];
      const selectedImages = selectedOption.media
        .filter(item => item.type === "image")
        .map(item => item.url);
      setImages(selectedImages);
    }
  }, [currentOptionIndex, product]);

  const handleOptionClick = (index: number) => {
    setCurrentOptionIndex(index);
  }

  const handleSizeClick = (index: number) => {
    setCurrentSizeIndex(index);
  }

  return (
    <section className='product-container'>
      <div className='product-content'>
        <Carousel Images={Images} Width={100} ShowThumbnails={true} />
      </div>
      <div className='product-content'>
        <div className='product-content-header'>
          <h2>{product.name}</h2>
          <h3>${product.price}</h3>
        </div>
        <div className='product-options-container'>
          <h4>{`${(product.options[currentOptionIndex].type).toUpperCase()}:`}</h4>
          <div className='product-options-btn-container'>
            {product.options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(index)} aria-label={`Product Option: ${option.name}`} className={`${currentOptionIndex === index ? 'product-option-btn-selected' : 'product-option-btn'}`} style={{'--width': '90px', '--height': '100px', '--bs-opacity': '0.5'} as React.CSSProperties}>
                <Image
                  src={option.media[0].url}
                  alt={option.name}
                  fill
                  className='product-option-image'
                />
              </button>
            ))}
          </div>
        </div>
        <div className='product-options-container'>
          <h4>SIZE: </h4>
          <div className='product-options-btn-container'>
            {product.sizes.map((size, index) => (
              <button key={index} onClick={() => handleSizeClick(index)} aria-label={`Product Size Option: ${size}`} className={`${currentSizeIndex === index ? 'product-option-btn-selected' : 'product-option-btn'}`} style={{'--width': '50px', '--height': '50px', '--bs-opacity': '0.15'} as React.CSSProperties}>
                {size.toUpperCase()}
              </button>
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

export { ProductCard }


// Photo by <a href="https://unsplash.com/@anomaly?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anomaly</a> on <a href="https://unsplash.com/photos/man-wearing-white-crew-neck-t-shirts-WWesmHEgXDs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@uyk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Haryo Setyadi</a> on <a href="https://unsplash.com/photos/white-crew-neck-t-shirt-acn5ERAeSb4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
 
// Photo by <a href="https://unsplash.com/@jibarox?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Luis Quintero</a> on <a href="https://unsplash.com/photos/man-wearing-black-crew-neck-t-shirt-3qqiMT2LdR8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@svenciupkab?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sven Ciupka</a> on <a href="https://unsplash.com/photos/man-in-black-crew-neck-t-shirt-standing-near-brick-wall-x8Vg7Up6TUc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

