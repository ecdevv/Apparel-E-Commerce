'use client'
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { BagProduct } from '../types';
import { validateBag } from '@/server/mockValidations';

type ContextProviderProps = {
  children: React.ReactNode;
}

type BagContext = {
  bagItems: BagProduct[] | [];
  setBagItems: React.Dispatch<React.SetStateAction<BagProduct[] | []>>;
  forceOpen: boolean;
  setForceOpen: React.Dispatch<React.SetStateAction<boolean>>;
  forceElementRef: React.RefObject<HTMLButtonElement>;
  scrollableRef: React.RefObject<HTMLDivElement>;
}

const BagContext = createContext<BagContext | null>(null);

// The bagItems states are used to store the items in the bag, 
// the scrollableRef is used to scroll to the element in the bag, 
// and the forceElementRef is used to force the bag menu to open when a button (AddToBag) is clicked.
export function BagProvider({children}:ContextProviderProps) {
  const [bagItems, setBagItems] = useState<BagProduct[] | []>([]);
  const [forceOpen, setForceOpen] = useState(false);
  const forceElementRef = useRef<HTMLButtonElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  // Set the bagItems from localStorage
  useEffect(() => {
    const savedBagItems = JSON.parse(localStorage.getItem('bagItems') || '[]') as BagProduct[];
    const validBagItems = validateBag(savedBagItems);
    setBagItems(validBagItems);
    localStorage.setItem('bagItems', JSON.stringify(validBagItems));
  }, []);

  // Reset the forceOpen state after it is used
  useEffect(() => {
    if (forceOpen) {
      setForceOpen(false);
    }
  }, [forceOpen]);

  return (
    <BagContext.Provider value={{bagItems, setBagItems, forceElementRef, forceOpen, setForceOpen, scrollableRef }}>
      {children}
    </BagContext.Provider>
  )
}

export function useBagContext() {
  const context = useContext(BagContext);

  if (!context) {
    throw new Error('useBagContext must be used within a BagContextProvider');
  }

  return context;
}