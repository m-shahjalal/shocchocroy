import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/utils/cn';

import './global.css';
import NProgress from '@/components/loader/n-progress';
import { Toaster } from '@/components/ui/toaster';

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
        <>
          {children}
          <NProgress />
          <Toaster />
        </>
      </body>
    </html>
  );
}
