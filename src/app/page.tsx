'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, Building2, Hotel, 
  CheckCircle2, ArrowRight,
  Compass, Building
} from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { INDUSTRIES } from '@/lib/data';

// Industries served data mapper
const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Factory': Factory,
  'Building': Building2,
  'Hotel': Hotel,
  'Compass': Compass,
};

export default function Home() {
  const heroImages = [
    '/images/ss1.jpg',
    '/images/ss3.jpg'
  ];

  const heroImagesMobile = [
    '/images/ss1-mobile.jpg',
    '/images/ss3-mobile.jpg'
  ];

  const [heroImageIdx, setHeroImageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 7000); // 7 seconds per slide
    return () => clearInterval(timer);
  }, [heroImages.length]);


  return (
    <div className="relative w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-between bg-brand-dark overflow-hidden pt-32 pb-0">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-brand-dark">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={heroImageIdx}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: 0.9, 
                scale: 1.08,
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 2, ease: 'easeInOut' },
                scale: { duration: 8, ease: 'linear' }
              }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[heroImageIdx]}
                alt="Premium Lighting Infrastructure"
                fill
                sizes="100vw"
                className="hidden md:block object-cover"
                priority
              />
              <Image
                src={heroImagesMobile[heroImageIdx]}
                alt="Premium Lighting Infrastructure on Mobile"
                fill
                sizes="100vw"
                className="block md:hidden object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-8 flex-1 flex flex-col items-center justify-center">
          <ScrollReveal variant="text-mask" duration={2.4} delay={0.1}>
            <h1 className="font-serif font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight max-w-4xl">
              Redefining Energy with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-brand-red">
                Lighting and Power Products
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" duration={2.2} delay={0.45}>
            <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4 font-sans text-[10px] sm:text-xs md:text-sm font-bold tracking-widest text-white/80 uppercase">
              <Link 
                href="/products?category=Power+Products" 
                className="hover:text-brand-red transition-colors duration-300 relative group cursor-pointer py-1"
              >
                UPS & STABILIZERS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full" />
              </Link>
              <span className="text-white/30 text-[10px] md:text-lg select-none">|</span>
              <Link 
                href="/products?category=Lighting" 
                className="hover:text-brand-red transition-colors duration-300 relative group cursor-pointer py-1"
              >
                LED DRIVERS & LIGHTINGS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-2 pt-10">
            <span className="text-[10px] font-display font-semibold tracking-widest text-white/40 uppercase">
              Scroll To Explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-6 bg-white/40 rounded-full"
            />
          </div>
        </div>

        {/* 2. Company Numbers Section (Moved inside Hero Section at bottom) */}
        <div className="relative z-10 w-full py-12 text-white mt-12">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <ScrollReveal variant="fade-up" delay={0.05} threshold={0.05} className="space-y-2">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-white">
                <AnimatedCounter to={20} suffix="+" delay={3.2} />
              </h3>
              <p className="text-xs md:text-sm text-white/60 uppercase tracking-wider font-semibold">
                Years Experience
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.1} threshold={0.05} className="space-y-2">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-white">
                <AnimatedCounter to={500} suffix="+" delay={3.2} />
              </h3>
              <p className="text-xs md:text-sm text-white/60 uppercase tracking-wider font-semibold">
                Projects Completed
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.15} threshold={0.05} className="space-y-2">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-white">
                <AnimatedCounter to={100} suffix="+" delay={3.2} />
              </h3>
              <p className="text-xs md:text-sm text-white/60 uppercase tracking-wider font-semibold">
                Corporate Clients
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.2} threshold={0.05} className="space-y-2">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-white">
                <AnimatedCounter to={50} suffix="+" delay={3.2} />
              </h3>
              <p className="text-xs md:text-sm text-white/60 uppercase tracking-wider font-semibold">
                Project Sites
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.25} threshold={0.05} className="space-y-2 col-span-2 md:col-span-1">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-white">
                <AnimatedCounter to={100} suffix="%" delay={3.2} />
              </h3>
              <p className="text-xs md:text-sm text-white/60 uppercase tracking-wider font-semibold">
                Client Satisfaction
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Company Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-8">
          {/* Text Block */}
          <div className="space-y-6">
            <ScrollReveal variant="text-mask-left">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
                Corporate Overview
              </h4>
            </ScrollReveal>

            <ScrollReveal variant="text-mask-left" delay={0.1}>
              <h2 className="font-serif font-black text-3xl md:text-5xl text-brand-dark leading-tight">
                Benchmarking Indigenous Technology.
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="slide-right" delay={0.3} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-brand-border">
              <div className="space-y-3">
                <h4 className="font-display font-bold text-brand-dark text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red" /> Mission
                </h4>
                <p className="text-sm text-brand-gray leading-relaxed">
                  Deliver energy-saving systems that enhance security, output lux levels, and operational productivity.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-display font-bold text-brand-dark text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red" /> Vision
                </h4>
                <p className="text-sm text-brand-gray leading-relaxed">
                  Pioneer advanced, smart-grid integrated lighting designs that make every Watt matter.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-right" delay={0.4} className="pt-4">
              <Link href="/about">
                <Button variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                  Learn More About Us
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 8. Trust Workflow Timeline */}
      <section className="py-24 bg-brand-light-gray border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <ScrollReveal variant="text-mask-left">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
                Our Process
              </h4>
            </ScrollReveal>
            <ScrollReveal variant="text-mask-left" delay={0.1}>
              <h2 className="font-serif font-black text-3xl md:text-5xl text-brand-dark leading-tight">
                Why Corporate Clients Trust Us.
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="slide-right" delay={0.2}>
              <p className="text-base text-brand-gray">
                We guide each project through five engineering stages to guarantee full technical accountability.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-brand-border z-0" />
            
            <ScrollReveal variant="slide-right" delay={0.05} className="space-y-4 text-center md:text-left relative z-10">
              <div className="w-14 h-14 bg-brand-red text-white font-display font-black text-lg rounded-full flex items-center justify-center mx-auto md:mx-0 shadow-md">
                01
              </div>
              <h4 className="font-display font-bold text-base text-brand-dark">Engineering</h4>
            </ScrollReveal>

            <ScrollReveal variant="slide-right" delay={0.15} className="space-y-4 text-center md:text-left relative z-10">
              <div className="w-14 h-14 bg-brand-red text-white font-display font-black text-lg rounded-full flex items-center justify-center mx-auto md:mx-0 shadow-md">
                02
              </div>
              <h4 className="font-display font-bold text-base text-brand-dark">Design</h4>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.25} className="space-y-4 text-center md:text-left relative z-10">
              <div className="w-14 h-14 bg-brand-red text-white font-display font-black text-lg rounded-full flex items-center justify-center mx-auto md:mx-0 shadow-md">
                03
              </div>
              <h4 className="font-display font-bold text-base text-brand-dark">Manufacturing</h4>
            </ScrollReveal>

            <ScrollReveal variant="slide-left" delay={0.35} className="space-y-4 text-center md:text-left relative z-10">
              <div className="w-14 h-14 bg-brand-red text-white font-display font-black text-lg rounded-full flex items-center justify-center mx-auto md:mx-0 shadow-md">
                04
              </div>
              <h4 className="font-display font-bold text-base text-brand-dark">Installation</h4>
            </ScrollReveal>

            <ScrollReveal variant="slide-left" delay={0.45} className="space-y-4 text-center md:text-left relative z-10">
              <div className="w-14 h-14 bg-brand-red text-white font-display font-black text-lg rounded-full flex items-center justify-center mx-auto md:mx-0 shadow-md">
                05
              </div>
              <h4 className="font-display font-bold text-base text-brand-dark">Support</h4>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Industries We Serve */}
      <section className="py-24 bg-white border-t border-brand-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-border/40 pb-8">
            <div className="space-y-3">
              <ScrollReveal variant="text-mask-left">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
                  Application Expertise
                </h4>
              </ScrollReveal>
              <ScrollReveal variant="text-mask-left" delay={0.1}>
                <h2 className="font-serif font-black text-3xl md:text-5xl text-brand-dark leading-tight">
                  Solutions Tailored Sector Wise.
                </h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory no-scrollbar scroll-smooth">
            {INDUSTRIES.map((ind, idx) => {
              const IconComp = industryIcons[ind.iconName] || Building;
              return (
                <ScrollReveal 
                  key={ind.id} 
                  variant={idx % 4 < 2 ? 'slide-right' : 'slide-left'} 
                  delay={idx * 0.08}
                  className="flex shrink-0 w-[85vw] sm:w-[320px] md:w-auto snap-center md:snap-none"
                >
                  <div 
                    className="group relative h-[380px] rounded-none overflow-hidden border border-brand-border luxury-shadow flex flex-col justify-end p-6 w-full cursor-default transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-brand-red/30"
                  >
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={ind.image}
                        alt={ind.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent transition-all duration-300 group-hover:from-brand-dark group-hover:via-brand-dark/85" />
                    </div>
                    <div className="relative z-10 space-y-3 text-white transition-transform duration-300">
                      <div className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/10 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-lg leading-snug">
                        {ind.name}
                      </h3>

                      {/* Products List revealed on hover */}
                      <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-[140px] group-hover:opacity-100 transition-all duration-500 ease-out space-y-2">
                        <div className="w-8 h-[2px] bg-brand-red rounded mt-2" />
                        <p className="text-[10px] uppercase tracking-widest text-brand-red font-extrabold">
                          Recommended Products
                        </p>
                        <ul className="space-y-1 text-xs text-brand-light-gray/90 font-display">
                          {ind.recommendedProducts.map((prod, pIdx) => (
                            <li key={pIdx} className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-brand-red shrink-0" />
                              <span className="truncate">{prod}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>



      {/* 10. Let's Build Better Lighting Together (CTA) */}
      <section className="bg-brand-dark text-white py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1500"
            alt="Corporate CTA BG"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <ScrollReveal variant="text-mask">
            <h2 className="font-serif font-extrabold text-3xl md:text-5xl">
              Let&apos;s Build Better Lighting Together.
            </h2>
          </ScrollReveal>
          


          <ScrollReveal variant="fade-up" delay={0.3}>
            <div className="pt-4 flex items-center justify-center gap-4 flex-col sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Request a Technical Quote</Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-dark">
                  Explore Engineering Services
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
