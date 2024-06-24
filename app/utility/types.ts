/*** Custom Types ***/

/* DropdownButton Types */
export interface DropdownItem {
  name: string;
  type: 'component' | 'button' | 'link';
  component?: React.ReactElement;
  svg?: React.ReactElement;
}

/* Product Types */
export interface MediaItem {
  type: "image" | "video";
  url: string;
}

export interface Option {
  type: string;
  name: string;
  media: MediaItem[];
}

export interface Product {
  product_id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  weight: number;
  material: string;
  options: Option[];
  sizes: string[];
  tags: string[];
  custom_attributes: {
    [key: string]: string; // Allows any string key-value pair
  };
}

/* Add to Bag Types */
export interface ProductToBeAdded {
  selectedProduct: Product;
  selectedOption: string;
  selectedSize: string;
  selectedQuantity: number;
}
