/*** Custom Types ***/

/* DropdownButton Types */
export interface DropdownItem {
  name: string;
  type: 'component' | 'button' | 'link';
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

/* Add to Bag Types */
export interface ProductToBeAdded {
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
