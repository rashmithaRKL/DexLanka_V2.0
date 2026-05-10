import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const publicSitemap = path.join(root, 'public', 'sitemap.xml');
const distIndex = path.join(distDir, 'index.html');

const siteUrl = 'https://dexlanka.com';
const defaultTitle = 'DexLanka Software Solutions | Web, Mobile & Business Software in Sri Lanka';
const defaultDescription =
  'DexLanka builds websites, e-commerce platforms, mobile apps, POS systems, inventory systems, and custom software for Sri Lankan businesses and global startups.';

const knownMetadata = {
  '/': {
    title: defaultTitle,
    description: defaultDescription,
  },
  '/about': {
    title: 'About DexLanka Software Solutions | Sri Lankan Software Studio',
    description:
      'Learn about DexLanka Software Solutions, a Homagama-based software studio building websites, apps, POS systems, inventory systems, and custom software.',
  },
  '/services': {
    title: 'Web Development, Mobile Apps & Custom Software Services | DexLanka',
    description: "Explore DexLanka's website development, mobile app, e-commerce, POS, inventory, UI/UX, and custom software services for modern businesses.",
  },
  '/packages': {
    title: 'Website, E-commerce, POS & Maintenance Packages | DexLanka',
    description:
      'View DexLanka package guidance for starter websites, business websites, e-commerce stores, POS and inventory systems, custom software, and support.',
  },
  '/gallery': {
    title: 'DexLanka Projects | Websites, Apps & Business Software Portfolio',
    description: "View DexLanka's portfolio of websites, e-commerce platforms, mobile apps, business software, branding, and digital solutions.",
  },
  '/contact': {
    title: 'Contact DexLanka Software Solutions | Start Your Project',
    description: 'Contact DexLanka for website development, e-commerce, mobile apps, POS systems, inventory software, and custom business software projects.',
  },
  '/website-development-sri-lanka': {
    title: 'Website Development Company in Sri Lanka | DexLanka',
    description: 'DexLanka builds mobile-friendly websites for Sri Lankan businesses with WhatsApp CTAs, SEO setup, service pages, and clear package guidance.',
  },
  '/ecommerce-website-development-sri-lanka': {
    title: 'E-Commerce Website Development in Sri Lanka | DexLanka',
    description: 'DexLanka builds e-commerce websites in Sri Lanka with product catalogs, cart, checkout, admin panels, COD/payment planning, and WhatsApp orders.',
  },
  '/restaurant-website-design-sri-lanka': {
    title: 'Restaurant Website Design Sri Lanka | DexLanka',
    description: 'Restaurant website design in Sri Lanka with digital menus, WhatsApp orders, table booking, Google Maps, food galleries, reviews, and SEO.',
  },
  '/pos-system-sri-lanka': {
    title: 'POS System Development in Sri Lanka | DexLanka',
    description: 'DexLanka develops POS systems in Sri Lanka for billing, invoices, stock updates, staff access, customers, and business reports.',
  },
  '/inventory-management-system-sri-lanka': {
    title: 'Inventory Management System Sri Lanka | DexLanka',
    description: 'DexLanka builds inventory management systems in Sri Lanka for stock tracking, suppliers, purchasing, low-stock alerts, reports, and dashboards.',
  },
  '/mobile-app-development-sri-lanka': {
    title: 'Mobile App Development Company in Sri Lanka | DexLanka',
    description: 'DexLanka builds mobile apps for Sri Lankan businesses, startups, customers, staff workflows, booking, ordering, reporting, and dashboards.',
  },
  '/custom-software-development-sri-lanka': {
    title: 'Custom Software Development Company in Sri Lanka | DexLanka',
    description: 'DexLanka builds custom software in Sri Lanka including dashboards, admin panels, POS, inventory, booking, portals, and automation.',
  },
  '/react-development-sri-lanka': {
    title: 'React Development Company in Sri Lanka | DexLanka',
    description: 'DexLanka builds React websites, dashboards, SaaS interfaces, admin panels, and custom web apps for local and international clients.',
  },
  '/supabase-development-sri-lanka': {
    title: 'Supabase Development Services in Sri Lanka | DexLanka',
    description: 'DexLanka builds Supabase apps with authentication, PostgreSQL, storage, dashboards, APIs, and secure business workflows.',
  },
  '/laravel-to-react-migration': {
    title: 'Laravel to React Migration Services | DexLanka',
    description: 'Migrate Laravel Blade interfaces to React with DexLanka for modern dashboards, API integration, frontend structure, and maintainable UI.',
  },
  '/blog': {
    title: 'DexLanka Blog | Website, SEO & Software Guides',
    description:
      'Read DexLanka guides about website costs, online stores, restaurant websites, POS systems, inventory software, React, SEO, and business websites.',
  },
  '/templates': {
    title: 'Website Templates for Businesses | DexLanka',
    description:
      'Browse DexLanka website templates for business websites, service pages, landing pages, and online brand launches.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | DexLanka Software Solutions',
    description:
      'Read the DexLanka privacy policy covering website inquiries, contact details, project communication, analytics, and customer data handling.',
  },
  '/terms-and-conditions': {
    title: 'Terms, Refund and Cancellation Policy | DexLanka',
    description:
      'Read DexLanka terms and conditions covering project scope, payments, refunds, cancellations, timelines, support, and handover guidance.',
  },
};

const projectMetadata = {
  '/project/1': ['Scriptoria', 'Web Development Literary Masterpieces'],
  '/project/2': ['Delectable Restaurant', 'Restaurant Website'],
  '/project/3': ['Tranquil Haven Resort', 'Hotel and Resort Website'],
  '/project/4': ['Tech Venture', 'Technology Website'],
  '/project/5': ['Art Gallery', 'Art Gallery Website'],
  '/project/6': ['Pixel Genius', 'Creative Agency Website'],
  '/project/7': ['Pulchr Design', 'Business Website'],
  '/project/8': ['Tech Pulse Computers', 'Computer Shop Website'],
  '/project/9': ['Fast Guard', 'Business Website'],
  '/project/10': ['Note Taking App', 'Mobile App'],
  '/project/11': ['Dashboard UX Design', 'UI/UX Design'],
  '/project/12': ['Online Marketplace', 'E-commerce Platform'],
  '/project/13': ['Enterprise Management System', 'Business Software'],
  '/project/14': ['SEO & Marketing Campaign', 'Digital Marketing'],
};

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const titleize = (route) =>
  route
    .replace(/^\/blog\//, '')
    .replace(/^\/project\//, 'Project ')
    .replace(/^\//, '')
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const routeMeta = (route) => {
  if (knownMetadata[route]) return knownMetadata[route];

  const title = titleize(route);
  const lowerTitle = title.toLowerCase();

  if (route.startsWith('/blog/')) {
    return {
      title: `${title} | DexLanka Blog`,
      description: `Read DexLanka's guide to ${lowerTitle} for Sri Lankan businesses, with practical website, SEO, software, and lead-generation advice.`,
      type: 'article',
    };
  }

  if (route.startsWith('/project/')) {
    const project = projectMetadata[route];
    if (project) {
      return {
        title: `${project[0]} Case Study | DexLanka Software Solutions`,
        description: `View DexLanka's ${project[0]} case study for ${project[1].toLowerCase()}, including project overview, problem, solution, features, technology, timeline, and results.`,
        type: 'article',
      };
    }

    return {
      title: `${title} Case Study | DexLanka Software Solutions`,
      description: `View DexLanka's ${lowerTitle} case study with project overview, business problem, solution, features, technology stack, timeline, and results.`,
      type: 'article',
    };
  }

  if (route.endsWith('-websites')) {
    return {
      title: `${title} | DexLanka`,
      description: `DexLanka builds ${lowerTitle} for Sri Lankan businesses with mobile-friendly design, WhatsApp lead capture, SEO setup, and starting price guidance.`,
    };
  }

  if (
    route.includes('react-supabase') ||
    route.includes('saas') ||
    route.includes('dashboard') ||
    route.includes('startup') ||
    route.includes('hire-react')
  ) {
    return {
      title: `${title} | DexLanka`,
      description: `DexLanka helps international startups and small businesses with ${lowerTitle}, using modern React, Supabase, Next.js, dashboards, and clear project milestones.`,
    };
  }

  return {
    title: `${title} | DexLanka`,
    description: `DexLanka provides ${lowerTitle} for Sri Lankan businesses and international startups, with clear scope, responsive design, SEO setup, and WhatsApp consultation.`,
  };
};

const setTag = (html, selector, value) => {
  const escaped = escapeAttr(value);
  if (selector === 'title') {
    return html.replace(/<title>.*?<\/title>/, `<title>${escaped}</title>`);
  }

  const [attr, key] = selector.split('=');
  const pattern = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*\\/>`);
  return html.replace(pattern, `<meta ${attr}="${key}" content="${escaped}" />`);
};

const setCanonical = (html, url) => html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeAttr(url)}" />`);

if (!fs.existsSync(distIndex) || !fs.existsSync(publicSitemap)) {
  process.exit(0);
}

const indexHtml = fs.readFileSync(distIndex, 'utf8');
const sitemap = fs.readFileSync(publicSitemap, 'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/dexlanka\.com([^<]*)<\/loc>/g)].map((match) => match[1] || '/');

for (const route of routes) {
  if (route === '/') continue;

  const meta = routeMeta(route);
  const url = `${siteUrl}${route}`;
  let html = indexHtml;
  html = setTag(html, 'title', meta.title);
  html = setTag(html, 'name=title', meta.title);
  html = setTag(html, 'name=description', meta.description);
  html = setTag(html, 'property=og:title', meta.title);
  html = setTag(html, 'property=og:description', meta.description);
  html = setTag(html, 'property=og:url', url);
  html = setTag(html, 'property=og:type', meta.type || 'website');
  html = setTag(html, 'name=twitter:title', meta.title);
  html = setTag(html, 'name=twitter:description', meta.description);
  html = setCanonical(html, url);

  const outDir = path.join(distDir, route.replace(/^\//, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
}

console.log(`Generated ${routes.length - 1} static route HTML files.`);
