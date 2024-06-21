'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Carousel from '@/app/components/Carousel/Carousel';
import Products from '../../../../data/products.json'
import './product.css'


interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface Option {
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

interface ProductProps {
  product: Product;
}

// export const getServerSideProps: GetServerSideProps<ProductProps> = async (context) => {
//   const { product: productName, productId } = context.params!;
//   const res = await fetch(`http://localhost:3000/api/products/${productId}`);
//   const product = await res.json();

//   return {
//     props: {
//       product,
//     },
//   };
// };

const ProductCard = ( {product}:ProductProps ) => {
  const [Images, setImages] = useState<string[]>([])
  const [currentOption, setCurrentOption] = useState(0);

  // Effect to update Images state when currentOption changes
  useEffect(() => {
    if (product.options[currentOption]) {
      const selectedOption = product.options[currentOption];
      const selectedImages = selectedOption.media
        .filter(item => item.type === "image")
        .map(item => item.url);
      setImages(selectedImages);
    }
  }, [currentOption]);

  const capitalizeFirstLetter = (str:string) => {
    // Check if the input string is not empty
    if (str.length === 0) return str;
    
    // Capitalize the first letter and concatenate with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  return (
    <section className='product-container'>
      <div className='product-content'>
        <Carousel Images={Images} Width={100} ShowThumbnails={true}/>
      </div>
      <div className='product-content'>
        <div>
          <h2>{product.name}</h2>
          <h3>{product.price}</h3>
        </div>
        <div>
          <h4>COLOR: </h4>
          <div className='product-options-container'>
            {product.options.map((option, index) => (
              <p key={index}>
                {capitalizeFirstLetter(option.name)}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h4>SIZE: </h4>
          <div className='product-options-container'>
            {product.sizes.map((size, index) => (
              <p key={index}>
                {size.toUpperCase()}
              </p>
            ))}
          </div>
          
        </div>

        <button className='product-btn'>Add to Bag</button>
        <button className='product-btn2'>Wishlist</button>
      </div>
    </section>
  )
}


export default function Product() {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id') as string)
  const product: Product = Products[id - 1] as Product;

  if (!product) {
      console.log(id);
      console.error('Product not found');
      return <div>Product not found</div>;
  }

  return (
    <div className='product'>
      <ProductCard product={product} />
    </div>
  )
}

// Photo by <a href="https://unsplash.com/@anomaly?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anomaly</a> on <a href="https://unsplash.com/photos/man-wearing-white-crew-neck-t-shirts-WWesmHEgXDs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@uyk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Haryo Setyadi</a> on <a href="https://unsplash.com/photos/white-crew-neck-t-shirt-acn5ERAeSb4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
// Photo by <a href="https://unsplash.com/@jibarox?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Luis Quintero</a> on <a href="https://unsplash.com/photos/man-wearing-black-crew-neck-t-shirt-3qqiMT2LdR8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@svenciupkab?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sven Ciupka</a> on <a href="https://unsplash.com/photos/man-in-black-crew-neck-t-shirt-standing-near-brick-wall-x8Vg7Up6TUc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>