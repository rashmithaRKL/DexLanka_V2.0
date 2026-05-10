
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import GalleryGrid from '@/components/GalleryGrid';
import StatsSection from '@/components/StatsSection';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { useSEO } from '@/hooks/useSEO';


const Gallery = () => {
  useSEO({
    title: 'DexLanka Projects | Websites, Apps & Business Software Portfolio',
    description:
      "View DexLanka's portfolio of websites, e-commerce platforms, mobile apps, business software, branding, and digital solutions.",
    keywords: 'DexLanka projects, website case studies Sri Lanka, software project portfolio, React projects Sri Lanka',
    image: '/og-image.png',
    url: '/gallery',
    canonical: '/gallery',
    type: 'website',
  });

  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Projects', url: '/gallery' }]} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-darkBlue">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText
              text="Our Gallery"
              animation="slide-up"
              className="inline-block text-xl text-dexRed font-medium mb-4"
            />
            <AnimatedText
              text="Software Project Gallery"
              animation="slide-up"
              delay={100}
              className="text-4xl md:text-5xl font-bold mb-6"
            />
            <AnimatedText
              text="Explore our comprehensive portfolio of premium software solutions designed to transform businesses through innovative technology and exceptional user experiences."
              animation="slide-up"
              delay={200}
              className="text-gray-300 text-lg"
            />
          </div>
        </div>
      </section>
      <div className="reveal-on-scroll">
        <GalleryGrid />
      </div>
      <div className="reveal-on-scroll">
        <StatsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
