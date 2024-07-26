import { BagProduct, WishlistProduct, Product, Option } from '@/app/utility/types'
import Products from '@/data/products.json'
import Reviews from '@/data/reviews.json'

type productSearchParams = {
  name: string,
  id: string,
  option: string,
  size: string
}

enum SortCriteria {
  PRICE_ASC,
  PRICE_DESC,
  NEW_ARRIVALS,
  BEST_SELLERS
}

/********************************** STORE PAGE VALIDATIONS (PRODUCTS) **************************************** */
// Validation for refreshing the page and the url is invalid (incorrect name, options, and sizes)
const validateStoreURL = (headers: Readonly<Headers>, categories: string[], tags: string[]): { error: boolean, url: string} => {
  // Create a new URL object and update the search params
  const baseUrl = headers.get('x-base-url') || '';
  if (!baseUrl) return { error: true, url: '' };

  // Create a new URL object and set the default category parameter
  const newUrl = new URL('/store', baseUrl);
  let newSearchParams = new URLSearchParams({
    category: 'all',
  });
  
  // Return based url if no categories or tags
  if (!categories && !tags) {
    return { error: false, url: newUrl.toString() }
  }

  // Return based url if only tags
  if (!categories && tags) {
    const newTagStrings = tags?.join(' ').toLowerCase();
    if (newTagStrings.length > 0) {
      newSearchParams = new URLSearchParams({
        tags: newTagStrings,
      });
    }
    newUrl.search = newSearchParams.toString();
    return { error: false, url: newUrl.toString() }
  }

  // Validate categories and tags if they exist
  const validCategories = ['all', 'new', 'sales', 'men', 'women', 'trending', 'popular', 'collections', 'exclusive', 'apparel', 'shoes', 'accessories', 'underwear'];
  const newCategorySearchParam = categories?.some(param => validCategories.includes(param.toLowerCase()));
  if (newCategorySearchParam) {
    const newCategoryStrings = categories.filter(param => validCategories.includes(param.toLowerCase())).join(' ').toLowerCase();
    const newTagStrings = tags?.join(' ').toLowerCase();

    if (tags && newTagStrings.length > 0) {
      newSearchParams = new URLSearchParams({
        category: newCategoryStrings,
        tags: newTagStrings,
      });
    } else {
      newSearchParams = new URLSearchParams({
        category: newCategoryStrings,
      });
    }
  }

  // Update the search params in the URL
  newUrl.search = newSearchParams.toString();
  
  // Replace the current URL with the updated one
  return { error: false, url: newUrl.toString() }
};

// Validate all products and return them
const getProducts = (): { error: boolean, products: Product[] } => {
  let error = false;
  const products: Product[] = [];
  for (const product of Products) {
    // Check for duplicate product IDs
    const productIDs = Products.map(p => p.product_id);
    const duplicateIDs = productIDs.filter((id, index) => productIDs.indexOf(id) !== index);
    if (duplicateIDs.length > 0 && duplicateIDs.includes(product.product_id)) {
      console.error(`The following product IDs are duplicate: ${duplicateIDs.join(', ')}`);
      error = true;
      continue;
    }
  
    // Check for duplicate option names
    const optionNames = product.options.map(option => option.name);
    if (new Set(optionNames).size !== optionNames.length) {
      console.error('Duplicate option name found; each option name must be unique.');
      error = true;
      continue;
    } else if (optionNames.length === 0 || optionNames.every(name => !name)) {
      console.error('No options found.');
      error = true;
      continue;
    }
  
    products.push(product as Product);
  }

  if (error) {
    return { error: true, products: [] };
  }

  return { error: false, products };
}

// Filtered products array based on the search query
const filterProductsBySearch = ({ products, query }: { products: Product[], query: string }): Product[] => {
  if (!query) return [];
  const queryLower = query.toLowerCase();
  return products.filter(product =>
    product.tags.some(tag => tag.includes(queryLower) || queryLower.includes(tag.toLowerCase())) ||
    product.name.toLowerCase().includes(queryLower) ||
    product.options.some(option => option.name.toLowerCase().includes(queryLower) || queryLower.includes(option.name.toLowerCase())) ||
    queryLower.includes(product.category.toLowerCase()) ||
    queryLower.includes(product.subcategory.toLowerCase()) ||
    queryLower.includes(product.gender.toLowerCase())
  );
  // return products.filter(product =>
  //   product.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
  //   product.name.toLowerCase().includes(queryLower) ||
  //   product.category.toLowerCase().includes(queryLower) ||
  //   product.subcategory.toLowerCase().includes(queryLower) ||
  //   product.gender.toLowerCase().includes(queryLower) ||
  //   product.options.some(option =>
  //     option.name.toLowerCase().includes(queryLower) ||
  //     option.sizes.some(size => size.name.toLowerCase().includes(queryLower))
  //   )
  // );
}

// Filtered products array based on the parsed categories and tags
const filterProductsByParams = ({ products, parsedCategories, parsedTags }: { products: Product[], parsedCategories: string[], parsedTags: string[] }): Product[] => {
  // If no categories or tags are provided, return the original array of products
  if (!parsedCategories && !parsedTags) return products;

  // The filtered products array based on the parsed categories and tags
  const displayedProducts = products.filter(product => {
      // Check if product matches every category in the parsed categories; a category can be is exclusive, within 6 months of release, has discount, has category, has gender, or is best seller
      const meetsCategories = parsedCategories?.every(category => {
        const isExclusive = product.tags.includes('exclusive') || product.tags.includes('limited');
        const now = new Date('07-02-2024'); // Using a static date since this is a project and not a real store
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        const withinSixMonths = product.options.some(option => option.releaseDate && new Date(option.releaseDate) >= sixMonthsAgo);
        const hasDiscount = product.options.some(option => option.discount > 0);
        const hasCategory = product.category.toLowerCase() === category || product.subcategory.toLowerCase() === category;
        const hasGender = product.gender.toLowerCase() === category || product.gender === 'unisex';

        // Find the best seller for the product by finding the option with the highest sale percentage above 50%
        const bestSeller = product.options
          .map(option => {
            const totalSales = option.sizes.reduce((acc, size) => acc + size.sales, 0);
            const totalStock = option.sizes.reduce((acc, size) => acc + size.stock, 0);
            const salesPercentage = totalSales / (totalSales + totalStock) * 100;
            return { option, salesPercentage };
          })
          .sort((a, b) => b.salesPercentage - a.salesPercentage)
          .find(option => option.salesPercentage > 50);

        // Check if the product matches the category and return the result
        switch (category) {
          case 'all':
            return true;
          case 'exclusive':
            return isExclusive;
          case 'new':
            return withinSixMonths;
          case 'sales':
            return hasDiscount;
          case 'men':
          case 'women':
            return hasGender;
          case 'trending':
          case 'popular':
            return bestSeller;
          case 'apparel':
          case 'shoes':
          case 'accessories':
          case 'underwear':
            return hasCategory;
          default:
            return false;
        }
      }) || false;

      // Check if the product matches the parsed tags
      const hasTags = parsedTags?.some(tag =>
        product.tags.includes(tag) ||
        product.name.toLowerCase().includes(tag) ||
        product.category.toLowerCase().includes(tag) ||
        product.subcategory.toLowerCase().includes(tag) ||
        (product.gender.toLowerCase() === tag || (product.gender.toLowerCase() === 'unisex' && (tag === 'men' || tag === 'women'))) ||
        product.options.map(option => option.name.toLowerCase()).includes(tag) ||
        product.options.map(option => option.sizes.map(size => size.name.toLowerCase())).flat().includes(tag)
      );

      // If both are provided, it will filter by both tags and categories
      // If no tags are provided, it will only filter by categories.
      // If no categories are provided, it will only filter by tags.
      const hasBothTagsAndCategories = parsedTags && parsedCategories && hasTags && meetsCategories;
      const hasOnlyTags = parsedTags && !parsedCategories && hasTags;
      const hasOnlyCategories = !parsedTags && parsedCategories && meetsCategories;

      // Check if the product meets the filter criteria
      const meetsFilterCriteria = (hasBothTagsAndCategories || hasOnlyTags || hasOnlyCategories);

      return meetsFilterCriteria || false;
  });
  
  return displayedProducts as Product[]
}

const filterProductsByFilters = ({ products, filters }: { products: Product[], filters: {[key: string]: string} }): Product[] => {
  // If filters are provided, return the original array of products
  if (!filters || Object.keys(filters).length === 0 || Object.values(filters).every(value => !value || value.length === 0)) return products;

  // Check if the product matches all the filters and return the products
  return products.filter(product => {
    const meetsFilters = Object.entries(filters).every(([key, value]) => {
      if (!value || value.length === 0) return true;
      const values = value?.split(',') || [];
      const hasFilters = values.some(value => 
        product.options.map(option => option.name.toLowerCase()).includes(value.toLowerCase()) ||
        product.options.map(option => option.sizes.map(size => size.name.toLowerCase())).flat().includes(value.toLowerCase()) ||
        (product.gender.toLowerCase() === value || (product.gender.toLowerCase() === 'unisex' && (value === 'men' || value === 'women')))
      );
      return hasFilters;
    });
    return meetsFilters;
  });
}

// Sort products by price, new arrivals, or best sellers
const sortProducts = (products: Product[], selectedOptions: {[key: number]: number}, criteria: SortCriteria): Product[] => {
  // Sort products based on the selected criteria
  switch (criteria) {
    // Sort by ascending price based on the selected option
    case SortCriteria.PRICE_ASC:
      return products.sort((a, b) => 
        (a.options[selectedOptions[a.product_id] || 0].price * (1 - a.options[selectedOptions[a.product_id] || 0].discount)) 
        - (b.options[selectedOptions[b.product_id] || 0].price * (1 - b.options[selectedOptions[b.product_id] || 0].discount))
      );
    // Sort by descending price based on the selected option
    case SortCriteria.PRICE_DESC:
      return products.sort((a, b) => 
        (b.options[selectedOptions[b.product_id] || 0].price * (1 - b.options[selectedOptions[b.product_id] || 0].discount)) 
        - (a.options[selectedOptions[a.product_id] || 0].price * (1 - a.options[selectedOptions[a.product_id] || 0].discount))
      );
    // Sort by new arrivals based on when the product was released and the current date
    case SortCriteria.NEW_ARRIVALS:
      return products.sort((a, b) => {
        const dateA = new Date(a.options[selectedOptions[a.product_id] || 0].releaseDate || 0);
        const dateB = new Date(b.options[selectedOptions[b.product_id] || 0].releaseDate || 0);
        return dateB.getTime() - dateA.getTime();
      });
    // Sort by best selling based on the sales percentage by finding the option with the highest sales percentage for each product
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

const validateStoreProduct = (product: Product, selectedOption: number): { error: boolean, product: Product } => {
  const validatedProduct = Products.find(p => p.product_id === product.product_id) || null;

  if (!validatedProduct) {
    return { error: true, product: product };
  }

  return { error: false, product: validatedProduct as Product };
}

const getStoreProductOption = (product: Product, selectedOption: number): {currentOption: Option, images: string[], inStock: boolean, discount: number, ogPrice: number, price: number} => {
  const currentOption = product.options[selectedOption];
  const images = currentOption.media.filter(item => item.type === "image").map(item => item.url);
  const inStock = currentOption.sizes.some(size => size.stock > 0);
  const discount = currentOption.discount;
  const ogPrice = currentOption.price;
  let price = ogPrice - (ogPrice * discount / 100);
  if (discount != 0) {
    price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
  } else {
    price = parseFloat((ogPrice).toFixed(2));
  }

  return { currentOption: currentOption, images: images, inStock: inStock, discount: discount, ogPrice: ogPrice, price: price };
}

/********************************** PRODUCT PAGE VALIDATIONS (PRODUCT) **************************************** */
// Validation for refreshing the page and the url is invalid (incorrect name, options, and sizes)
const validateProductURL = (headers: Readonly<Headers>, product: Product, selectedOption: string, selectedSize: string): { error: boolean, url: string} => {
  // Create a new URL object and update the search params
  const baseUrl = (headers.get('x-base-url')) || '';
  if (!baseUrl) return { error: true, url: '' };
  
  // Create a new URL object and update the search params
  const newUrl = new URL('/store/p', baseUrl);
  const searchParams = new URLSearchParams({
    name: product.name.split(/[ ,]+/).join('-').toLowerCase(),
    id: product.product_id.toString(),
    option: selectedOption,
    size: selectedSize
  });

  // Update the search params in the URL
  newUrl.search = searchParams.toString();
  
  // Replace the current URL with the updated one
  return { error: false, url: newUrl.toString() }
};

// Validate the product for product page
const validateProduct = (searchParams: productSearchParams): { error: boolean, product: Product, productReviews: any, averageRating: number } => {
  const id = parseInt(searchParams.id);
  const product: Product = Products.find(product => product.product_id === id) as Product;
  const productReviews = Reviews.filter(review => review.product_id === id);
  const averageRating = parseFloat((productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length).toFixed(2)) || -1;

  // Validation check if product exists
  if (!product) {
    console.error('Product not found.');
    return { error: true, product: {} as Product, productReviews: [], averageRating: -1 };
  }

  // Validation check if product IDs are unique
  const productIDs = Products.map(product => product.product_id);
  const duplicateIDs = productIDs.filter((id, index) => productIDs.indexOf(id) !== index);
  if (duplicateIDs.length > 0 && duplicateIDs.includes(product.product_id)) {
    console.error(`The following product IDs are duplicate: ${duplicateIDs.join(', ')}`);
    return { error: true, product: {} as Product, productReviews: [], averageRating: -1 };
  }

  // Validation check if each option of the product is unique and if the product options are empty or falsy
  const optionNames = product.options.map(option => option.name);
  if (new Set(optionNames).size !== optionNames.length) {
    console.error('Duplicate option name found; each option name must be unique.');
    return { error: true, product: {} as Product, productReviews: [], averageRating: -1 };
  } else if (optionNames.length === 0 || optionNames.every(name => !name)) {
    console.error('No options found.');
    return { error: true, product: {} as Product, productReviews: [], averageRating: -1 };
  }

  return { error: false, product, productReviews, averageRating };
};

// Set the name, size, images, ogPrice, discount, and price of the selected option of a valid product from the above function
const getSelectedOption = (searchParams: productSearchParams, product: Product): { name: string, size: string, optionInStock: boolean, images: string[], ogPrice: number, discount: number, price: number } => {
  /*
   *  Find the option element in the array that is equivalent to the 'option' url param and set the name, 
   *  then validate and set the size from the 'size' url param or set the first size that has stock > 0 or set 'oos' if all sizes are stock <= 0, 
   *  then set the images for the selected option,
   *  and finally set the ogPrice, discount and price of the discount of the selected option 
  */
  // const selectedOptionElement = product.options.find(option => option.name === (searchParams.get('option') as string)) || product.options[0];
  const selectedOptionElement = product.options.find(option => option.name === (searchParams.option as string)) || product.options[0];
  const name = selectedOptionElement.name.toLowerCase();
  const size = selectedOptionElement.sizes.find(sizeObj => sizeObj.name.toLowerCase() === (searchParams.size as string))?.name.toLowerCase() || selectedOptionElement.sizes.find(sizeObj => sizeObj.stock > 0)?.name.toLowerCase() || selectedOptionElement.sizes[0].name.toLowerCase();
  const optionInStock = selectedOptionElement.sizes.some(sizeObj => sizeObj.stock > 0);
  const images = selectedOptionElement.media.filter(item => item.type === "image").map(item => item.url);
  const ogPrice = selectedOptionElement.price;
  const discount = selectedOptionElement.discount;
  let price = ogPrice - (ogPrice * discount / 100);
  if (discount != 0) {
    price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
  } else {
    price = parseFloat((ogPrice).toFixed(2));
  }

  return {name, size, optionInStock, images, ogPrice, discount, price};
}

// Validate if product to be added to the bag is in stock
const validateBagProduct = (id: number, option: string, size: string, quantity: number): { inStock: boolean, bagProduct: BagProduct } => {
  // Find the product in the array that is equivalent to the 'id' url param, return error if not found
  const product: Product = Products.find(product => product.product_id === id) as Product;
  if (!product) {
    return { inStock: false, bagProduct: {} as BagProduct };
  }

  // Find the option element in the array that is equivalent to the 'option' url param, return error if not found
  const currentOption = product.options.find(opt => opt.name === option) as Option;
  if (!currentOption) {
    return { inStock: false, bagProduct: {} as BagProduct };
  }

  // Validate the product's stock based on the selected option and size, return in error if not found
  const inStock = currentOption.sizes.find(sizeObj => sizeObj.name.toLowerCase() === size.toLowerCase() && sizeObj.stock > 0)
  if (!inStock) {
    return { inStock: false, bagProduct: {} as BagProduct };
  }

  // Set the price of the product based on the selected option and size
  const discount = currentOption.discount;
  const ogPrice = currentOption.price;
  let price = ogPrice - (ogPrice * discount / 100);
  if (discount != 0) {
    price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
  } else {
    price = parseFloat((ogPrice).toFixed(2));
  }
  
  // Create the bagProduct object
  const bagProduct: BagProduct = {
    index: 0,
    id: product.product_id,
    name: product.name,
    optionType: currentOption.type,
    selectedOption: option, 
    selectedSize: size, 
    selectedQuantity: quantity,
    discount: discount,
    ogPrice: ogPrice,
    price: price,
    defaultMedia: currentOption.media[0].url
  }

  return { inStock: true, bagProduct };
}

// Validate if product to be added to the bag is in stock
const validateWishlistProduct = (id: number, option: string, size: string): { error: boolean, wishlistProduct: WishlistProduct } => {
  // Find the product in the database based on the id, return error if not found
  const product: Product = Products.find(product => product.product_id === id) as Product;
  if (!product) {
    return { error: true, wishlistProduct: {} as WishlistProduct };
  }

  // Find the option in the product, return error if not found
  const currentOption = product.options.find(opt => opt.name === option) as Option;
  if (!currentOption) {
    return { error: true, wishlistProduct: {} as WishlistProduct };
  }

  // Find the size in the option, return error if not found
  const validSize = currentOption.sizes.find(sizeObj => sizeObj.name.toLowerCase() === size.toLowerCase())
  if (!validSize) {
    return { error: true, wishlistProduct: {} as WishlistProduct };
  }

  // Check if the size is in stock
  const inStock = currentOption.sizes.some(sizeObj => sizeObj.name.toLowerCase() === size.toLowerCase() && sizeObj.stock > 0);
  const discount = currentOption.discount;
  const ogPrice = currentOption.price;
  let price = ogPrice - (ogPrice * discount / 100);
  if (discount != 0) {
    price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
  } else {
    price = parseFloat((ogPrice).toFixed(2));
  }

  // Create the wishlist product
  const wishlistProduct: WishlistProduct = {
    index: 0,
    id: product.product_id,
    name: product.name,
    optionType: currentOption.type,
    selectedOption: option, 
    selectedSize: size,
    discount: discount,
    ogPrice: ogPrice,
    price: price,
    defaultMedia: currentOption.media[0].url,
    inStock: inStock
  }

  return { error: false, wishlistProduct };
}

// Validate each item in the bag
const validateBag = (bagItems: BagProduct[]): BagProduct[] => {
  return bagItems.map(item => {
    // Find the product in the array that is equivalent to the 'id' url param, return error if not found
    const product: Product = Products.find(p => p.product_id.toString() === item.id.toString()) as Product;
    if (!product) {
      return {
        ...item,
        name: 'Invalid Item',
        selectedQuantity: 0,
        discount: 0,
        ogPrice: 0,
        price: 0,
        defaultMedia: ''
      }
    }
    
    // Find the option element in the array that is equivalent to the 'option' url param, return error if not found
    const currentOption = product.options.find(opt => opt.name === item.selectedOption) as Option;
    if (!currentOption) {
      return {
        ...item,
        name: product.name,
        selectedOption: 'Invalid Option',
        selectedQuantity: 0,
        discount: 0,
        ogPrice: 0,
        price: 0,
        defaultMedia: ''
      }
    }

    // Validate the product's stock based on the selected option and size; set the price of the product based on the selected option and size
    const inStock = currentOption.sizes.find(sizeObj => sizeObj.name.toLowerCase() === item.selectedSize.toLowerCase() && sizeObj.stock > 0)
    const discount = currentOption.discount;
    const ogPrice = currentOption.price;
    let price = ogPrice - (ogPrice * discount / 100);
    if (discount != 0) {
      price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
    } else {
      price = parseFloat((ogPrice).toFixed(2));
    }

    // If not in stock, update the quantity to 0
    if (!inStock) {
      return {
        ...item,
        name: product.name,
        selectedQuantity: 0,
        discount: discount,
        ogPrice: ogPrice,
        price: price,
        defaultMedia: currentOption.media[0].url
      }
    }

    // Return the updated item
    return {
      ...item,
      name: product.name,
      discount: discount,
      ogPrice: ogPrice,
      price: price,
      defaultMedia: currentOption.media[0].url
    }
  })
}

// Validate each item in the bag
const validateWishlist = (wishItems: WishlistProduct[]): WishlistProduct[] => {
  return wishItems.map(item => {
    // Find the product in the array that is equivalent to the 'id' url param, return error if not found
    const product: Product = Products.find(p => p.product_id.toString() === item.id.toString()) as Product;
    if (!product) {
      return {
        ...item,
        name: 'Invalid Item',
        selectedQuantity: 0,
        discount: 0,
        ogPrice: 0,
        price: 0,
        defaultMedia: ''
      }
    }

    // Find the option element in the array that is equivalent to the 'option' url param, return error if not found
    const currentOption = product.options.find(opt => opt.name === item.selectedOption) as Option;
    if (!currentOption) {
      return {
        ...item,
        name: product.name,
        selectedOption: 'Invalid Option',
        selectedQuantity: 0,
        discount: 0,
        ogPrice: 0,
        price: 0,
        defaultMedia: ''
      }
    }

    // Validate the product's stock based on the selected option and size; set the price of the product based on the selected option and size
    const inStock = currentOption.sizes.find(sizeObj => sizeObj.name.toLowerCase() === item.selectedSize.toLowerCase() && sizeObj.stock > 0)
    const discount = currentOption.discount;
    const ogPrice = currentOption.price;
    let price = ogPrice - (ogPrice * discount / 100);
    if (discount != 0) {
      price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
    } else {
      price = parseFloat((ogPrice).toFixed(2));
    }

    // If not in stock, update the quantity to 0
    if (!inStock) {
      return {
        ...item,
        name: product.name,
        discount: discount,
        ogPrice: ogPrice,
        price: price,
        defaultMedia: currentOption.media[0].url,
        inStock: false
      }
    }

    // Return the updated item
    return {
      ...item,
      name: product.name,
      discount: discount,
      ogPrice: ogPrice,
      price: price,
      defaultMedia: currentOption.media[0].url,
      inStock: true,
    }
  })
}

const calculateCosts = (bagItems: BagProduct[]): {subTotal: number, totalDiscount: number, total: number, taxCost: number, shippingCost: number, grandTotal: number} => {
  // Get the tax rate and shipping somehow in this backend (get user shipping location?)
  const taxRate = 0.0825;
  const subTotal = parseFloat((bagItems.reduce((acc, item) => acc + item.ogPrice * item.selectedQuantity, 0)).toFixed(2));
  const totalDiscount = parseFloat((bagItems.reduce((acc, item) => acc + (item.ogPrice - item.price)  * item.selectedQuantity, 0)).toFixed(2));
  const total = parseFloat((bagItems.reduce((acc, item) => acc + item.price * item.selectedQuantity, 0)).toFixed(2));
  const taxCost = parseFloat((total * taxRate).toFixed(2));
  const shippingCost = parseFloat((0.00).toFixed(2));
  const grandTotal = parseFloat((total + taxCost + shippingCost).toFixed(2));

  return { subTotal: subTotal, totalDiscount: totalDiscount, total: total, taxCost: taxCost, shippingCost: shippingCost, grandTotal: grandTotal };
}

export {
  validateStoreURL, 
  getProducts, 
  filterProductsBySearch,
  filterProductsByParams, 
  filterProductsByFilters, 
  sortProducts, 
  validateStoreProduct,
  getStoreProductOption,
  validateProductURL, 
  validateProduct, 
  getSelectedOption, 
  validateBagProduct, 
  validateWishlistProduct, 
  calculateCosts, 
  validateBag, 
  validateWishlist
};