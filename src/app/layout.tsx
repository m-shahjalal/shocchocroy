import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NProgressProviders from '@/providers/progressbar-provider';
import { cn } from '@/utils/cn';

import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'স্বচ্ছক্রয়',
  description: 'Your own shari store.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'h-screen')}>
        <NProgressProviders>{children}</NProgressProviders>
      </body>
    </html>
  );
}
