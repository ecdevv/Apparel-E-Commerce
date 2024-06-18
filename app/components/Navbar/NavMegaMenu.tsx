import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './NavMegaMenu.css'

const NewMegaMenu = () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '3'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <Image 
            src='/next.svg'
            alt='NewImage'
            width='0'
            height='0'
            className='mega-menu-content-image'
          />
        </div>
        <div className='mega-menu-content'>
          <h2><Link href='/'>EXCLUSIVES</Link></h2>
          <ul>
            <li><Link href='/'>Luxe Mercury</Link></li>
            <li><Link href='/'>Luxe Jupiter</Link></li>
            <li><Link href='/'>Luxe Saturn</Link></li>
            <li><Link href='/'>Luxe Neptune</Link></li>
            <li><Link href='/'>Atelier x Luxe Exclusive Jacket</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>NEW ARRIVALS</Link></h2>
          <div className='mega-menu-content'>
            <h3><Link href='/'>Collections</Link></h3>
            <ul>
              <li><Link href='/'>Atelier x Luxe Collection</Link></li>
              <li><Link href='/'>Sakura Blossom Collection</Link></li>
              <li><Link href='/'>New Summer Collection</Link></li>
            </ul>
          </div>
        </div>
        <div className='mega-menu-content'>
          <h3><Link href='/'>New In Men's Apparel</Link></h3>
          <ul>
            <li><Link href='/'>Clothing</Link></li>
            <li><Link href='/'>Shoes</Link></li>
            <li><Link href='/'>Accessories</Link></li>
          </ul>
        </div>
        <div className='mega-menu-content'>
          <h3><Link href='/'>New In Women's Apparel</Link></h3>
          <ul>
            <li><Link href='/'>Clothing</Link></li>
            <li><Link href='/'>Shoes</Link></li>
            <li><Link href='/'>Accessories</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>BEST SELLERS</Link></h2>
          <ul>
            <li><Link href='/'>Atelier x Luxe Exclusive Jacket</Link></li>
            <li><Link href='/'>Luxe Mercury</Link></li>
            <li><Link href='/'>Luxe Neptune</Link></li>
            <li><Link href='/'>Atelier x Luxe Denim Jeans</Link></li>
            <li><Link href='/'>Atelier x Luxe Joggers</Link></li>
            <li><Link href='/'>Luxe Jupiter</Link></li>
            <li><Link href='/'>Luxe Saturn</Link></li>
          </ul>
        </div>
      </div>   
    </div>
  )
}

const SalesMegaMenu = () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '3'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <Image 
            src='/vercel.svg'
            alt='NewImage'
            width='0'
            height='0'
            className='mega-menu-content-image'
          />
        </div>
        <div className='mega-menu-content'>
          <h2><Link href='/'>EXCLUSIVES</Link></h2>
          <ul>
            <li><Link href='/'>Luxe Mercury</Link></li>
            <li><Link href='/'>Luxe Jupiter</Link></li>
            <li><Link href='/'>Luxe Saturn</Link></li>
            <li><Link href='/'>Luxe Neptune</Link></li>
            <li><Link href='/'>Atelier x Luxe Exclusive Jacket</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>NEW ARRIVALS</Link></h2>
          <div className='mega-menu-content'>
            <h3><Link href='/'>Collections</Link></h3>
            <ul>
              <li><Link href='/'>Atelier x Luxe Collection</Link></li>
              <li><Link href='/'>Sakura Blossom Collection</Link></li>
              <li><Link href='/'>New Summer Collection</Link></li>
            </ul>
          </div>
        </div>
        <div className='mega-menu-content'>
          <h3><Link href='/'>Men's Sales</Link></h3>
          <ul>
            <li><Link href='/'>Clothing</Link></li>
            <li><Link href='/'>Shoes</Link></li>
            <li><Link href='/'>Accessories</Link></li>
          </ul>
        </div>
        <div className='mega-menu-content'>
          <h3><Link href='/'>Women's Sales</Link></h3>
          <ul>
            <li><Link href='/'>Clothing</Link></li>
            <li><Link href='/'>Shoes</Link></li>
            <li><Link href='/'>Accessories</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>BEST SELLERS</Link></h2>
          <ul>
            <li><Link href='/'>Atelier x Luxe Exclusive Jacket</Link></li>
            <li><Link href='/'>Luxe Mercury</Link></li>
            <li><Link href='/'>Luxe Neptune</Link></li>
            <li><Link href='/'>Atelier x Luxe Denim Jeans</Link></li>
            <li><Link href='/'>Atelier x Luxe Joggers</Link></li>
            <li><Link href='/'>Luxe Jupiter</Link></li>
            <li><Link href='/'>Luxe Saturn</Link></li>
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
          <h2><Link href='/'>POPULAR</Link></h2>
          <ul>
            <li><Link href='/'>Item 1</Link></li>
            <li><Link href='/'>Item 2</Link></li>
            <li><Link href='/'>Item 3</Link></li>
            <li><Link href='/'>Item 4</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>CLOTHING</Link></h2>
          <ul>
            <li><Link href='/'>T-Shirts & Tops</Link></li>
            <li><Link href='/'>Hoodies & Sweatshirts</Link></li>
            <li><Link href='/'>Jackets & Coats</Link></li>
            <li><Link href='/'>Pants & Tights</Link></li>
            <li><Link href='/'>Shorts</Link></li>
            <li><Link href='/'>Tracksuits</Link></li>
            <li><Link href='/'>Jerseys</Link></li>
          </ul>
        </div>
        <div className='mega-menu-content'>
          <h2><Link href='/'>UNDERWEAR</Link></h2>
          <ul>
            <li><Link href='/'>Briefs</Link></li>
            <li><Link href='/'>Boxers</Link></li>
            <li><Link href='/'>Trunks</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>SHOES</Link></h2>
          <ul>
            <li><Link href='/'>Slides & Sandals</Link></li>
            <li><Link href='/'>Sneakers</Link></li>
            <li><Link href='/'>Running</Link></li>
            <li><Link href='/'>Gym</Link></li>
            <li><Link href='/'>Soccer</Link></li>
            <li><Link href='/'>Basketball</Link></li>
            <li><Link href='/'>Hiking</Link></li>
            <li><Link href='/'>Golf</Link></li>
            <li><Link href='/'>Football</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>ACCESSORIES</Link></h2>
          <ul>
            <li><Link href='/'>Hats & Caps</Link></li>
            <li><Link href='/'>Bags & Backpacks</Link></li>
            <li><Link href='/'>Gloves</Link></li>
            <li><Link href='/'>Belts</Link></li>
            <li><Link href='/'>Socks</Link></li>
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
          <h2><Link href='/'>POPULAR</Link></h2>
          <ul>
            <li><Link href='/'>Item 1</Link></li>
            <li><Link href='/'>Item 2</Link></li>
            <li><Link href='/'>Item 3</Link></li>
            <li><Link href='/'>Item 4</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>CLOTHING</Link></h2>
          <ul>
            <li><Link href='/'>T-Shirts & Tops</Link></li>
            <li><Link href='/'>Hoodies & Sweatshirts</Link></li>
            <li><Link href='/'>Jackets & Coats</Link></li>
            <li><Link href='/'>Dresses</Link></li>
            <li><Link href='/'>Pants</Link></li>
            <li><Link href='/'>Shorts</Link></li>
            <li><Link href='/'>Tights & Leggings</Link></li>
            <li><Link href='/'>Skirts</Link></li>
            <li><Link href='/'>Tracksuits</Link></li>
            <li><Link href='/'>Jerseys</Link></li>
          </ul>
        </div>
        <div className='mega-menu-content'>
          <h2><Link href='/'>UNDERWEAR</Link></h2>
          <ul>
            <li><Link href='/'>Everyday Bras</Link></li>
            <li><Link href='/'>Sports Bras</Link></li>
            <li><Link href='/'>Briefs</Link></li>
            <li><Link href='/'>Bikinis</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>SHOES</Link></h2>
          <ul>
            <li><Link href='/'>Slides & Sandals</Link></li>
            <li><Link href='/'>Sneakers</Link></li>
            <li><Link href='/'>Running</Link></li>
            <li><Link href='/'>Gym</Link></li>
            <li><Link href='/'>Soccer</Link></li>
            <li><Link href='/'>Basketball</Link></li>
            <li><Link href='/'>Hiking</Link></li>
            <li><Link href='/'>Golf</Link></li>
            <li><Link href='/'>Football</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>ACCESSORIES</Link></h2>
          <ul>
            <li><Link href='/'>Hats & Caps</Link></li>
            <li><Link href='/'>Handbags</Link></li>
            <li><Link href='/'>Backpacks</Link></li>
            <li><Link href='/'>Gloves</Link></li>
            <li><Link href='/'>Belts</Link></li>
            <li><Link href='/'>Socks</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { NewMegaMenu, SalesMegaMenu, MenMegaMenu, WomenMegaMenu }
