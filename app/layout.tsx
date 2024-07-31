import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import ContextProviders from "./utility/contexts/ContextProviders";
import ScrollFix from "./utility/components/ScrollFix";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-montserrat",
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal'],
  display: 'swap',
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanluxe.vercel.app/"),
  title: {
    default: "Urban Luxe | Elegance and Sophistication",
    template: "%s | Urban Luxe"
  },
  description: "Experience the epitome of elegance and sophistication with Urban Luxe.",
  openGraph: {
    title: "Urban Luxe | Elegance and Sophistication",
    description: "Experience the epitome of elegance and sophistication with Urban Luxe.",
    type: "website",
    url: "https://urbanluxe.vercel.app/",
    siteName: "Urban Luxe",
    locale: "en_US",
    images: [
      {
        url: "/images/opengraph/opengraph-image.webp",
        alt: "Urban Luxe Logo",
        width: 1200,
        height: 630
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/images/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#909090" />
      <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#909090" />
      <meta name="msapplication-config" content="/images/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#909090" />

      <ScrollFix />
      <body className={`${montserrat.variable} ${roboto.variable}`}>
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  );
}
