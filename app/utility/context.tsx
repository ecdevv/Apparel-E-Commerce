'use client'
import { createContext, useContext, useState } from 'react';

type ContextProviderProps = {
  children: React.ReactNode;
}

type GlobalContext = {
  showNavbar: boolean;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>
}

const GlobalContext = createContext<GlobalContext | null>(null);

export function GlobalProvider({children}:ContextProviderProps) {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value = {{showNavbar, setShowNavbar}}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }

  return context;
}