import { BagProduct, WishlistProduct, Product, Option } from '@/app/utility/types'
import Products from '@/data/products.json'
import Reviews from '@/data/reviews.json'

// Validate each item in the bag
const validateBag = (bagItems: BagProduct[]): BagProduct[] => {
  return bagItems.map(item => {
    const product: Product = Products.find(p => p.product_id.toString() === item.id.toString()) as Product;
    const currentOption = product.options.find(opt => opt.name === item.selectedOption) as Option;
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
    const currentOption = product.options.find(opt => opt.name === item.selectedOption) as Option;
    const discount = currentOption.discount;
    const ogPrice = currentOption.price;

    let price = ogPrice - (ogPrice * discount / 100);
    if (discount != 0) {
      price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
    } else {
      price = parseFloat((ogPrice).toFixed(2));
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

// Validate the product for product page
const validateProduct = (searchParams: URLSearchParams): { error: boolean, product: Product, productReviews: any, averageRating: number } => {
  const id = (parseInt(searchParams?.get('id') as string));
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
const getSelectedOption = (searchParams: URLSearchParams, product: Product): { name: string, size: string, images: string[], ogPrice: number, discount: number, price: number } => {
  /*
   *  Find the option element in the array that is equivalent to the 'option' url param and set the name, 
   *  then validate and set the size from the 'size' url param or set the first size that has stock > 0 or set 'oos' if all sizes are stock <= 0, 
   *  then set the images for the selected option,
   *  and finally set the ogPrice, discount and price of the discount of the selected option 
  */
  const selectedOptionElement = product.options.find(option => option.name === (searchParams.get('option') as string)) || product.options[0];
  const name = selectedOptionElement.name.toLowerCase();
  const size = selectedOptionElement.sizes.find(sizeObj => sizeObj.size.toLowerCase() === (searchParams.get('size') as string) && sizeObj.stock > 0)?.size.toLowerCase() || selectedOptionElement.sizes.find(sizeObj => sizeObj.stock > 0)?.size.toLowerCase() || 'oos';
  const images = selectedOptionElement.media.filter(item => item.type === "image").map(item => item.url);
  const ogPrice = selectedOptionElement.price;
  const discount = selectedOptionElement.discount;

  let price = ogPrice - (ogPrice * discount / 100);
    if (discount != 0) {
      price = parseFloat((ogPrice * (1 - discount)).toFixed(2));
    } else {
      price = parseFloat((ogPrice).toFixed(2));
    }
  
  return {name, size, images, ogPrice, discount, price};
}

// Validate if product to be added to the bag is in stock
const validateBagProduct = (id: number, option: string, size: string, quantity: number): { inStock: boolean, bagProduct: BagProduct } => {
  const product: Product = Products.find(product => product.product_id === id) as Product;
  const currentOption = product.options.find(opt => opt.name === option) as Option;
  const inStock = currentOption.sizes.find(sizeObj => sizeObj.size.toLowerCase() === size.toLowerCase() && sizeObj.stock > 0)
  const discount = currentOption.discount;
  const ogPrice = currentOption.price;

  if (!inStock) {
    return { inStock: false, bagProduct: {} as BagProduct };
  }

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
const validateWishlistProduct = (id: number, option: string): { inStock: boolean, wishlistProduct: WishlistProduct } => {
  const product: Product = Products.find(product => product.product_id === id) as Product;
  const currentOption = product.options.find(opt => opt.name === option) as Option;
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
    discount: discount,
    ogPrice: ogPrice,
    price: price,
    defaultMedia: currentOption.media[0].url
  }

  return { inStock: true, wishlistProduct };
}

const calculateCosts = (bagItems: BagProduct[]): {subTotal: number, totalDiscount: number, total: number, taxAmount: number, shippingCost: number, grandTotal: number} => {
  // Get the tax rate and shipping somehow in this backend (get user shipping location?)
  const taxRate = 0.0825;
  const subTotal = bagItems.reduce((acc, item) => acc + item.ogPrice * item.selectedQuantity, 0);
  const totalDiscount = bagItems.reduce((acc, item) => acc + (item.ogPrice - item.price)  * item.selectedQuantity, 0);
  const total = bagItems.reduce((acc, item) => acc + item.price * item.selectedQuantity, 0);
  const taxAmount = total * taxRate;
  const shippingCost = 0.00;
  const grandTotal = (total + taxAmount + shippingCost);

  return { subTotal: subTotal, totalDiscount: totalDiscount, total: total, taxAmount: taxAmount, shippingCost: shippingCost, grandTotal: grandTotal };
}

export { validateBag, validateWishlist, validateProduct, getSelectedOption, validateBagProduct, validateWishlistProduct, calculateCosts };

