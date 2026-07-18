'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

function PageTransitionInner() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loadingStartRef = useRef<number>(Date.now());

  // Reset loading when pathname or search parameters change
  useEffect(() => {
    const elapsed = Date.now() - loadingStartRef.current;
    const remainingTime = Math.max(0, 3000 - elapsed);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Intercept click events on links
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore external links, downloads, mailto/tel protocols, hash scrolling, and modified clicks (Ctrl/Cmd click)
      if (
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Check if it's the same origin (internal navigation)
        if (targetUrl.origin !== currentUrl.origin) return;

        // Check if it's pointing to the exact same page & search parameters (avoid showing loading on same-page clicks)
        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search
        ) {
          return;
        }

        loadingStartRef.current = Date.now();
        setIsLoading(true);
      } catch (err) {
        console.error('Error parsing transition URL:', err);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Intercept browser back/forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      loadingStartRef.current = Date.now();
      setIsLoading(true);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept programmatic pushes/replacements (e.g. router.push)
  useEffect(() => {
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      const url = args[2];
      if (url) {
        try {
          const targetUrl = new URL(url.toString(), window.location.href);
          const currentUrl = new URL(window.location.href);
          if (
            targetUrl.origin === currentUrl.origin &&
            (targetUrl.pathname !== currentUrl.pathname || targetUrl.search !== currentUrl.search)
          ) {
            loadingStartRef.current = Date.now();
            setIsLoading(true);
          }
        } catch {
          // Ignore
        }
      }
      return originalPushState.apply(this, args);
    };

    window.history.replaceState = function (...args) {
      const url = args[2];
      if (url) {
        try {
          const targetUrl = new URL(url.toString(), window.location.href);
          const currentUrl = new URL(window.location.href);
          if (
            targetUrl.origin === currentUrl.origin &&
            (targetUrl.pathname !== currentUrl.pathname || targetUrl.search !== currentUrl.search)
          ) {
            loadingStartRef.current = Date.now();
            setIsLoading(true);
          }
        } catch {
          // Ignore
        }
      }
      return originalReplaceState.apply(this, args);
    };

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Logo Container with breathing/pulsing animation */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              opacity: 1,
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut',
              },
              opacity: {
                duration: 0.4,
              }
            }}
            className="flex flex-col items-center justify-center p-8"
          >
            <Image
              src="/logo_loader.png"
              alt="KARVIN"
              width={480}
              height={160}
              priority
              className="w-80 md:w-[480px] h-auto object-contain"
              style={{ filter: 'invert(1) hue-rotate(180deg)' }}
            />
            {/* Subtle premium progress line indicator */}
            <div className="w-32 h-[3px] bg-neutral-900 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-brand-red rounded-full w-12"
                animate={{
                  left: ['-30%', '110%']
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut'
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PageTransition() {
  return (
    <Suspense fallback={null}>
      <PageTransitionInner />
    </Suspense>
  );
}
