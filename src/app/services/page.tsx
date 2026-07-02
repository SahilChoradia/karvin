'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Layers, BarChart3, Cpu, Briefcase, ChevronRight, Check } from 'lucide-react';
import { SERVICES } from '@/lib/data';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Layers': Layers,
  'BarChart': BarChart3,
  'Cpu': Cpu,
  'Briefcase': Briefcase,
};

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-brand-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1500"
            alt="Services Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 space-y-4 pt-10">
          <ScrollReveal variant="text-mask-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
              Turnkey Competency
            </h4>
          </ScrollReveal>
          <ScrollReveal variant="text-mask-left" delay={0.1}>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-white">
              Engineering Services
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" delay={0.2}>
            <p className="text-base text-white/70 max-w-2xl font-sans leading-relaxed">
              From Initial daylight calculations and simulation reports to custom PCB designing, manufacturing, and maintenance contracts.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-8 space-y-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal variant="text-mask">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-brand-dark">
              Complete Lighting Engineering End-to-End.
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.15}>
            <p className="text-base text-brand-gray font-sans leading-relaxed">
              We do not just ship boxes. Our team delivers standard-compliant site layouts, ROI audits, and custom maintenance contracts to protect your facility from operations interruptions.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {SERVICES.map((srv, idx) => {
            const IconComp = serviceIcons[srv.iconName] || Briefcase;

            return (
              <ScrollReveal 
                key={srv.id} 
                variant={idx % 2 === 0 ? "slide-right" : "slide-left"} 
                delay={idx * 0.1}
                className="flex"
              >
                <div
                  className="bg-white p-8 rounded-2xl border border-brand-border luxury-shadow flex flex-col justify-between hover:border-brand-red/35 transition-colors duration-300 w-full"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-red-light text-brand-red rounded-xl flex items-center justify-center">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-brand-dark">
                        {srv.title}
                      </h3>
                    </div>

                    <p className="text-sm text-brand-gray leading-relaxed font-sans">
                      {srv.description}
                    </p>

                    <ul className="space-y-3 pt-2">
                      {srv.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-brand-gray font-sans leading-relaxed">
                          <span className="p-0.5 rounded bg-brand-red/10 text-brand-red shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-brand-border/40 mt-6 flex justify-between items-center">
                    <Link href="/contact" className="text-xs font-display font-bold text-brand-red inline-flex items-center gap-1 hover:gap-1.5 transition-all">
                      Consult an Engineer <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* AMC / Maintenance Section */}
      <section className="py-20 bg-brand-light-gray border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <ScrollReveal variant="text-mask-left">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
                Maintenance Contracts
              </h4>
            </ScrollReveal>
            <ScrollReveal variant="text-mask-left" delay={0.1}>
              <h2 className="font-serif font-black text-3xl text-brand-dark leading-tight">
                Annual Maintenance Contracts (AMC) & System Support.
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="slide-right" delay={0.2}>
              <p className="text-sm md:text-base text-brand-gray leading-relaxed font-sans">
                For high-demand factories, warehousing complexes, and municipal street lighting, lighting failures represent high logistics risks and safety hazards. We offer customized Annual Maintenance Contracts (AMC) that guarantee on-site support, prompt replacement components, and continuous safety testing.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="slide-right" delay={0.35}>
              <ul className="space-y-3 font-sans text-sm text-brand-gray">
                <li className="flex items-center gap-3">
                  <span className="p-0.5 rounded bg-brand-red/10 text-brand-red shrink-0"><Check className="w-4 h-4" /></span>
                  Response time SLA under 24 hours for manufacturing centers
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-0.5 rounded bg-brand-red/10 text-brand-red shrink-0"><Check className="w-4 h-4" /></span>
                  Regular thermal inspections of driver boxes using infrared imaging
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-0.5 rounded bg-brand-red/10 text-brand-red shrink-0"><Check className="w-4 h-4" /></span>
                  Preventative replacement of MOVs and external surge protection components
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-0.5 rounded bg-brand-red/10 text-brand-red shrink-0"><Check className="w-4 h-4" /></span>
                  Structured system logs and calibration documentation
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal variant="slide-right" delay={0.45} className="pt-2">
              <Link href="/contact">
                <Button>Inquire About AMC Plans</Button>
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="slide-left" duration={2.2}>
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-brand-border luxury-shadow bg-brand-light-gray">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
                alt="Engineering support team"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
