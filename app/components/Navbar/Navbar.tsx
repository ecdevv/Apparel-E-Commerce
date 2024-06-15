import React from 'react';
import Link from 'next/link'
import Image from 'next/image';
import Search from '../Search/Search';
import User from '../User/User';
import Cart from '../Cart/Cart';
import Theme from '../Theme/Theme';
import DropdownButton from '../Dropdown/DropdownButton';
import './Navbar.css'


// The top section of the navbar with the logo, icons, search box, and etc.
const Header = () => {
  return (
    <section className='navbar-header'>
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
    </section>
  )
}

// For pages where the header and navigation sections are not shown (/login, /register)
const HeaderLogo = () => {
  return (
    <section className='navbar-header-logo'>
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
    </section>
  )
}

// Navigation section with the links of this navbar component
interface Item {
  name: string;
  type: 'button' | 'other';
}

const storeItems:Item[] = [
  {name: 'test', type: 'other'}
]

const Navigation = () => {
  return (
    <nav className='navbar-navigation'>
      <ul className='navbar-navigation-list'>
        <li><DropdownButton Items={storeItems} hover={false} orientation={'center'} classNames={['navbar-navigation-links']}>New</DropdownButton></li>
        <li><DropdownButton Items={storeItems} hover={true} orientation={'center'} classNames={['navbar-navigation-links']}>Sales</DropdownButton></li>
        <li><DropdownButton Items={storeItems} hover={true} orientation={'center'} classNames={['navbar-navigation-links']}>Store</DropdownButton></li>
        <li><DropdownButton Items={storeItems} hover={true} orientation={'center'} classNames={['navbar-navigation-links']}>Contact</DropdownButton></li>
      </ul>
    </nav>
  )
}

// The whole navbar with the header and navigation sections
const Navbar = () => {
  return (
    <section className='navbar'>
      <div className='navbar-container'>
        <Header/>
        <Navigation/>
      </div>
    </section>
  )
}

export default Navbar
export {Header, HeaderLogo, Navigation};