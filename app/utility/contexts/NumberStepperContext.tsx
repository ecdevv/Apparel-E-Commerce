'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type ContextProviderProps = {
  children: React.ReactNode;
}

type NumberStepperContext = {
  productQuantity: number;
  setProductQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const NumberStepperContext = createContext<NumberStepperContext | null>(null);

export function NumberStepperProvider({children}:ContextProviderProps) {
  const [productQuantity, setProductQuantity] = useState(1);
  const pathname = usePathname();

  useEffect(() => {
    setProductQuantity(1);
  }, [pathname]);

  return (
    <NumberStepperContext.Provider value={{productQuantity, setProductQuantity}}>
      {children}
    </NumberStepperContext.Provider>
  )
}

export function useNumberStepperContext() {
  const context = useContext(NumberStepperContext);

  if (!context) {
    throw new Error('useNumberStepperContext must be used within a NumberStepperContextProvider');
  }

  return context;
}