/*** Custom Types ***/

/* DropdownButton Types */
export interface DropdownItem {
  name: string;
  type: 'component';
  component?: React.ReactElement;
  svg?: React.ReactElement;
}

/* Product Types */
interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface Size {
  size: string;
  stock: number;
}

export interface Option {
  type: string;
  name: string;
  price: number;
  discount: number;
  sizes: Size[];
  media: MediaItem[];
}

export interface Product {
  product_id: number;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  options: Option[];
  details?: [string, string][];
  care?: [string, string][];
  tags: string[];
}

/* Add to Cart (Bag/Wishlist) Types */
export interface BagProduct {
  index: number;
  id: number;
  name: string;
  optionType: string;
  selectedOption: string;
  selectedSize: string;
  selectedQuantity: number;
  discount: number;
  ogPrice: number;
  price: number;
  defaultMedia: string;
}

export interface WishlistProduct {
  index: number;
  id: number;
  name: string;
  optionType: string;
  selectedOption: string;
  discount: number;
  ogPrice: number;
  price: number;
  defaultMedia: string;
}
