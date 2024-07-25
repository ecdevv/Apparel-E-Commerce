'use client'
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CustomLink } from '../Buttons/General/General';
import { Product } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import { getProducts, filterProductsBySearch } from '@/server/mockValidations';
import './Search.css'


const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const productsResponse = getProducts();
  const Products = productsResponse.products;
  const filteredItems = filterProductsBySearch({ products: Products, query }) as Product[];

  // Handle search query submission
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if the query is not empty, then redirect to the store page with the correct query
    if (query.trim()) {
      const formattedQuery = query.replace(/[ ,]+/g, ' ').toLowerCase();
      router.push(`/store?tags=${encodeURIComponent(formattedQuery)}`);
    }

    // Reset the input field
    setQuery('');
    if (inputRef.current) {
      inputRef.current.blur(); // Unfocus the input field
    }
  };

  // Handle link click to close the menu by resetting the input field
  const handleLinkClick = () => {
    // Reset the input field
    setQuery('');
    if (inputRef.current) {
      inputRef.current.blur(); // Unfocus the input field
    }
  };

  return (
    <>
      <form id='searchForm' onSubmit={handleSearch} aria-label='Search Box' className='search-container'>
        <div className='search-content'>
          <input ref={inputRef} aria-labelledby='searchForm' className='search-box' type='search' placeholder='Search' value={query} onChange={(e) => setQuery(e.target.value)}/>
          <button onClick={handleSearch} aria-label='Search Submission Button'>
            <svg
              aria-hidden
              viewBox="0 0 1024 1024"
              fill="currentColor"
              className='search-icon'
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
            </svg>
          </button>
        </div>
        {filteredItems.length > 0 &&
          <ul className='search-menu'>
            {filteredItems.slice(0, 5).map((item) => 
              <li key={item.product_id}>
                <CustomLink 
                  href={`/store/p?${new URLSearchParams({
                    name: `${item.name.split(/[ ,]+/).join('-').toLowerCase()}`, 
                    id: item.product_id.toString() || '', 
                    option: item.options[0].name, 
                    size: item.options[0].sizes[0].name})}`
                  }
                  onClick={handleLinkClick}
                  className='search-product-card'
                >
                  <div className='search-image-wrapper'>
                    <Image
                      src={item.options[0].media.find((m) => m.type === 'image')?.url || ''}
                      alt={`${item.name} - option: ${item.options[0].name} - image`}
                      fill
                      sizes="(100vw)"
                      className='search-image'
                    />
                  </div>
                  <div className='search-product-details'>
                    <h2 className='search-product-name'>{item.name}</h2>
                    <p>{capitalizeFirstLetter(item.gender)}</p>
                    {item.options.some((option) => option.discount <= 0)
                      ? <p className='search-product-price'>${(item.options[0].price).toFixed(2)}</p>
                      : <div className='search-product-discount-wrapper'>
                          {/* Finds the first discounted option */}
                          <p className='search-product-price-strike'>${(item.options.find((option) => option.discount > 0)?.price || 0).toFixed(2)}</p>
                          <p className='search-product-discount'>${((item.options.find((option) => option.discount > 0)?.price || 0) * (1 - (item.options.find((option) => option.discount > 0)?.discount || 0))).toFixed(2)}</p>
                        </div>
                    }
                  </div>
                </CustomLink>
              </li>
            )}
          </ul>
        }
      </form>

      <Link href='/' aria-label='Search Button' className='search-btn mobile'>
        <svg
          aria-hidden
          viewBox="0 0 1024 1024"
          fill="currentColor"
          className='search-btn'
        >
          <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
        </svg>
      </Link>
    </>
  )
}

export default Search