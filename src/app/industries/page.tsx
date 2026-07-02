'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Factory, Building2, Hotel, Compass, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { INDUSTRIES } from '@/lib/data';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Factory': Factory,
  'Building': Building2,
  'Hotel': Hotel,
  'Compass': Compass,
};

export default function IndustriesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-brand-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1500"
            alt="Industries Solutions Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 space-y-4 pt-10">
          <ScrollReveal variant="text-mask-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
              Application Engineering
            </h4>
          </ScrollReveal>
          <ScrollReveal variant="text-mask-left" delay={0.1}>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-white">
              Industry Solutions
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" delay={0.2}>
            <p className="text-base text-white/70 max-w-2xl font-sans leading-relaxed">
              We solve typical industrial constraints. Explore challenges, custom-engineered solutions, and recommended fixtures for each domain.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Solutions Listing */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-8 space-y-24">
        {INDUSTRIES.map((ind, index) => {
          const IconComp = industryIcons[ind.iconName] || Building2;
          const isEven = index % 2 === 0;

          return (
            <div
              key={ind.id}
              id={ind.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-b border-brand-border/60 pb-16 last:border-0 scroll-mt-28"
            >
              {/* Media Block (Alternating Layout) */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-first' : 'lg:order-last'}`}>
                <ScrollReveal variant={isEven ? "slide-right" : "slide-left"} duration={2.2}>
                  <div className="relative h-[420px] rounded-2xl overflow-hidden border border-brand-border luxury-shadow bg-brand-light-gray">
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-6 left-6 bg-brand-dark/85 backdrop-blur-md text-white py-3 px-5 rounded-xl border border-white/10 flex items-center gap-3">
                      <IconComp className="w-6 h-6 text-brand-red" />
                      <span className="font-display font-bold text-sm tracking-wider uppercase">
                        {ind.name} Division
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Details Block */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-3">
                  <ScrollReveal variant={isEven ? "text-mask-right" : "text-mask-left"}>
                    <h2 className="font-serif font-black text-3xl md:text-4xl text-brand-dark">
                      {ind.name} Lighting
                    </h2>
                  </ScrollReveal>
                  <ScrollReveal variant={isEven ? "slide-left" : "slide-right"} delay={0.15}>
                    <p className="text-base text-brand-gray font-sans leading-relaxed">
                      {ind.description}
                    </p>
                  </ScrollReveal>
                </div>

                {/* Challenges and Solutions Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-brand-border/40">
                  {/* Challenges list */}
                  <ScrollReveal variant={isEven ? "slide-left" : "slide-right"} delay={0.2} className="space-y-4">
                    <h4 className="font-display font-bold text-sm text-brand-dark flex items-center gap-2">
                      <ShieldAlert className="w-4.5 h-4.5 text-brand-red" /> Sector Challenges
                    </h4>
                    <ul className="space-y-2.5">
                      {ind.challenges.map((ch, idx) => (
                        <li key={idx} className="text-xs text-brand-gray leading-relaxed font-sans list-disc list-inside">
                          {ch}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>

                  {/* Solutions list */}
                  <ScrollReveal variant={isEven ? "slide-left" : "slide-right"} delay={0.3} className="space-y-4">
                    <h4 className="font-display font-bold text-sm text-brand-dark flex items-center gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-green-600" /> KARVIN Solutions
                    </h4>
                    <ul className="space-y-2.5">
                      {ind.solutions.map((sol, idx) => (
                        <li key={idx} className="text-xs text-brand-gray leading-relaxed font-sans list-disc list-inside">
                          {sol}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                </div>

                {/* Recommended Products */}
                <ScrollReveal variant={isEven ? "slide-left" : "slide-right"} delay={0.4} className="space-y-3 pt-4 border-t border-brand-border/40">
                  <h4 className="font-display font-bold text-xs text-brand-dark uppercase tracking-wider">
                    Recommended Product Range
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {ind.recommendedProducts.map((pName, idx) => (
                      <span
                        key={idx}
                        className="bg-brand-light-gray border border-brand-border text-brand-dark text-xs font-display font-semibold px-4 py-2 rounded-lg"
                      >
                        {pName}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal variant={isEven ? "slide-left" : "slide-right"} delay={0.5} className="pt-2 flex items-center gap-4">
                  <Link href="/contact">
                    <Button>Inquire About Solutions</Button>
                  </Link>
                  <Link href="/products" className="text-xs font-display font-bold text-brand-red inline-flex items-center gap-1.5 hover:gap-2 transition-all">
                    Browse All Products <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          );
        })}
      </section>

      {/* Turnkey Call To Action */}
      <section className="bg-brand-light-gray py-20 border-t border-brand-border text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <ScrollReveal variant="text-mask">
            <h2 className="font-serif font-black text-3xl text-brand-dark">
              Require a Custom Engineering Audit?
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.15}>
            <p className="text-sm md:text-base text-brand-gray max-w-xl mx-auto font-sans leading-relaxed">
              Our Dialux simulation specialists can map your layout and recommend exact driver configurations based on your ambient temperature and voltage spike records.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.3} className="pt-4">
            <Link href="/contact">
              <Button size="lg">Consult Our Technical Team</Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
