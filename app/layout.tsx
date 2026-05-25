import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Stayverse | Luxury Real Estate & Condominiums in Bangkok',
  description: 'Discover premium properties, luxury condominiums, houses, and land in Bangkok near BTS and MRT lines with Stayverse, your trusted urban real estate partner.',
  keywords: 'condo bangkok, luxury property bangkok, bts condo, mrt condo, buy condo bangkok, rent condo bangkok, stayverse, real estate agency thailand',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
