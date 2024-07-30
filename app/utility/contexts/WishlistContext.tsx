'use client'
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { WishlistProduct } from '../types';
import { validateWishlist } from '@/server/mockValidations';

type ContextProviderProps = {
  children: React.ReactNode;
}

type WishlistContext = {
  isLoading: boolean;
  wishItems: WishlistProduct[] | [];
  setWishItems: React.Dispatch<React.SetStateAction<WishlistProduct[] | []>>;
  forceOpen: boolean;
  setForceOpen: React.Dispatch<React.SetStateAction<boolean>>;
  forceElementRef: React.RefObject<HTMLButtonElement>;
  scrollableRef: React.RefObject<HTMLDivElement>;
}

const WishlistContext = createContext<WishlistContext | null>(null);

// The wishlistItems states are used to store the items in the wishlist, 
// the scrollableRef is used to scroll to the element in the wishlist, 
// and the forceElementRef is used to force the wishlist menu to open when a button (AddToWishlist) is clicked.
export function WishlistProvider({children}:ContextProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [wishItems, setWishItems] = useState<WishlistProduct[] | []>([]);
  const [forceOpen, setForceOpen] = useState(false);
  const forceElementRef = useRef<HTMLButtonElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  // Set the wishlistItems from localStorage
  useEffect(() => {
    const fetchAndValidateWishlist = async () => {
      const savedWishItems = JSON.parse(localStorage.getItem('wishItems') || '[]') as WishlistProduct[];
      const validWishItems = await validateWishlist(savedWishItems);
      setWishItems(validWishItems);
      localStorage.setItem('wishItems', JSON.stringify(validWishItems));
      setIsLoading(false);
    }

    fetchAndValidateWishlist();
  }, []);

  // Reset the forceOpen state after it is used
  useEffect(() => {
    if (forceOpen) {
      setForceOpen(false);
    }
  }, [forceOpen]);

  return (
    <WishlistContext.Provider value={{isLoading, wishItems, setWishItems, forceOpen, setForceOpen, forceElementRef, scrollableRef }}>
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