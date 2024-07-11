import React from "react";
import Link from "next/link";
import Image from "next/image";
import './Footer.css'

const Footer = () => {
  return (
    <section className="footer-container">
      <div className='footer-between-container'>
        <div className="footer-info-container">
          <div className="footer-section-container">
            <h3>ACCOUNT</h3>
            <ul className="footer-links-container">
              <li><Link href="/" className="footer-link">Your Account</Link></li>
              <li><Link href="/" className="footer-link">Track Your Order</Link></li>
            </ul>
          </div>
    
          <div className="footer-section-container">
            <h3>ABOUT</h3>
            <ul className="footer-links-container">
              <li><Link href="/" className="footer-link">Urban Luxe Central</Link></li>
              <li><Link href="/" className="footer-link">About Us</Link></li>
              <li><Link href="/" className="footer-link">Careers</Link></li>
            </ul>
          </div>
    
          <div className="footer-section-container">
            <h3>HELP</h3>
            <ul className="footer-links-container">
              <li><Link href="/" className="footer-link">Help Center & FAQs</Link></li>
              <li><Link href="/" className="footer-link">Shipping & Delivery</Link></li>
              <li><Link href="/" className="footer-link">Returns & Refunds</Link></li>
              <li><Link href="/" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/" className="footer-link">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <ul className='footer-socials-container'>
          <li>
            <Link href="/" target="_blank" rel="noreferrer" className="footer-link">
              <Image src='/images/socials/instagram-167-svgrepo-com.svg' alt='Instagram' width={20} height={20} />
            </Link>
          </li>
          <li>
            <Link href="/" target="_blank" rel="noreferrer" className="footer-link">
              <Image src='/images/socials/facebook-176-svgrepo-com.svg' alt='Facebook' width={19} height={19} />
            </Link>
          </li>
          <li>
            <Link href="/" target="_blank" rel="noreferrer" className="footer-link">
              <Image src='/images/socials/twitter-154-svgrepo-com.svg' alt='Twitter' width={20} height={20} />
            </Link>
          </li>
          <li>
            <Link href="/" target="_blank" rel="noreferrer" className="footer-link">
              <Image src='/images/socials/discord-svgrepo-com.svg' alt='Discord' width={20} height={20} />
            </Link>
          </li>
          <li>
            <Link href="/" target="_blank" rel="noreferrer" className="footer-link">
              <Image src='/images/socials/youtube-168-svgrepo-com.svg' alt='Youtube' width={20} height={20} />
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-copyright">
        <p>
          © 2024 Urban Luxe. All rights reserved. Site design by{' '}
          <a href="https://ericchour.vercel.app" target="_blank">Eric Chour</a>
        </p>
      </div>
    </section>
  );
};

export default Footer;
