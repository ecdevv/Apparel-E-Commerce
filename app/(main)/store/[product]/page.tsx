import React from 'react';
import ProductDetails from './ProductDetails';
import { CustomLink } from '@/app/components/Buttons/General/General';
import { UpdateURL } from '@/app/utility/components/UpdateURL';
import { Product } from '@/app/utility/types';
import { validateProduct, getSelectedOption, validateProductURL } from '@/server/mockValidations';
import './product.css'

const ProductError = ({text}: {text: string}) => {
  return (
    <div className='product-not-found'>
      <div className="circle-background">
        <svg 
          aria-label="Empty bag svg image"
          viewBox="0 0 36 36" 
          fill="currentColor"
          preserveAspectRatio="xMidYMid meet"
          className='empty-svg-box'
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>sad-face-line</title>
              <path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z" className="clr-i-outline clr-i-outline-path-1"></path>
              <circle cx="25.16" cy="14.28" r="1.8" className="clr-i-outline clr-i-outline-path-2"></circle>
              <circle cx="11.41" cy="14.28" r="1.8" className="clr-i-outline clr-i-outline-path-3"></circle>
              <path d="M18.16,20a9,9,0,0,0-7.33,3.78,1,1,0,1,0,1.63,1.16,7,7,0,0,1,11.31-.13,1,1,0,0,0,1.6-1.2A9,9,0,0,0,18.16,20Z" className="clr-i-outline clr-i-outline-path-4"></path>
              <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect> 
            </g>
        </svg>
      </div>
      <h1 className='empty-h1'>{text}</h1>
      <CustomLink href='/store' className='btn'>Back to Store</CustomLink>
    </div>
  )
}

export default function DynamicProduct({ searchParams }: { searchParams: {name: string, id: string, option: string, size: string} }) {
  // Find and validate the product and product reviews
  const productResponse = validateProduct(searchParams);
  if (productResponse.error) return <ProductError text={'Product not found'} />;
  const product: Product = productResponse.product;
  const productReviews = productResponse.productReviews;
  const averageRating = productResponse.averageRating;

  // Setting all of the selected option's details (and validates based on the search param)
  const selectedOptionResponse = getSelectedOption(searchParams, product);
  const selectedOption = selectedOptionResponse.name;                  
  const selectedSize = selectedOptionResponse.size;
  const optionInStock = selectedOptionResponse.optionInStock;
  const Images = selectedOptionResponse.images;

  const discount = selectedOptionResponse.discount;
  const ogPrice = selectedOptionResponse.ogPrice;
  const price = selectedOptionResponse.price;

  // Call for URL validation to run the UpdateURL component
  const validateURLResponse = validateProductURL(product, selectedOption, selectedSize);

  return (
    <>
      <UpdateURL searchParams={searchParams} urlResponse={validateURLResponse} />
      <div className='product'>
        <ProductDetails 
          product={product} 
          productReviews={productReviews} 
          averageRating={averageRating}
          selectedOption={selectedOption}
          selectedSize={selectedSize}
          optionInStock={optionInStock}
          Images={Images}
          discount={discount}
          ogPrice={ogPrice}
          price={price}
        />
      </div>
    </>
  )
}