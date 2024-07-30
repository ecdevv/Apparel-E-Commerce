import React from 'react'
import Image from 'next/image'
import { CustomLink } from '../Buttons/General/General'
import { generateBlurDataUrl } from '@/app/utility/generateBlurDataUrl';
import './NavMegaMenu.css'

const NewMegaMenu = async () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '3'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <CustomLink href='/store/p?' product={{id: 1} as any} className='mega-menu-image-wrapper'>
          <Image 
            src='/images/products/apparel/jackets_coats/product_1/black/item2.webp'
            alt='Atelier x Luxe Limited Edition Jacket - Unisex'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
            placeholder='blur'
            blurDataURL={await generateBlurDataUrl('/images/products/apparel/jackets_coats/product_1/black/item2.webp')}
          />
        </CustomLink>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'exclusive'}}>LIMITED EXCLUSIVES</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Limited Edition Jacket</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 2} as any}>Luxe Mercury</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 3} as any}>Luxe Jupiter</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 6} as any}>Luxe Saturn</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 5} as any}>Luxe Neptune</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'new'}}>NEW ARRIVALS</CustomLink></h2>
          <div className='mega-menu-content'>
            <h3><CustomLink href='/'>Collections</CustomLink></h3>
            <ul>
              <li><CustomLink href='/' NEW={true}>Atelier x Luxe Collection</CustomLink></li>
              <li><CustomLink href='/' NEW={true}>Summer Breeze Collection</CustomLink></li>
              <li><CustomLink href='/' NEW={true}>Urban Edge Collection</CustomLink></li>
            </ul>
          </div>
        </div>
        <div className='mega-menu-content'>
          <h3><CustomLink href='/store' searchParams={{category: 'new, men'}}>New In Men&apos;s Clothing</CustomLink></h3>
          <ul>
            <li><CustomLink href='/store' searchParams={{category: 'new, men, apparel'}}>Apparel</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'new, men, shoes'}}>Shoes</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'new, men, accessories'}}>Accessories</CustomLink></li>
          </ul>
        </div>
        <div className='mega-menu-content'>
          <h3><CustomLink href='/store' searchParams={{category: 'new, women'}}>New In Women&apos;s Clothing</CustomLink></h3>
          <ul>
            <li><CustomLink href='/store' searchParams={{category: 'new, women, apparel'}}>Apparel</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'new, women, shoes'}}>Shoes</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'new, women, accessories'}}>Accessories</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'new, trending'}}>BEST SELLERS</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Limited Edition Jacket</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 2} as any}>Luxe Mercury</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 5} as any}>Luxe Neptune</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: -1} as any} NEW={true}>Atelier x Luxe Denim Jeans</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: -1} as any} NEW={true}>Atelier x Luxe Joggers</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 3} as any}>Luxe Jupiter</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 5} as any}>Luxe Saturn</CustomLink></li>
          </ul>
        </div>
      </div>   
    </div>
  )
}

const SalesMegaMenu = async () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '4'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <CustomLink href='/store/p?' product={{id: 100} as any} className='mega-menu-image-wrapper'>
          <Image 
            src='/images/products/apparel/tshirts_tops/product_100/white/white1.webp'
            alt='Generic T-Shirt - Unisex'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
            placeholder='blur'
            blurDataURL={await generateBlurDataUrl('/images/products/apparel/tshirts_tops/product_100/white/white1.webp')}
          />
        </CustomLink>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'sales'}}>FEATURED SALES</CustomLink></h2>
          <div className='mega-menu-content'>
            <h3><CustomLink href='/'>Collections</CustomLink></h3>
            <ul>
              <li><CustomLink href='/'>Office Elegance Collection</CustomLink></li>
              <li><CustomLink href='/'>Spring Blossom Collection</CustomLink></li>
              <li><CustomLink href='/'>Holiday Collection</CustomLink></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h3><CustomLink href='/store' searchParams={{category: 'sales, men'}}>MEN&apos;S SALES</CustomLink></h3>
          <ul>
            <li><CustomLink href='/store' searchParams={{category: 'sales, men, apparel'}}>Apparel</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'sales, men, shoes'}}>Shoes</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'sales, men, accessories'}}>Accessories</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h3><CustomLink href='/store' searchParams={{category: 'sales, women'}}>WOMEN&apos;S SALES</CustomLink></h3>
          <ul>
          <li><CustomLink href='/store' searchParams={{category: 'sales, women, apparel'}}>Apparel</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'sales, women, shoes'}}>Shoes</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'sales, women, accessories'}}>Accessories</CustomLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const MenMegaMenu = () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '4'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'men, trending'}}>TRENDING</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Limited Edition Jacket</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: -1} as any} NEW={true}>Atelier x Luxe Joggers</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 2} as any}>Luxe Mercury</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 5} as any}>Luxe Neptune</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 3} as any}>Luxe Jupiter</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'men, apparel'}}>APPAREL</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store' searchParams={{category: 'men, apparel', tags: 'tshirts, tops'}}>T-Shirts & Tops</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, apparel', tags: 'hoodies, sweatshirts'}}>Hoodies & Sweatshirts</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, apparel', tags: 'jackets, coats'}}>Jackets & Coats</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, apparel', tags: 'pants, tights'}}>Pants & Tights</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, apparel', tags: 'shorts'}}>Shorts</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, apparel', tags: 'tracksuits'}}>Tracksuits</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, apparel', tags: 'jerseys'}}>Jerseys</CustomLink></li>
          </ul>
        </div>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'men, underwear'}}>UNDERWEAR</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store' searchParams={{category: 'men, underwear', tags: 'briefs'}}>Briefs</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, underwear', tags: 'boxers'}}>Boxers</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, underwear', tags: 'trunks'}}>Trunks</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'men, shoes'}}>SHOES</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store' searchParams={{category: 'men, shoes', tags: 'slides, sandals'}}>Slides & Sandals</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, shoes', tags: 'sneakers'}}>Sneakers</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, shoes', tags: 'running'}}>Running</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, shoes', tags: 'gym'}}>Gym</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, shoes', tags: 'soccer'}}>Soccer</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, shoes', tags: 'basketball'}}>Basketball</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, shoes', tags: 'hiking'}}>Hiking</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, shoes', tags: 'golf'}}>Golf</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, shoes', tags: 'football'}}>Football</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'men, accessories'}}>ACCESSORIES</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store' searchParams={{category: 'men, accessories', tags: 'hats, caps'}}>Hats & Caps</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, accessories', tags: 'bags, backpacks'}}>Bags & Backpacks</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, accessories', tags: 'gloves'}}>Gloves</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, accessories', tags: 'belts'}}>Belts</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'men, accessories', tags: 'socks'}}>Socks</CustomLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const WomenMegaMenu = () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '4'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'women, trending'}}>TRENDING</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Limited Edition Jacket</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: -1} as any} NEW={true}>Atelier x Luxe Denim Jeans</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 6} as any}>Luxe Saturn</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 4} as any}>Luxe Jupiter</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 7} as any}>Luxe Neptune</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'women, apparel'}}>APPAREL</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store' searchParams={{category: 'women, apparel', tags: 'tshirts, tops'}}>T-Shirts & Tops</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, apparel', tags: 'hoodies, sweatshirts'}}>Hoodies & Sweatshirts</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, apparel', tags: 'jackets, coats'}}>Jackets & Coats</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, apparel', tags: 'dresses'}}>Dresses</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, apparel', tags: 'pants, tights'}}>Pants</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, apparel', tags: 'shorts'}}>Shorts</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, apparel', tags: 'tights, leggings'}}>Tights & Leggings</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, apparel', tags: 'skirts'}}>Skirts</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, apparel', tags: 'tracksuits'}}>Tracksuits</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, apparel', tags: 'jerseys'}}>Jerseys</CustomLink></li>
          </ul>
        </div>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'women, underwear'}}>UNDERWEAR</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store' searchParams={{category: 'women, underwear', tags: 'everyday, bras'}}>Everyday Bras</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, underwear', tags: 'sports, bras'}}>Sports Bras</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, underwear', tags: 'briefs'}}>Briefs</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, underwear', tags: 'bikinis'}}>Bikinis</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'women, shoes'}}>SHOES</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store' searchParams={{category: 'women, shoes', tags: 'slides, sandals'}}>Slides & Sandals</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, shoes', tags: 'sneakers'}}>Sneakers</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, shoes', tags: 'running'}}>Running</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, shoes', tags: 'gym'}}>Gym</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, shoes', tags: 'soccer'}}>Soccer</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, shoes', tags: 'basketball'}}>Basketball</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, shoes', tags: 'hiking'}}>Hiking</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, shoes', tags: 'golf'}}>Golf</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, shoes', tags: 'football'}}>Football</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/store' searchParams={{category: 'women, accessories'}}>ACCESSORIES</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store' searchParams={{category: 'women, accessories', tags: 'hats, caps'}}>Hats & Caps</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, accessories', tags: 'handbags'}}>Handbags</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, accessories', tags: 'backpacks'}}>Backpacks</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, accessories', tags: 'gloves'}}>Gloves</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, accessories', tags: 'belts'}}>Belts</CustomLink></li>
            <li><CustomLink href='/store' searchParams={{category: 'women, accessories', tags: 'socks'}}>Socks</CustomLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const CollectionsMegaMenu = async () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '3'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <CustomLink href='/store/p?' product={{id: 2} as any} className='mega-menu-image-wrapper'>
          <Image 
            src='/images/products/apparel/hoodies_sweatshirts/product_2/grey/item3.webp'
            alt='Luxe Mercury - Men'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
            placeholder='blur'
            blurDataURL={await generateBlurDataUrl('/images/products/apparel/hoodies_sweatshirts/product_2/grey/item3.webp')}
          />
        </CustomLink>
        <CustomLink href='/store/p?' product={{id: 3} as any} className='mega-menu-image-wrapper'>
          <Image 
            src='/images/products/apparel/hoodies_sweatshirts/product_3/orange/item2.webp'
            alt='Luxe Jupiter - Men'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
            placeholder='blur'
            blurDataURL={await generateBlurDataUrl('/images/products/apparel/hoodies_sweatshirts/product_3/orange/item2.webp')}
          />
        </CustomLink>
      </div>
      <div className='mega-menu-content-wrapper'>
        <CustomLink href='/store/p?' product={{id: 6} as any} className='mega-menu-image-wrapper'>
          <Image 
            src='/images/products/apparel/hoodies_sweatshirts/product_6/gold/item2.webp'
            alt='Luxe Saturn - Women'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
            placeholder='blur'
            blurDataURL={await generateBlurDataUrl('/images/products/apparel/hoodies_sweatshirts/product_6/gold/item2.webp')}
          />
        </CustomLink>
        <CustomLink href='/store/p?' product={{id: 5} as any} className='mega-menu-image-wrapper'>
          <Image 
            src='/images/products/apparel/hoodies_sweatshirts/product_5/blue/item2.webp'
            alt='Luxe Neptune - Men'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
            placeholder='blur'
            blurDataURL={await generateBlurDataUrl('/images/products/apparel/hoodies_sweatshirts/product_5/blue/item2.webp')}
          />
        </CustomLink>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>CURRENT COLLECTIONS</CustomLink></h2>
          <ul>
            <li><CustomLink href='/' NEW={true}>Atelier x Luxe Collection</CustomLink></li>
            <li><CustomLink href='/' NEW={true}>Summer Breeze Collection</CustomLink></li>
            <li><CustomLink href='/' NEW={true}>Urban Edge Collection</CustomLink></li>
            <li><CustomLink href='/'>Vox Luxe Collection</CustomLink></li>
            <li><CustomLink href='/'>Royal Elegance Collection</CustomLink></li>
            <li><CustomLink href='/'>Haute Couture Collection</CustomLink></li>
            <li><CustomLink href='/'>Opulent Oasis Collection</CustomLink></li>
            <li><CustomLink href='/'>Office Elegance Collection</CustomLink></li>
            <li><CustomLink href='/'>Spring Blossom Collection</CustomLink></li>
            <li><CustomLink href='/'>Holiday Collection</CustomLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { NewMegaMenu, SalesMegaMenu, MenMegaMenu, WomenMegaMenu, CollectionsMegaMenu }

