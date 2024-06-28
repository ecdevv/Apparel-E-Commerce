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
  price: number;
  discount: number;
}

export interface Option {
  type: string;
  name: string;
  data: {sizes: Size[]}
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
  selectedProduct: Product;
  selectedOption: string;
  selectedSize: string;
  selectedQuantity: number;
  selectedPrice: number;
}
