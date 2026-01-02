import { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}

const defaultSEO: Required<Omit<SEOProps, 'publishedTime' | 'modifiedTime' | 'author' | 'canonical'>> & {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  canonical?: string;
} = {
  title: 'DexLanka - Premium IT, Branding & Digital Services in Sri Lanka',
  description: 'DexLanka offers premium IT services, web development, mobile apps, UI/UX design, e-commerce solutions, and digital marketing services in Sri Lanka. Transform your business with our expert team.',
  keywords: 'DexLanka, Software Development, Web Development, Mobile Apps, UI/UX Design, E-Commerce, Digital Marketing, Sri Lanka, IT Services, Branding, Web Design, React Development, TypeScript',
  image: '/og-image.png',
  url: typeof window !== 'undefined' ? window.location.href : 'https://dexlanka.com',
  type: 'website',
  noindex: false,
  nofollow: false,
};

const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://dexlanka.com');
const siteName = 'DexLanka';

export const useSEO = (seo: SEOProps = {}) => {
  useEffect(() => {
    const {
      title = defaultSEO.title,
      description = defaultSEO.description,
      keywords = defaultSEO.keywords,
      image = defaultSEO.image,
      url = defaultSEO.url,
      type = defaultSEO.type,
      author = defaultSEO.author,
      publishedTime,
      modifiedTime,
      noindex = defaultSEO.noindex,
      nofollow = defaultSEO.nofollow,
      canonical,
    } = seo;

    // Full title with site name
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
    const canonicalUrl = canonical || fullUrl;

    // Update document title
    document.title = fullTitle;

    // Remove existing meta tags
    const existingMetaTags = document.querySelectorAll('meta[data-seo]');
    existingMetaTags.forEach(tag => tag.remove());

    // Helper function to create meta tags
    const createMetaTag = (name: string, content: string, property?: boolean) => {
      const meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      meta.setAttribute('content', content);
      meta.setAttribute('data-seo', 'true');
      document.head.appendChild(meta);
    };

    // Basic meta tags
    createMetaTag('description', description);
    createMetaTag('keywords', keywords);
    if (author) createMetaTag('author', author);

    // Robots meta
    const robotsContent = [
      noindex ? 'noindex' : 'index',
      nofollow ? 'nofollow' : 'follow',
    ].join(', ');
    createMetaTag('robots', robotsContent);

    // Open Graph tags
    createMetaTag('og:title', fullTitle, true);
    createMetaTag('og:description', description, true);
    createMetaTag('og:image', fullImage, true);
    createMetaTag('og:url', fullUrl, true);
    createMetaTag('og:type', type, true);
    createMetaTag('og:site_name', siteName, true);
    createMetaTag('og:locale', 'en_US', true);

    // Twitter Card tags
    createMetaTag('twitter:card', 'summary_large_image');
    createMetaTag('twitter:title', fullTitle);
    createMetaTag('twitter:description', description);
    createMetaTag('twitter:image', fullImage);

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) createMetaTag('article:published_time', publishedTime, true);
      if (modifiedTime) createMetaTag('article:modified_time', modifiedTime, true);
      if (author) createMetaTag('article:author', author, true);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Cleanup function
    return () => {
      const metaTags = document.querySelectorAll('meta[data-seo]');
      metaTags.forEach(tag => tag.remove());
    };
  }, [seo]);
};

export default useSEO;

