import { BagProduct, WishlistProduct, Product, Option } from '@/app/utility/types'
import Products from '@/data/products.json'
import Reviews from '@/data/reviews.json'

type productSearchParams = {
  name: string,
  id: string,
  option: string,
  size: string
}

const getProducts = (): { error: boolean, products: Product[] } => {
  return { error: false, products: Products as Product[] }
}

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
  const size = selectedOptionElement.sizes.find(sizeObj => sizeObj.size.toLowerCase() === (searchParams.size as string))?.size.toLowerCase() || selectedOptionElement.sizes.find(sizeObj => sizeObj.stock > 0)?.size.toLowerCase() || selectedOptionElement.sizes[0].size.toLowerCase();
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

// Validation for refreshing the page and the url is invalid (incorrect name, options, and sizes)
const validateURL = (product: Product, selectedOption: string, selectedSize: string): { error: boolean, url: string} => {
  // Create a new URL object and update the search params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  if (!baseUrl) return { error: true, url: '' };
  
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

// Validate if product to be added to the bag is in stock
const validateBagProduct = (id: number, option: string, size: string, quantity: number): { inStock: boolean, bagProduct: BagProduct } => {
  const product: Product = Products.find(product => product.product_id === id) as Product;
  if (!product) {
    return { inStock: false, bagProduct: {} as BagProduct };
  }

  const currentOption = product.options.find(opt => opt.name === option) as Option;
  if (!currentOption) {
    return { inStock: false, bagProduct: {} as BagProduct };
  }

  const inStock = currentOption.sizes.find(sizeObj => sizeObj.size.toLowerCase() === size.toLowerCase() && sizeObj.stock > 0)
  if (!inStock) {
    return { inStock: false, bagProduct: {} as BagProduct };
  }

  const discount = currentOption.discount;
  const ogPrice = currentOption.price;
  let price = ogPrice - (ogPrice * discount / 100);
  if (discount != 0) {
    price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
  } else {
    price = parseFloat((ogPrice).toFixed(2));
  }

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
  const product: Product = Products.find(product => product.product_id === id) as Product;
  if (!product) {
    return { error: true, wishlistProduct: {} as WishlistProduct };
  }

  const currentOption = product.options.find(opt => opt.name === option) as Option;
  if (!currentOption) {
    return { error: true, wishlistProduct: {} as WishlistProduct };
  }

  const validSize = currentOption.sizes.find(sizeObj => sizeObj.size.toLowerCase() === size.toLowerCase())
  if (!validSize) {
    return { error: true, wishlistProduct: {} as WishlistProduct };
  }

  const inStock = currentOption.sizes.some(sizeObj => sizeObj.size.toLowerCase() === size.toLowerCase() && sizeObj.stock > 0);
  const discount = currentOption.discount;
  const ogPrice = currentOption.price;
  let price = ogPrice - (ogPrice * discount / 100);
  if (discount != 0) {
    price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
  } else {
    price = parseFloat((ogPrice).toFixed(2));
  }

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

    const inStock = currentOption.sizes.find(sizeObj => sizeObj.size.toLowerCase() === item.selectedSize.toLowerCase() && sizeObj.stock > 0)
    const discount = currentOption.discount;
    const ogPrice = currentOption.price;
    let price = ogPrice - (ogPrice * discount / 100);
    if (discount != 0) {
      price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
    } else {
      price = parseFloat((ogPrice).toFixed(2));
    }

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

    const inStock = currentOption.sizes.find(sizeObj => sizeObj.size.toLowerCase() === item.selectedSize.toLowerCase() && sizeObj.stock > 0)
    const discount = currentOption.discount;
    const ogPrice = currentOption.price;
    let price = ogPrice - (ogPrice * discount / 100);
    if (discount != 0) {
      price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
    } else {
      price = parseFloat((ogPrice).toFixed(2));
    }

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

export { getProducts, validateProduct, getSelectedOption, validateURL, validateBagProduct, validateWishlistProduct, calculateCosts, validateBag, validateWishlist  };