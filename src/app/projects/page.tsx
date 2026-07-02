'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, UserCheck, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', 'Industrial', 'Hospitality', 'Commercial'];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-brand-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1500"
            alt="Projects Portfolio Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 space-y-4 pt-10">
          <ScrollReveal variant="text-mask-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
              Engineering Milestones
            </h4>
          </ScrollReveal>
          <ScrollReveal variant="text-mask-left" delay={0.1}>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-white">
              Featured Projects
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" delay={0.2}>
            <p className="text-base text-white/70 max-w-2xl font-sans leading-relaxed">
              Read how we audit, co-engineer, and install highly durable, energy-conserving LED lighting grids for prominent corporate brands.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid Portfolio */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-8 space-y-16">
        
        {/* Category Filters */}
        <ScrollReveal variant="fade-in" className="flex flex-wrap items-center justify-center gap-3 border-b border-brand-border/60 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-display font-bold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'bg-brand-light-gray text-brand-dark hover:bg-brand-border'
              }`}
            >
              {cat} Projects
            </button>
          ))}
        </ScrollReveal>

        {/* Project Case Details */}
        <div className="space-y-24">
          {filteredProjects.map((proj, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={proj.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-brand-border/60 pb-16 last:border-0"
              >
                {/* Visual Block */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-first' : 'lg:order-last'}`}>
                  <ScrollReveal variant={isEven ? "slide-right" : "slide-left"} duration={2.2}>
                    <div className="relative h-[380px] md:h-[450px] rounded-2xl overflow-hidden border border-brand-border luxury-shadow bg-brand-light-gray">
                      <Image
                        src={proj.image}
                        alt={proj.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </ScrollReveal>
                </div>

                {/* Case Info */}
                <div className="lg:col-span-6 space-y-6">
                  <ScrollReveal variant={isEven ? "slide-left" : "slide-right"}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-light text-brand-red text-xs font-display font-semibold uppercase tracking-wider">
                      {proj.category}
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal variant={isEven ? "text-mask-right" : "text-mask-left"} delay={0.1}>
                    <h2 className="font-serif font-black text-2xl md:text-3xl text-brand-dark tracking-tight">
                      {proj.name}
                    </h2>
                  </ScrollReveal>

                  {/* Meta Details */}
                  <ScrollReveal variant={isEven ? "slide-left" : "slide-right"} delay={0.2}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-brand-light-gray rounded-xl border border-brand-border text-xs text-brand-gray font-sans font-semibold">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                        <span>{proj.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-red shrink-0" />
                        <span>Commissioned: {proj.year}</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                        <UserCheck className="w-4 h-4 text-brand-red shrink-0" />
                        <span>Client: {proj.client}</span>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal variant={isEven ? "slide-left" : "slide-right"} delay={0.3}>
                    <p className="text-sm md:text-base text-brand-gray leading-relaxed font-sans">
                      {proj.description}
                    </p>
                  </ScrollReveal>

                  {/* Challenge & Solution Grid */}
                  <ScrollReveal variant={isEven ? "slide-left" : "slide-right"} delay={0.4} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-border/40 text-xs leading-relaxed font-sans text-brand-gray">
                    <div className="space-y-2">
                      <span className="block font-display font-bold text-brand-dark uppercase tracking-wider">
                        The Challenge
                      </span>
                      <p>{proj.challenge}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="block font-display font-bold text-green-600 uppercase tracking-wider">
                        KARVIN Engineering Solution
                      </span>
                      <p>{proj.solution}</p>
                    </div>
                  </ScrollReveal>

                  {/* Products Deployed */}
                  <ScrollReveal variant={isEven ? "slide-left" : "slide-right"} delay={0.5} className="space-y-2 pt-4 border-t border-brand-border/40 text-xs">
                    <span className="block font-display font-bold text-brand-dark uppercase tracking-wider">
                      Luminaires Deployed
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {proj.productsUsed.map((prod, pIdx) => (
                        <span
                          key={pIdx}
                          className="bg-brand-red-light border border-brand-red/15 text-brand-red font-display font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                        >
                          <Cpu className="w-3.5 h-3.5" /> {prod}
                        </span>
                      ))}
                    </div>
                  </ScrollReveal>

                  <ScrollReveal variant={isEven ? "slide-left" : "slide-right"} delay={0.6} className="pt-2">
                    <Link href="/contact">
                      <Button icon={<ArrowRight className="w-4 h-4" />}>
                        Request Custom Project Quote
                      </Button>
                    </Link>
                  </ScrollReveal>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Trust Quote block */}
      <section className="bg-brand-dark text-white py-20 border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <ScrollReveal variant="scale-up">
            <ShieldCheck className="w-12 h-12 text-brand-red mx-auto animate-pulse" />
          </ScrollReveal>
          <ScrollReveal variant="text-mask" delay={0.15}>
            <h2 className="font-serif font-extrabold text-2xl md:text-3xl">
              100% Quality Audited Execution.
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.25}>
            <p className="text-sm text-white/70 max-w-xl mx-auto font-sans leading-relaxed">
              Every installation is measured with calibrated lux meters to verify exact match to Dialux designs before formal project handovers.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
