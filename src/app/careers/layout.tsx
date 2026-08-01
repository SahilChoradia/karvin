import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers – Join Our Engineering Team',
  description: 'Explore career opportunities at KARVIN Power Systems. We are looking for electrical engineers, R&D specialists, and sales professionals to join our team in Mumbai, India.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Careers at KARVIN Power Systems | Engineering Jobs in Mumbai',
    description: 'Join the KARVIN team. We are hiring electrical engineers, R&D specialists, and sales professionals at our Mumbai facility.',
    url: 'https://karvinpower.com/careers',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'KARVIN Power Systems Careers',
      },
    ],
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
