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
    <nav className = "navbar">
      <div className = "navbar-container">
        <Link href='/' aria-label='Home'>
          <img
            src="/next.svg"
            className='navbar-logo'
          />
        </Link>
        <ul className='navbar-navigation'>
          <li><Link href = "/" className='text-xl'>New</Link></li>
          <li><Link href = "/" className='text-xl'>Sales</Link></li>
          <li><Link href = "/" className='text-xl'>Store</Link></li>
          <li><Link href = "/" className='text-xl'>Contact</Link></li>          
        </ul>
        <div className='navbar-icons-container'>
          <div className='navbar-icon-list'>
            <Search/>
            <Profile/>
            <Cart/>
          </div>
          <Theme/>
        </div>
      </div>
    </nav>
  )
}

export default navbar