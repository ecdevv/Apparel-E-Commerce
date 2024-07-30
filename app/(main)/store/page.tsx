import React from 'react'
import ProductsDetails from './ProductsDetails'
import { Metadata, ResolvingMetadata } from 'next'
import { headers } from 'next/headers'
import { Product } from '@/app/utility/types'
import { getTitle } from '@/app/utility/helper'
import { getProducts } from '@/server/mockValidations'
import { UpdateURL } from '@/app/utility/components/UpdateURL'
import { validateStoreURL } from '@/server/mockValidations'
import './store.css'

export async function generateMetadata({ searchParams }: { searchParams: {category: string, tags: string} }, 
  parent: ResolvingMetadata
): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  // Parse the search categories and set the title
  const parsedCategories = searchParams?.category?.split(/[ ,\+\-]+/).filter(category => category !== '' && category !== '-' && category !== '+');
  const title = getTitle(parsedCategories);

  // Get the headers
  const headersList = headers();

  return {
    title: title,
    openGraph: {
      title: title,
      description: 'Browse our wide variety of products including clothing, accessories, and more. Find the perfect item to add to your collection.',
      type: 'website',
      locale: 'en-US',
      url: `${headersList.get('x-pathname')}?${new URLSearchParams(searchParams).toString()}`,
      siteName: 'Urban Luxe',
      images: [
        ...previousImages
      ]
    },
  }
}

export default async function Store({searchParams}: {searchParams: {category: string, tags: string}}) {
  // Get validated products
  const productsResponse = getProducts();
  if (productsResponse.error === true) return <div>Error, check server console</div>;
  const Products = productsResponse.products as Product[];

  // Parse the searchParams call for URL validation to run the UpdateURL component, and get headers for base URL validation
  const parsedCategories = searchParams?.category?.split(/[ ,\+\-]+/).filter(category => category !== '' && category !== '-' && category !== '+');
  const parsedTags = searchParams?.tags?.split(/[ ,\+\-]+/).filter(tag => tag !== '' && tag !== '-' && tag !== '+');
  const headerList = headers();
  const validateURLResponse = await validateStoreURL(headerList, parsedCategories, parsedTags);

  return (
    <>
      <UpdateURL searchParams={searchParams} urlResponse={validateURLResponse} />
      <div className='store'>
        <ProductsDetails parsedCategories={parsedCategories} parsedTags={parsedTags} products={Products} />
      </div>
    </>
  )
}