'use client'
import React from 'react'
import Link from 'next/link';
import { useMenuContext } from '@/app/utility/contexts/MenuContext'
import './Links.css'

interface CustomLinkProps {
  children?: React.ReactNode;
  href: string;
  productID?: number;
  NEW?: boolean;
  className?: string;
}

const CustomLink = ({children, href, NEW, productID, className}:CustomLinkProps) => {
  const { setGlobalMenuToggle } = useMenuContext();
  const fixedHref = href.replace(/[ ,]+/g, '-').toLowerCase();
  const link = productID !== undefined
    ? `/store/p?${new URLSearchParams({ name: fixedHref, id: productID?.toString() || '' })}`
    : fixedHref;

  return (
    <span className='link-wrapper'>
      {NEW 
      ? <svg 
          aria-hidden
          viewBox="0 0 48 48"
          fill='currentColor'
          className='content-icon'
        >
          <path d="M44,14H4a2,2,0,0,0-2,2V32a2,2,0,0,0,2,2H44a2,2,0,0,0,2-2V16A2,2,0,0,0,44,14ZM17.3,29H14.8l-3-5-.7-1.3h0V29H8.7V19h2.5l3,5,.6,1.3h.1s-.1-1.2-.1-1.6V19h2.5Zm9.1,0H18.7V19h7.6v2H21.2v1.8h4.4v2H21.2v2.1h5.2Zm10.9,0H34.8l-1-4.8c-.2-.8-.4-1.9-.4-1.9h0s-.2,1.1-.3,1.9L32,29H29.6L26.8,19h2.5l1,4.2a20.1,20.1,0,0,1,.5,2.5h0l.5-2.4,1-4.3h2.3l.9,4.3.5,2.4h0l.5-2.5,1-4.2H40Z"></path>
        </svg>
      : <></>
      }
      <Link href={link} onClick={() => setGlobalMenuToggle(false)} className={className}>{children}</Link>
    </span>
  )
}

export { CustomLink };