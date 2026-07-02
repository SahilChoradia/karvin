import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/data';
import { Clock, User, ArrowLeft, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | KARVIN Knowledge Hub`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | KARVIN Power Systems`,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  // Article schema mapping for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    image: [post.image],
    datePublished: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'KARVIN Power Systems Pvt. Ltd.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=300',
      },
    },
    description: post.excerpt,
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-10">
        
        {/* Breadcrumb & Navigation */}
        <ScrollReveal variant="fade-in">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-display font-bold text-brand-gray hover:text-brand-red transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
            </Link>
            <div className="text-xs text-brand-gray font-sans flex items-center gap-1.5">
              <Link href="/blog" className="hover:text-brand-red transition-colors">Hub</Link>
              <span>/</span>
              <span className="text-brand-dark font-medium line-clamp-1">{post.title}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Title & Author */}
        <div className="space-y-4 text-center md:text-left">
          <ScrollReveal variant="text-mask-left">
            <span className="inline-block bg-brand-red-light text-brand-red text-[10px] font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
          </ScrollReveal>
          <ScrollReveal variant="text-mask-left" delay={0.1}>
            <h1 className="font-serif font-black text-3xl md:text-5xl text-brand-dark leading-tight tracking-tight">
              {post.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="slide-right" delay={0.2}>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2 text-xs text-brand-gray font-sans font-semibold">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-brand-red" />
                <span>Written by {post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-red" />
                <span>{post.readTime}</span>
              </div>
              <span>Published: {post.date}</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Article Banner Image */}
        <ScrollReveal variant="scale-up" delay={0.3}>
          <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden border border-brand-border bg-brand-light-gray luxury-shadow">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </ScrollReveal>

        {/* Content body */}
        <div className="prose max-w-none text-brand-gray font-sans text-sm md:text-base leading-relaxed space-y-6 pt-4 border-b border-brand-border/60 pb-12">
          {/* We format the markdown-like content blocks */}
          {post.content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (trimmed.startsWith('###')) {
              return (
                <ScrollReveal key={index} variant="text-mask-left" threshold={0.15}>
                  <h3 className="font-display font-bold text-xl text-brand-dark pt-4">
                    {trimmed.replace('###', '').trim()}
                  </h3>
                </ScrollReveal>
              );
            }
            if (trimmed.match(/^\d+\./)) {
              // Simple numbered list detection
              const items = trimmed.split('\n');
              return (
                <ScrollReveal key={index} variant="slide-right" threshold={0.15}>
                  <ol className="list-decimal list-inside space-y-2 pl-4">
                    {items.map((item, keyIdx) => (
                      <li key={keyIdx} className="pl-1">
                        {item.replace(/^\d+\.\s*/, '')}
                      </li>
                    ))}
                  </ol>
                </ScrollReveal>
              );
            }
            return (
              <ScrollReveal key={index} variant="slide-right" threshold={0.15}>
                <p className="leading-relaxed">
                  {trimmed}
                </p>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Next/Prev Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6">
            <ScrollReveal variant="text-mask-left">
              <h3 className="font-display font-bold text-lg text-brand-dark">
                Recommended Case Studies
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((p, idx) => (
                <ScrollReveal key={p.id} variant={idx === 0 ? "slide-right" : "slide-left"} delay={idx * 0.08}>
                  <div
                    className="p-6 rounded-2xl border border-brand-border bg-white luxury-shadow flex flex-col justify-between h-full group hover:border-brand-red/35 transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <span className="text-[10px] font-display font-bold text-brand-red uppercase tracking-wider">
                        {p.category}
                      </span>
                      <h4 className="font-display font-bold text-base text-brand-dark group-hover:text-brand-red transition-colors line-clamp-2">
                        {p.title}
                      </h4>
                      <p className="text-xs text-brand-gray line-clamp-2">
                        {p.excerpt}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-display font-bold text-brand-red pt-4 mt-auto"
                    >
                      Read Paper <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
