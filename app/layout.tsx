import { Inter, Playfair_Display } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from './providers'; // Changed import

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: "Let's Rwanda - Explore Rwanda's Finest Services",
  description: "Your gateway to hotels, accommodations, and experiences in the heart of East Africa",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          playfairDisplay.variable
        )}
      >
        <Providers> {/* Wrap with client providers */}
          <div className="min-h-screen bg-background">
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}