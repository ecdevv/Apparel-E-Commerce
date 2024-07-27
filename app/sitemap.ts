import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getProducts } from "@/server/mockValidations";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers();
  const { products, error } = getProducts();
  const Products = error ? [] : products;

  const productURLs = Products.flatMap((product) =>
    product.options.flatMap((option) =>
      option.sizes.map((size) => ({
        url: `${headersList.get('x-base-url')}/store/p?name=${product.name.toLowerCase().replace(/[ ,]+/g, '-')}&amp;id=${product.product_id.toString()}&amp;option=${option.name.toLowerCase()}&amp;size=${size.name.toLowerCase()}`,
        lastModified: new Date(option.releaseDate as string),
      }))
    )
  );
  
  

  return [
    {
      url: `${headersList.get('x-base-url')}`,
      lastModified: new Date(),
    },
    {
      url: `${headersList.get('x-base-url')}/store`,
      lastModified: new Date(),
    },
    ...(error ? [] : productURLs)
  ]
} 