import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ChevronLeft,
  ShoppingCart,
  Star,
  Tag,
  Check,
  Eye,
  Download,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSEO } from '@/hooks/useSEO';
import { ProductSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { useTemplate } from '@/hooks/useApi';
import TemplateDownload from '@/components/TemplateDownload/TemplateDownload';

const TemplatePreview = () => {
  const { id } = useParams();
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const templateId = id ? parseInt(id) : null;
  const { template, loading } = useTemplate(templateId);

  const [detailsRef, detailsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // SEO Optimization - Update when template loads
  React.useEffect(() => {
    if (template) {
      document.title = `${template.title} - Premium Template | DexLanka`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', template.full_description || template.description);
      }
    }
  }, [template]);

  const handleAddToCart = () => {
    if (!template) return;

    addToCart({
      id: template.id,
      title: template.title,
      category: template.category,
      price: template.price,
      description: template.description,
      image: template.thumbnail_url || template.preview_url || '',
      tags: template.tags || [],
    });
    toast({
      title: 'Added to cart',
      description: `${template.title} has been added to your cart.`,
    });
  };

  const handleLivePreview = () => {
    if (template?.live_preview_url) {
      setIsPreviewFullscreen(true);
    } else if (template?.preview_url && template.preview_url !== '#') {
      window.open(template.preview_url, '_blank');
    } else {
      toast({
        title: 'Preview not available',
        description: 'Live preview link will be available soon.',
      });
    }
  };

  const nextImage = () => {
    if (template?.screenshots && template.screenshots.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === template.screenshots!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (template?.screenshots && template.screenshots.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? template.screenshots!.length - 1 : prev - 1
      );
    }
  };

  // Convert database template to display format
  const displayTemplate = template ? {
    ...template,
    previewUrl: template.preview_url,
    isFeatured: template.is_featured,
    fullDescription: template.full_description,
  } : null;

  if (loading) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-dexRed border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading template...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <section className="pt-36 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>
            <p className="text-gray-400 mb-6">The template you're looking for doesn't exist.</p>
            <Link to="/templates">
              <Button className="bg-dexRed hover:bg-dexRed/90">
                Back to Templates
              </Button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const images = template?.screenshots && template.screenshots.length > 0
    ? template.thumbnail_url
      ? [template.thumbnail_url, ...template.screenshots]
      : template.screenshots
    : template?.thumbnail_url
      ? [template.thumbnail_url]
      : template?.preview_url
        ? [template.preview_url]
        : ['/placeholder.svg'];

  // Fullscreen Preview Modal
  const PreviewModal = () => {
    if (!isPreviewFullscreen || !template?.live_preview_url) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
        <div className="w-full h-full flex flex-col">
          <div className="flex justify-between items-center p-4 bg-black/50 border-b border-white/10">
            <h3 className="text-white font-semibold">{template.title} - Live Preview</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewFullscreen(false)}
              className="text-white border-white/20"
            >
              <Minimize2 className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
          <div className="flex-1 relative">
            <iframe
              src={template.live_preview_url}
              className="w-full h-full border-0"
              title={`${template.title} Live Preview`}
              allow="fullscreen"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {template && (
        <>
          <ProductSchema
            name={template.title}
            description={template.full_description || template.description}
            image={template.thumbnail_url || ''}
            price={template.price}
            currency="USD"
            url={`/template/${template.id}`}
          />
          <BreadcrumbSchema items={[
            { name: 'Home', url: '/' },
            { name: 'Templates', url: '/templates' },
            { name: template.title, url: `/template/${template.id}` },
          ]} />
        </>
      )}
      <PreviewModal />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-12 bg-darkBlue">
        <div className="container mx-auto px-6">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft size={20} />
            Back to Templates
          </Link>
        </div>
      </section>

      {/* Template Content */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 aspect-video">
                  <img
                    src={images[currentImageIndex]}
                    alt={template.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  {template.is_featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-dexRed text-white">
                        ⭐ Featured
                      </Badge>
                    </div>
                  )}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        aria-label="Previous image"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        aria-label="Next image"
                      >
                        <ArrowRight size={20} />
                      </button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-2">
                          {images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-dexRed w-8' : 'bg-white/50'
                                }`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.slice(0, 4).map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative overflow-hidden rounded-lg aspect-video ${index === currentImageIndex ? 'ring-2 ring-dexRed' : ''
                          }`}
                      >
                        <img
                          src={img}
                          alt={`${template.title} screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div>
                <div className="mb-4">
                  <Badge className="mb-3 capitalize bg-white/10 text-gray-300">
                    {template.category}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{template.title}</h1>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <Star size={20} className="text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold">{template.rating || 0}</span>
                      <span className="text-gray-400 ml-1">({template.sales || 0} sales)</span>
                    </div>
                  </div>
                </div>

                {/* Premium Glassmorphism Action Card */}
                <div className="premium-action-card rounded-3xl p-8 mb-6 relative overflow-hidden">
                  {/* Subtle animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-dexRed/5 opacity-50"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-5xl font-bold text-white">${template.price}</span>
                      <span className="text-gray-400 text-sm">one-time purchase</span>
                    </div>

                    <div className="space-y-4">
                      {/* Animated Add to Cart Button */}
                      {isInCart(template.id) ? (
                        <Link to="/cart" className="block">
                          <button className="btn-primary-success w-full group">
                            <Check size={20} className="mr-2 transition-transform group-hover:scale-110" />
                            <span>In Cart - View Cart</span>
                          </button>
                        </Link>
                      ) : (
                        <button
                          onClick={handleAddToCart}
                          className="btn-animated-cart"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path
                              fill="white"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              stroke="white"
                            />
                          </svg>
                          <span className="btn-text">Add to Cart</span>
                        </button>
                      )}

                      {/* Tertiary CTA - View Live Demo */}
                      {template.storage_path || template.demo_type ? (
                        <Link to={`/demo/template/${template.id}`} className="block">
                          <button className="btn-ghost w-full group">
                            <Eye size={20} className="mr-2 transition-transform group-hover:scale-110" />
                            <span>View Live Demo</span>
                          </button>
                        </Link>
                      ) : template.live_preview_url ? (
                        <button
                          onClick={handleLivePreview}
                          className="btn-ghost w-full group"
                        >
                          <Maximize2 size={20} className="mr-2 transition-transform group-hover:scale-110" />
                          <span>View Live Preview</span>
                        </button>
                      ) : template.preview_url && template.preview_url !== '#' ? (
                        <button
                          onClick={() => window.open(template.preview_url, '_blank')}
                          className="btn-ghost w-full group"
                        >
                          <Eye size={20} className="mr-2 transition-transform group-hover:scale-110" />
                          <span>Open Preview</span>
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {template.tags && template.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {template.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description & Features */}
            <div ref={detailsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Full Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {template.full_description || template.description}
                  </p>
                </motion.div>

                {/* Features */}
                {template.features && template.features.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-2xl p-8"
                  >
                    <h2 className="text-2xl font-semibold mb-6">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(template.features || []).map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check size={20} className="text-dexRed mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Technical Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 }}
                  className="glass rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
                  {template.technologies && template.technologies.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {(template.technologies || []).map((tech, index) => (
                          <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {template.compatibility && template.compatibility.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Compatibility</h4>
                      <div className="space-y-2">
                        {(template.compatibility || []).map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                            <Check size={16} className="text-dexRed" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Purchase Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Download size={16} className="text-dexRed" />
                      <span>Source files</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Download size={16} className="text-dexRed" />
                      <span>Documentation</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Download size={16} className="text-dexRed" />
                      <span>Free updates</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Download size={16} className="text-dexRed" />
                      <span>Support</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TemplatePreview;






