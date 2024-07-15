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

// Combine the titles with specific rules
if (titles.length > 1) {
  if (titles.includes('New Arrivals')) {
    const filteredTitles = titles.filter(title => title !== 'New Arrivals');
    const lastWord = filteredTitles[filteredTitles.length - 1];
    
    if (lastWord === "Men's" || lastWord === "Women's") {
      filteredTitles[filteredTitles.length - 1] = `${lastWord} Collection`;
      return `New in ${filteredTitles.join(' ')}`;
    }

    return titles.join(' ');
  } else if ((titles.includes('Sales') || titles.includes('Trending & Best Sellers')) && (titles.includes("Men's") || titles.includes("Women's"))) {
    const trendTitle = titles.includes("Men's") ? "Men's" : "Women's";
    let apparelTitle = '';
    if (titles.includes('Apparel')) apparelTitle = 'Apparel';
    else if (titles.includes('Shoes')) apparelTitle = 'Shoes';
    else if (titles.includes('Accessories')) apparelTitle = 'Accessories';
    else if (titles.includes('Underwear')) apparelTitle = 'Underwear';
    else apparelTitle = 'Collection';
    return `${titles.includes('Sales') ? 'Sales in' : 'Trending & Best Sellers in'} ${trendTitle} ${apparelTitle}`;
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


  // Default title if no searchParams match
  return titleDisplay.default;
}