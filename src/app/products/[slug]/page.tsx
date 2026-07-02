import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { Check, ArrowLeft, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import ProductInquiryModal from '@/components/sections/ProductInquiryModal';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((prod) => ({
    slug: prod.slug,
  }));
}

// SEO metadata generation
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Professional LED Lighting`,
    description: product.description,
    openGraph: {
      title: `${product.name} | KARVIN Power Systems`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  // Render product schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'KARVIN',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
        {/* Back Link & Breadcrumbs */}
        <div className="flex items-center justify-between border-b border-brand-border/60 pb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-display font-bold text-brand-gray hover:text-brand-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <div className="text-xs text-brand-gray font-sans flex items-center gap-1.5">
            <Link href="/products" className="hover:text-brand-red transition-colors">Catalog</Link>
            <span>/</span>
            <span className="text-brand-dark font-medium">{product.name}</span>
          </div>
        </div>

        {/* Product General Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Product Image */}
          <ScrollReveal variant="slide-right" duration={2.2}>
            <div className="relative h-[480px] w-full rounded-2xl overflow-hidden border border-brand-border bg-brand-light-gray luxury-shadow">
              <Image
                src={product.image}
                alt={product.name}
                fill
                unoptimized={product.image.startsWith('http')}
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Right: Info & Inquiry */}
          <div className="space-y-8">
            <div className="space-y-4">
              <ScrollReveal variant="slide-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-light text-brand-red">
                  <span className="text-xs font-display font-semibold uppercase tracking-wider">
                    {product.category} {product.subCategory ? `• ${product.subCategory}` : ''}
                  </span>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="text-mask-right" delay={0.1}>
                <h1 className="font-serif font-black text-3xl md:text-5xl text-brand-dark tracking-tight">
                  {product.name}
                </h1>
              </ScrollReveal>
              <ScrollReveal variant="slide-left" delay={0.2}>
                <p className="text-base text-brand-gray leading-relaxed font-sans">
                  {product.longDescription || product.description}
                </p>
              </ScrollReveal>
            </div>

            {/* In-House Quality Stamp */}
            <ScrollReveal variant="slide-left" delay={0.3}>
              <div className="flex items-start gap-4 p-5 bg-brand-light-gray rounded-xl border border-brand-border">
                <Cpu className="w-8 h-8 text-brand-red shrink-0 mt-1" />
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-dark">Built With KARVIN Isolated Drivers</h4>
                  <p className="text-xs text-brand-gray leading-relaxed mt-1">
                    Engineered to withstand neutral cuts and high voltage spikes up to 320V. ISO 9001 certified batch.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Core Features */}
            <div className="space-y-4">
              <ScrollReveal variant="text-mask-right">
                <h3 className="font-display font-bold text-sm text-brand-dark uppercase tracking-wider">
                  Product Advantages
                </h3>
              </ScrollReveal>
              <ScrollReveal variant="slide-left" delay={0.15}>
                <ul className="grid grid-cols-1 gap-2.5">
                  {product.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-brand-gray font-sans">
                      <span className="p-0.5 rounded bg-brand-red-light text-brand-red shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>

            {/* Inquiry CTAs */}
            <ScrollReveal variant="slide-left" delay={0.3} className="pt-4 flex flex-col sm:flex-row gap-4">
              <ProductInquiryModal productName={product.name} />
            </ScrollReveal>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="border-t border-brand-border pt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-4">
            <ScrollReveal variant="text-mask-left">
              <h2 className="font-serif font-black text-2xl text-brand-dark">
                Technical Specifications
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="slide-right" delay={0.15}>
              <p className="text-sm text-brand-gray leading-relaxed font-sans">
                All performance parameters are validated under constant environmental temperatures and match standard IS codes.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="slide-right" delay={0.3}>
              <div className="flex items-center gap-2.5 text-xs text-brand-gray font-sans font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5 text-brand-red" /> NABL & BIS Quality Compliant
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="slide-left" delay={0.2} className="lg:col-span-2 overflow-x-auto">
            <table className="w-full border-collapse border border-brand-border font-sans text-sm text-brand-gray">
              <thead>
                <tr className="bg-brand-light-gray border-b border-brand-border font-display font-bold text-brand-dark">
                  <th className="px-4 py-3 text-left w-1/3">Parameter</th>
                  <th className="px-4 py-3 text-left">Specifications value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b border-brand-border hover:bg-brand-light-gray/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-brand-dark">{key}</td>
                    <td className="px-4 py-3">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollReveal>
        </div>

        {/* Applications */}
        <div className="border-t border-brand-border pt-16 space-y-8">
          <ScrollReveal variant="text-mask-left">
            <h2 className="font-serif font-black text-2xl text-brand-dark">
              Typical Applications
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.applications.map((app, index) => (
              <ScrollReveal 
                key={index} 
                variant={index === 0 ? "slide-right" : index === 2 ? "slide-left" : "scale-up"} 
                delay={index * 0.08}
                className="flex"
              >
                <div className="p-6 rounded-xl border border-brand-border bg-white text-sm text-brand-gray font-semibold font-display shadow-sm flex items-center gap-3 w-full">
                  <span className="w-2.5 h-2.5 bg-brand-red rounded-full shrink-0" />
                  {app}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-brand-border pt-16 space-y-8">
            <div className="flex items-center justify-between">
              <ScrollReveal variant="text-mask-left">
                <h2 className="font-serif font-black text-2xl text-brand-dark">
                  Related Lighting Range
                </h2>
              </ScrollReveal>
              <Link href="/products" className="text-xs font-display font-bold text-brand-red inline-flex items-center gap-1 hover:gap-1.5 transition-all">
                View All Products <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((p, idx) => (
                <ScrollReveal 
                  key={p.id} 
                  variant={idx === 0 ? "slide-right" : idx === 2 ? "slide-left" : "fade-up"} 
                  delay={idx * 0.1}
                  className="flex"
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-brand-border luxury-shadow group flex flex-col justify-between w-full">
                    <div className="relative h-[200px] w-full bg-brand-light-gray">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        unoptimized={p.image.startsWith('http')}
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-display font-bold text-base text-brand-dark group-hover:text-brand-red transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-brand-gray line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                      <Link href={`/products/${p.slug}`} className="inline-flex items-center gap-1 text-xs font-display font-bold text-brand-red pt-1">
                        Explore Product <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
