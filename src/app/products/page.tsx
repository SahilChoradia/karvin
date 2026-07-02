'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import ScrollReveal from '@/components/ui/ScrollReveal';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get active query states
  const categoryParam = searchParams.get('category') || 'All';
  const queryParam = searchParams.get('q') || '';
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map((prod) => prod.category))).filter(Boolean)];

  useEffect(() => {
    setActiveCategory(categoryParam);
    setSearchQuery(queryParam);
  }, [categoryParam, queryParam]);

  // Handle category toggle
  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
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

  // Filter products
  const filteredProducts = PRODUCTS.filter((prod) => {
    const matchesCategory =
      activeCategory === 'All' || prod.category === activeCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
              Engineered Lighting
            </h4>
          </ScrollReveal>
          <ScrollReveal variant="text-mask-left" delay={0.1}>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-white">
              Product Catalog
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" delay={0.2}>
            <p className="text-base text-white/70 max-w-xl font-sans leading-relaxed">
              Discover our comprehensive range of high-efficiency LED luminaires built with custom isolated drivers for extreme environments.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Filter & Listing */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs font-display font-bold text-brand-gray uppercase tracking-wider">
            Showing {filteredProducts.length} Product{filteredProducts.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Left Sidebar Filters */}
          <ScrollReveal variant="slide-right" className="w-full lg:row-span-2">
            <div className="bg-brand-light-gray p-6 rounded-2xl border border-brand-border space-y-6">
              <div className="flex items-center justify-between border-b border-brand-border pb-4">
                <span className="font-display font-bold text-sm text-brand-dark flex items-center gap-2">
                  <SlidersHorizontal className="w-4.5 h-4.5 text-brand-red" /> Filter Controls
                </span>
                {(activeCategory !== 'All' || searchQuery) && (
                  <button
                    onClick={() => {
                      router.push('/products');
                    }}
                    className="text-xs font-display font-bold text-brand-red hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search Input */}
              <div className="space-y-2">
                <label className="text-xs font-display font-bold text-brand-dark uppercase tracking-wider">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type to search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-border rounded-lg text-sm text-brand-dark focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                  />
                  <Search className="w-4 h-4 text-brand-gray absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <label className="text-xs font-display font-bold text-brand-dark uppercase tracking-wider block mb-1">
                  Category Filter
                </label>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`px-4 py-2 text-left text-xs font-display font-bold rounded-lg transition-all cursor-pointer w-auto lg:w-full ${
                        activeCategory === cat
                          ? 'bg-brand-red text-white shadow-sm'
                          : 'bg-white border border-brand-border text-brand-dark hover:bg-brand-light-gray'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

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
                  className="bg-white rounded-2xl overflow-hidden border border-brand-border luxury-shadow flex flex-col justify-between group hover:border-brand-red/35 transition-colors duration-300 w-full"
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
                      <div className="absolute top-4 left-4 bg-brand-dark text-white text-[9px] font-display font-bold px-3 py-1 rounded-full uppercase tracking-widest">
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
                          <span className="block font-semibold text-brand-dark">Wattage:</span>
                          {prod.specifications['Wattage Range'] || 'N/A'}
                        </div>
                        <div>
                          <span className="block font-semibold text-brand-dark">IP Protection:</span>
                          {prod.specifications['IP Rating'] || 'IP65'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6 pt-4 border-t border-brand-border/40 flex items-center justify-between">
                    <span className="text-[11px] font-display font-bold text-brand-gray">
                      Efficacy: {prod.specifications['Luminous Efficacy'] || 'High Efficacy'}
                    </span>
                    <Link
                      href={`/products/${prod.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-display font-bold text-brand-red group-hover:gap-1.5 transition-all"
                    >
                      View Spec Sheet <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className="bg-brand-light-gray border border-brand-border rounded-2xl p-12 text-center text-brand-gray md:col-span-1 lg:col-span-2">
              <p className="text-base font-sans">No products found matching your active filter criteria.</p>
              <button
                onClick={() => router.push('/products')}
                className="text-xs font-display font-bold text-brand-red mt-4 hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
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
