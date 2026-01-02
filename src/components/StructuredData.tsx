import { useEffect } from 'react';

export interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'WebPage' | 'Product' | 'BreadcrumbList' | 'Article' | 'Service';
  data: Record<string, any>;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `structured-data-${type.toLowerCase()}`;
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(`structured-data-${type.toLowerCase()}`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type, data]);

  return null;
};

// Predefined structured data components
export const OrganizationSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://dexlanka.com');
  
  return (
    <StructuredData
      type="Organization"
      data={{
        name: 'DexLanka',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description: 'Premium IT, branding, and digital services provider in Sri Lanka. Specializing in web development, mobile apps, UI/UX design, and e-commerce solutions.',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+94-XXX-XXXXXX',
          contactType: 'Customer Service',
          email: 'dexlanka@gmail.com',
          areaServed: 'LK',
          availableLanguage: ['en', 'si'],
        },
        sameAs: [
          'https://www.facebook.com/dexlanka',
          'https://www.linkedin.com/company/dexlanka',
          'https://twitter.com/dexlanka',
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'LK',
          addressLocality: 'Sri Lanka',
        },
      }}
    />
  );
};

export const WebSiteSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://dexlanka.com');
  
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: 'DexLanka',
        url: siteUrl,
        description: 'Premium IT, branding, and digital services in Sri Lanka',
        publisher: {
          '@type': 'Organization',
          name: 'DexLanka',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/templates?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
};

export const ProductSchema = ({ 
  name, 
  description, 
  image, 
  price, 
  currency = 'USD',
  availability = 'https://schema.org/InStock',
  url,
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: string;
  url: string;
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://dexlanka.com');
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

  return (
    <StructuredData
      type="Product"
      data={{
        name,
        description,
        image: fullImage,
        url: fullUrl,
        offers: {
          '@type': 'Offer',
          price: price.toString(),
          priceCurrency: currency,
          availability,
          url: fullUrl,
        },
        brand: {
          '@type': 'Brand',
          name: 'DexLanka',
        },
      }}
    />
  );
};

export const BreadcrumbSchema = ({ items }: { items: Array<{ name: string; url: string }> }) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://dexlanka.com');
  
  return (
    <StructuredData
      type="BreadcrumbList"
      data={{
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
        })),
      }}
    />
  );
};

export default StructuredData;

