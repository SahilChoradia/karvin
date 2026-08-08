'use client';

import React, { useState } from 'react';
import { submitNewsletterSubscription } from '@/app/actions/contact';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await submitNewsletterSubscription(email);
      if (res.success) {
        setStatus('success');
        setMessage(res.message || 'Thank you for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(res.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Failed to connect. Please check your network and try again.');
    }
  };

  return (
    <div className="pt-2 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <input
          type="email"
          placeholder="Enter corporate email..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="px-4 py-3 bg-white border border-brand-border rounded-lg text-sm text-brand-dark w-full focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red disabled:opacity-55"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-brand-dark hover:bg-brand-gray text-white font-display font-semibold text-sm px-6 py-3 rounded-lg w-full sm:w-auto transition-colors cursor-pointer whitespace-nowrap disabled:opacity-55"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {message && (
        <p className={`mt-3 text-xs font-semibold ${status === 'success' ? 'text-green-600' : 'text-brand-red'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
