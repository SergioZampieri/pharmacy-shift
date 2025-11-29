import { Geist } from 'next/font/google';

import { QueryProvider } from '@/components/providers/query-provider';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: `pharmacy shifts`,
  description: `pharmacy shifts description`,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} h-full`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
