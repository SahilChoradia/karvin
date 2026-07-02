import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="bg-brand-dark text-white min-h-screen flex items-center justify-center font-sans">
      <div className="max-w-md mx-auto px-6 text-center space-y-6 flex flex-col items-center justify-center">
        <AlertCircle className="w-16 h-16 text-brand-red animate-pulse" />
        <h1 className="font-serif font-black text-5xl tracking-tight text-white">
          404 - Page Not Found
        </h1>
        <p className="text-sm text-white/60 leading-relaxed max-w-sm mx-auto">
          The lighting project page you are looking for has been relocated or is currently under technical review by our R&D team.
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button icon={<ArrowRight className="w-4 h-4" />}>
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
