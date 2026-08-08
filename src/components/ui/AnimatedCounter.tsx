'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
  delay?: number;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  className,
  delay = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);
  const mountTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (isInView) {
      const elapsed = (Date.now() - mountTimeRef.current) / 1000;
      const actualDelay = Math.max(0, delay - elapsed);
      const controls = animate(from, to, {
        duration,
        ease: 'easeOut',
        delay: actualDelay,
        onUpdate: (value) => {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
