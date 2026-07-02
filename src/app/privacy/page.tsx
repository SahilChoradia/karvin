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
            At **KARVIN Power Systems Pvt. Ltd.**, we value the trust you place in us. This Privacy Policy details how we collect, protect, and utilize your corporate coordinates and inquiry logs submitted via our website (`karvinpower.com`) and associated lead hooks.
          </p>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            1. Information Collection
          </h3>
          <p>
            We collect information when you request a technical quote, schedule a lighting audit, apply for open career positions, or contact our Mumbai office. The data collected includes:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Full Name & Designation</li>
            <li>Corporate email addresses & Phone coordinates</li>
            <li>Company Name, city, and state</li>
            <li>Site specifications, budget targets, and design requirements</li>
            <li>IP coordinates and User Agent strings (logged during validation)</li>
          </ul>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            2. Use of Information
          </h3>
          <p>
            Your information is logged securely inside our Google Sheet database and processed by our hardware engineering team in Mumbai. We use this information to:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Generate Dialux lighting simulations and technical estimates</li>
            <li>Schedule on-site energy audits and physical installations</li>
            <li>Contact candidate applications for HR recruitment screening</li>
            <li>Deliver relevant annual maintenance contract logs</li>
          </ul>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            3. Data Protection & Integrations
          </h3>
          <p>
            We do not maintain local databases that are prone to leaks. All contact form details are forwarded securely via HTTPS to our dedicated Google Apps Script API endpoint and stored directly inside our access-controlled Google Spreadsheet. We do not sell or trade your data with external advertising networks.
          </p>

          <h3 className="font-display font-bold text-lg text-brand-dark pt-4">
            4. Corporate Coordinates
          </h3>
          <p>
            If you wish to view, update, or remove your lead records from our registry, please send a written request to:
            <br />
            <strong>Email:</strong> info@karvinpower.com
            <br />
            <strong>Address:</strong> KARVIN Power Systems Pvt. Ltd., Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051
          </p>
        </div>
      </div>
    </div>
  );
}
