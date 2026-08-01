import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Services & AMC',
  description: 'KARVIN Power Systems offers turnkey LED project execution, lighting energy audits, custom luminaire design, and Annual Maintenance Contracts (AMC) for commercial and industrial facilities.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Engineering Services & AMC | KARVIN Power Systems',
    description: 'Turnkey LED project execution, energy audits, custom luminaire design, and Annual Maintenance Contracts (AMC) from KARVIN Power Systems.',
    url: 'https://karvinpower.com/services',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'KARVIN Power Systems Engineering Services',
      },
    ],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
