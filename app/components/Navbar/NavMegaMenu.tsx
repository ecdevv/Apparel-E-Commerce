import React from 'react'
import Link from 'next/link'
import './NavMegaMenu.css'

const StoreMegaMenu = () => {
  return (
    <div className='mega-menu-container'>
      <div className='mega-menu-content'>
        <div className='mega-menu-content-wrapper'>
          <h2><Link href='/'>POPULAR</Link></h2>
          <ul>
            <li><Link href='/'>Item 1</Link></li>
            <li><Link href='/'>Item 2</Link></li>
            <li><Link href='/'>Item 3</Link></li>
            <li><Link href='/'>Item 4</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content'>
        <div className='mega-menu-content-wrapper'>
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
            <li><Link href='/'>Swimwear</Link></li>
            <li><Link href='/'>Tracksuits</Link></li>
            <li><Link href='/'>Jerseys</Link></li>
          </ul>
        </div>
        <div className='mega-menu-content-wrapper'>
          <h2><Link href='/'>UNDERWEAR</Link></h2>
          <ul>
            <li><Link href='/'>Bras</Link></li>
            <li><Link href='/'>Sports Bras</Link></li>
            <li><Link href='/'>Men's Underwear</Link></li>
            <li><Link href='/'>Women's Underwear</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content'>
        <div className='mega-menu-content-wrapper'>
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
      <div className='mega-menu-content'>
        <div className='mega-menu-content-wrapper'>
          <h2><Link href='/'>ACCESSORIES</Link></h2>
          <ul>
            <li><Link href='/'>Hats & Caps</Link></li>
            <li><Link href='/'>Bags & Backpacks</Link></li>
            <li><Link href='/'>Gloves</Link></li>
            <li><Link href='/'>Socks</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { StoreMegaMenu }
