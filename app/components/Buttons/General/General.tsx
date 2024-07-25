'use client'
import React from 'react'
import Link from 'next/link';
import { useMenuContext } from '@/app/utility/contexts/MenuContext'
import './General.css'

interface productSearchParams {
  id: number;
  name?: string;
  option?: string;
  size?: string;
}

interface CustomLinkProps {
  children?: React.ReactNode;
  href: string | null | undefined;
  replace?: boolean;
  target?: string;
  ariaLabel?: string;
  onClick?: () => void;
  searchParams?: {
    [key: string]: string
  };
  product?: productSearchParams;
  NEW?: boolean;
  className?: string;
}

const CustomLink = ({children, href, replace = false, ariaLabel, target = '_self', onClick, searchParams, product, NEW, className = 'link'}: CustomLinkProps) => {
  const { setGlobalMenuToggle } = useMenuContext();
  const [isClicked, setIsClicked] = React.useState(false);

  // If the href is null, undefined, or 'undefined', set the fixedHref to '/', otherwise replace spaces and commas with dashes
  let fixedHref;
  if (!href || href === 'undefined' || href === 'null') {
    fixedHref = '/';
  } else {
    fixedHref = href.replace(/[ ,]+/g, '-').toLowerCase();
  }

  // Replace spaces and commas with dashes in searchParams
  if (searchParams) {
    Object.keys(searchParams).forEach(key => {
      searchParams[key] = searchParams[key].replace(/[ ,]+/g, ' ');
    })
  }
  
  // Set the final href/link
  const link = product !== undefined
    ? `${fixedHref}${new URLSearchParams({
        name: product?.name?.toString() || '', 
        id: product?.id.toString() || '', 
        option: product?.option?.toString() || '', 
        size: product?.size?.toString() || '' 
      })}`
    : fixedHref + (searchParams ? `?${new URLSearchParams(searchParams)}` : '');

    // Set the global menu toggle to false to close all menus and setIsClicked to true to enable animation;
  const handleClick = () => {
    setIsClicked(true);
    setGlobalMenuToggle(false);
    onClick && onClick();
  }

  // SetIsClicked to false on animation end to disable animations
  const onAnimationEnd = () => {
    setIsClicked(false);
  }

  return (
    <Link href={link} replace={replace} aria-label={ariaLabel ? ariaLabel : undefined} target={target} onClick={handleClick} onAnimationEnd={onAnimationEnd} className={`${className} ${isClicked ? 'active' : ''}`} >
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
      {children}
    </Link>
  )
}

interface GeneralButtonProps {
  children: React.ReactNode;
  refProp?: React.RefObject<HTMLButtonElement> | null;
  onClick?: () => void;
  disabled?: boolean;
  onAnimationEnd?: () => void;
  ariaLabel?: string;
  className?: string;
}
const GeneralButton = ({children, refProp, onClick, disabled, onAnimationEnd, ariaLabel, className = 'btn'}: GeneralButtonProps) => {
  return (
    <button ref={refProp} onClick={onClick} disabled={disabled} onAnimationEnd={onAnimationEnd} aria-label={ariaLabel} className={className}>{children}</button>
  )
}

export { CustomLink, GeneralButton }