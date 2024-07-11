import React from 'react';
import { BagProvider } from './contexts/BagContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { MenuProvider } from './contexts/MenuContext';
import { NumberStepperProvider } from './contexts/NumberStepperContext';


const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BagProvider>
      <WishlistProvider>
        <MenuProvider>
          <NumberStepperProvider>
            {children}
          </NumberStepperProvider>
        </MenuProvider>
      </WishlistProvider>
    </BagProvider>
  );
};

export default ContextProviders;
