'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { CSSTransition } from 'react-transition-group'
import { CustomLink, GeneralButton } from '@/app/components/Buttons/General/General'
import Loading from '@/app/components/Loading/Loading'
import { Product } from '@/app/utility/types'
import { getTitle } from '@/app/utility/helper'
import { filterProducts, sortProducts } from './Helper'
import './store.css'
import Select from '@/app/components/Buttons/Select/Select'
import Carousel from '@/app/components/Carousel/Carousel'

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
      <div className='product-card-image-wrapper'>
        <Carousel
          href={`/store/p?${new URLSearchParams({name: product.name.split(/[ ,]+/).join('-').toLowerCase(), id: product.product_id.toString(), option: currentOption.name, size: currentOption.sizes[0].size.toLowerCase()})}`} 
          Images={images} 
          Width={100} 
          ShowNavArrows={true}
          navArrowSize={35}
        />
      </div>
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

const ProductsDetails = ({parsedCategories, parsedTags, products}: {parsedCategories: string[], parsedTags: string[], products: Product[]}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>(SortCriteria.NEW_ARRIVALS);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});
  const [rowsShown, setRowsShown] = useState(4);
  
  // Set the filtered products and then sort the products from the search parameters
  const filteredProducts = filterProducts({parsedCategories, parsedTags, products: products});
  const sortedProducts = sortProducts([...filteredProducts], selectedOptions, sortCriteria);

  useEffect(() => {
    sortedProducts.forEach((product) => {
      setSelectedOptions((prev) => ({
        ...prev,
        [product.product_id]: 0
      }));
    });
    setFilterOpen(false);
    setRowsShown(4);
  }, [parsedCategories, parsedTags]);

  useEffect(() => {
    setIsLoading(false);
  }, [sortProducts]);

  const handleFilterClick = () => {
    setFilterOpen(prev => !prev);
  }

  const handleSortClick = (criteria: SortCriteria) => {
    setSortCriteria(criteria);
  };

  const handleOptionChange = (productId: number, optionIndex: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: optionIndex
    }));
  };

  const handleShowMoreClick = () => {
    setRowsShown((prev) => prev + 4);
  };

  if (isLoading) {
    return <section className='store-products-section'><div className='loading-page'>Loading...<Loading /></div></section>
  }

  return (
    <section className='store-products-section'>
      <h1 className='store-products-title'>{getTitle(parsedCategories)}</h1>
      <div className='store-products-sort-container'>
        <button onClick={handleFilterClick} aria-label='Filter' className='filter-btn'>
          <svg 
            aria-hidden
            viewBox="0 0 64 64" 
            xmlns="http://www.w3.org/2000/svg" 
            strokeWidth="3" 
            stroke="currentColor" 
            fill="none"
            width={20}
            height={20}
          >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <line x1="50.69" y1="32" x2="56.32" y2="32"></line>
                <line x1="7.68" y1="32" x2="38.69" y2="32"></line>
                <line x1="26.54" y1="15.97" x2="56.32" y2="15.97"></line>
                <line x1="7.68" y1="15.97" x2="14.56" y2="15.97"></line>
                <line x1="35" y1="48.03" x2="56.32" y2="48.03"></line>
                <line x1="7.68" y1="48.03" x2="23" y2="48.03"></line>
                <circle cx="20.55" cy="15.66" r="6"></circle>
                <circle cx="44.69" cy="32" r="6"></circle>
                <circle cx="29" cy="48.03" r="6"></circle>
              </g>
          </svg>
          Filter
        </button>
        <Select value={sortCriteria} onChange={handleSortClick as () => void}>
          <option value={SortCriteria.NEW_ARRIVALS}>New Arrivals</option>
          <option value={SortCriteria.BEST_SELLERS}>Best Sellers</option>
          <option value={SortCriteria.PRICE_ASC}>Price (Low to High)</option>
          <option value={SortCriteria.PRICE_DESC}>Price (High to Low)</option>
        </Select>
        {/* <div className='sort-dropdown'>
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
        </div> */}
      </div>
      <div className='store-products-container'>
        <CSSTransition in={filterOpen} timeout={200} classNames='filter' unmountOnExit>
          <div className='filter-menu'><h2>Filter Menu</h2><div>2</div></div>
        </CSSTransition>
        <div className={`store-products-wrapper ${filterOpen ? 'with-filter' : ''}`}>
          <div className='product-cards-container'>
            {sortedProducts.length === 0 ? (
              <div className='products-none-found'>No results found.</div>
            ) : (
              sortedProducts.slice(0, rowsShown).map((product: any, index) => (
                <ProductCard 
                  key={index} 
                  product={product} 
                  selectedOption={selectedOptions[product.product_id] || 0} 
                  onClick={handleOptionChange}
                />
              ))
            )}
          </div>
          {rowsShown < sortedProducts.length && (
            <div className='show-more-btn-wrapper'>
              <GeneralButton onClick={handleShowMoreClick} className='btn second'>Show More</GeneralButton>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductsDetails
