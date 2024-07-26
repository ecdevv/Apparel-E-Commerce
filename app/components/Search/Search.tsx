'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CustomLink } from '../Buttons/General/General';
import { Product } from '@/app/utility/types';
import { capitalizeFirstLetter } from '@/app/utility/helper';
import { getProducts, filterProductsBySearch } from '@/server/mockValidations';
import './Search.css'

const Search = () => {
  const [query, setQuery] = useState('');
  const [mobileMenuToggle, setMobileMenuToggle] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Get products and filter them based on the query (probably not very scalable)
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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuToggle(prev => !prev);
  };

  // Detect clicks outside the element for menu and search-box (only applies to mobile menu)
  useEffect(() => {
    // Function to handle clicks outside the element (mousedown)
    const handleClickOutside = (e: MouseEvent) => {
      // If the menu exists and the mouse click is not in the menu, the button, input field, and the input field is not focused, close the menu
      if (menuRef.current && buttonRef.current && inputRef.current && 
        (!menuRef.current.contains(e.target as Node) && !buttonRef.current.contains(e.target as Node) && !inputRef.current.contains(e.target as Node) && 
          !(inputRef.current && inputRef.current === document.activeElement))) {
        setMobileMenuToggle(false);
      } 
      // If the menu does not exist and the mouse click is not in the button, input field, and the input field is not focused, close the menu
      else if (!menuRef.current && buttonRef.current && inputRef.current && 
        (!buttonRef.current.contains(e.target as Node) && !inputRef.current.contains(e.target as Node) && 
          !(inputRef.current && inputRef.current === document.activeElement))) {
        setMobileMenuToggle(false);
      }
    };
    
    // Add event listener to detect clicks outside the element
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Disable page scrolling if the menu is open
  useEffect(() => {
    if (mobileMenuToggle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuToggle]);

  // NOTE: The transitions for this search component are mainly using opacity and pointer-events none, I can likely use JS to check whether the field is focused and unmount using CSSTransitions
  return (
    <>
      <form id='searchForm' onSubmit={handleSearch} aria-label='Search Box' className={`search-container ${mobileMenuToggle ? 'search-container-mobile' : 'search-container-mobile-disabled'}`}>
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
          <ul ref={menuRef} className={`search-menu ${mobileMenuToggle ? 'search-menu-mobile' : 'search-menu-mobile-disabled'}`}>
            {filteredItems.slice(0, 6).map((item) => 
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
                          {/* The following finds the first discounted option */}
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

      <button ref={buttonRef} onClick={toggleMobileMenu} aria-label='Search Button' className='search-btn mobile'>
        <svg
          aria-hidden
          viewBox="0 0 1024 1024"
          fill="currentColor"
          className='search-btn'
        >
          <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
        </svg>
      </button>
    </>
  )
}

export default Search