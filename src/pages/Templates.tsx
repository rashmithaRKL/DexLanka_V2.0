import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Filter } from 'lucide-react';
import TemplateCard from '@/components/TemplateCard';
import { useSEO } from '@/hooks/useSEO';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { useTemplates } from '@/hooks/useApi';

const Templates = () => {
  // SEO Optimization
  useSEO({
    title: 'Premium Templates - Professional Design Templates | DexLanka',
    description: 'Browse our collection of premium, ready-to-use templates. Professional website templates, e-commerce stores, dashboards, blogs, and landing pages. Fully responsive and modern designs.',
    keywords: 'website templates, e-commerce templates, dashboard templates, blog templates, landing page templates, React templates, professional templates, DexLanka templates',
    image: '/templates-og.png',
    url: '/templates',
    type: 'website',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [templatesRef, templatesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { templates, loading: templatesLoading } = useTemplates();

  const categories = [
    { id: 'all', label: 'All Templates', count: templates.length },
    { id: 'website', label: 'Websites', count: templates.filter(t => t.category === 'website').length },
    { id: 'ecommerce', label: 'E-Commerce', count: templates.filter(t => t.category === 'ecommerce').length },
    { id: 'dashboard', label: 'Dashboards', count: templates.filter(t => t.category === 'dashboard').length },
    { id: 'blog', label: 'Blogs', count: templates.filter(t => t.category === 'blog').length },
    { id: 'portfolio', label: 'Portfolios', count: templates.filter(t => t.category === 'portfolio').length },
    { id: 'landing', label: 'Landing Pages', count: templates.filter(t => t.category === 'landing').length },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (template.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredTemplates = templates.filter(t => t.is_featured);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Templates', url: '/templates' },
      ]} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText
              text="Premium Templates"
              animation="slide-up"
              className="inline-block text-xl text-dexRed font-medium mb-4"
            />
            <AnimatedText
              text="Professional Design Templates"
              animation="slide-up"
              delay={100}
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <AnimatedText
              text="Browse our collection of premium, ready-to-use templates designed to help you launch your project faster. All templates are fully responsive, modern, and professionally crafted."
              animation="slide-up"
              delay={200}
              className="text-gray-300 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Templates Section */}
      {featuredTemplates.length > 0 && (
        <section className="section-padding bg-gradient-to-b from-darkBlue to-background">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block text-xl text-dexRed font-medium mb-4">Featured</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Popular Templates</h2>
              <p className="text-gray-300">
                Hand-picked templates that are trending and loved by our customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredTemplates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={{
                    ...template,
                    image: template.thumbnail_url || (template.screenshots && template.screenshots.length > 0 ? template.screenshots[0] : template.preview_url) || '',
                    previewUrl: template.preview_url,
                    isFeatured: template.is_featured,
                  }}
                  delay={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="py-12 bg-darkBlue">
        <div className="container mx-auto px-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates by name, category, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-dexRed"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedCategory === category.id
                  ? 'bg-dexRed text-white'
                  : 'glass text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
              >
                {category.label}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className="text-gray-400">
              Showing <span className="text-white font-semibold">{filteredTemplates.length}</span> template{filteredTemplates.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section ref={templatesRef} className="section-padding">
        <div className="container mx-auto px-6">
          {templatesLoading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-dexRed border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading templates...</p>
            </div>
          ) : filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={{
                    ...template,
                    image: template.thumbnail_url || (template.screenshots && template.screenshots.length > 0 ? template.screenshots[0] : template.preview_url) || '',
                    previewUrl: template.preview_url,
                    isFeatured: template.is_featured,
                  }}
                  delay={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={templatesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              className="text-center py-20"
            >
              <Filter size={64} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No templates found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-dexRed text-white rounded-lg font-medium hover:bg-dexRed/90 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-background to-darkBlue">
        <div className="container mx-auto px-6">
          <div className="glass p-12 rounded-2xl text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Custom Template?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team can create a custom template tailored specifically to your needs.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-dexRed text-white font-medium rounded-lg transition-transform hover:translate-y-[-2px] active:translate-y-[0px]"
            >
              Request Custom Template
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Templates;

