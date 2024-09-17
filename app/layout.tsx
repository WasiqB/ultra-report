import type { Metadata } from 'next';
import './globals.css';
import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement> {
  return (
    <html lang='en'>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
