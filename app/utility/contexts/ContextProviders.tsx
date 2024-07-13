import React from 'react';
import { BagProvider } from './BagContext';
import { WishlistProvider } from './WishlistContext';
import { MenuProvider } from './MenuContext';
import { NumberStepperProvider } from './NumberStepperContext';


const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MenuProvider>
      <BagProvider>
        <WishlistProvider>
          <NumberStepperProvider>
            {children}
          </NumberStepperProvider>
        </WishlistProvider>
      </BagProvider>
    </MenuProvider>
  );
};

export default ContextProviders;
