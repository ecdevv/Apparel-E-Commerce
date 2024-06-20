import React from 'react';
import Carousel from '@/app/components/Carousel/Carousel';
import CarouselImage from '../../../public/images/home/carousel-item1.webp';
import CarouselImage2 from '../../../public/images/home/carousel-item2.webp';
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

// Photo by <a href="https://unsplash.com/@anomaly?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anomaly</a> on <a href="https://unsplash.com/photos/man-wearing-white-crew-neck-t-shirts-WWesmHEgXDs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@uyk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Haryo Setyadi</a> on <a href="https://unsplash.com/photos/white-crew-neck-t-shirt-acn5ERAeSb4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
// Photo by <a href="https://unsplash.com/@jibarox?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Luis Quintero</a> on <a href="https://unsplash.com/photos/man-wearing-black-crew-neck-t-shirt-3qqiMT2LdR8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// Photo by <a href="https://unsplash.com/@svenciupkab?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sven Ciupka</a> on <a href="https://unsplash.com/photos/man-in-black-crew-neck-t-shirt-standing-near-brick-wall-x8Vg7Up6TUc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>