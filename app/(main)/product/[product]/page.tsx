import React from 'react';
import { ProductDetailsSection } from './PageSections';
import './product.css'

interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface Option {
  name: string;
  media: MediaItem[];
}

interface Product {
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

export default function Product() {
  return (
    <div className='product'>
      <ProductDetailsSection />
    </div>
  )
}