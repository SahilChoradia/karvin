import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Our Engineering Legacy',
  description: 'Learn about KARVIN Power Systems – two decades of manufacturing robust LED drivers, custom lighting solutions, and power conditioning systems for industrial and commercial applications in India.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About KARVIN Power Systems | Our Engineering Legacy',
    description: 'Founded in 2006, KARVIN Power Systems has spent two decades delivering robust LED lighting and power conditioning solutions for industrial, commercial, and infrastructure projects.',
    url: 'https://karvinpower.com/about',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'KARVIN Power Systems Engineering Facility',
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
