'use client'
import { createContext, useContext, useState } from 'react';

type ContextProviderProps = {
  children: React.ReactNode;
}

type MenuContext = {
  globalMenuToggle: boolean;
  setGlobalMenuToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuContext = createContext<MenuContext | null>(null);

export function MenuProvider({children}:ContextProviderProps) {
  const [globalMenuToggle, setGlobalMenuToggle] = useState(false);

  return (
    <MenuContext.Provider value={{globalMenuToggle, setGlobalMenuToggle}}>
      {children}
    </MenuContext.Provider>
  )
}

export function useMenuContext() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenuContext must be used within a MenuContextProvider');
  }

  return context;
}