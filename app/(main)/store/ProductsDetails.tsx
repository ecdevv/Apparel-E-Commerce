'use client'
import React, { useEffect, useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import Loading from '@/app/components/Generic/Loading/Loading'
import { CustomLink, GeneralButton } from '@/app/components/Buttons/General/General'
import Checkmark from '@/app/components/Generic/Checkmark/Checkmark'
import ScrollToTop from '@/app/components/Generic/ScrollToTop/ScrollToTop'
import Select from '@/app/components/Buttons/Select/Select'
import Carousel from '@/app/components/Carousel/Carousel'
import AccordionMenu from '@/app/components/Accordion/AccordionMenu'
import { Product, ImageData } from '@/app/utility/types'
import { capitalizeFirstLetter, getTitle, getCustomColor } from '@/app/utility/helper'
import { filterProductsByParams, filterProductsByFilters, sortProducts, validateStoreProduct, getStoreProductOption } from '@/server/mockValidations'
import './store.css'
import AddToWishlistButton from '@/app/components/Buttons/AddToWishlist/AddToWishlist'

const ProductCard = React.memo(({ product, selectedOption, onClick }: { product: Product, selectedOption: number, onClick:(id: number, index: number) => void }) => {
  // Validate the product (shouldn't really be needed since the products themselves are validated)
  const validatedProductResponse = validateStoreProduct(product, selectedOption);
  const validatedProduct = validatedProductResponse.product;
  if (!validatedProduct) return <></>;

  // Find the current option based on the selectedOption prop for this product card and set all of the selected option's details
  const currentOptionResponse = getStoreProductOption(validatedProduct, selectedOption);
  const currentOption = currentOptionResponse.currentOption;
  const inStock = currentOptionResponse.inStock;
  const discount = currentOptionResponse.discount;
  const ogPrice = currentOptionResponse.ogPrice;
  const price = currentOptionResponse.price;
  const imageUrls = currentOptionResponse.images;
  const Images: ImageData[] = imageUrls.map((image) => ({
    src: image,
    alt: `${product.name} - ${capitalizeFirstLetter(product.gender)}`,
    blurDataUrl: ' ' // Empty string to keep typescript happy (can't generate blurDataUrl since we are in a client component)
  }));

  return (
    <div className='product-card'>
      <div className='product-card-image-wrapper'>
        <Carousel
          href={`/store/p?${new URLSearchParams({
            name: validatedProduct.name.split(/[ ,]+/).join('-').toLowerCase(), 
            id: validatedProduct.product_id.toString(), option: 
            currentOption.name, size: 
            currentOption.sizes[0].name.toLowerCase()
          })}`} 
          Images={Images} 
          Width={100} 
          ShowNavArrows={true}
          ShowDotBtns={true}
          ShowDotBtnsMobileOnly={true}
          navArrowSize={35}
          dotSlimStyle={true}
        />
        {currentOption.discount > 0 && <div className='product-card-discount-badge'>{(discount * 100).toFixed(0)}% OFF</div>}
        {/* <AddToWishlistButton id={validatedProduct.product_id} option={currentOption.name} size={currentOption.sizes[0].name} icon={true} className='product-wishlist-btn'/> */}
        {!inStock ? <div className="product-out-of-stock-text">OUT OF STOCK</div> : <></>}
      </div>
      <div className='product-card-content'>
        <div className='product-card-content-details'>
          <CustomLink href='/store/p?' product={{id: validatedProduct.product_id, option: currentOption.name} as any} className='product-card-name'>{validatedProduct.name}</CustomLink>
          {currentOption.discount <= 0
            ? <p>
                ${(price).toFixed(2)}
              </p> 
            : <div className='product-card-price-wrapper'>
                <p className='product-card-price-strike'>
                  ${(ogPrice).toFixed(2)}
                </p>
                <p className='product-card-price-discounted'>
                  ${(price).toFixed(2)}
                </p>
              </div>
              
          }
        </div>
        <div className='product-card-content-options'>
          {validatedProduct.options.map((option: any, index) => (
            <button 
              key={index} 
              onClick={() => onClick(validatedProduct.product_id, index)} 
              aria-label={`${validatedProduct.name}'s ${option.name} option`} 
              className={`dot-button ${selectedOption === index ? 'selected' : ''}`} 
              style={{'backgroundColor': getCustomColor(option.name)} as React.CSSProperties}>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}, (prevProps, nextProps) => prevProps.product.product_id === nextProps.product.product_id && prevProps.selectedOption === nextProps.selectedOption)

const FilterMenu = ({products, categories, tags, selectedFilters, onClick, onClear, onClose}: {
  products: Product[], categories: string[], tags: string[], selectedFilters: {[key: string]: string}, onClick: (type: string, option: string) => void, onClear: () => void, onClose: () => void
}) => {
  // Custom sort orders
  const sizeSort = ['XS', 'S', 'MD', 'LG', 'XL', '2XL'];

  // Find all unique types from all products, options, and sizes (nestedOption); set options by type so we can display each type and each type's options; add a "Category" for genders if needed
  const types = Array.from(
    new Set(
      products.flatMap(({ options }) =>
        options.flatMap(({ type, sizes }) => [type, ...sizes.map(({ type: sizeType }) => sizeType)].sort((a, b) => a.localeCompare(b))
      )
    )
  ));
  if (products.length !== 0 && !categories?.includes('men') && !categories?.includes('women') && !tags?.includes('men') && !tags?.includes('women')) {
    types.unshift('Category');
  }
  
  const optionsByType: {[key: string]: string[]} = types.reduce((acc: {[key: string]: string[]}, type: string) => {
    acc[type] = products
      .flatMap(product => product.options
        .filter(option => option.type === type)
        .map(option => option.name)
        .concat(product.options
          .flatMap(option => option.sizes
            .filter(size => size.type === type)
            .map(size => size.name)
          )
        )
      )
      .sort((a, b) => type === 'size' ? sizeSort.indexOf(a) - sizeSort.indexOf(b) : a.localeCompare(b))
      .filter((value, index, self) => self.indexOf(value) === index);

    if (type === 'Category') {
      acc['Category'] = Array.from(new Set([...acc['Category'], 'men', 'women']));
    }

    return acc;
  }, {});

  // Set selected options for each type (works like checkboxes)
  const handleClick = (type: string, option: string) => {
    onClick && onClick(type, option);
  }

  // Handle clearing all filters
  const handleClearAll = () => {
    onClear && onClear();
  }

  // Handle closing the filter menu (used on mobile)
  const handleClose = () => {
    onClose && onClose();
  }

  return (
    <div className='filter-menu'>
      <button onClick={handleClose} className='filter-menu-close store-mobile'>
        <svg
          aria-hidden
          viewBox="0 0 25 25" 
          fill="currentColor"
          stroke="currentColor"
          className='filter-menu-close-svg'
        > 
          <path d="M18 7L7 18M7 7L18 18" strokeWidth="1.2" />
        </svg>
      </button>
      <button onClick={handleClearAll} className='filter-menu-clear'>
        Clear All
        <svg
          aria-hidden
          viewBox="0 0 25 25" 
          fill="currentColor"
          stroke="currentColor"
          className='filter-menu-clear-svg'
        > 
          <path d="M18 7L7 18M7 7L18 18" strokeWidth="1.2" />
        </svg>
      </button>
      <hr className='accordion-hr'></hr>
      {types.map((type, index) => (
        <AccordionMenu key={index} title={capitalizeFirstLetter(type)} headerPadding={20}>
          <ul className='filter-menu-ul'>
            {optionsByType[type].map((option: any, index: number) =>
              <li key={index}>
                <button onClick={() => handleClick(type, option)} className='filter-menu-option'>
                  {selectedFilters && selectedFilters[type]?.split(',').includes(option) 
                    ? <span className={`dot-button large`} style={{'backgroundColor': getCustomColor(option)} as React.CSSProperties}>
                        <Checkmark />
                      </span>
                    : <span className={`dot-button large`} style={{'backgroundColor': getCustomColor(option)} as React.CSSProperties}></span>
                  }
                  {capitalizeFirstLetter(option)}
                </button>
              </li>
            )}
          </ul>
        </AccordionMenu>
      ))}
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
  const [filterOpenMobile, setFilterOpenMobile] = useState(false);
  const [filters, setFilters] = useState<{[key: string]: string}>({});
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>(SortCriteria.NEW_ARRIVALS);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});
  const [rowsShown, setRowsShown] = useState(4);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  
  // Set the filtered products by search parameters, then filter products by user filters, and then sort the products from the search parameters
  const filteredProducts = filterProductsByParams({products: products, parsedCategories, parsedTags});
  const fullyFilteredProducts = filterProductsByFilters({products: filteredProducts, filters});
  const sortedProducts = sortProducts([...fullyFilteredProducts], selectedOptions, sortCriteria);

  // Set the selected options for each product, reset the filters, close the filter menu, and reset the rows shown
  useEffect(() => {
    sortedProducts.forEach((product) => {
      setSelectedOptions((prev) => ({
        ...prev,
        [product.product_id]: 0
      }));
    });
    setFilters({});
    setFilterOpen(false);
    setRowsShown(4);

    // Disable eslint rule for missing dependency sortedProducts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedCategories, parsedTags]);

  // Function to update the absolute filter-menu height based on the store-products-container height for animation/transition purposes
  useEffect(() => {
    updateHeight();
  }, [rowsShown, sortedProducts]);

  // On page load, set the loading state to false and check for clicks outside the filter menu (mobile)
  useEffect(() => {
    // Set the loading state when the products are sorted
    setIsLoading(false);
    // Function to handle clicks outside the element (mousedown) (used for the mobile filter menu)
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && mobileButtonRef.current && (!mobileMenuRef.current.contains(e.target as Node) && !mobileButtonRef.current.contains(e.target as Node))) {  // If the mouse click is not in the menu, close the menu
        setFilterOpenMobile(false);
      }
    };
    
    // Add event listener to detect clicks outside the element
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Disable scrolling for the mobile filter menu (displayed separately from the desktop filter menu)
  useEffect(() => {
    if (filterOpenMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [filterOpenMobile]);

  // Getting the height of the container for the products and filter menu to be used to transition/animate the products container when they resize
  const updateHeight = () => {
    if (contentRef.current) {
      const { height: contentHeight } = contentRef.current.getBoundingClientRect();
      setContentHeight(contentHeight);
    }
  };

  // Handle toggling the menu open
  const handleFilterClick = () => {
    setFilterOpen(prev => !prev);
  }
  
  // Handle toggling the mobile menu open
  const handleFilterMobileClick = () => {
    setFilterOpenMobile(prev => !prev);
  }

  // Handle the adding/removing filters by type/key value {"color": "red"} to an object.
  const handleAddFilterClick = (type: string, option: string) => {
    setFilters(prevState => {
      const prevOptions = prevState[type] ? prevState[type].split(',') : [];
      const newOptions = prevOptions.includes(option) ? prevOptions.filter((opt: string) => opt !== option) : [...prevOptions, option];
      return { ...prevState, [type]: newOptions.join(',') }
    })
  }

  // Handle the clearing all filters
  const handleFilterClearAll = () => {
    setFilters({});
  }

  // Handle the sort criteria
  const handleSortClick = (criteria: SortCriteria) => {
    setSortCriteria(criteria);
  };

  // Handle the selected options
  const handleOptionChange = (productId: number, optionIndex: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: optionIndex
    }));
  };

  // Handle the show more button
  const handleShowMoreClick = () => {
    setRowsShown((prev) => prev + 4);
  };

  // Display a loading component while the products are loading (wait for sortProducts)
  if (isLoading) {
    return <section className='store-products-section'><div className='loading-page'>Loading...<Loading /></div></section>
  }

  return (
    <section className='store-products-section'>
      <h1 className='store-products-title'>{getTitle(parsedCategories)}</h1>
      <div className='store-products-sort-container'>
        <button onClick={handleFilterClick} aria-label='Filter' className='filter-btn s-desktop'>
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
        <button ref={mobileButtonRef} onClick={handleFilterMobileClick} aria-label='Filter' className='filter-btn s-mobile'>
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
      </div>
      <div ref={contentRef} className='store-products-container'>
        <div className='store-desktop filter-abs' style={{'--height': `${contentHeight}px`} as React.CSSProperties}>
          <CSSTransition in={filterOpen} timeout={200} classNames='filter' onEntered={updateHeight} unmountOnExit>
            <FilterMenu products={filteredProducts} categories={parsedCategories} tags={parsedTags} selectedFilters={filters} onClick={handleAddFilterClick} onClear={handleFilterClearAll} onClose={handleFilterClick} />
          </CSSTransition>
        </div>
        <div className={`store-products-wrapper ${filterOpen ? 'with-filter' : ''}`}>
          {sortedProducts.length === 0 ? (
            <div className='products-not-found'>
              <p>No results found.</p>
            </div>
          ) : (
            <div className='product-cards-container'>
              {sortedProducts.slice(0, rowsShown).map((product: any, index) => (
                <ProductCard 
                  key={index} 
                  product={product} 
                  selectedOption={selectedOptions[product.product_id] || 0} 
                  onClick={handleOptionChange}
                />
              ))}
            </div>
          )}
          {rowsShown < sortedProducts.length 
            ? (
            <div className='show-more-btn-wrapper'>
              <GeneralButton onClick={handleShowMoreClick} className='btn second'>Show More</GeneralButton>
            </div>
            )
            : sortedProducts.length > 4 && <ScrollToTop className='back-to-top-btn'>Back to Top</ScrollToTop>
          }
        </div>
      </div>

      {/* Filter Menu Mobile*/}
      <>
        <div className={`dimmer ${filterOpenMobile ? 'toggled' : ''}`}></div>
        <div ref={mobileMenuRef} className='store-mobile'>
          <CSSTransition in={filterOpenMobile} timeout={200} classNames='filter' unmountOnExit>
            <FilterMenu products={filteredProducts} categories={parsedCategories} tags={parsedTags} selectedFilters={filters} onClick={handleAddFilterClick} onClear={handleFilterClearAll} onClose={handleFilterMobileClick}/>
          </CSSTransition>
        </div>
      </>
    </section>
  )
};

ProductsDetails.displayName = 'ProductsDetails';
FilterMenu.displayName = 'FilterMenu';
ProductCard.displayName = 'ProductCard';

export default ProductsDetails;

