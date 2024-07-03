'use client'
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { WishlistProduct } from '../types';
import { validateWishlist } from '@/server/mockValidations';

type ContextProviderProps = {
  children: React.ReactNode;
}

type WishlistContext = {
  wishItems: WishlistProduct[] | [];
  setWishItems: React.Dispatch<React.SetStateAction<WishlistProduct[] | []>>;
  scrollableRef: React.RefObject<HTMLDivElement>;
  forceElementRef: React.RefObject<HTMLButtonElement>;
}

const WishlistContext = createContext<WishlistContext | null>(null);

export function WishlistProvider({children}:ContextProviderProps) {
  const [wishItems, setWishItems] = useState<WishlistProduct[] | []>([]);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const forceElementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedWishItems = JSON.parse(localStorage.getItem('wishItems') || '[]') as WishlistProduct[];
    const validWishItems = validateWishlist(savedWishItems);
    setWishItems(validWishItems);
    localStorage.setItem('wishItems', JSON.stringify(validWishItems));
  }, []);

  return (
    <WishlistContext.Provider value={{wishItems, setWishItems, scrollableRef, forceElementRef}}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlistContext must be used within a WishlistContextProvider');
  }

  return context;
}