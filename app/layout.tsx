import type { Metadata } from "next";
import { Inter, Montserrat, Roboto, Lora } from "next/font/google";
import { BagProvider } from './utility/contexts/BagContext';
import { WishlistProvider } from "./utility/contexts/WishlistContext";
import { MenuProvider } from "./utility/contexts/MenuContext";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: "--font-roboto",
})

const lora = Lora ({
  subsets: ["latin"],
  variable: "--font-lora"
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} ${roboto.variable} ${lora.variable}`}>
        <BagProvider>
          <WishlistProvider>
            <MenuProvider>
              {children}
            </MenuProvider>
          </WishlistProvider>
        </BagProvider>
      </body>
    </html>
  );
}
