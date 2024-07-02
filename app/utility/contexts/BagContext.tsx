'use client'
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { ProductToBeAdded } from '../types';
import { validateBag } from '@/server/mockValidations';

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
    const savedBagItems = JSON.parse(localStorage.getItem('bagItems') || '[]') as ProductToBeAdded[];
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