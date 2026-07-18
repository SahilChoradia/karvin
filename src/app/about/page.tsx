'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Compass, Eye, Check, Users } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function About() {
  const milestones = [
    { year: '2006', title: 'Founding Year', desc: 'Started operations as a specialized electrical power conditioning manufacturer in Mumbai.' },
    { year: '2012', title: 'LED Driver Division Launch', desc: 'Set up an in-house electronics R&D center to design robust power drivers for lighting fixtures.' },
    { year: '2016', title: 'ISO 9001 Certification', desc: 'Officially certified for ISO quality management systems, scaling up industrial installations.' },
    { year: '2021', title: 'Smart Cities Node Integration', desc: 'Developed Smart Highway street light range featuring NEMA node and IoT controllers.' },
    { year: '2024', title: 'Logistics Facility Expansions', desc: 'Commissioned large scale lighting systems for Mahindra Logistics and tata workspace units.' }
  ];

  return (
    <div className="bg-white">
      {/* 1. Header Banner */}
      <section className="bg-brand-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1500"
            alt="About Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 space-y-4 pt-10">
          <ScrollReveal variant="text-mask-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
              Our Identity
            </h4>
          </ScrollReveal>
          <ScrollReveal variant="text-mask-left" delay={0.1}>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-white">
              Engineering Trust & Reliability.
            </h1>
          </ScrollReveal>

        </div>
      </section>

      {/* 2. Company Story */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <ScrollReveal variant="text-mask-left">
            <h2 className="font-serif font-black text-3xl text-brand-dark leading-tight">
              Nearly Two Decades of Professional Electronics & Manufacturing.
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" delay={0.15}>
            <p className="text-sm md:text-base text-brand-gray leading-relaxed font-sans">
              <strong>under-engineered lighting represents a safety hazard and a financial drain.</strong>
            </p>
          </ScrollReveal>

          <ScrollReveal variant="slide-right" delay={0.35}>
            <div className="flex items-center gap-4 bg-brand-light-gray p-5 rounded-xl border border-brand-border">
              <Users className="w-10 h-10 text-brand-red shrink-0" />
              <div>
                <h4 className="font-display font-bold text-sm text-brand-dark">Led by Mr. Sanjay Agarwal</h4>
                <p className="text-xs text-brand-gray">Managing Director & Electronics Pioneer</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="slide-left" duration={2.2}>
          <div className="relative h-[400px] rounded-2xl overflow-hidden border border-brand-border luxury-shadow bg-brand-light-gray">
            <Image
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
              alt="Engineering Lab"
              fill
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Core Values, Mission, Vision */}
      <section className="py-20 bg-brand-light-gray border-t border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal variant="slide-right" delay={0.05} className="flex">
            <div className="bg-white p-8 rounded-2xl border border-brand-border luxury-shadow space-y-4 w-full">
              <div className="w-10 h-10 bg-brand-red-light rounded-lg flex items-center justify-center text-brand-red">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-dark">Vision</h3>
              <p className="text-sm text-brand-gray leading-relaxed font-sans">
                To lead in lighting and power conditioning solutions through continuous innovation and research, creating custom products that respect energy boundaries and enhance environment lives.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.15} className="flex">
            <div className="bg-white p-8 rounded-2xl border border-brand-border luxury-shadow space-y-4 w-full">
              <div className="w-10 h-10 bg-brand-red-light rounded-lg flex items-center justify-center text-brand-red">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-dark">Mission</h3>
              <p className="text-sm text-brand-gray leading-relaxed font-sans">
                We empower our customers to rapidly deploy high-quality, durable LED installations that lower energy draw, eradicate maintenance crane rentals, and guarantee perfect visual output.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-left" delay={0.25} className="flex">
            <div className="bg-white p-8 rounded-2xl border border-brand-border luxury-shadow space-y-4 w-full">
              <div className="w-10 h-10 bg-brand-red-light rounded-lg flex items-center justify-center text-brand-red">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-dark">Our Values</h3>
              <p className="text-sm text-brand-gray leading-relaxed font-sans">
                Commitment to quality standards, complete authenticity in our calculations, structural integration with architect intent, and full dedication to after-sales support.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Infrastructure & Quality Process */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal variant="slide-right" duration={2.2} className="order-last lg:order-first">
          <div className="relative h-[400px] rounded-2xl overflow-hidden border border-brand-border luxury-shadow bg-brand-light-gray">
            <Image
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000"
              alt="Quality Testing Facility"
              fill
              className="object-cover"
            />
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal variant="text-mask-right">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
              Manufacturing Setup
            </h4>
          </ScrollReveal>
          <ScrollReveal variant="text-mask-right" delay={0.1}>
            <h2 className="font-serif font-black text-3xl text-brand-dark leading-tight">
              State of the Art Facilities & Testing Chambers.
            </h2>
          </ScrollReveal>


          <ScrollReveal variant="slide-left" delay={0.3}>
            <ul className="space-y-3 font-sans">
              <li className="flex items-center gap-3 text-sm text-brand-gray">
                <span className="p-1 rounded bg-brand-red/10 text-brand-red shrink-0"><Check className="w-4 h-4" /></span>
                ISO 9001:2015 compliant quality checks at multiple stages
              </li>
              <li className="flex items-center gap-3 text-sm text-brand-gray">
                <span className="p-1 rounded bg-brand-red/10 text-brand-red shrink-0"><Check className="w-4 h-4" /></span>
                High temperature aging ovens simulating up to 55°C ambient limits
              </li>
              <li className="flex items-center gap-3 text-sm text-brand-gray">
                <span className="p-1 rounded bg-brand-red/10 text-brand-red shrink-0"><Check className="w-4 h-4" /></span>
                Advanced room testing and photometrics mapping
              </li>
              <li className="flex items-center gap-3 text-sm text-brand-gray">
                <span className="p-1 rounded bg-brand-red/10 text-brand-red shrink-0"><Check className="w-4 h-4" /></span>
                100% surge-resistance verification for highway streetlights
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Milestones Timeline */}
      <section className="py-20 bg-brand-light-gray border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <ScrollReveal variant="text-mask">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
                Growth Path
              </h4>
            </ScrollReveal>
            <ScrollReveal variant="text-mask" delay={0.1}>
              <h2 className="font-serif font-black text-3xl md:text-4xl text-brand-dark">
                Tracing Our Milestones.
              </h2>
            </ScrollReveal>
          </div>

          <div className="relative border-l border-brand-border max-w-3xl mx-auto pl-8 space-y-12">
            {milestones.map((m, idx) => (
              <ScrollReveal 
                key={idx} 
                variant="slide-right" 
                delay={idx * 0.08}
                className="relative group"
              >
                {/* Dot */}
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-brand-red flex items-center justify-center z-10 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <span className="w-2 h-2 rounded-full bg-brand-red group-hover:bg-white" />
                </div>
                {/* Content */}
                <div className="space-y-2">
                  <span className="font-display font-black text-lg text-brand-red">{m.year}</span>
                  <h4 className="font-display font-bold text-base text-brand-dark">{m.title}</h4>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
