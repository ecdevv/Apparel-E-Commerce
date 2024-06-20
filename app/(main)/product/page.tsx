import React from 'react';
import Image from 'next/image';
import Carousel from '@/app/components/Carousel/Carousel';
import CarouselImage from '../../../public/images/carousel-item1.webp';
import CarouselImage2 from '../../../public/images/carousel-item2.webp';
import CarouselImage3 from '../../../public/images/carousel-item3.webp';
import './product.css'


const Product = () => {
  const Images=[CarouselImage, CarouselImage2];

  return (
    <div className='product'>
      <section className='product-container'>
        <div className='product-content'>
          <Carousel Images={Images} Width={100} ShowThumbnails={true}/>
        </div>
        <div className='product-content'>
          <div>
            <h2>Atelier x Luxe Exclusive Jacket</h2>
            <h3>$2630</h3>
          </div>
          <div>
            <h4>COLOR: </h4>
            <div></div>
          </div>
          <div>
            <h4>SIZE: </h4>
            <div></div>
          </div>

          <button className='product-btn'>Add to Bag</button>
          <button className='product-btn2'>Wishlist</button>
        </div>
      </section>
    </div>
  )
}

export default Product
