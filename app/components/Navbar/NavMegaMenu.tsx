import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './NavMegaMenu.css'

interface LinkWithIconProps {
  NEW?: boolean;
  Text: string;
}

const LinkWithIcon = ({NEW, Text}:LinkWithIconProps) => {
  return (
    <span className='mega-menu-content-link-wrapper'>
      {NEW 
      ? <svg 
          aria-hidden
          viewBox="0 0 48 48"
          fill='currentColor'
          className='mega-menu-content-icon'
        >
          <path d="M44,14H4a2,2,0,0,0-2,2V32a2,2,0,0,0,2,2H44a2,2,0,0,0,2-2V16A2,2,0,0,0,44,14ZM17.3,29H14.8l-3-5-.7-1.3h0V29H8.7V19h2.5l3,5,.6,1.3h.1s-.1-1.2-.1-1.6V19h2.5Zm9.1,0H18.7V19h7.6v2H21.2v1.8h4.4v2H21.2v2.1h5.2Zm10.9,0H34.8l-1-4.8c-.2-.8-.4-1.9-.4-1.9h0s-.2,1.1-.3,1.9L32,29H29.6L26.8,19h2.5l1,4.2a20.1,20.1,0,0,1,.5,2.5h0l.5-2.4,1-4.3h2.3l.9,4.3.5,2.4h0l.5-2.5,1-4.2H40Z"></path>
        </svg>
      : <></>
      }
      <Link href='/'>{Text}</Link>
    </span>
  )
}

const NewMegaMenu = () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '3'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <Link href='/product'>
            <Image 
              src='/next.svg'
              alt='New Image'
              width='0'
              height='0'
              className='mega-menu-content-image'
            />
          </Link>
        </div>
        <div className='mega-menu-content'>
          <h2><Link href='/'>LIMITED EXCLUSIVES</Link></h2>
          <ul>
            <li><LinkWithIcon NEW={true} Text={'Atelier x Luxe Exclusive Jacket'} /></li>
            <li><LinkWithIcon Text={'Luxe Mercury'} /></li>
            <li><LinkWithIcon Text={'Luxe Jupiter'} /></li>
            <li><LinkWithIcon Text={'Luxe Saturn'} /></li>
            <li><LinkWithIcon Text={'Luxe Neptune'} /></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>NEW ARRIVALS</Link></h2>
          <div className='mega-menu-content'>
            <h3><Link href='/'>Collections</Link></h3>
            <ul>
              <li><LinkWithIcon NEW={true} Text='Atelier x Luxe Collection' /></li>
              <li><LinkWithIcon NEW={true} Text='Summer Breeze Collection' /></li>
              <li><LinkWithIcon NEW={true} Text='Urban Edge Collection' /></li>
            </ul>
          </div>
        </div>
        <div className='mega-menu-content'>
          <h3><Link href='/'>New In Men&apos;s Apparel</Link></h3>
          <ul>
            <li><Link href='/'>Clothing</Link></li>
            <li><Link href='/'>Shoes</Link></li>
            <li><Link href='/'>Accessories</Link></li>
          </ul>
        </div>
        <div className='mega-menu-content'>
          <h3><Link href='/'>New In Women&apos;s Apparel</Link></h3>
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
            <li><LinkWithIcon NEW={true} Text='Atelier x Luxe Exclusive Jacket' /></li>
            <li><LinkWithIcon Text='Luxe Mercury' /></li>
            <li><LinkWithIcon Text='Luxe Neptune' /></li>
            <li><LinkWithIcon NEW={true} Text='Atelier x Luxe Denim Jeans' /></li>
            <li><LinkWithIcon NEW={true} Text='Atelier x Luxe Joggers' /></li>
            <li><LinkWithIcon Text='Luxe Jupiter' /></li>
            <li><LinkWithIcon Text='Luxe Saturn' /></li>
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
        <div className='mega-menu-content'>
          <Link href='/'>
            <Image 
              src='/vercel.svg'
              alt='Sales Image'
              width='0'
              height='0'
              className='mega-menu-content-image'
            />
          </Link>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>FEATURED SALES</Link></h2>
          <div className='mega-menu-content'>
            <h3><Link href='/'>Collections</Link></h3>
            <ul>
              <li><Link href='/'>Office Elegance Collection</Link></li>
              <li><Link href='/'>Spring Blossom Collection</Link></li>
              <li><Link href='/'>Holiday Collection</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h3><Link href='/'>MEN&apos;S SALES</Link></h3>
          <ul>
            <li><Link href='/'>Clothing</Link></li>
            <li><Link href='/'>Shoes</Link></li>
            <li><Link href='/'>Accessories</Link></li>
          </ul>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h3><Link href='/'>WOMEN&apos;S SALES</Link></h3>
          <ul>
            <li><Link href='/'>Clothing</Link></li>
            <li><Link href='/'>Shoes</Link></li>
            <li><Link href='/'>Accessories</Link></li>
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
          <h2><Link href='/'>TRENDING</Link></h2>
          <ul>
            <li><LinkWithIcon NEW={true} Text='Atelier x Luxe Exclusive Jacket' /></li>
            <li><LinkWithIcon NEW={true} Text='Atelier x Luxe Joggers' /></li>
            <li><LinkWithIcon Text='Luxe Mercury' /></li>
            <li><LinkWithIcon Text='Luxe Neptune' /></li>
            <li><LinkWithIcon Text='Luxe Jupiter' /></li>
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
          <h2><Link href='/'>TRENDING</Link></h2>
          <ul>
            <li><LinkWithIcon NEW={true} Text='Atelier x Luxe Exclusive Jacket' /></li>
            <li><LinkWithIcon NEW={true} Text='Atelier x Luxe Denim Jeans' /></li>
            <li><LinkWithIcon Text='Luxe Saturn' /></li>
            <li><LinkWithIcon Text='Luxe Jupiter' /></li>
            <li><LinkWithIcon Text='Luxe Neptune' /></li>
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

const CollectionsMegaMenu = () => {
  return (
    <div className='mega-menu-container' style={{'--num-columns': '3'} as React.CSSProperties}>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <Link href='/'>
            <Image 
              src='/next.svg'
              alt='Collection Image 1'
              width='0'
              height='0'
              className='mega-menu-content-image'
            />
          </Link>
        </div>
        <div className='mega-menu-content'>
          <Link href='/'>
            <Image 
              src='/vercel.svg'
              alt='Collection Image 2'
              width='0'
              height='0'
              className='mega-menu-content-image'
            />
          </Link>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <Link href='/'>
            <Image 
              src='/vercel.svg'
              alt='Collection Image 3'
              width='0'
              height='0'
              className='mega-menu-content-image'
            />
          </Link>
        </div>
        <div className='mega-menu-content'>
          <Link href='/'>
            <Image 
              src='/next.svg'
              alt='Collection Image 4'
              width='0'
              height='0'
              className='mega-menu-content-image'
            />
          </Link>
        </div>
      </div>
      <div className='mega-menu-content-wrapper'>
        <div className='mega-menu-content'>
          <h2><Link href='/'>CURRENT COLLECTIONS</Link></h2>
          <ul>
            <li><LinkWithIcon NEW={true} Text='Atelier x Luxe Collection' /></li>
            <li><LinkWithIcon NEW={true} Text='Summer Breeze Collection' /></li>
            <li><LinkWithIcon NEW={true} Text='Urban Edge Collection' /></li>
            <li><Link href='/'>Vox Luxe Collection</Link></li>
            <li><Link href='/'>Royal Elegance Collection</Link></li>
            <li><Link href='/'>Haute Couture Collection</Link></li>
            <li><Link href='/'>Opulent Oasis Collection</Link></li>
            <li><Link href='/'>Office Elegance Collection</Link></li>
            <li><Link href='/'>Spring Blossom Collection</Link></li>
            <li><Link href='/'>Holiday Collection</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { NewMegaMenu, SalesMegaMenu, MenMegaMenu, WomenMegaMenu, CollectionsMegaMenu }
