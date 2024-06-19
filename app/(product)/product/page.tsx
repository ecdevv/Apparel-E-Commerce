import React from 'react';
import Image from 'next/image';
import './product.css'

const Product = () => {
  return (
    <div className='product'>
      <section className='product-container'>
        <div className='product-content'>
          <Image
            src='/next.svg'
            alt='Product Image'
            width='0'
            height='0'
            className='product-image'
          />
        </div>
        <div className='product-content'>
          <Image
            src='/next.svg'
            alt='Product Image'
            width='0'
            height='0'
            className='product-image'
          />
        </div>
      </section>
    </div>
  )
}

export default Product
