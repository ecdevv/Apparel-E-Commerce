import React from 'react';
import ProductDetails from './ProductDetails';
import { UpdateURL } from '@/app/utility/components/UpdateURL';
import { Product } from '@/app/utility/types';
import { validateProduct, getSelectedOption, validateProductURL } from '@/server/mockValidations';
import './product.css'

const ProductError = ({text}: {text: string}) => {
  return (
    <div>{text}</div>
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