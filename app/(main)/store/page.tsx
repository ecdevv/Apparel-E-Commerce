import React from 'react'
import ProductsDetails from './ProductsDetails'
import { headers } from 'next/headers'
import { Product } from '@/app/utility/types'
import { getProducts } from '@/server/mockValidations'
import { UpdateURL } from '@/app/utility/components/UpdateURL'
import { validateStoreURL } from '@/server/mockValidations'
import './store.css'

export default function Store({searchParams}: {searchParams: {category: string, tags: string}}) {
  // Get validated products
  const productsResponse = getProducts();
  if (productsResponse.error === true) return <div>Error, check server console</div>;
  const Products = productsResponse.products as Product[];

  // Parse the searchParams call for URL validation to run the UpdateURL component, and get headers for base URL validation
  const parsedCategories = searchParams?.category?.split(/[ ,\+\-]+/).filter(category => category !== '' && category !== '-' && category !== '+');
  const parsedTags = searchParams?.tags?.split(/[ ,\+\-]+/).filter(tag => tag !== '' && tag !== '-' && tag !== '+');
  const headerList = headers();
  const validateURLResponse = validateStoreURL(headerList, parsedCategories, parsedTags);

  return (
    <>
      <UpdateURL searchParams={searchParams} urlResponse={validateURLResponse} />
      <div className='store'>
        <ProductsDetails parsedCategories={parsedCategories} parsedTags={parsedTags} products={Products} />
      </div>
    </>
  )
}