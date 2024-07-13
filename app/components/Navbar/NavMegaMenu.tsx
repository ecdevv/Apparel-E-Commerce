import React from 'react'
import Image from 'next/image'
import { CustomLink } from '../Buttons/General/General'
import './NavMegaMenu.css'

const NewMegaMenu = () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '3'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <CustomLink href='/' className='mega-menu-content'>
          <Image 
            src='/next.svg'
            alt='New Image'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
          />
        </CustomLink>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>LIMITED EXCLUSIVES</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Limited Edition Jacket</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 2} as any}>Luxe Mercury</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 3} as any}>Luxe Jupiter</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 4} as any}>Luxe Saturn</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 5} as any}>Luxe Neptune</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>NEW ARRIVALS</CustomLink></h2>
          <div className='mega-menu-content'>
            <h3><CustomLink href='/'>Collections</CustomLink></h3>
            <ul>
              <li><CustomLink href='/Atelier x Luxe Collection' NEW={true}>Atelier x Luxe Collection</CustomLink></li>
              <li><CustomLink href='/Summer Breeze Collection' NEW={true}>Summer Breeze Collection</CustomLink></li>
              <li><CustomLink href='/Atelier x Luxe Collection' NEW={true}>Urban Edge Collection</CustomLink></li>
            </ul>
          </div>
        </div>
        <div className='mega-menu-content'>
          <h3><CustomLink href='/'>New In Men&apos;s Clothing</CustomLink></h3>
          <ul>
            <li><CustomLink href='/'>Apparel</CustomLink></li>
            <li><CustomLink href='/'>Shoes</CustomLink></li>
            <li><CustomLink href='/'>Accessories</CustomLink></li>
          </ul>
        </div>
        <div className='mega-menu-content'>
          <h3><CustomLink href='/'>New In Women&apos;s Clothing</CustomLink></h3>
          <ul>
            <li><CustomLink href='/'>Apparel</CustomLink></li>
            <li><CustomLink href='/'>Shoes</CustomLink></li>
            <li><CustomLink href='/'>Accessories</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>BEST SELLERS</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Limited Edition Jacket</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any}>Luxe Mercury</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any}>Luxe Neptune</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Denim Jeans</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Joggers</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any}>Luxe Jupiter</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any}>Luxe Saturn</CustomLink></li>
          </ul>
        </div>
      </div>   
    </div>
  )
}

const SalesMegaMenu = () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '4'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <CustomLink href='/' className='mega-menu-content'>
          <Image 
            src='/vercel.svg'
            alt='Sales Image'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
          />
        </CustomLink>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>FEATURED SALES</CustomLink></h2>
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
          <h3><CustomLink href='/'>MEN&apos;S SALES</CustomLink></h3>
          <ul>
            <li><CustomLink href='/'>Apparel</CustomLink></li>
            <li><CustomLink href='/'>Shoes</CustomLink></li>
            <li><CustomLink href='/'>Accessories</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h3><CustomLink href='/'>WOMEN&apos;S SALES</CustomLink></h3>
          <ul>
            <li><CustomLink href='/'>Apparel</CustomLink></li>
            <li><CustomLink href='/'>Shoes</CustomLink></li>
            <li><CustomLink href='/'>Accessories</CustomLink></li>
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
          <h2><CustomLink href='/'>TRENDING</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Limited Edition Jacket</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Joggers</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any}>Luxe Mercury</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any}>Luxe Neptune</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any}>Luxe Jupiter</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>APPAREL</CustomLink></h2>
          <ul>
            <li><CustomLink href='/'>T-Shirts & Tops</CustomLink></li>
            <li><CustomLink href='/'>Hoodies & Sweatshirts</CustomLink></li>
            <li><CustomLink href='/'>Jackets & Coats</CustomLink></li>
            <li><CustomLink href='/'>Pants & Tights</CustomLink></li>
            <li><CustomLink href='/'>Shorts</CustomLink></li>
            <li><CustomLink href='/'>Tracksuits</CustomLink></li>
            <li><CustomLink href='/'>Jerseys</CustomLink></li>
          </ul>
        </div>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>UNDERWEAR</CustomLink></h2>
          <ul>
            <li><CustomLink href='/'>Briefs</CustomLink></li>
            <li><CustomLink href='/'>Boxers</CustomLink></li>
            <li><CustomLink href='/'>Trunks</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>SHOES</CustomLink></h2>
          <ul>
            <li><CustomLink href='/'>Slides & Sandals</CustomLink></li>
            <li><CustomLink href='/'>Sneakers</CustomLink></li>
            <li><CustomLink href='/'>Running</CustomLink></li>
            <li><CustomLink href='/'>Gym</CustomLink></li>
            <li><CustomLink href='/'>Soccer</CustomLink></li>
            <li><CustomLink href='/'>Basketball</CustomLink></li>
            <li><CustomLink href='/'>Hiking</CustomLink></li>
            <li><CustomLink href='/'>Golf</CustomLink></li>
            <li><CustomLink href='/'>Football</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>ACCESSORIES</CustomLink></h2>
          <ul>
            <li><CustomLink href='/'>Hats & Caps</CustomLink></li>
            <li><CustomLink href='/'>Bags & Backpacks</CustomLink></li>
            <li><CustomLink href='/'>Gloves</CustomLink></li>
            <li><CustomLink href='/'>Belts</CustomLink></li>
            <li><CustomLink href='/'>Socks</CustomLink></li>
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
          <h2><CustomLink href='/'>TRENDING</CustomLink></h2>
          <ul>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Limited Edition Jacket</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any} NEW={true}>Atelier x Luxe Denim Jeans</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any}>Luxe Saturn</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any}>Luxe Jupiter</CustomLink></li>
            <li><CustomLink href='/store/p?' product={{id: 1} as any}>Luxe Neptune</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>APPAREL</CustomLink></h2>
          <ul>
            <li><CustomLink href='/'>T-Shirts & Tops</CustomLink></li>
            <li><CustomLink href='/'>Hoodies & Sweatshirts</CustomLink></li>
            <li><CustomLink href='/'>Jackets & Coats</CustomLink></li>
            <li><CustomLink href='/'>Dresses</CustomLink></li>
            <li><CustomLink href='/'>Pants</CustomLink></li>
            <li><CustomLink href='/'>Shorts</CustomLink></li>
            <li><CustomLink href='/'>Tights & Leggings</CustomLink></li>
            <li><CustomLink href='/'>Skirts</CustomLink></li>
            <li><CustomLink href='/'>Tracksuits</CustomLink></li>
            <li><CustomLink href='/'>Jerseys</CustomLink></li>
          </ul>
        </div>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>UNDERWEAR</CustomLink></h2>
          <ul>
            <li><CustomLink href='/'>Everyday Bras</CustomLink></li>
            <li><CustomLink href='/'>Sports Bras</CustomLink></li>
            <li><CustomLink href='/'>Briefs</CustomLink></li>
            <li><CustomLink href='/'>Bikinis</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>SHOES</CustomLink></h2>
          <ul>
            <li><CustomLink href='/'>Slides & Sandals</CustomLink></li>
            <li><CustomLink href='/'>Sneakers</CustomLink></li>
            <li><CustomLink href='/'>Running</CustomLink></li>
            <li><CustomLink href='/'>Gym</CustomLink></li>
            <li><CustomLink href='/'>Soccer</CustomLink></li>
            <li><CustomLink href='/'>Basketball</CustomLink></li>
            <li><CustomLink href='/'>Hiking</CustomLink></li>
            <li><CustomLink href='/'>Golf</CustomLink></li>
            <li><CustomLink href='/'>Football</CustomLink></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>ACCESSORIES</CustomLink></h2>
          <ul>
            <li><CustomLink href='/'>Hats & Caps</CustomLink></li>
            <li><CustomLink href='/'>Handbags</CustomLink></li>
            <li><CustomLink href='/'>Backpacks</CustomLink></li>
            <li><CustomLink href='/'>Gloves</CustomLink></li>
            <li><CustomLink href='/'>Belts</CustomLink></li>
            <li><CustomLink href='/'>Socks</CustomLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const CollectionsMegaMenu = () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '3'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <CustomLink href='/' className='mega-menu-content'>
          <Image 
            src='/next.svg'
            alt='Collection Image 1'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
          />
        </CustomLink>
        <CustomLink href='/' className='mega-menu-content'>
          <Image 
            src='/vercel.svg'
            alt='Collection Image 2'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
          />
        </CustomLink>
      </div>
      <div className='mega-menu-content-wrapper'>
        <CustomLink href='/' className='mega-menu-content'>
          <Image 
            src='/vercel.svg'
            alt='Collection Image 3'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
          />
        </CustomLink>
        <CustomLink href='/' className='mega-menu-content'>
          <Image 
            src='/next.svg'
            alt='Collection Image 4'
            fill
            sizes="(100vw)"
            className='mega-menu-content-image'
          />
        </CustomLink>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><CustomLink href='/'>CURRENT COLLECTIONS</CustomLink></h2>
          <ul>
            <li><CustomLink href='/Atelier x Luxe Collection' NEW={true}>Atelier x Luxe Collection</CustomLink></li>
            <li><CustomLink href='/Summer Breeze Collection' NEW={true}>Summer Breeze Collection</CustomLink></li>
            <li><CustomLink href='/Urban Edge Collection' NEW={true}>Urban Edge Collection</CustomLink></li>
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

