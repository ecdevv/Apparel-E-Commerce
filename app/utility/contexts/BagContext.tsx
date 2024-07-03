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
  scrollableRef: React.RefObject<HTMLDivElement>;
  forceElementRef: React.RefObject<HTMLButtonElement>;
}

const BagContext = createContext<BagContext | null>(null);

export function BagProvider({children}:ContextProviderProps) {
  const [bagItems, setBagItems] = useState<BagProduct[] | []>([]);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const forceElementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedBagItems = JSON.parse(localStorage.getItem('bagItems') || '[]') as BagProduct[];
    const validBagItems = validateBag(savedBagItems);
    setBagItems(validBagItems);
    localStorage.setItem('bagItems', JSON.stringify(validBagItems));
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