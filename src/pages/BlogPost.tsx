import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BreadcrumbSchema, FAQSchema, StructuredData } from '@/components/StructuredData';
import { FAQSection, FinalCTA, RelatedServiceLinks } from '@/components/MarketingSections';
import { BUSINESS_INFO, getBlogPostBySlug, SITE_URL } from '@/data/site';
import { useSEO } from '@/hooks/useSEO';

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  useSEO({
    title: post ? `${post.title} | DexLanka Blog` : 'Blog Article Not Found | DexLanka',
    description: post?.metaDescription || 'DexLanka blog article about software, websites, SEO, and business technology.',
    keywords: post ? `${post.title}, DexLanka, web development, software development, Sri Lanka` : undefined,
    url: post ? `/blog/${post.slug}` : '/blog',
    canonical: post ? `/blog/${post.slug}` : '/blog',
    image: '/og-image.png',
    type: 'article',
    author: BUSINESS_INFO.name,
    publishedTime: post?.date,
    modifiedTime: post?.date,
    noindex: !post,
  });

  if (!post) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <section className="pt-36 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl font-bold mb-4">Article not found</h1>
            <p className="text-gray-300 mb-6">The blog article you requested is not available.</p>
            <Link to="/blog" className="inline-flex items-center px-6 py-3 bg-dexRed text-white rounded-lg">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <StructuredData
        type="Article"
        id={`article-${post.slug}`}
        data={{
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            '@type': 'Organization',
            name: BUSINESS_INFO.name,
          },
          publisher: {
            '@type': 'Organization',
            name: BUSINESS_INFO.name,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/logo.png`,
            },
          },
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        }}
      />
      <FAQSchema items={post.faqs} id={`faq-${post.slug}`} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <Navbar />

      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8">
              <ArrowLeft size={18} className="mr-2" />
              Back to Blog
            </Link>
            <span className="inline-block text-xl text-dexRed font-medium mb-4">{post.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <p className="text-gray-300 text-lg mb-6">{post.excerpt}</p>
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
              <span>{post.date}</span>
              <span>{post.readingTime}</span>
              <span>{BUSINESS_INFO.name}</span>
            </div>
          </div>
        </div>
      </section>

      <article className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading} className="glass rounded-2xl p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-5">{section.heading}</h2>
                <p className="text-gray-300 leading-relaxed">{section.body}</p>
                {section.bullets && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-gray-300">
                        <CheckCircle size={18} className="text-dexRed mt-1 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="glass rounded-2xl p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Related Services</h2>
              <RelatedServiceLinks paths={post.relatedServicePaths} />
            </section>
          </div>
        </div>
      </article>

      <FAQSection faqs={post.faqs} title="Article FAQs" />

      <section className="py-16 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need help applying this to your business?</h2>
            <p className="text-gray-300 mb-6">DexLanka can review your website, software idea, or current business workflow.</p>
            <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-dexRed text-white rounded-lg font-medium">
              Request a Free Consultation
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default BlogPost;
