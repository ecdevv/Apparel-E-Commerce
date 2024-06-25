'use client'
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { ProductToBeAdded } from '../types';

type ContextProviderProps = {
  children: React.ReactNode;
}

type BagContext = {
  bagItems: ProductToBeAdded[] | [];
  setBagItems: React.Dispatch<React.SetStateAction<ProductToBeAdded[] | []>>;
  scrollableRef: React.RefObject<HTMLDivElement>;
  forceElementRef: React.RefObject<HTMLButtonElement>;
}

const BagContext = createContext<BagContext | null>(null);

export function BagProvider({children}:ContextProviderProps) {
  const [bagItems, setBagItems] = useState<ProductToBeAdded[] | []>([]);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const forceElementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const storedBagItems = localStorage.getItem('bagItems');
    if (storedBagItems) {
      setBagItems(JSON.parse(storedBagItems));
    }
  }, []);

  return (
    <BagContext.Provider value={{bagItems, setBagItems, scrollableRef, forceElementRef}}>
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