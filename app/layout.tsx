import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ProHub by PISA',
  description: 'Premium soccer operating system for Protouch International Soccer Academy.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
