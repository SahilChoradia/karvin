'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up' | 'text-mask' | 'text-mask-left' | 'text-mask-right';
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  duration = 2.2,
  delay = 0,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: threshold });

  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'slide-left': {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    'slide-right': {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    'scale-up': {
      hidden: { opacity: 0, scale: 0.96 },
      visible: { opacity: 1, scale: 1 },
    },
    'text-mask': {
      hidden: { y: '105%' },
      visible: { y: 0 },
    },
    'text-mask-left': {
      hidden: { y: '105%' },
      visible: { y: 0 },
    },
    'text-mask-right': {
      hidden: { y: '105%' },
      visible: { y: 0 },
    },
  };

  const transition = {
    duration,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom cubic-bezier easing (similar to GSAP power4.out)
  };

  if (variant.startsWith('text-mask')) {
    return (
      <div ref={ref} className={`overflow-hidden block ${className}`}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants[variant]}
          transition={transition}
          className="inline-block w-full"
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
