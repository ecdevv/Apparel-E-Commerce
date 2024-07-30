import React from 'react';
import ProductDetails from './ProductDetails';
import { Metadata, ResolvingMetadata } from 'next';
import { headers } from 'next/headers';
import { CustomLink } from '@/app/components/Buttons/General/General';
import { UpdateURL } from '@/app/utility/components/UpdateURL';
import { Product, ImageData } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import getBlurDataUrls from '@/app/utility/getBlurDataUrls';
import { validateProduct, getSelectedOption, validateProductURL } from '@/server/mockValidations';
import './product.css'

export async function generateMetadata({ searchParams }: { searchParams: {name: string, id: string, option: string, size: string} }, 
  parent: ResolvingMetadata
): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  // Get the current product from the server
  const productResponse = await validateProduct(searchParams);
  if (productResponse.error === true) {
    return {
      title: 'Product Not Found',
      openGraph: {
        images: [...previousImages],
      },
    }
  }
  const product = productResponse.product as Product;

  //Get the headers
  const headersList = headers();

  return {
    title: `${product.name} - ${capitalizeFirstLetter(product.gender)}`,
    description: product.description,
    openGraph: {
      title: `${product.name} - ${capitalizeFirstLetter(product.gender)}`,
      description: product.description,
      type: 'website',
      locale: 'en-US',
      url: `${headersList.get('x-pathname')}?${new URLSearchParams(searchParams).toString()}`,
      siteName: 'Urban Luxe',
      images: [ 
        {
          url: (product.options.find(option => option.name === searchParams?.option) || { media: [] }).media[0]?.url || '/images/opengraph/opengraph-image.webp',
          alt: `${product.name} - ${capitalizeFirstLetter(product.gender)}`,
          width: 1200,
          height: 630
        },
        ...previousImages
      ],
    },
  }
}

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

export default async function DynamicProduct({ searchParams }: { searchParams: {name: string, id: string, option: string, size: string} }) {
  // Find and validate the product and product reviews
  const productResponse = await validateProduct(searchParams);
  if (productResponse.error) return <ProductError text={'Product Not Found'} />;
  const product: Product = productResponse.product;
  const productReviews = productResponse.productReviews;
  const averageRating = productResponse.averageRating;

  // Setting all of the selected option's details (and validates based on the search param)
  const selectedOptionResponse = await getSelectedOption(searchParams, product);
  const selectedOption = selectedOptionResponse.name;                  
  const selectedSize = selectedOptionResponse.size;
  const optionInStock = selectedOptionResponse.optionInStock;
  const discount = selectedOptionResponse.discount;
  const ogPrice = selectedOptionResponse.ogPrice;
  const price = selectedOptionResponse.price;

  // Load the Blur Data URLs from the JSON file from the public directory and get the imagesUrls and set the Images and its data for the current product
  const blurDataUrls = await getBlurDataUrls();
  const imageUrls = selectedOptionResponse.images;
  const Images: ImageData[] = imageUrls.map((image, index) => ({
    src: image,
    alt: `${product.name} - ${capitalizeFirstLetter(selectedOption)} - ${capitalizeFirstLetter(product.gender)} | Image ${index + 1}`,
    blurDataUrl: blurDataUrls[image],
  }));

  // Call for URL validation to run the UpdateURL component using headers for the base URL
  const headerList = headers();
  const validateURLResponse = await validateProductURL(headerList, product, selectedOption, selectedSize);

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
          blurDataUrls={blurDataUrls}
          Images={Images}
          discount={discount}
          ogPrice={ogPrice}
          price={price}
        />
      </div>
    </>
  )
}