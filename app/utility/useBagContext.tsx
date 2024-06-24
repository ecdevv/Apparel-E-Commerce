'use client'
import { createContext, useContext, useState } from 'react';
import { ProductToBeAdded } from './types';

type ContextProviderProps = {
  children: React.ReactNode;
}

type BagContext = {
  bagItems: ProductToBeAdded[] | [];
  setBagItems: React.Dispatch<React.SetStateAction<ProductToBeAdded[] | []>>;
}

const BagContext = createContext<BagContext | null>(null);

export function BagProvider({children}:ContextProviderProps) {
  const [bagItems, setBagItems] = useState<ProductToBeAdded[] | []>(
    JSON.parse(localStorage.getItem('bagItems') || '[]')
  );

  return (
    <BagContext.Provider value={{bagItems, setBagItems}}>
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