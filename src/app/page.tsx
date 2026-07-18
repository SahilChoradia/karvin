'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, Building2, Hotel, ShieldCheck, Cpu, Zap, Settings, 
  CheckCircle2, Award, HeartHandshake, ArrowRight,
  Compass, Building
} from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { PRODUCTS, INDUSTRIES } from '@/lib/data';
import { POWER_PRODUCTS } from '@/lib/powerData';

// Industries served data mapper
const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Factory': Factory,
  'Building': Building2,
  'Hotel': Hotel,
  'Compass': Compass,
};

interface CompatProduct {
  id: string;
  name: string;
  category: string;
  parentCategory: string;
  description: string;
  image: string;
  specifications: Record<string, string | undefined>;
}

export default function Home() {
  const heroImages = [
    '/images/illuminate-world.png',
    '/images/every-light-angle.jpg',
    '/images/hero-slide-3.jpg',
    '/images/hero-slide-4.jpg'
  ];

  const [heroImageIdx, setHeroImageIdx] = useState(0);
  const [randomPowerProducts, setRandomPowerProducts] = useState<CompatProduct[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 7000); // 7 seconds per slide
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    // Pick 3 random power products on mount
    const shuffled = [...POWER_PRODUCTS].sort(() => 0.5 - Math.random());
    setRandomPowerProducts(shuffled.slice(0, 3) as unknown as CompatProduct[]);
  }, []);

  const displayedProducts = [
    ...(PRODUCTS.slice(0, 6) as unknown as CompatProduct[]),
    ...randomPowerProducts
  ];

  // Why Choose Karvin Details
  const pillars = [
    {
      title: 'In-House Driver Engineering',
      desc: 'Our dedicated driver division custom builds SMPS power supplies designed specifically to withstand Indian grid fluctuations up to 320V.',
      icon: Cpu
    },
    {
      title: 'ISO & Quality Benchmarks',
      desc: 'An ISO certified company employing continuous R&D, advanced thermal chambers, and photometrics verification for 100% defect-free dispatches.',
      icon: ShieldCheck
    },
    {
      title: 'Turnkey Lighting Projects',
      desc: 'From Dialux 3D layout simulations to mechanical installations and AMC support, we handle large project sites end-to-end.',
      icon: Settings
    },
    {
      title: 'Energy Efficient Solutions',
      desc: 'Deploying high efficacy LEDs (up to 160 lm/W) that shorten capital ROI payback cycles to 12-18 months.',
      icon: Zap
    },
    {
      title: 'Bespoke Customization',
      desc: 'Working directly with architects to construct non-standard linear layouts, geometric poles, and unique decorative profiles.',
      icon: Factory
    },
    {
      title: 'Exceptional After-Sales Support',
      desc: 'Our commitment extends beyond delivery. We offer on-site commissioning, training, and custom annual maintenance contracts.',
      icon: HeartHandshake
    }
  ];


  return (
    <div className="relative w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[95vh] flex items-center justify-center bg-brand-dark overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-brand-dark">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={heroImageIdx}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: 0.75, 
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
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-8 flex flex-col items-center">


          <ScrollReveal variant="text-mask" duration={2.4} delay={0.1}>
            <h1 className="font-serif font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight max-w-4xl">
              Illuminating India&apos;s <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-brand-red">
                Excellence
              </span>
            </h1>
          </ScrollReveal>



          <ScrollReveal variant="fade-up" duration={2.2} delay={0.45}>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Request Engineering Quote
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-display font-semibold tracking-widest text-white/40 uppercase">
            Scroll To Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-6 bg-white/40 rounded-full"
          />
        </div>
      </section>

      {/* 2. Company Numbers Section */}
      <section className="bg-brand-dark border-t border-white/5 py-16 text-white">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          <ScrollReveal variant="fade-up" delay={0.05} threshold={0.05} className="space-y-2">
            <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-brand-red">
              <AnimatedCounter to={20} suffix="+" />
            </h3>
            <p className="text-xs md:text-sm text-white/60 uppercase tracking-wider font-semibold">
              Years Experience
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.1} threshold={0.05} className="space-y-2">
            <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-brand-red">
              <AnimatedCounter to={500} suffix="+" />
            </h3>
            <p className="text-xs md:text-sm text-white/60 uppercase tracking-wider font-semibold">
              Projects Completed
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.15} threshold={0.05} className="space-y-2">
            <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-brand-red">
              <AnimatedCounter to={100} suffix="+" />
            </h3>
            <p className="text-xs md:text-sm text-white/60 uppercase tracking-wider font-semibold">
              Corporate Clients
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.2} threshold={0.05} className="space-y-2">
            <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-brand-red">
              <AnimatedCounter to={50} suffix="+" />
            </h3>
            <p className="text-xs md:text-sm text-white/60 uppercase tracking-wider font-semibold">
              Project Sites
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.25} threshold={0.05} className="space-y-2 col-span-2 md:col-span-1">
            <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-brand-red">
              <AnimatedCounter to={100} suffix="%" />
            </h3>
            <p className="text-xs md:text-sm text-white/60 uppercase tracking-wider font-semibold">
              Client Satisfaction
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Company Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Block */}
          <ScrollReveal variant="slide-right" duration={2.2}>
            <div className="relative h-[480px] rounded-2xl overflow-hidden border border-brand-border luxury-shadow bg-brand-light-gray">
              <Image
                src="/images/illuminate-world.png"
                alt="KARVIN Premium Outdoor Solutions"
                fill
                className="object-cover"
                priority
              />
              {/* Tag overlay */}
              <div className="absolute bottom-6 left-6 bg-white py-3 px-5 rounded-xl border border-brand-border luxury-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-red-light rounded-lg">
                    <Award className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-dark">Benchmarked Tech</h4>
                    <p className="text-xs text-brand-gray">R&D and quality-focused assembly</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text Block */}
          <div className="space-y-6">
            <ScrollReveal variant="text-mask-right">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
                Corporate Overview
              </h4>
            </ScrollReveal>

            <ScrollReveal variant="text-mask-right" delay={0.1}>
              <h2 className="font-serif font-black text-3xl md:text-4xl text-brand-dark leading-tight">
                Benchmarking Indigenous Technology for Quality LED Lighting.
              </h2>
            </ScrollReveal>



            <ScrollReveal variant="slide-left" delay={0.4} className="grid grid-cols-2 gap-6 pt-4 border-t border-brand-border">
              <div className="space-y-2">
                <h4 className="font-display font-bold text-brand-dark text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-red" /> Mission
                </h4>
                <p className="text-xs text-brand-gray leading-relaxed">
                  Deliver energy-saving systems that enhance security, output lux levels, and operational productivity.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-brand-dark text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-red" /> Vision
                </h4>
                <p className="text-xs text-brand-gray leading-relaxed">
                  Pioneer advanced, smart-grid integrated lighting designs that make every Watt matter.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-left" delay={0.5} className="pt-4">
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

      {/* 4. Why Choose KARVIN Section */}
      <section className="py-24 bg-brand-light-gray border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <ScrollReveal variant="text-mask-left">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
                Engineering Value
              </h4>
            </ScrollReveal>
            <ScrollReveal variant="text-mask-left" delay={0.1}>
              <h2 className="font-serif font-black text-3xl md:text-5xl text-brand-dark leading-tight">
                A Value-Driven Partner for High-End Projects.
              </h2>
            </ScrollReveal>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((p, idx) => (
              <ScrollReveal 
                key={idx} 
                variant={idx % 3 === 0 ? 'slide-right' : idx % 3 === 2 ? 'slide-left' : 'fade-up'} 
                delay={idx * 0.08}
                className="flex"
              >
                <div 
                  className="bg-white p-8 rounded-2xl border border-brand-border luxury-shadow flex flex-col justify-between group hover:border-brand-red/45 transition-colors duration-300 w-full"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                      <p.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-brand-dark">
                      {p.title}
                    </h3>

                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Industries We Serve */}
      <section className="py-24 bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
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
            <ScrollReveal variant="slide-left" delay={0.2}>
              <Link href="/industries">
                <Button variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                  View All Industries
                </Button>
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES.map((ind, idx) => {
              const IconComp = industryIcons[ind.iconName] || Building;
              return (
                <ScrollReveal 
                  key={ind.id} 
                  variant={idx % 4 < 2 ? 'slide-right' : 'slide-left'} 
                  delay={idx * 0.08}
                  className="flex"
                >
                  <div 
                    className="group relative h-[380px] rounded-tl-[32px] rounded-br-[32px] rounded-tr-md rounded-bl-md overflow-hidden border border-brand-border luxury-shadow flex flex-col justify-end p-6 w-full"
                  >
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={ind.image}
                        alt={ind.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/45 to-transparent" />
                    </div>
                    <div className="relative z-10 space-y-3 text-white">
                      <div className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/10">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-lg">
                        {ind.name}
                      </h3>

                      <Link href={`/industries#${ind.slug}`} className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-brand-red hover:text-white transition-colors pt-2">
                        View Challenges & Solutions <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Product Categories */}
      <section className="py-24 bg-brand-light-gray border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
              <ScrollReveal variant="text-mask-left">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
                  Product Portfolio
                </h4>
              </ScrollReveal>
              <ScrollReveal variant="text-mask-left" delay={0.1}>
                <h2 className="font-serif font-black text-3xl md:text-5xl text-brand-dark leading-tight">
                  Designed for Performance.
                </h2>
              </ScrollReveal>
            </div>
            <ScrollReveal variant="slide-left" delay={0.2}>
              <Link href="/products">
                <Button variant="primary">Explore Full Catalog</Button>
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((prod, idx) => (
              <ScrollReveal 
                key={prod.id} 
                variant={idx % 3 === 0 ? 'slide-right' : idx % 3 === 2 ? 'slide-left' : 'fade-up'} 
                delay={idx * 0.06}
                className="flex"
              >
                <div 
                  className="bg-white rounded-tr-[32px] rounded-bl-[32px] rounded-tl-md rounded-br-md overflow-hidden border border-brand-border luxury-shadow flex flex-col justify-between group hover:border-brand-red/35 transition-colors duration-300 w-full"
                >
                  <div>
                    <div className="relative h-[240px] w-full overflow-hidden bg-brand-light-gray">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-brand-dark text-white text-[10px] font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {prod.category}
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="font-display font-bold text-lg text-brand-dark group-hover:text-brand-red transition-colors">
                        {prod.name}
                      </h3>
                      {prod.description && (
                        <p className="text-xs text-brand-gray leading-relaxed line-clamp-2">
                          {prod.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-brand-border/40">
                    <span className="text-xs font-display font-bold text-brand-gray">
                      {prod.specifications['Efficiency'] || prod.specifications['Efficiency (AC Mode)'] || prod.specifications['Luminous Efficacy'] || 'High Efficacy'}
                    </span>
                    <Link href={`/contact?product=${encodeURIComponent(prod.name)}`} className="inline-flex items-center gap-1 text-xs font-display font-bold text-brand-red group-hover:gap-1.5 transition-all">
                      Inquire Product <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
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
