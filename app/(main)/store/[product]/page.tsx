import React from 'react';
import ProductDetails from './ProductDetails';
import './product.css'

export default function Store({ params, searchParams }: { params: { product: string }, searchParams: {name: string, id: string, option: string, size: string} }) {
  return (
    <div className='product'>
      <ProductDetails searchParams={searchParams} />
    </div>
  )
}