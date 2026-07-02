import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Use | KARVIN Power Systems',
  description: 'Terms of use and service conditions for KARVIN Power Systems Pvt. Ltd.',
};

export default function TermsOfUsePage() {
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
            <FileText className="w-8 h-8" />
            <h1 className="font-serif font-black text-3xl md:text-5xl text-brand-dark tracking-tight">
              Terms of Use
            </h1>
          </div>
          <p className="text-xs text-brand-gray font-semibold">
            Last Updated: {currentDate}
          </p>
        </div>

        {/* Contents */}
        <div className="prose text-brand-gray text-sm md:text-base leading-relaxed space-y-6">
          <p>
            Welcome to the corporate website of **KARVIN Power Systems Pvt. Ltd.** (`karvinpower.com`). By accessing our website, browsing our product catalogs, or downloading technical data sheets, you agree to comply with the following conditions of usage.
          </p>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            1. Intellectual Property
          </h3>
          <p>
            All content on this website—including the SVGs, logos, custom vector graphics, layouts, project case logs, blog whitepapers, and driver engineering descriptions—is the property of KARVIN Power Systems Pvt. Ltd. and is protected by Indian and international copyright laws. Reproduction of any materials without written authorization is strictly prohibited.
          </p>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            2. Product Data & Catalog Disclaimer
          </h3>
          <p>
            The specifications, wattages, and luminous efficacy values provided in our catalog represent average values obtained under laboratory conditions. Actual site metrics may vary depending on ambient heat dissipation, structural configurations, and local voltage parameters. We reserve the right to modify technical layouts without prior notice as part of our continuous R&D improvements.
          </p>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            3. B2B Leads Submission
          </h3>
          <p>
            By submitting an inquiry or project audit request, you verify that the email address and contact coordinates provided represent active corporate coordinates. Submitting false data, duplicate queries, or automated spam through our honeypot-protected forms will result in immediate IP banning from our server actions.
          </p>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            4. Limitation of Liability
          </h3>
          <p>
            KARVIN Power Systems Pvt. Ltd. will not be held liable for any operational losses or safety incidents occurring from installations executed by unauthorized third-party contractors who fail to comply with our product manuals and safety codes.
          </p>
        </div>
      </div>
    </div>
  );
}
