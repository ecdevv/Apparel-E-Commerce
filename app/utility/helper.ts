/*** Helper Functions ***/

/*
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalizeFirstLetter = (str: string) => {
  if (typeof str !== 'string' || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getCustomColor(color: string) {
  return window.getComputedStyle(document.documentElement).getPropertyValue(`--${color}-button-color`) ? `rgba(var(--${color}-button-color))` : 'rgba(var(--secondary-color))';
};

const titleDisplay = {
  new: 'New Arrivals',
  sales: 'Sales',
  men: "Men's Collection",
  women: "Women's Collection",
  trending: 'Trending & Best Sellers',
  popular: 'Trending & Best Sellers',
  bestSellers: 'Trending & Best Sellers',
  collections: 'Collections',
  exclusive: 'Limited Exclusives',
  apparel: 'Apparel',
  shoes: 'Shoes',
  accessories: 'Accessories',
  underwear: 'Underwear',
  default: 'All Products'
};

export function getTitle(searchParams: string[]) {
  const titles = [];

  if (!searchParams) return titleDisplay.default;
  // Check for specific combinations and add to the titles array in the order of precedence
  if (searchParams.includes('new')) titles.push('New Arrivals');
  if (searchParams.includes('sales')) titles.push('Sales');
  if (searchParams.includes('men')) titles.push("Men's");
  if (searchParams.includes('women')) titles.push("Women's");
  if (searchParams.includes('shoes')) titles.push('Shoes');
  if (searchParams.includes('apparel')) titles.push('Apparel');
  if (searchParams.includes('accessories')) titles.push('Accessories');
  if (searchParams.includes('underwear')) titles.push('Underwear');
  if (searchParams.includes('trending') || searchParams.includes('popular') || searchParams.includes('bestSellers')) titles.push('Trending & Best Sellers');
  if (searchParams.includes('collections')) titles.push('Collections');
  if (searchParams.includes('exclusive')) titles.push('Limited Exclusives');

  // Creating and combing custom titles
  if (titles.length > 1) {
    // Check for combinations of titles for 'new'
    if (titles.includes('New Arrivals')) {
      let finalTitle = 'New Arrivals';

      // Set specific outputs if combinations are found for sales and trending
      if (titles.includes('Trending & Best Sellers')) {
        if (titles.includes('Sales')) {
          finalTitle = 'New Trending Sales';
        } else if (titles.includes('New Arrivals')) {
          finalTitle = 'New & Trending';
        }
      } else if (titles.includes('Sales')) {
        if (titles.includes('New Arrivals')) {
          finalTitle = 'New Sales';
        }
      }

      // Add to 'collections' string to the end outputs if combinations are found for men and women
      if (titles.includes("Men's") || titles.includes("Women's")) {
        const gender = titles.includes("Men's") ? "Men's" : "Women's";
        finalTitle = `${finalTitle} in ${gender} Collections`;
      }

      return finalTitle;
    } 
    // Check for combinations of titles for 'sales' or 'trending' with 'men' or 'women'
    else if ((titles.includes('Sales') || titles.includes('Trending & Best Sellers')) && (titles.includes("Men's") || titles.includes("Women's"))) {
      // Extract the gender from the titles array
      const trendTitle = titles.includes("Men's") ? "Men's" : "Women's";

      // Determine the apparel type based on the titles array
      let apparelTitle = '';
      if (titles.includes('Apparel')) apparelTitle = 'Apparel';
      else if (titles.includes('Shoes')) apparelTitle = 'Shoes';
      else if (titles.includes('Accessories')) apparelTitle = 'Accessories';
      else if (titles.includes('Underwear')) apparelTitle = 'Underwear';
      else apparelTitle = 'Collection';

      // Determine if 'Sales' and 'Trending & Best Sellers' are included in the titles array
      const includesSales = titles.includes('Sales');
      const includesTrending = titles.includes('Trending & Best Sellers');

      // Generate the final title based on the combination of titles
      if (includesSales && includesTrending) {
        // If both 'Sales' and 'Trending & Best Sellers' are included, generate the title
        // "Trending Sales in {gender} {apparelType}"
        return `Trending Sales in ${trendTitle} ${apparelTitle}`;
      } else {
        // If only 'Sales' or 'Trending & Best Sellers' is included, generate the title
        // "{otherTitles} in {gender} {apparelType}"
        return `${titles.filter(title => title !== trendTitle && title !== apparelTitle)} in ${trendTitle} ${apparelTitle}`;
      }
    } else if (titles.includes('Sales') && titles.includes('Trending & Best Sellers')) {
      return 'Trending Sales';
    } else {
      return titles.join(' ');
    }
  } else if (titles.length === 1 && titles[0] === "Sales") {
    return "All Sales";
  } else if (titles.length === 1 && (titles[0] === "Men's" || titles[0] === "Women's")) {
    return `${titles[0]} Collection`;
  } else if (titles.length === 1) {
    return titles[0];
  }

    return titleDisplay.default;
}

