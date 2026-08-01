import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us – Request Engineering Consultation',
  description: 'Get in touch with KARVIN Power Systems for LED lighting consultations, product inquiries, turnkey project quotes, or technical support. Based in Mumbai, serving clients across India.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact KARVIN Power Systems | Lighting Consultation & Inquiry',
    description: 'Request a consultation for LED lighting projects, product specifications, or AMC contracts. KARVIN Power Systems – serving commercial and industrial clients across India.',
    url: 'https://karvinpower.com/contact',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'KARVIN Power Systems Contact',
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
