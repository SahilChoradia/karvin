import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function BlogListingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-brand-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1500"
            alt="Knowledge Hub Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 space-y-4 pt-10">
          <ScrollReveal variant="text-mask-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
              Engineering Publications
            </h4>
          </ScrollReveal>
          <ScrollReveal variant="text-mask-left" delay={0.1}>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-white">
              Knowledge Hub
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" delay={0.2}>
            <p className="text-base text-white/70 max-w-2xl font-sans leading-relaxed">
              Read detailed articles, technical whitepapers, and guides regarding industrial LED efficiencies compiled by our R&D electronics division.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {BLOG_POSTS.map((post, idx) => (
            <ScrollReveal key={post.id} variant={idx % 2 === 0 ? "slide-right" : "slide-left"} delay={(idx % 2) * 0.08}>
              <article
                className="bg-white rounded-2xl overflow-hidden border border-brand-border luxury-shadow flex flex-col justify-between h-full group hover:border-brand-red/35 transition-colors duration-300"
              >
                <div>
                  <div className="relative h-[280px] w-full overflow-hidden bg-brand-light-gray">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-brand-dark text-white text-[10px] font-display font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    {/* Meta details */}
                    <div className="flex items-center gap-4 text-xs text-brand-gray font-sans font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-red" /> {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-dark group-hover:text-brand-red transition-colors leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-sm text-brand-gray leading-relaxed font-sans line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-4 border-t border-brand-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-brand-gray font-sans font-semibold">
                    <User className="w-3.5 h-3.5 text-brand-red" />
                    <span>By {post.author}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-display font-bold text-brand-red group-hover:gap-1.5 transition-all"
                  >
                    Read Whitepaper <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="bg-brand-light-gray py-20 border-t border-brand-border text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <ScrollReveal variant="fade-in">
            <BookOpen className="w-10 h-10 text-brand-red mx-auto" />
          </ScrollReveal>
          <ScrollReveal variant="text-mask" delay={0.1}>
            <h2 className="font-serif font-black text-2xl text-brand-dark">
              Subscribe to Technical Updates
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.2}>
            <p className="text-sm text-brand-gray font-sans max-w-md mx-auto">
              Get notified when our engineering division publishes new research on industrial power safety and luminaire standards.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.3}>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter corporate email..."
                className="px-4 py-3 bg-white border border-brand-border rounded-lg text-sm text-brand-dark w-full focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              />
              <button className="bg-brand-dark hover:bg-brand-gray text-white font-display font-semibold text-sm px-6 py-3 rounded-lg w-full sm:w-auto transition-colors cursor-pointer whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
