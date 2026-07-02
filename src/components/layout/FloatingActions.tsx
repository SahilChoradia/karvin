'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Phone, MessageSquare } from 'lucide-react';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/912212345678?text=Hello%20KARVIN%20Power%20Systems%2C%20I%20am%20interested%20in%20your%20lighting%20solutions."
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer group"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </motion.a>

      {/* Call Now Button */}
      <motion.a
        href="tel:+912212345678"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-brand-red hover:bg-brand-red-hover text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer group md:hidden"
        aria-label="Call Now"
      >
        <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </motion.a>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-brand-dark hover:bg-brand-gray text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
