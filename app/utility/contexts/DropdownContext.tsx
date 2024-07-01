'use client'
import { createContext, useContext, useState } from 'react';

type ContextProviderProps = {
  children: React.ReactNode;
}

type DropdownContext = {
  globalMenuToggle: boolean;
  setGlobalMenuToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContext | null>(null);

export function DropdownProvider({children}:ContextProviderProps) {
  const [globalMenuToggle, setGlobalMenuToggle] = useState(false);

  return (
    <DropdownContext.Provider value={{globalMenuToggle, setGlobalMenuToggle}}>
      {children}
    </DropdownContext.Provider>
  )
}

export function useDropdownContext() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('useDropdownContext must be used within a DropdownContextProvider');
  }

  return context;
}