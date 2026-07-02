'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white pt-20 pb-8 border-t border-brand-border/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
        {/* Column 1: Brand Info */}
        <div className="space-y-6">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="KARVIN"
              width={109}
              height={36}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-sm text-white/60 leading-relaxed font-sans">
            KARVIN Power Systems Pvt. Ltd. is an ISO certified enterprise providing professional LED lighting solutions and turnkey engineering capabilities across industrial, commercial, and public infrastructure spaces.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-brand-red text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-brand-red text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-brand-red text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-sans font-bold text-xs tracking-widest uppercase mb-6 text-white">
            Navigation
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="text-white/60 hover:text-brand-red text-sm font-medium transition-colors block">
                About Our Company
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-white/60 hover:text-brand-red text-sm font-medium transition-colors block">
                Lighting Products
              </Link>
            </li>
            <li>
              <Link href="/industries" className="text-white/60 hover:text-brand-red text-sm font-medium transition-colors block">
                Industries Served
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-white/60 hover:text-brand-red text-sm font-medium transition-colors block">
                Engineering Services
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-white/60 hover:text-brand-red text-sm font-medium transition-colors block">
                Featured Projects
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-white/60 hover:text-brand-red text-sm font-medium transition-colors block">
                Careers & Culture
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Corporate Info */}
        <div className="space-y-6">
          <h4 className="font-sans font-bold text-xs tracking-widest uppercase text-white">
            Contact Details
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
              <span className="text-sm text-white/60 leading-relaxed font-sans">
                Corporate Office, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-red shrink-0" />
              <a href="tel:+912212345678" className="text-sm text-white/60 hover:text-brand-red transition-colors font-sans">
                +91 22 1234 5678
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-red shrink-0" />
              <a href="mailto:info@karvinpower.com" className="text-sm text-white/60 hover:text-brand-red transition-colors font-sans">
                info@karvinpower.com
              </a>
            </li>
          </ul>

        </div>

        {/* Column 4: Google Maps Embed */}
        <div>
          <h4 className="font-sans font-bold text-xs tracking-widest uppercase mb-6 text-white">
            Corporate HQ Map
          </h4>
          <div className="w-full h-[180px] rounded-xl overflow-hidden border border-white/10 luxury-shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7818451838634!2d72.8624131!3d19.0732439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8ef40000001%3A0xc07a8fe8b56f8f1c!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra%20400051!5e0!3m2!1sen!2sin!4v1719398000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KARVIN Mumbai HQ Location Map"
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <p className="font-sans">
          &copy; {currentYear} KARVIN Power Systems Pvt. Ltd. All rights reserved. An ISO 9001 Certified Enterprise.
        </p>
        <div className="flex items-center gap-6 font-sans">
          <Link href="/privacy" className="hover:text-brand-red transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-brand-red transition-colors">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
