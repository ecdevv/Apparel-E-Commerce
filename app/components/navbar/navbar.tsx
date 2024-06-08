import React from 'react';
import Link from 'next/link'
import Search from '../search/search';
import Profile from '../profile/profile'
import Cart from '../cart/cart'
import Theme from '../theme/theme'
import './navbar.css'

const navbar = () => {
  return (
    // Desktop Navbar that is justified space-between 3 elements (logo/image, navigation links, utility icons)
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-header'>
          <div className='navbar-theme-icons-container'>
            <Theme/>
          </div>
          <div className='navbar-logo-container'>
            <Link href='/' aria-label='Home'>
              <img
                src="/next.svg"
                className='navbar-logo'
              />
            </Link>
          </div>
          <div className='navbar-icons-container'>
            <Search/>
            <Profile/>
            <Cart/>
          </div>
        </div>
        <ul className='navbar-navigation'>
          <li><Link href = "/" className='navbar-navigation-links'>New</Link></li>
          <li><Link href = "/" className='navbar-navigation-links'>Sales</Link></li>
          <li><Link href = "/" className='navbar-navigation-links'>Store</Link></li>
          <li><Link href = "/" className='navbar-navigation-links'>Contact</Link></li>          
        </ul>
      </div>
    </nav>
  )
}

export default navbar