import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { FinalCTA } from '@/components/MarketingSections';
import { blogPosts } from '@/data/site';
import { useSEO } from '@/hooks/useSEO';

const Blog = () => {
  const [search, setSearch] = useState('');

  useSEO({
    title: 'Software, Web Development & SEO Blog | DexLanka',
    description:
      'Read DexLanka articles about website development in Sri Lanka, POS systems, e-commerce, React, Supabase, SaaS MVPs, dashboards, and startup web apps.',
    keywords:
      'DexLanka blog, website development Sri Lanka, React Supabase MVP, POS system Sri Lanka, e-commerce Sri Lanka, SaaS MVP development',
    url: '/blog',
    canonical: '/blog',
    image: '/og-image.png',
    type: 'website',
  });

  const filteredPosts = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return blogPosts;
    return blogPosts.filter((post) =>
      [post.title, post.excerpt, post.category].some((value) => value.toLowerCase().includes(query))
    );
  }, [search]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }]} />
      <Navbar />

      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText text="Blog" animation="slide-up" className="inline-block text-xl text-dexRed font-medium mb-4" />
            <AnimatedText text="Software, SEO, and Business Website Guides" animation="slide-up" delay={100} className="text-4xl md:text-5xl font-bold mb-6" />
            <AnimatedText
              text="CMS-ready article pages for local Sri Lankan businesses and international startup clients."
              animation="slide-up"
              delay={200}
              className="text-gray-300 text-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <label htmlFor="blog-search" className="sr-only">
              Search blog articles
            </label>
            <input
              id="blog-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-dexRed"
            />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="glass rounded-2xl p-6 flex flex-col h-full">
                <span className="text-dexRed text-sm font-medium mb-3">{post.category}</span>
                <h2 className="text-2xl font-semibold mb-4">
                  <Link to={`/blog/${post.slug}`} className="hover:text-dexRed transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-300 mb-5 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-5">
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                </div>
                <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-dexRed font-medium group">
                  Read article
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Blog;
