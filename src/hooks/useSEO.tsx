import { useEffect } from 'react';
import { BUSINESS_INFO, SITE_URL } from '@/data/site';

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
  title: 'DexLanka Software Solutions | Web, Mobile & Business Software in Sri Lanka',
  description: 'DexLanka builds websites, e-commerce platforms, mobile apps, POS systems, inventory systems, and custom software for Sri Lankan businesses and global startups.',
  keywords: 'DexLanka Software Solutions, Web Development Sri Lanka, Mobile App Development Sri Lanka, POS System Sri Lanka, Inventory Management System Sri Lanka, E-Commerce Website Development, React Development, Supabase Developer, Custom Software Sri Lanka',
  image: '/og-image.png',
  url: typeof window !== 'undefined' ? window.location.pathname : '/',
  type: 'website',
  noindex: false,
  nofollow: false,
};

const siteUrl = import.meta.env.VITE_SITE_URL || SITE_URL;
const siteName = BUSINESS_INFO.name;

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
    const fullTitle = /DexLanka/i.test(title) ? title : `${title} | ${siteName}`;
    const normalizedPath = url === '/' ? '/' : `/${url.replace(/^\/+/, '')}`;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${normalizedPath}`;
    const canonicalUrl = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${siteUrl}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
      : fullUrl;

    // Update document title
    document.title = fullTitle;

    // Remove existing dynamically-created meta tags
    const existingMetaTags = document.querySelectorAll('meta[data-seo]');
    existingMetaTags.forEach(tag => tag.remove());

    // Helper function to create/update meta tags without leaving duplicate descriptions across routes
    const upsertMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      const meta = (document.querySelector(selector) as HTMLMetaElement) || document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      meta.setAttribute('content', content);
      meta.setAttribute('data-seo', 'true');
      if (!meta.parentElement) {
        document.head.appendChild(meta);
      }
    };

    // Basic meta tags
    upsertMetaTag('title', fullTitle);
    upsertMetaTag('description', description);
    upsertMetaTag('keywords', keywords);
    if (author) upsertMetaTag('author', author);

    // Robots meta
    const robotsContent = [
      noindex ? 'noindex' : 'index',
      nofollow ? 'nofollow' : 'follow',
    ].join(', ');
    upsertMetaTag('robots', robotsContent);

    // Open Graph tags
    upsertMetaTag('og:title', fullTitle, true);
    upsertMetaTag('og:description', description, true);
    upsertMetaTag('og:image', fullImage, true);
    upsertMetaTag('og:image:width', '1200', true);
    upsertMetaTag('og:image:height', '630', true);
    upsertMetaTag('og:image:alt', fullTitle, true);
    upsertMetaTag('og:url', fullUrl, true);
    upsertMetaTag('og:type', type, true);
    upsertMetaTag('og:site_name', siteName, true);
    upsertMetaTag('og:locale', 'en_US', true);

    // Twitter Card tags
    upsertMetaTag('twitter:card', 'summary_large_image');
    upsertMetaTag('twitter:url', fullUrl);
    upsertMetaTag('twitter:title', fullTitle);
    upsertMetaTag('twitter:description', description);
    upsertMetaTag('twitter:image', fullImage);
    upsertMetaTag('twitter:image:alt', fullTitle);

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) upsertMetaTag('article:published_time', publishedTime, true);
      if (modifiedTime) upsertMetaTag('article:modified_time', modifiedTime, true);
      if (author) upsertMetaTag('article:author', author, true);
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

