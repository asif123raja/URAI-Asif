import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';


const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'UR AI',
  description: 'ALL AI FEATURES IN ONE PLATFORM',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/> {/* Navbar at the top */}
        <main className="min-h-screen">{children}</main>
        <Footer/> {/* Footer at the bottom */}
        <Toaster />
      </body>
    </html>
  );
}
