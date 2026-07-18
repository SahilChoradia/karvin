'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronDown, Phone, Mail, ArrowRight, FileText, Settings, Building, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { PRODUCTS, INDUSTRIES, SERVICES, BLOG_POSTS } from '@/lib/data';
import { POWER_PRODUCTS } from '@/lib/powerData';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'industries' | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

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
    setMobileProductsOpen(false);
    setMobileIndustriesOpen(false);
  }, [pathname]);

  // Reset dropdowns when mobile menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileProductsOpen(false);
      setMobileIndustriesOpen(false);
    }
  }, [mobileMenuOpen]);

  // Search state & filter logic for the entire website
  const getSearchResults = () => {
    if (!searchQuery) return { products: [], services: [], industries: [], blogs: [] };
    const query = searchQuery.toLowerCase();

    const matchedProducts = [
      ...PRODUCTS.map(p => ({ ...p, parentCategory: 'Lighting' })),
      ...POWER_PRODUCTS
    ].filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query))
    ).slice(0, 4);

    const matchedServices = SERVICES.filter(s =>
      s.title.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query)
    ).slice(0, 3);

    const matchedIndustries = INDUSTRIES.filter(i =>
      i.name.toLowerCase().includes(query) ||
      i.description.toLowerCase().includes(query)
    ).slice(0, 3);

    const matchedBlogs = BLOG_POSTS.filter(b =>
      b.title.toLowerCase().includes(query) ||
      b.excerpt.toLowerCase().includes(query)
    ).slice(0, 3);

    return {
      products: matchedProducts,
      services: matchedServices,
      industries: matchedIndustries,
      blogs: matchedBlogs
    };
  };

  const results = getSearchResults();
  const hasResults = results.products.length > 0 || results.services.length > 0 || results.industries.length > 0 || results.blogs.length > 0;

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
              <div className="max-w-7xl mx-auto px-8 py-10">
                {activeMegaMenu === 'products' ? (
                  <div className="max-w-2xl mx-auto grid grid-cols-2 gap-12">
                    <div className="flex flex-col gap-4 py-2 justify-center">
                      <Link
                        href="/products?category=Power+Products"
                        className="group flex items-center justify-between text-brand-dark hover:text-brand-red text-sm font-bold transition-colors py-1 border-b border-brand-border/40 pb-2"
                      >
                        <span>Power Products</span>
                        <ArrowRight className="w-4 h-4 text-brand-gray group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
                      </Link>
                      <Link
                        href="/products?category=Lighting"
                        className="group flex items-center justify-between text-brand-dark hover:text-brand-red text-sm font-bold transition-colors py-1 border-b border-brand-border/40 pb-2"
                      >
                        <span>Lighting</span>
                        <ArrowRight className="w-4 h-4 text-brand-gray group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
                      </Link>
                    </div>
                    <div className="bg-brand-light-gray p-6 rounded-xl flex flex-col justify-between border border-brand-border/40 luxury-shadow">
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
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-8">
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
                  </div>
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
                  placeholder="Search products, industries, services, blogs..."
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
                <div className="p-6 max-h-[500px] overflow-y-auto space-y-6">
                  {hasResults ? (
                    <>
                      {/* Products Section */}
                      {results.products.length > 0 && (
                        <div className="space-y-2">
                          <h6 className="text-xs font-sans font-bold uppercase tracking-wider text-brand-red flex items-center gap-1.5 pb-1.5 border-b border-brand-border/40">
                            <ShoppingBag className="w-3.5 h-3.5" /> Products ({results.products.length})
                          </h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {results.products.map((prod) => (
                              <Link
                                key={prod.id}
                                href={`/products?category=${encodeURIComponent(prod.parentCategory)}&q=${encodeURIComponent(prod.name)}`}
                                className="flex items-center gap-3 p-2 hover:bg-brand-light-gray rounded-lg transition-colors group"
                                onClick={() => setSearchOpen(false)}
                              >
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="w-10 h-10 object-cover rounded-md bg-gray-100"
                                />
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-sans font-semibold text-sm text-brand-dark group-hover:text-brand-red transition-colors truncate">
                                    {prod.name}
                                  </h5>
                                  <p className="text-[10px] text-brand-gray truncate">
                                    {prod.parentCategory} • {prod.category}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Industries Section */}
                      {results.industries.length > 0 && (
                        <div className="space-y-2">
                          <h6 className="text-xs font-sans font-bold uppercase tracking-wider text-brand-red flex items-center gap-1.5 pb-1.5 border-b border-brand-border/40">
                            <Building className="w-3.5 h-3.5" /> Industries ({results.industries.length})
                          </h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {results.industries.map((ind) => (
                              <Link
                                key={ind.id}
                                href={`/industries#${ind.slug}`}
                                className="flex flex-col p-2.5 hover:bg-brand-light-gray rounded-lg transition-colors group"
                                onClick={() => setSearchOpen(false)}
                              >
                                <h5 className="font-sans font-semibold text-sm text-brand-dark group-hover:text-brand-red transition-colors">
                                  {ind.name}
                                </h5>
                                <p className="text-[11px] text-brand-gray line-clamp-1">
                                  {ind.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Services Section */}
                      {results.services.length > 0 && (
                        <div className="space-y-2">
                          <h6 className="text-xs font-sans font-bold uppercase tracking-wider text-brand-red flex items-center gap-1.5 pb-1.5 border-b border-brand-border/40">
                            <Settings className="w-3.5 h-3.5" /> Services ({results.services.length})
                          </h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {results.services.map((srv) => (
                              <Link
                                key={srv.id}
                                href={`/services#${srv.id}`}
                                className="flex flex-col p-2.5 hover:bg-brand-light-gray rounded-lg transition-colors group"
                                onClick={() => setSearchOpen(false)}
                              >
                                <h5 className="font-sans font-semibold text-sm text-brand-dark group-hover:text-brand-red transition-colors">
                                  {srv.title}
                                </h5>
                                <p className="text-[11px] text-brand-gray line-clamp-1">
                                  {srv.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Blog Posts Section */}
                      {results.blogs.length > 0 && (
                        <div className="space-y-2">
                          <h6 className="text-xs font-sans font-bold uppercase tracking-wider text-brand-red flex items-center gap-1.5 pb-1.5 border-b border-brand-border/40">
                            <FileText className="w-3.5 h-3.5" /> Knowledge Hub ({results.blogs.length})
                          </h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {results.blogs.map((post) => (
                              <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="flex flex-col p-2.5 hover:bg-brand-light-gray rounded-lg transition-colors group"
                                onClick={() => setSearchOpen(false)}
                              >
                                <h5 className="font-sans font-semibold text-sm text-brand-dark group-hover:text-brand-red transition-colors line-clamp-1">
                                  {post.title}
                                </h5>
                                <p className="text-[11px] text-brand-gray line-clamp-1">
                                  {post.excerpt}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-brand-gray py-8 text-center">
                      No results found matching &quot;{searchQuery}&quot; across the website
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
                  {/* Products Dropdown */}
                  <div>
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="w-full flex items-center justify-between font-sans font-semibold text-lg text-brand-dark hover:text-brand-red border-b border-brand-border/40 py-2 text-left focus:outline-none"
                    >
                      <span>Products</span>
                      <ChevronDown className={cn("w-5 h-5 transition-transform duration-200 text-brand-gray", mobileProductsOpen && "rotate-180 text-brand-red")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileProductsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4 flex flex-col gap-2 pt-2 pb-1 border-l-2 border-brand-red/20 ml-1 mt-1"
                        >
                          <Link href="/products" className="font-sans font-medium text-base text-brand-gray hover:text-brand-red py-1.5 transition-colors">
                            All Products
                          </Link>
                          <Link href="/products?category=Power+Products" className="font-sans font-medium text-base text-brand-gray hover:text-brand-red py-1.5 transition-colors">
                            Power Products
                          </Link>
                          <Link href="/products?category=Lighting" className="font-sans font-medium text-base text-brand-gray hover:text-brand-red py-1.5 transition-colors">
                            Lighting
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Industries Dropdown */}
                  <div>
                    <button
                      onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                      className="w-full flex items-center justify-between font-sans font-semibold text-lg text-brand-dark hover:text-brand-red border-b border-brand-border/40 py-2 text-left focus:outline-none"
                    >
                      <span>Industries</span>
                      <ChevronDown className={cn("w-5 h-5 transition-transform duration-200 text-brand-gray", mobileIndustriesOpen && "rotate-180 text-brand-red")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileIndustriesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4 flex flex-col gap-2 pt-2 pb-1 border-l-2 border-brand-red/20 ml-1 mt-1"
                        >
                          <Link href="/industries" className="font-sans font-medium text-base text-brand-gray hover:text-brand-red py-1.5 transition-colors">
                            All Industries
                          </Link>
                          {INDUSTRIES.map((ind) => (
                            <Link
                              key={ind.id}
                              href={`/industries#${ind.slug}`}
                              className="font-sans font-medium text-base text-brand-gray hover:text-brand-red py-1.5 transition-colors"
                            >
                              {ind.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <Link href="/services" className="font-sans font-semibold text-lg text-brand-dark hover:text-brand-red border-b border-brand-border/40 py-2">
                    Services
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
