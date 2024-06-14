import React from 'react';
import Link from 'next/link'
import Image from 'next/image';
import Search from '../search/search';
import User from '../user/user'
import Cart from '../cart/cart'
import Theme from '../theme/theme'
import './navbar.css'

const Header = () => {
  return (
    <div className='navbar-header'>
      <div className='navbar-theme-icons-container'>
        <Theme/>
      </div>
      <Link href='/' aria-label='Home' className='navbar-logo-container'>
        <Image
          src="/next.svg"
          alt='Logo'
          width='0'
          height='0'
          className='navbar-logo'
        />
      </Link>
      <div className='navbar-icons-container'>
        <Search/>
        <User/>
        <Cart/>
      </div>
    </div>
  )
}

// For pages where navbar is not shown (/login, /register)
const HeaderLogo = () => {
  return (
    <div className='navbar-header-logo'>
      <div className='hidden-theme'><Theme/></div> {/*Theme button required so that it sets the theme/CSS colors of the page, but display set to none so it won't be shown.*/}
      <Link href='/' aria-label='Home' className='navbar-logo-container'>
        <Image
          src="/next.svg"
          alt='Logo'
          width='0'
          height='0'
          className='navbar-logo'
        />
      </Link>
    </div>
    
  )
}

const Navigation = () => {
  return (
    <ul className='navbar-navigation'>
      <li><Link href = "/" aria-label='New Items For Sale' className='navbar-navigation-links'>New</Link></li>
      <li><Link href = "/" aria-label='Items On Sale' className='navbar-navigation-links'>Sales</Link></li>
      <li><Link href = "/" aria-label='Store' className='navbar-navigation-links'>Store</Link></li>
      <li><Link href = "/" aria-label='Contact' className='navbar-navigation-links'>Contact</Link></li>          
    </ul>
  )
}

const navbar = () => {
  return (
    // Desktop Navbar that is justified space-between 3 elements (logo/image, navigation links, utility icons)
    <nav className='navbar'>
      <div className='navbar-container'>
        <Header/>
        <Navigation/>
      </div>
    </nav>
  )
}

export default navbar
export {Header, HeaderLogo, Navigation};