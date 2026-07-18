import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | KARVIN Power Systems',
  description: 'Privacy policy and data protection standards for KARVIN Power Systems Pvt. Ltd.',
};

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-10">
        {/* Back Link */}
        <div className="border-b border-brand-border/60 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-display font-bold text-brand-gray hover:text-brand-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-brand-red">
            <ShieldCheck className="w-8 h-8" />
            <h1 className="font-serif font-black text-3xl md:text-5xl text-brand-dark tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xs text-brand-gray font-semibold">
            Last Updated: {currentDate}
          </p>
        </div>

        {/* Contents */}
        <div className="prose text-brand-gray text-sm md:text-base leading-relaxed space-y-6">
          <p>
            **KARVIN Power Systems Pvt. Ltd.**
          </p>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            1. Information Collection
          </h3>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            2. Use of Information
          </h3>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            3. Data Protection & Integrations
          </h3>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            4. Corporate Coordinates
          </h3>
          <p>
            <strong>Email: info@karvinpower.com</strong>
            <br />
            <strong>Address: KARVIN Power Systems Pvt. Ltd., Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
