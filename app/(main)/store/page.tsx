import React from 'react'
import ProductsDetails from './ProductsDetails'
import { Product } from '@/app/utility/types'
import { getProducts } from '@/server/mockValidations'
import './store.css'

export default function Store({searchParams}: {searchParams: {category: string, tags: string}}) {
  const productsResponse = getProducts();
  if (productsResponse.error === true) return <div>Error, check server console</div>;
  const Products = productsResponse.products as Product[];

  return (
    <div className='store'>
      <ProductsDetails searchParams={searchParams} Products={Products}/>
    </div>
  )
}