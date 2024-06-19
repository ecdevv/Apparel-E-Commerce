import React from 'react';
import Link from 'next/link'
import Image from 'next/image';
import Search from '../Search/Search';
import User from '../User/User';
import Cart from '../Cart/Cart';
import Theme from '../Theme/Theme';
import DropdownButton from '../Dropdown/DropdownButton';
import { CollectionsMegaMenu, MenMegaMenu, NewMegaMenu, SalesMegaMenu, WomenMegaMenu } from './NavMegaMenu';
import './Navbar.css'


// The top section of the navbar with the logo, icons, search box, and etc.
const Header = () => {
  return (
    <section className='navbar-header'>
      <div className='navbar-theme-icons-container'>
        <Theme/>
      </div>
      <Link href='/' aria-label='Home' className='navbar-logo-container'>
        {/* <Image
          src="/next.svg"
          alt='Logo'
          width='0'
          height='0'
          className='navbar-logo'
        /> */}
        <h1>URBAN LUXE</h1>
      </Link>
      <div className='navbar-icons-container'>
        <Search />
        <User />
        <Cart />
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
        {/* <Image
          src="/next.svg"
          alt='Logo'
          width='0'
          height='0'
          className='navbar-logo'
        /> */}
        <h1>URBAN LUXE</h1>
      </Link>
    </section>
  )
}


interface Item {
  name: string;
  type: 'component' | 'button' | 'link';
  component?: React.ReactElement;
  svg?: React.ReactElement;
}

// Navigation section with the links of this navbar component
const Navigation = () => {
  const NewItems:Item[] = [ { name: 'New & Featured Items', type: 'component', component: <NewMegaMenu /> } ]
  const SalesItems:Item[] = [ { name: 'Sales Items', type: 'component', component: <SalesMegaMenu /> } ]
  const MenItems:Item[] = [ { name: 'Men Items', type: 'component', component: <MenMegaMenu /> } ]
  const WomenItems:Item[] = [ { name: 'Women Items', type: 'component', component: <WomenMegaMenu /> } ]
  const CollectionItems:Item[] = [ { name: 'Collections Items', type: 'component', component: <CollectionsMegaMenu /> } ]

  return (
    <nav className='navbar-navigation-wrapper'>
      <ul className='navbar-navigation-list'>
        <li><DropdownButton label={'New'} items={NewItems} hover={true} orientation={'mega'} showPointer={false} classNames={['navbar-navigation-link', 'navbar-navigation-link-focus']}>NEW</DropdownButton></li>
        <li><DropdownButton label={'Sales'} items={SalesItems} hover={true} orientation={'mega'} showPointer={false} classNames={['navbar-navigation-link', 'navbar-navigation-link-focus']}>SALES</DropdownButton></li>
        <li><DropdownButton label={'Men'} items={MenItems} hover={true} orientation={'mega'} showPointer={false} classNames={['navbar-navigation-link', 'navbar-navigation-link-focus']}>MEN</DropdownButton></li>
        <li><DropdownButton label={'Women'} items={WomenItems} hover={true} orientation={'mega'} showPointer={false} classNames={['navbar-navigation-link', 'navbar-navigation-link-focus']}>WOMEN</DropdownButton></li>
        <li><DropdownButton label={'Collections'} items={CollectionItems} hover={true} orientation={'mega'} showPointer={false} classNames={['navbar-navigation-link', 'navbar-navigation-link-focus']}>COLLECTIONS</DropdownButton></li>
      </ul>
    </nav>
  )
}

// The whole navbar with the header and navigation sections
const Navbar = () => {
  return (
    <section className='navbar'>
      <div className='navbar-container'>
        <Header />
        <Navigation />
      </div>
    </section>
  )
}

export default Navbar
export { Header, HeaderLogo, Navigation };