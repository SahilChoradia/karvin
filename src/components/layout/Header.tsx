'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronDown, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { PRODUCTS, INDUSTRIES } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'industries' | null>(null);

  // Monitor scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen, searchOpen]);

  // Handle path changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setActiveMegaMenu(null);
    setSearchQuery('');
  }, [pathname]);

  const searchResults = searchQuery
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-40 transition-all duration-300',
          isScrolled || activeMegaMenu || pathname !== '/'
            ? 'bg-white border-b border-brand-border/60 luxury-shadow py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center focus:outline-none">
            <Image
              src="/logo.png"
              alt="KARVIN"
              width={109}
              height={36}
              priority
              className={cn(
                "h-9 w-auto object-contain transition-all duration-300",
                !(isScrolled || activeMegaMenu || pathname !== '/') && "brightness-0 invert"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={cn(
                'font-sans font-semibold text-sm transition-colors hover:text-brand-red py-2',
                pathname === '/'
                  ? 'text-brand-red'
                  : isScrolled || activeMegaMenu || pathname !== '/'
                  ? 'text-brand-dark'
                  : 'text-white'
              )}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={cn(
                'font-sans font-semibold text-sm transition-colors hover:text-brand-red py-2',
                pathname === '/about'
                  ? 'text-brand-red'
                  : isScrolled || activeMegaMenu || pathname !== '/'
                  ? 'text-brand-dark'
                  : 'text-white'
              )}
            >
              About Us
            </Link>

            {/* Products Mega Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('products')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                className={cn(
                  'font-sans font-semibold text-sm transition-colors hover:text-brand-red flex items-center gap-1 py-2 cursor-pointer',
                  pathname.startsWith('/products')
                    ? 'text-brand-red'
                    : isScrolled || activeMegaMenu || pathname !== '/'
                    ? 'text-brand-dark'
                    : 'text-white'
                )}
              >
                Products <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Industries Mega Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('industries')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                className={cn(
                  'font-sans font-semibold text-sm transition-colors hover:text-brand-red flex items-center gap-1 py-2 cursor-pointer',
                  pathname.startsWith('/industries')
                    ? 'text-brand-red'
                    : isScrolled || activeMegaMenu || pathname !== '/'
                    ? 'text-brand-dark'
                    : 'text-white'
                )}
              >
                Industries <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/services"
              className={cn(
                'font-sans font-semibold text-sm transition-colors hover:text-brand-red py-2',
                pathname === '/services'
                  ? 'text-brand-red'
                  : isScrolled || activeMegaMenu || pathname !== '/'
                  ? 'text-brand-dark'
                  : 'text-white'
              )}
            >
              Services
            </Link>

            <Link
              href="/projects"
              className={cn(
                'font-sans font-semibold text-sm transition-colors hover:text-brand-red py-2',
                pathname === '/projects'
                  ? 'text-brand-red'
                  : isScrolled || activeMegaMenu || pathname !== '/'
                  ? 'text-brand-dark'
                  : 'text-white'
              )}
            >
              Projects
            </Link>

            <Link
              href="/blog"
              className={cn(
                'font-sans font-semibold text-sm transition-colors hover:text-brand-red py-2',
                pathname === '/blog'
                  ? 'text-brand-red'
                  : isScrolled || activeMegaMenu || pathname !== '/'
                  ? 'text-brand-dark'
                  : 'text-white'
              )}
            >
              Knowledge Hub
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                'p-2 rounded-full hover:bg-brand-light-gray transition-colors cursor-pointer',
                isScrolled || activeMegaMenu || pathname !== '/' ? 'text-brand-dark' : 'text-white hover:text-brand-dark'
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/contact">
              <Button
                variant={isScrolled || activeMegaMenu || pathname !== '/' ? 'primary' : 'outline'}
                className={cn(
                  'text-xs py-2.5 px-5',
                  !(isScrolled || activeMegaMenu || pathname !== '/') && 'border-white text-white hover:bg-white hover:text-brand-dark'
                )}
              >
                Request Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                'p-2 rounded-full transition-colors cursor-pointer',
                isScrolled || pathname !== '/' ? 'text-brand-dark' : 'text-white'
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                'p-2 rounded-full transition-colors cursor-pointer',
                isScrolled || pathname !== '/' ? 'text-brand-dark' : 'text-white'
              )}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdowns */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 w-full bg-white border-t border-brand-border/60 luxury-shadow hidden lg:block"
              style={{ top: '100%' }}
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-4 gap-8">
                {activeMegaMenu === 'products' ? (
                  <>
                    <div className="col-span-3 grid grid-cols-3 gap-x-8 gap-y-3 py-2">
                      {Array.from(new Set(PRODUCTS.map((p) => p.category)))
                        .filter(Boolean)
                        .map((cat) => {
                          const count = PRODUCTS.filter((p) => p.category === cat).length;
                          return (
                            <Link
                              key={cat}
                              href={`/products?category=${encodeURIComponent(cat)}`}
                              className="group flex items-center justify-between text-brand-dark hover:text-brand-red text-sm font-medium transition-colors py-1"
                            >
                              <span>{cat}</span>
                              <span className="text-[10px] bg-brand-light-gray text-brand-gray px-2 py-0.5 rounded-full group-hover:bg-brand-red-light group-hover:text-brand-red transition-colors font-normal font-sans ml-2">
                                {count}
                              </span>
                            </Link>
                          );
                        })}
                    </div>
                    <div className="bg-brand-light-gray p-6 rounded-xl flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-bold text-base text-brand-dark mb-2">
                          Engineering Excellence
                        </h4>
                        <p className="text-xs text-brand-gray leading-relaxed mb-4">
                          We develop in-house driver configurations to survive voltage fluctuations up to 320V.
                        </p>
                      </div>
                      <Link href="/contact" className="text-xs font-sans font-bold text-brand-red inline-flex items-center gap-1 hover:gap-2 transition-all">
                        Consult Our Engineers <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-3 grid grid-cols-2 gap-6">
                      {INDUSTRIES.map((ind) => (
                        <Link
                          key={ind.id}
                          href={`/industries#${ind.slug}`}
                          className="group p-4 hover:bg-brand-light-gray rounded-xl transition-all block"
                        >
                          <h4 className="font-sans font-bold text-sm text-brand-dark group-hover:text-brand-red transition-colors mb-1">
                            {ind.name}
                          </h4>
                          <p className="text-xs text-brand-gray leading-relaxed line-clamp-2">
                            {ind.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                    <div className="bg-brand-light-gray p-6 rounded-xl flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-bold text-base text-brand-dark mb-2">
                          ISO 9001 Certified
                        </h4>
                        <p className="text-xs text-brand-gray leading-relaxed mb-4">
                          Adhering to strict testing parameters to verify performance across infrastructure layouts.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Dialog */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-dark/95 flex items-start justify-center pt-24 px-4 md:px-8"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              exit={{ y: -30 }}
              className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center border-b border-brand-border p-4 gap-3">
                <Search className="w-5 h-5 text-brand-gray" />
                <input
                  type="text"
                  placeholder="Search products by name, type, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-brand-dark font-sans text-lg focus:outline-none placeholder:text-gray-400"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-full hover:bg-brand-light-gray text-brand-gray cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {searchQuery && (
                <div className="p-4 max-h-[350px] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs font-sans font-bold uppercase tracking-wider text-brand-gray mb-2">
                        Product Matches ({searchResults.length})
                      </p>
                      {searchResults.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.slug}`}
                          className="flex items-center gap-4 p-2 hover:bg-brand-light-gray rounded-lg transition-colors group"
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                          />
                          <div className="flex-1">
                            <h5 className="font-sans font-semibold text-sm text-brand-dark group-hover:text-brand-red transition-colors">
                              {prod.name}
                            </h5>
                            <p className="text-xs text-brand-gray">
                              {prod.category} {prod.subCategory ? `• ${prod.subCategory}` : ''}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-brand-gray opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-brand-gray py-6 text-center">
                      No products found matching &quot;{searchQuery}&quot;
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <Image
                      src="/logo.png"
                      alt="KARVIN"
                      width={97}
                      height={32}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-brand-light-gray cursor-pointer"
                  >
                    <X className="w-6 h-6 text-brand-dark" />
                  </button>
                </div>

                <nav className="flex flex-col gap-4">
                  <Link href="/" className="font-sans font-semibold text-lg text-brand-dark hover:text-brand-red border-b border-brand-border/40 py-2">
                    Home
                  </Link>
                  <Link href="/about" className="font-sans font-semibold text-lg text-brand-dark hover:text-brand-red border-b border-brand-border/40 py-2">
                    About Us
                  </Link>
                  <Link href="/products" className="font-sans font-semibold text-lg text-brand-dark hover:text-brand-red border-b border-brand-border/40 py-2">
                    All Products
                  </Link>
                  <Link href="/industries" className="font-sans font-semibold text-lg text-brand-dark hover:text-brand-red border-b border-brand-border/40 py-2">
                    Industries Served
                  </Link>
                  <Link href="/services" className="font-sans font-semibold text-lg text-brand-dark hover:text-brand-red border-b border-brand-border/40 py-2">
                    Services
                  </Link>
                  <Link href="/projects" className="font-sans font-semibold text-lg text-brand-dark hover:text-brand-red border-b border-brand-border/40 py-2">
                    Projects Portfolio
                  </Link>
                  <Link href="/blog" className="font-sans font-semibold text-lg text-brand-dark hover:text-brand-red border-b border-brand-border/40 py-2">
                    Knowledge Hub
                  </Link>
                </nav>
              </div>

              <div className="space-y-4">
                <a href="mailto:info@karvinpower.com" className="flex items-center gap-3 text-sm text-brand-gray">
                  <Mail className="w-4 h-4 text-brand-red" /> info@karvinpower.com
                </a>
                <a href="tel:+912212345678" className="flex items-center gap-3 text-sm text-brand-gray pb-4">
                  <Phone className="w-4 h-4 text-brand-red" /> +91 22 1234 5678
                </a>
                <Link href="/contact" className="block">
                  <Button className="w-full">Request Quote</Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
