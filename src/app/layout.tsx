import type { Metadata } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingActions from '@/components/layout/FloatingActions';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-baskerville',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'KARVIN Power Systems | Premium LED Lighting Solutions',
    template: '%s | KARVIN Power Systems',
  },
  description: 'KARVIN Power Systems Pvt. Ltd. delivers professional LED lighting solutions and turnkey engineering services for commercial, industrial, and public infrastructure projects.',
  keywords: ['KARVIN', 'LED lighting', 'industrial lighting', 'commercial lighting', 'smart street lights', 'architectural lighting', 'customized lighting solutions', 'turnkey lighting projects', 'India'],
  authors: [{ name: 'KARVIN Power Systems Pvt. Ltd.' }],
  creator: 'KARVIN Power Systems Pvt. Ltd.',
  metadataBase: new URL('https://karvinpower.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'KARVIN Power Systems | Premium LED Lighting Solutions',
    description: 'Professional LED lighting solutions and custom engineering capabilities for commercial, industrial, and infrastructure projects.',
    url: 'https://karvinpower.com',
    siteName: 'KARVIN Power Systems',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'KARVIN Power Systems LED Lighting Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KARVIN Power Systems | Premium LED Lighting Solutions',
    description: 'Professional LED lighting solutions and custom engineering capabilities for commercial, industrial, and infrastructure projects.',
    images: ['https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=1200'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'KARVIN Power Systems Pvt. Ltd.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=600',
    '@id': 'https://karvinpower.com/#organization',
    url: 'https://karvinpower.com',
    telephone: '+912212345678',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bandra Kurla Complex, Bandra East',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400051',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.0732439,
      longitude: 72.8624131,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${libreBaskerville.variable} font-sans antialiased text-brand-dark bg-white flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
