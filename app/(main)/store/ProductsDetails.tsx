'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { CustomLink } from '@/app/components/Buttons/General/General'
import { Product } from '@/app/utility/types'
import { capitalizeFirstLetter } from '@/app/utility/helper'
import './store.css'

const ProductCard = ({ product, selectedOption, onClick }: { product: Product, selectedOption: number, onClick:(id: number, index: number) => void }) => {
  const currentOption = product.options[selectedOption];
  const images = currentOption.media.filter(item => item.type === "image").map(item => item.url);
  const discount = currentOption.discount;
  const ogPrice = currentOption.price;
  let price = ogPrice - (ogPrice * discount / 100);
  if (discount != 0) {
    price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
  } else {
    price = parseFloat((ogPrice).toFixed(2));
  }

  return (
    <div className='product-card'>
      <CustomLink href='/store/p?' product={{id: product.product_id, option: currentOption.name} as any} className='product-card-image-wrapper'>
        <Image
          src={images[0]}
          alt={product.name}
          fill
          sizes='(100vw, 100vh)'
          className='product-card-image'
        />
      </CustomLink>
      <div className='product-card-content'>
        <CustomLink href='/store/p?' product={{id: product.product_id, option: currentOption.name} as any} className='product-card-content-details'>
          <p className='product-card-name'>{product.name}</p>
          {currentOption.discount <= 0
            ? <p>
                <span className='dollar-sign'>$</span>{(price).toFixed(2)}
              </p> 
            : <>
                <div className='product-card-price-wrapper'>
                  <p className='product-card-price-strike'>
                    <span className='dollar-sign'>$</span>{(ogPrice).toFixed(2)}
                  </p>
                  <p className='product-card-price-discounted'>
                    <span className='dollar-sign'>$</span>{(price).toFixed(2)}
                  </p>
                </div>
                <div className='product-card-discount-badge'>{(discount * 100).toFixed(0)}% OFF</div>
              </>
              
          }
        </CustomLink>
        <div className='product-card-content-options'>
          {product.options.map((option: any, index) => (
            <button key={index} onClick={() => onClick(product.product_id, index)} aria-label={`${product.name}'s ${option.name} option`} className={`dot-button ${selectedOption === index ? 'selected' : ''}`} style={{'--color': option.name} as React.CSSProperties}></button>
          ))}
        </div>
      </div>
    </div>
  )
}

enum SortCriteria {
  PRICE_ASC,
  PRICE_DESC,
  NEW_ARRIVALS,
  BEST_SELLERS
}

const ProductsDetails = ({searchParams, Products}: {searchParams: {category: string, tags: string}, Products: Product[]}) => {
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>(SortCriteria.NEW_ARRIVALS);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    displayedProducts.forEach((product) => {
      setSelectedOptions((prev) => ({
        ...prev,
        [product.product_id]: 0
      }));
    });
  }, [searchParams])

  const displayedProducts = (searchParams.category === 'all' || !searchParams.category)
    ? Products.filter(product => {
        const parsedTags = searchParams?.tags?.split(/[ ,\+\-]+/).filter(tag => tag !== '' && tag !== '-' && tag !== '+');
        const hasTags = parsedTags ? parsedTags.every(tag => product.tags.includes(tag)) : false;
        return parsedTags
          ? hasTags
          : true;
    })
    : Products.filter(product => {
        const parsedTags = searchParams?.tags?.split(/[ ,\+\-]+/).filter(tag => tag !== '' && tag !== '-' && tag !== '+');
        const hasCategory = product.gender === searchParams.category || product.gender === 'unisex';
        const hasTags = parsedTags ? parsedTags.every(tag => product.tags.includes(tag)) : false;

        if (searchParams.category === 'new') {
          const now = new Date('07-02-2024');
          const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
          
          return parsedTags 
            ? hasTags && product.options.some(option => option.releaseDate && new Date(option.releaseDate) >= sixMonthsAgo)
            : product.options.some(option => option.releaseDate && new Date(option.releaseDate) >= sixMonthsAgo);
        }

        if (searchParams.category === 'sales') {
          const hasDiscount = product.options.some(option => option.discount > 0);
          return parsedTags
            ? hasTags && hasDiscount
            : hasDiscount;
        }
        
        return parsedTags 
          ? hasTags && hasCategory
          : hasCategory;
      });

  const sortProducts = (products: Product[], criteria: SortCriteria): Product[] => {
    switch (criteria) {
      case SortCriteria.PRICE_ASC:
        return products.sort((a, b) => 
          (a.options[selectedOptions[a.product_id] || 0].price * (1 - a.options[selectedOptions[a.product_id] || 0].discount)) 
          - (b.options[selectedOptions[b.product_id] || 0].price * (1 - b.options[selectedOptions[b.product_id] || 0].discount))
        );
      case SortCriteria.PRICE_DESC:
        return products.sort((a, b) => 
          (b.options[selectedOptions[b.product_id] || 0].price * (1 - b.options[selectedOptions[b.product_id] || 0].discount)) 
          - (a.options[selectedOptions[a.product_id] || 0].price * (1 - a.options[selectedOptions[a.product_id] || 0].discount))
        );
      case SortCriteria.NEW_ARRIVALS:
        return products.sort((a, b) => {
          const dateA = new Date(a.options[selectedOptions[a.product_id] || 0].releaseDate || 0);
          const dateB = new Date(b.options[selectedOptions[b.product_id] || 0].releaseDate || 0);
          return dateB.getTime() - dateA.getTime();
        });
      case SortCriteria.BEST_SELLERS:
        return products.sort((a, b) => {
          const aBestSellingOption = a.options.reduce((best, option) => {
            const optionSales = option.sizes.reduce((acc, size) => acc + (size.sales || 0), 0);
            const optionStock = option.sizes.reduce((acc, size) => acc + size.stock, 0);
            const percentageSales = (optionSales / optionStock) * 100;
            return percentageSales > best.percentage ? { percentage: percentageSales, option } : best;
          }, { percentage: 0, option: a.options[0] });
          const bBestSellingOption = b.options.reduce((best, option) => {
            const optionSales = option.sizes.reduce((acc, size) => acc + (size.sales || 0), 0);
            const optionStock = option.sizes.reduce((acc, size) => acc + size.stock, 0);
            const percentageSales = (optionSales / optionStock) * 100;
            return percentageSales > best.percentage ? { percentage: percentageSales, option } : best;
          }, { percentage: 0, option: b.options[0] });
          return bBestSellingOption.percentage - aBestSellingOption.percentage;
        });
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts([...displayedProducts], sortCriteria);

  const handleSortClick = (criteria: SortCriteria) => {
    setSortCriteria(criteria);
  };

  const handleOptionChange = (productId: number, optionIndex: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: optionIndex
    }));
  };

  return (
    <section className='store-products-section'>
      {!searchParams.category ? <h1 className='store-products-title'>All Products</h1> : <h1 className='store-products-title'>{capitalizeFirstLetter(searchParams.category)}</h1>}
      <div className='store-products-sort-container'>
        <div className='sort-dropdown'>
          <label htmlFor='sort' className='visually-hidden'>Sort By</label>
          <select id='sort' className='sort-select' value={sortCriteria} onChange={(e) => handleSortClick(Number(e.currentTarget.value))}>
            <option value={SortCriteria.NEW_ARRIVALS}>New Arrivals</option>
            <option value={SortCriteria.BEST_SELLERS}>Best Sellers</option>
            <option value={SortCriteria.PRICE_ASC}>Price (Low to High)</option>
            <option value={SortCriteria.PRICE_DESC}>Price (High to Low)</option>
          </select>
          <span className='sort-chevron'>
            <svg 
              aria-hidden
              fill="currentColor" 
              viewBox="0 0 24 24" 
              width={15}
              height={15}
            >
              <path d="M6.343 7.757L4.93 9.172 12 16.242l7.071-7.07-1.414-1.415L12 13.414 6.343 7.757z" />
            </svg>
          </span>
        </div>
      </div>
      <div className='store-products-container'>
        {sortedProducts.map((product: any, index) => (
          <ProductCard key={index} product={product} selectedOption={selectedOptions[product.product_id] || 0} onClick={handleOptionChange}/>
        ))}
      </div>
    </section>
  )
}

export default ProductsDetails