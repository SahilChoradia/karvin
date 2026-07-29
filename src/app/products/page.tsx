'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

import { POWER_PRODUCTS } from '@/lib/powerData';


// Combine regular PRODUCTS with Power Products
const allCatalogProducts = [
  ...PRODUCTS.map(p => ({ ...p, parentCategory: 'Lighting' })),
  ...POWER_PRODUCTS
];

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedProductForSpecs, setSelectedProductForSpecs] = useState<typeof allCatalogProducts[number] | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollFilters = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Get active query states
  const categoryParam = searchParams.get('category') || 'Lighting';
  const subCategoryParam = searchParams.get('subcategory') || 'All';
  const queryParam = searchParams.get('q') || '';

  const [activeParentCategory, setActiveParentCategory] = useState(categoryParam);
  const [activeSubCategory, setActiveSubCategory] = useState(subCategoryParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);

  useEffect(() => {
    setActiveParentCategory(categoryParam);
    setActiveSubCategory(subCategoryParam);
    setSearchQuery(queryParam);
  }, [categoryParam, subCategoryParam, queryParam]);

  // Dynamically compute the sub-categories list based on current parent category
  const subCategories = [
    'All',
    ...Array.from(
      new Set(
        allCatalogProducts
          .filter(prod => prod.parentCategory.toLowerCase() === activeParentCategory.toLowerCase())
          .map(prod => prod.category)
      )
    ).filter(Boolean)
  ];

  // Handle specific subcategory selection
  const handleSubCategorySelect = (subCat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (subCat === 'All') {
      params.delete('subcategory');
    } else {
      params.set('subcategory', subCat);
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  // Handle search submit
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete('q');
    } else {
      params.set('q', value);
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  // Filter products based on parentCategory, subCategory and search query
  const filteredProducts = allCatalogProducts.filter((prod) => {
    const matchesParent =
      prod.parentCategory.toLowerCase() === activeParentCategory.toLowerCase();
    const matchesSub =
      activeSubCategory === 'All' || prod.category === activeSubCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesParent && matchesSub && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-brand-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1500"
            alt="Products Catalog Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 space-y-4 pt-10">
          <ScrollReveal variant="text-mask-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
              {activeParentCategory} Catalog
            </h4>
          </ScrollReveal>
          <ScrollReveal variant="text-mask-left" delay={0.1}>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-white">
              {activeParentCategory}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Filter & Listing */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-8">
        {/* Search & Clear Filters Container */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <p className="text-xs font-display font-bold text-brand-gray uppercase tracking-wider">
            Showing {filteredProducts.length} Product{filteredProducts.length === 1 ? '' : 's'}
          </p>
          
          <div className="flex items-center gap-4 w-full sm:max-w-xs">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-10 py-2 bg-white border border-brand-border rounded-none text-xs font-display font-bold text-brand-dark focus:outline-none focus:border-brand-red"
              />
              <Search className="w-3.5 h-3.5 text-brand-gray absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete('q');
                    router.push(`/products?${params.toString()}`, { scroll: false });
                  }}
                  className="absolute right-3 top-2.5 text-brand-gray hover:text-brand-red cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {(activeSubCategory !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  router.push(`/products?category=${activeParentCategory}`);
                }}
                className="text-xs font-display font-bold text-brand-red hover:underline cursor-pointer whitespace-nowrap"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Category Ribbon with Scroll Arrows */}
        <ScrollReveal variant="fade-up" className="w-full mb-10">
          <div className="flex items-center gap-2 border-b border-brand-border/60 pb-6">
            {/* Left Scroll Arrow */}
            <button
              onClick={() => scrollFilters('left')}
              className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center bg-white text-brand-gray hover:text-brand-red hover:border-brand-red transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable Ribbon */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2.5 scroll-smooth snap-x snap-mandatory"
            >
              {subCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSubCategorySelect(cat)}
                  className={`px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider border transition-all cursor-pointer whitespace-nowrap snap-start rounded-none ${
                    activeSubCategory === cat
                      ? 'bg-brand-red border-brand-red text-white shadow-sm'
                      : 'bg-white border-brand-border text-brand-dark hover:bg-brand-light-gray'
                  }`}
                  title={cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right Scroll Arrow */}
            <button
              onClick={() => scrollFilters('right')}
              className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center bg-white text-brand-gray hover:text-brand-red hover:border-brand-red transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

          {/* Product Items or Empty State */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((prod, idx) => (
              <ScrollReveal 
                key={prod.id} 
                variant="slide-left" 
                delay={(idx % 3) * 0.06}
                className="flex"
              >
                <div
                  className="bg-white rounded-none overflow-hidden border border-brand-border luxury-shadow flex flex-col justify-between group hover:border-brand-red/35 transition-colors duration-300 w-full"
                >
                  <div>
                    <div className="relative h-[250px] w-full overflow-hidden bg-brand-light-gray">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        unoptimized={prod.image.startsWith('http')}
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-brand-dark text-white text-[9px] font-display font-bold px-3 py-1 rounded-none uppercase tracking-widest">
                        {prod.category}
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="font-display font-bold text-xl text-brand-dark group-hover:text-brand-red transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-sm text-brand-gray leading-relaxed font-sans line-clamp-2">
                        {prod.description}
                      </p>
                      
                      {/* Quick Specs Grid */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-border/40 text-xs font-sans text-brand-gray">
                        <div>
                          <span className="block font-semibold text-brand-dark">
                            {prod.parentCategory === 'Power Products' ? 'Capacity:' : 'Wattage:'}
                          </span>
                          {(prod.specifications as Record<string, string | undefined>)['Capacity Range'] || (prod.specifications as Record<string, string | undefined>)['Wattage Range'] || 'N/A'}
                        </div>
                        <div>
                          <span className="block font-semibold text-brand-dark">
                            {prod.parentCategory === 'Power Products' ? 'Protection:' : 'IP Protection:'}
                          </span>
                          {(prod.specifications as Record<string, string | undefined>)['IP Rating'] || (prod.specifications as Record<string, string | undefined>)['Environment'] || (prod.parentCategory === 'Power Products' ? 'N/A' : 'IP65')}
                        </div>
                      </div>

                      {/* Technical Specs Trigger */}
                      <button
                        onClick={() => setSelectedProductForSpecs(prod)}
                        className="w-full mt-4 py-2 border border-brand-border hover:border-brand-red text-brand-dark hover:text-brand-red rounded-none text-xs font-display font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 bg-brand-light-gray/50 hover:bg-brand-light-gray"
                      >
                        Technical Specs
                      </button>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6 pt-4 border-t border-brand-border/40 flex items-center justify-between">
                    <span className="text-[11px] font-display font-bold text-brand-gray">
                      {prod.parentCategory === 'Power Products' ? 'Efficiency:' : 'Efficacy:'} {(prod.specifications as Record<string, string | undefined>)['Efficiency'] || (prod.specifications as Record<string, string | undefined>)['Luminous Efficacy'] || 'High Efficacy'}
                    </span>
                    <Link
                      href={`/contact?product=${encodeURIComponent(prod.name)}`}
                      className="inline-flex items-center gap-1 text-xs font-display font-bold text-brand-red group-hover:gap-1.5 transition-all"
                    >
                      Inquire Product <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className="bg-brand-light-gray border border-brand-border rounded-none p-12 text-center text-brand-gray sm:col-span-2 lg:col-span-3">
              <p className="text-base font-sans">No products found matching your active filter criteria.</p>
              <button
                onClick={() => router.push(`/products?category=${activeParentCategory}`)}
                className="text-xs font-display font-bold text-brand-red mt-4 hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Specifications Modal */}
      <AnimatePresence>
        {selectedProductForSpecs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
            onClick={() => setSelectedProductForSpecs(null)}
          >
            <motion.div
               initial={{ scale: 0.95, y: 15 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 15 }}
               className="bg-white rounded-none w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col border border-brand-border shadow-2xl"
               onClick={(e) => e.stopPropagation()}
             >
               {/* Modal Header */}
               <div className="flex items-center justify-between border-b border-brand-border p-6 bg-brand-light-gray">
                 <div>
                   <span className="text-[10px] uppercase tracking-widest font-display font-bold text-brand-red">
                     {selectedProductForSpecs.category}
                   </span>
                   <h3 className="font-display font-bold text-lg text-brand-dark">
                     {selectedProductForSpecs.name}
                   </h3>
                 </div>
                 <button
                   onClick={() => setSelectedProductForSpecs(null)}
                   className="text-brand-gray hover:text-brand-dark transition-colors cursor-pointer p-1.5 rounded-none hover:bg-brand-border/60"
                 >
                   <X className="w-5 h-5" />
                 </button>
               </div>

              {/* Modal Body / Table */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1 scrollbar-thin">
                <table className="w-full text-left border-collapse text-xs font-sans text-brand-gray">
                  <tbody>
                    {Object.entries(selectedProductForSpecs.specifications).map(([key, value]) => {
                      if (!value) return null;
                      return (
                        <tr key={key} className="border-b border-brand-border/50 hover:bg-brand-light-gray/50">
                          <td className="py-2.5 pr-4 font-bold text-brand-dark align-top w-2/5">
                            {key}
                          </td>
                          <td className="py-2.5 text-brand-gray whitespace-pre-line align-top font-medium">
                            {String(value)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-brand-border flex items-center justify-between bg-brand-light-gray/50">
                <span className="text-[11px] font-display font-bold text-brand-gray">
                  Need custom configurations?
                </span>
                <Link
                  href={`/contact?product=${encodeURIComponent(selectedProductForSpecs.name)}`}
                  className="px-4 py-2 bg-brand-red text-white text-xs font-display font-bold rounded-none hover:bg-brand-red-hover transition-colors"
                >
                  Inquire Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsCatalog() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white text-brand-gray">
        Loading Lighting Catalog...
      </div>
    }>
      <ProductsCatalogContent />
    </Suspense>
  );
}
