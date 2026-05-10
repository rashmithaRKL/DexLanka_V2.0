import { useEffect } from 'react';
import { BUSINESS_INFO, SITE_URL } from '@/data/site';

export interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'WebSite' | 'WebPage' | 'Product' | 'BreadcrumbList' | 'Article' | 'Service' | 'FAQPage' | 'CreativeWork';
  data: Record<string, unknown>;
  id?: string;
}

export const StructuredData = ({ type, data, id }: StructuredDataProps) => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `structured-data-${id || type.toLowerCase()}`;
    script.text = JSON.stringify(schema);

    const existingScript = document.getElementById(script.id);
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(`structured-data-${id || type.toLowerCase()}`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type, data, id]);

  return null;
};

// Predefined structured data components
export const OrganizationSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || SITE_URL;
  
  return (
    <StructuredData
      type="Organization"
      data={{
        name: BUSINESS_INFO.name,
        alternateName: BUSINESS_INFO.shortName,
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description: 'DexLanka Software Solutions builds websites, e-commerce platforms, mobile apps, POS systems, inventory systems, dashboards, and custom business software for Sri Lankan businesses and international startups.',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: BUSINESS_INFO.phone,
          contactType: 'Customer Service',
          email: BUSINESS_INFO.email,
          areaServed: 'LK',
          availableLanguage: ['en', 'si'],
        },
        sameAs: [
          'https://www.facebook.com/profile.php?id=61574091291394',
          'https://www.instagram.com/dex_lanka/',
          'https://x.com/dexlanka',
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'LK',
          addressLocality: BUSINESS_INFO.addressLocality,
          addressRegion: BUSINESS_INFO.addressRegion,
          streetAddress: BUSINESS_INFO.location,
        },
      }}
    />
  );
};

export const LocalBusinessSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || SITE_URL;

  return (
    <StructuredData
      type="LocalBusiness"
      data={{
        name: BUSINESS_INFO.name,
        url: siteUrl,
        image: `${siteUrl}/og-image.png`,
        telephone: BUSINESS_INFO.phone,
        email: BUSINESS_INFO.email,
        priceRange: 'Rs 25,000+',
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS_INFO.location,
          addressLocality: BUSINESS_INFO.addressLocality,
          addressRegion: BUSINESS_INFO.addressRegion,
          addressCountry: BUSINESS_INFO.addressCountry,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
        areaServed: ['Sri Lanka', 'Colombo', 'Homagama', 'Maharagama', 'Kottawa', 'Nugegoda', 'Gampaha', 'Kandy', 'Galle', 'International'],
      }}
      id="local-business"
    />
  );
};

export const WebSiteSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || SITE_URL;
  
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: BUSINESS_INFO.name,
        alternateName: BUSINESS_INFO.shortName,
        url: siteUrl,
        description: 'Web development, mobile app development, e-commerce, POS, inventory, dashboards, and custom software services in Sri Lanka.',
        publisher: {
          '@type': 'Organization',
          name: BUSINESS_INFO.name,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/blog?search={search_term_string}`,
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
  const siteUrl = import.meta.env.VITE_SITE_URL || SITE_URL;
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
          name: BUSINESS_INFO.shortName,
        },
      }}
      id={`product-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
    />
  );
};

export const BreadcrumbSchema = ({ items }: { items: Array<{ name: string; url: string }> }) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || SITE_URL;
  
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
      id={`breadcrumb-${items.map((item) => item.name).join('-').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
    />
  );
};

export const ServiceSchema = ({
  name,
  description,
  url,
  areaServed = 'Sri Lanka',
}: {
  name: string;
  description: string;
  url: string;
  areaServed?: string | string[];
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || SITE_URL;

  return (
    <StructuredData
      type="Service"
      data={{
        name,
        description,
        url: url.startsWith('http') ? url : `${siteUrl}${url}`,
        provider: {
          '@type': 'Organization',
          name: BUSINESS_INFO.name,
          url: siteUrl,
        },
        areaServed,
        serviceType: name,
      }}
      id={`service-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
    />
  );
};

export const FAQSchema = ({ items, id = 'faq' }: { items: Array<{ question: string; answer: string }>; id?: string }) => {
  if (!items.length) return null;

  return (
    <StructuredData
      type="FAQPage"
      data={{
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }}
      id={id}
    />
  );
};

export default StructuredData;

