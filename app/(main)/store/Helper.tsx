import { Product } from '@/app/utility/types';

enum SortCriteria {
  PRICE_ASC,
  PRICE_DESC,
  NEW_ARRIVALS,
  BEST_SELLERS
}

// Filtered products 
const filterProducts = ({parsedCategories, parsedTags, products}: {parsedCategories: string[], parsedTags: string[], products: Product[]}): Product[] => {
  const displayedProducts = 
    products.filter(product => {
      const hasTags = parsedTags?.some(tag =>
        product.tags.includes(tag) ||
        product.name.toLowerCase().includes(tag) ||
        product.category.toLowerCase().includes(tag) ||
        product.subcategory.toLowerCase().includes(tag) ||
        (product.gender.toLowerCase() === tag || (product.gender.toLowerCase() === 'unisex' && (tag === 'men' || tag === 'women')))
      );

      const meetsCategories = parsedCategories?.every(category => {
        const isExclusive = product.tags.includes('exclusive');
        const now = new Date('06-02-2024');
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        const withinSixMonths = product.options.some(option => option.releaseDate && new Date(option.releaseDate) >= sixMonthsAgo);
        const hasDiscount = product.options.some(option => option.discount > 0);
        const hasCategory = product.category.toLowerCase() === category || product.subcategory.toLowerCase() === category;
        const hasGender = product.gender.toLowerCase() === category || product.gender === 'unisex';
        const bestOption = product.options
          .map(option => {
            const totalSales = option.sizes.reduce((acc, size) => acc + size.sales, 0);
            const totalStock = option.sizes.reduce((acc, size) => acc + size.stock, 0);
            const salesPercentage = totalSales / (totalSales + totalStock) * 100;
            return { option, salesPercentage };
          })
          .sort((a, b) => b.salesPercentage - a.salesPercentage)
          .find(option => option.salesPercentage > 50);

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
            return bestOption;
          case 'apparel':
          case 'shoes':
          case 'accessories':
          case 'underwear':
            return hasCategory;
          default:
            return false;
        }
      }) || false;

      return (parsedTags ? hasTags && meetsCategories : meetsCategories) || false;
  });
  return displayedProducts as Product[]
}

// Sort products
const sortProducts = (products: Product[], selectedOptions: {[key: number]: number}, criteria: SortCriteria): Product[] => {
  switch (criteria) {
    case SortCriteria.PRICE_ASC:
      return products.sort((a, b) => 
        (a.options[selectedOptions[a.product_id] || 0].price * (1 - a.options[selectedOptions[a.product_id] || 0].discount)) 
        - (b.options[selectedOptions[b.product_id] || 0].price * (1 - b.options[selectedOptions[b.product_id] || 0].discount))
      );
    case SortCriteria.PRICE_DESC:
      return products.sort((a, b) => 
        (b.options[selectedOptions[b.product_id] || 0].price * (1 - b.options[selectedOptions[b.product_id] || 0].discount)) 
        - (a.options[selectedOptions[a.product_id] || 0].price * (1 - a.options[selectedOptions[a.product_id] || 0].discount))
      );
    case SortCriteria.NEW_ARRIVALS:
      return products.sort((a, b) => {
        const dateA = new Date(a.options[selectedOptions[a.product_id] || 0].releaseDate || 0);
        const dateB = new Date(b.options[selectedOptions[b.product_id] || 0].releaseDate || 0);
        return dateB.getTime() - dateA.getTime();
      });
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

export { filterProducts, sortProducts };