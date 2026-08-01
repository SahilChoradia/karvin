import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LED & Power Products Catalog',
  description: 'Browse the KARVIN Power Systems product catalog – industrial LED luminaires, smart streetlights, architectural lighting, LED drivers, and power conditioning equipment for every application.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'LED & Power Products Catalog | KARVIN Power Systems',
    description: 'Browse industrial LED luminaires, smart streetlights, architectural lighting, LED drivers, and power conditioning equipment from KARVIN Power Systems.',
    url: 'https://karvinpower.com/products',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'KARVIN Power Systems Product Catalog',
      },
    ],
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
