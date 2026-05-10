export const SITE_URL = 'https://dexlanka.com';

export const BUSINESS_INFO = {
  name: 'DexLanka Software Solutions',
  shortName: 'DexLanka',
  location: 'Homagama, Sri Lanka',
  addressLocality: 'Homagama',
  addressRegion: 'Western Province',
  addressCountry: 'LK',
  phone: '+94 70 558 8789',
  phoneHref: '+94705588789',
  email: 'info@dexlanka.com',
  hours: 'Monday to Saturday, 9:00 AM to 6:00 PM',
  website: SITE_URL,
  whatsappMessage:
    'Hi DexLanka, I visited your website and I need a free quote for my project.',
};

export const getWhatsAppUrl = (message = BUSINESS_INFO.whatsappMessage) =>
  `https://wa.me/${BUSINESS_INFO.phoneHref.replace('+', '')}?text=${encodeURIComponent(message)}`;

export const whatsappUrl = getWhatsAppUrl();

export const whatsappMessages = {
  homepage: 'Hi DexLanka, I visited your website and I need a free quote for my project.',
  restaurant: 'Hi DexLanka, I need a restaurant website with menu and WhatsApp ordering.',
  ecommerce: 'Hi DexLanka, I need an e-commerce website for my shop.',
  pos: 'Hi DexLanka, I need a POS or inventory management system.',
  website: 'Hi DexLanka, I need a business website. Can I get package details?',
  mobile: 'Hi DexLanka, I need a mobile app for my business. Can I get a quote?',
  international: 'Hi DexLanka, I need a free project audit for my startup/software project.',
  audit: 'Hi DexLanka, I would like to request a free website audit.',
  maintenance: 'Hi DexLanka, I need monthly website maintenance support.',
};

export const serviceAreas = [
  'Sri Lanka',
  'Colombo',
  'Homagama',
  'Maharagama',
  'Kottawa',
  'Nugegoda',
  'Gampaha',
  'Kandy',
  'Galle',
  'Negombo',
  'Kurunegala',
  'International',
];

export const trustTechnologies = ['React', 'Supabase', 'Next.js', 'Cloudflare', 'UI/UX', 'SEO', 'Mobile Responsive'];
export const heroTrustItems = ['Web Development', 'E-Commerce', 'Mobile Apps', 'POS Systems', 'Inventory Systems', 'Custom Software'];

export const whyDexLanka = [
  'Modern business-focused designs',
  'Mobile-friendly websites',
  'Affordable packages',
  'Fast communication',
  'WhatsApp support',
  'Domain and hosting guidance',
  'Local Sri Lankan support',
  'International-ready development',
  'Custom software capability',
  'Maintenance after launch',
];

export const processSteps = [
  {
    title: 'Free consultation',
    description: 'We understand your business, customers, goals, required features, budget, and launch timeline.',
  },
  {
    title: 'Proposal and quotation',
    description: 'You receive a clear scope, timeline, starting price, included items, and next steps before work begins.',
  },
  {
    title: 'UI design',
    description: 'We design the main pages or screens first so the layout, content flow, and user journey are agreed early.',
  },
  {
    title: 'Development',
    description: 'We build the website, app, POS system, inventory system, dashboard, or custom software using modern tools.',
  },
  {
    title: 'Testing',
    description: 'We test mobile, desktop, forms, speed, UX, browser behavior, SEO basics, and important business flows.',
  },
  {
    title: 'Launch',
    description: 'We help with domain, hosting, deployment, analytics setup, Search Console readiness, and handover.',
  },
  {
    title: 'Support',
    description: 'After launch, DexLanka can help with maintenance, updates, backups, bug fixes, and future improvements.',
  },
];

export const packageGuidance = [
  {
    title: 'Starter Website',
    price: 'From Rs 25,000',
    priceLkr: 'From Rs 25,000',
    priceUsd: 'From $85',
    bestFor: 'Personal brands, small shops, restaurants, cafes, and basic service businesses.',
    features: ['1-3 pages', 'Mobile responsive design', 'Contact section', 'WhatsApp button', 'Basic SEO setup', 'Social media links', 'Free domain for 1 year if included in offer'],
    notIncluded: ['E-commerce', 'Payment gateway', 'Custom dashboard', 'Advanced SEO', 'Custom booking system', 'Large content writing', 'Advanced integrations'],
  },
  {
    title: 'Business Website',
    price: 'From Rs 75,000 / Rs 120,000',
    priceLkr: 'From Rs 75,000 / Rs 120,000',
    priceUsd: 'From $250 / $400',
    bestFor: 'Growing businesses that need more pages, service sections, gallery, forms, Google Maps, and SEO setup.',
    features: ['Multiple business pages', 'Service sections', 'Gallery/portfolio', 'Contact forms', 'Google Maps', 'SEO setup', 'WhatsApp integration', 'Mobile responsive design'],
    isPopular: true,
  },
  {
    title: 'E-commerce Website',
    price: 'From Rs 180,000 / Rs 250,000',
    priceLkr: 'From Rs 180,000 / Rs 250,000',
    priceUsd: 'From $600 / $850',
    bestFor: 'Shops and online stores that need product display, orders, checkout, and admin management.',
    features: ['Product categories', 'Product pages', 'Cart', 'Checkout', 'Order management', 'Admin panel', 'WhatsApp order option', 'COD/payment options depending on requirement'],
  },
  {
    title: 'Custom Business Software',
    price: 'Quote Based',
    priceLkr: 'Quote Based',
    priceUsd: 'Quote Based',
    bestFor: 'POS systems, inventory systems, employee systems, booking systems, dashboards, and business automation.',
    features: ['Admin dashboard', 'Staff login', 'Customer management', 'Sales management', 'Stock management', 'Reports', 'Invoices', 'Business automation'],
  },
];

export const homepageFaqs = [
  {
    question: 'How much does a website cost in Sri Lanka?',
    answer:
      'A starter website can begin from Rs 25,000 when the scope is simple. Business websites, e-commerce stores, POS systems, inventory systems, and custom software depend on pages, features, integrations, timeline, content, and support needs.',
  },
  {
    question: 'How long does website development take?',
    answer:
      'A simple website can often be planned and launched faster than a custom system. Timelines depend on page count, content readiness, feedback speed, integrations, and whether the project needs design, e-commerce, or admin features.',
  },
  {
    question: 'Do you provide domain and hosting?',
    answer:
      'Yes. DexLanka can guide domain, hosting, SSL, email, DNS, Cloudflare, deployment, and launch setup. Some offers may include a free domain for one year when confirmed in the quotation.',
  },
  {
    question: 'Can you connect WhatsApp to my website?',
    answer:
      'Yes. Websites can include WhatsApp buttons, sticky WhatsApp CTAs, page-specific pre-filled messages, phone links, and contact forms so customers can reach you faster.',
  },
  {
    question: 'Do you build e-commerce websites?',
    answer:
      'Yes. DexLanka builds e-commerce websites with products, categories, cart, checkout, order management, admin panels, COD/payment planning, and WhatsApp order options.',
  },
  {
    question: 'Do you provide maintenance?',
    answer:
      'Yes. Monthly maintenance can include small updates, backups, security checks, SEO monitoring, performance checks, bug fixes, analytics reports, and ongoing improvements depending on the plan.',
  },
  {
    question: 'Can international clients work with DexLanka?',
    answer:
      'Yes. DexLanka works with international startups and small businesses remotely using clear scope, milestones, online communication, demos, and staged delivery.',
  },
  {
    question: 'Do you build POS and inventory systems?',
    answer:
      'Yes. DexLanka builds POS systems, inventory systems, sales management, invoices, stock reports, staff logins, dashboards, and custom business workflows.',
  },
  {
    question: 'Can you redesign my old website?',
    answer:
      'Yes. DexLanka can review your existing website, improve content, structure, mobile usability, SEO basics, speed, trust sections, and conversion CTAs while keeping the brand direction where needed.',
  },
  {
    question: 'Can I request custom features?',
    answer:
      'Yes. Custom features can be scoped for booking systems, dashboards, payment flows, customer portals, reports, staff accounts, inventory logic, and other business requirements.',
  },
];

export const maintenancePlans = [
  {
    title: 'Basic Maintenance',
    price: 'Rs 10,000/month',
    priceLkr: 'Rs 10,000/month',
    priceUsd: '$35/month',
    features: ['Small updates', 'Backup checks', 'Security checks', 'Minor content changes'],
  },
  {
    title: 'Business Maintenance',
    price: 'Rs 25,000/month',
    priceLkr: 'Rs 25,000/month',
    priceUsd: '$85/month',
    features: ['Priority support', 'Monthly updates', 'Performance checks', 'SEO monitoring', 'Bug fixes'],
    isPopular: true,
  },
  {
    title: 'Premium Maintenance',
    price: 'Rs 50,000+/month',
    priceLkr: 'Rs 50,000+/month',
    priceUsd: '$170+/month',
    features: ['Ongoing improvements', 'New features', 'Analytics reports', 'Conversion optimization', 'Technical support'],
  },
];

export const testimonials = [
  {
    content:
      'DexLanka helped us plan a clean business website structure with the right contact flow, WhatsApp CTA, and mobile-first layout.',
    author: 'Local SME Client',
    position: 'Website project feedback placeholder',
  },
  {
    content:
      'The communication was clear, and the project direction focused on real business inquiries instead of only visual design.',
    author: 'Startup Founder',
    position: 'Software project feedback placeholder',
  },
  {
    content:
      'DexLanka can support launch, maintenance, and improvements after the first version goes live.',
    author: 'Business Owner',
    position: 'Maintenance feedback placeholder',
  },
];

export interface MarketingPage {
  slug: string;
  path: string;
  kind: 'local' | 'industry' | 'international';
  title: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  summary: string;
  problem?: string;
  solution?: string;
  whoFor: string[];
  features: string[];
  benefits: string[];
  techStack: string[];
  pricing: string;
  relatedProjectIds: number[];
  relatedServicePaths: string[];
  faqs: Array<{ question: string; answer: string }>;
  ctaLabel: string;
  whatsappMessage?: string;
}

export const localServicePages: MarketingPage[] = [
  {
    slug: 'web-development-sri-lanka',
    path: '/web-development-sri-lanka',
    kind: 'local',
    title: 'Web Development Company in Sri Lanka | DexLanka',
    metaDescription:
      'DexLanka builds modern business websites, landing pages, CMS websites, and web apps for Sri Lankan SMEs with mobile responsive design, SEO, and WhatsApp CTAs.',
    eyebrow: 'Web Development Sri Lanka',
    heading: 'Web Development Company in Sri Lanka',
    summary:
      'DexLanka builds fast, mobile-responsive websites for Sri Lankan SMEs that need a professional online presence, better inquiries, and a clear path from visitor to customer.',
    whoFor: ['SMEs', 'service businesses', 'consultants', 'retail stores', 'schools', 'clinics', 'restaurants', 'hotels'],
    features: ['Business website design', 'Landing pages', 'CMS/admin updates', 'SEO-ready pages', 'Contact forms', 'WhatsApp quote flow'],
    benefits: ['More local inquiries', 'Professional credibility', 'Better mobile experience', 'Search-friendly structure'],
    techStack: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Cloudflare', 'SEO'],
    pricing: 'Starter websites usually begin from LKR 45,000 depending on pages, content, and functionality.',
    relatedProjectIds: [2, 3, 7, 9],
    relatedServicePaths: ['/restaurant-website-design-sri-lanka', '/hotel-booking-website-sri-lanka', '/custom-software-development-sri-lanka'],
    faqs: [
      {
        question: 'Do you build websites for businesses near Homagama and Colombo?',
        answer: 'Yes. DexLanka supports businesses in Homagama, Colombo, nearby areas, and all Sri Lanka.',
      },
      {
        question: 'Will my website include WhatsApp and Google Map?',
        answer: 'Yes. Business websites can include WhatsApp CTAs, contact forms, Google Map embeds, and service area content.',
      },
    ],
    ctaLabel: 'Get Free Website Quote',
    whatsappMessage: whatsappMessages.website,
  },
  {
    slug: 'mobile-app-development-sri-lanka',
    path: '/mobile-app-development-sri-lanka',
    kind: 'local',
    title: 'Mobile App Development Company in Sri Lanka | DexLanka',
    metaDescription:
      'Build mobile apps for Sri Lankan businesses with DexLanka. We create customer apps, business apps, dashboards, booking apps, and cross-platform mobile solutions.',
    eyebrow: 'Mobile App Development',
    heading: 'Mobile App Development Company in Sri Lanka',
    summary:
      'DexLanka helps businesses turn app ideas into practical mobile experiences for customers, staff, sales teams, bookings, ordering, reporting, and daily operations.',
    whoFor: ['startups', 'retail businesses', 'restaurants', 'delivery teams', 'service companies', 'internal operations teams'],
    features: ['Cross-platform apps', 'Authentication', 'Push notifications', 'Admin dashboards', 'Booking/order flows', 'API integration'],
    benefits: ['Convenient customer access', 'Faster operations', 'Better data capture', 'Room to scale features over time'],
    techStack: ['React Native', 'React', 'Supabase', 'Firebase', 'REST APIs', 'UI/UX'],
    pricing: 'Simple mobile apps start from a scoped estimate after confirming screens, data, and integrations.',
    relatedProjectIds: [10],
    relatedServicePaths: ['/custom-software-development-sri-lanka', '/admin-dashboard-development', '/saas-mvp-development'],
    faqs: [
      {
        question: 'Can DexLanka build both Android and iOS apps?',
        answer: 'Yes. Cross-platform development can target Android and iOS from one shared product plan.',
      },
      {
        question: 'Do mobile apps need an admin panel?',
        answer: 'Most business apps benefit from an admin panel to manage users, content, orders, bookings, or reports.',
      },
    ],
    ctaLabel: 'Talk to DexLanka on WhatsApp',
    whatsappMessage: whatsappMessages.mobile,
  },
  {
    slug: 'ecommerce-website-development-sri-lanka',
    path: '/ecommerce-website-development-sri-lanka',
    kind: 'local',
    title: 'E-commerce Website Development in Sri Lanka | DexLanka',
    metaDescription:
      'DexLanka builds e-commerce websites in Sri Lanka with product catalogs, cart, checkout, COD, payment integration, order dashboards, and WhatsApp alerts.',
    eyebrow: 'E-commerce Sri Lanka',
    heading: 'E-commerce Website Development in Sri Lanka',
    summary:
      'DexLanka creates e-commerce websites for Sri Lankan shops that need product pages, online orders, COD/payment options, order management, and mobile-friendly shopping.',
    whoFor: ['retail shops', 'fashion brands', 'computer shops', 'food sellers', 'beauty brands', 'online stores'],
    features: ['Product catalog', 'Cart and checkout', 'COD/payment support', 'Order dashboard', 'Inventory basics', 'WhatsApp order alerts'],
    benefits: ['Sell beyond your physical location', 'Reduce manual order handling', 'Improve product discovery', 'Track orders clearly'],
    techStack: ['React', 'Supabase', 'Stripe/PayHere-ready flows', 'Cloudflare', 'SEO', 'Analytics'],
    pricing: 'E-commerce projects commonly range from LKR 250,000-600,000+ depending on products, payments, and automation.',
    relatedProjectIds: [8, 12],
    relatedServicePaths: ['/pos-system-sri-lanka', '/inventory-management-system-sri-lanka', '/web-development-sri-lanka'],
    faqs: [
      {
        question: 'Can you support COD orders in Sri Lanka?',
        answer: 'Yes. E-commerce builds can include COD, WhatsApp order alerts, and payment integration where required.',
      },
      {
        question: 'Can the store include inventory tracking?',
        answer: 'Yes. Inventory features can be added for product stock, low-stock alerts, and internal order handling.',
      },
    ],
    ctaLabel: 'Start Your E-commerce Project',
    whatsappMessage: whatsappMessages.ecommerce,
  },
  {
    slug: 'pos-system-sri-lanka',
    path: '/pos-system-sri-lanka',
    kind: 'local',
    title: 'POS System Development in Sri Lanka | DexLanka',
    metaDescription:
      'DexLanka develops custom POS systems in Sri Lanka for shops, restaurants, salons, and service businesses with billing, stock, reports, and staff access.',
    eyebrow: 'POS System Sri Lanka',
    heading: 'POS System Development in Sri Lanka',
    summary:
      'DexLanka builds custom POS systems for Sri Lankan businesses that need billing, stock control, customers, staff logins, reports, and workflows that match local operations.',
    whoFor: ['small shops', 'restaurants', 'salons', 'pharmacies', 'repair centers', 'multi-branch SMEs'],
    features: ['Product billing', 'Invoices', 'Stock updates', 'Staff roles', 'Daily reports', 'Customer records'],
    benefits: ['Reduce manual billing errors', 'Track stock more clearly', 'Speed up counter work', 'Improve reporting'],
    techStack: ['React', 'Supabase', 'PostgreSQL', 'Cloudflare', 'Role-based access', 'Reports'],
    pricing: 'POS systems usually range from LKR 300,000-1,200,000+ depending on modules, branches, and integrations.',
    relatedProjectIds: [8, 13],
    relatedServicePaths: ['/inventory-management-system-sri-lanka', '/custom-software-development-sri-lanka', '/ecommerce-website-development-sri-lanka'],
    faqs: [
      {
        question: 'Can the POS work with inventory?',
        answer: 'Yes. POS and inventory can be built together so sales update stock and reports automatically.',
      },
      {
        question: 'Can staff have different access levels?',
        answer: 'Yes. Admin, cashier, manager, and staff roles can be planned based on your business workflow.',
      },
    ],
    ctaLabel: 'Request POS Consultation',
    whatsappMessage: whatsappMessages.pos,
  },
  {
    slug: 'inventory-management-system-sri-lanka',
    path: '/inventory-management-system-sri-lanka',
    kind: 'local',
    title: 'Inventory Management System Sri Lanka | DexLanka',
    metaDescription:
      'Custom inventory management systems in Sri Lanka by DexLanka for stock tracking, suppliers, purchasing, reports, staff access, and business dashboards.',
    eyebrow: 'Inventory Software',
    heading: 'Inventory Management System Sri Lanka',
    summary:
      'DexLanka helps Sri Lankan businesses replace spreadsheets with custom inventory software for products, suppliers, purchases, stock movements, and reports.',
    whoFor: ['retail shops', 'warehouses', 'distributors', 'computer stores', 'manufacturers', 'multi-location businesses'],
    features: ['Stock tracking', 'Supplier records', 'Purchase entries', 'Low-stock alerts', 'Reports', 'User permissions'],
    benefits: ['Know current stock', 'Reduce stock loss', 'Plan purchases better', 'Give owners clearer reports'],
    techStack: ['React', 'Supabase', 'PostgreSQL', 'Dashboards', 'Cloudflare', 'Reports'],
    pricing: 'Inventory systems are estimated after confirming product count, locations, reports, and workflow complexity.',
    relatedProjectIds: [8, 13],
    relatedServicePaths: ['/pos-system-sri-lanka', '/admin-dashboard-development', '/custom-software-development-sri-lanka'],
    faqs: [
      {
        question: 'Can you import existing product data?',
        answer: 'Yes. Existing spreadsheets can be reviewed and imported during setup where the data is clean enough.',
      },
      {
        question: 'Can inventory reports be customized?',
        answer: 'Yes. Reports can be planned around stock value, sales, purchases, suppliers, and low-stock needs.',
      },
    ],
    ctaLabel: 'Get Inventory System Quote',
    whatsappMessage: whatsappMessages.pos,
  },
  {
    slug: 'restaurant-website-design-sri-lanka',
    path: '/restaurant-website-design-sri-lanka',
    kind: 'local',
    title: 'Restaurant Website Design Sri Lanka | DexLanka',
    metaDescription:
      'Restaurant website design in Sri Lanka with menu pages, online ordering, WhatsApp orders, reservation forms, Google Map, SEO, and mobile responsive layouts.',
    eyebrow: 'Restaurant Websites',
    heading: 'Restaurant Website Design in Sri Lanka',
    summary:
      'DexLanka builds restaurant websites that help diners view menus, find your location, make reservations, place WhatsApp orders, and trust your brand before visiting.',
    whoFor: ['restaurants', 'cafes', 'cloud kitchens', 'bakeries', 'food delivery businesses', 'hotel restaurants'],
    features: ['Digital menu', 'WhatsApp orders', 'Reservation form', 'Google Map', 'Gallery', 'Local SEO setup'],
    benefits: ['More food inquiries', 'Better mobile menu access', 'Fewer repeated phone questions', 'Stronger local credibility'],
    techStack: ['React', 'Next.js', 'Cloudflare', 'SEO', 'Google Map', 'UI/UX'],
    pricing: 'Restaurant websites can start from Rs 25,000 for a simple website. Digital menu, WhatsApp ordering, booking, and advanced order flows are scoped separately.',
    relatedProjectIds: [2],
    relatedServicePaths: ['/web-development-sri-lanka', '/ecommerce-website-development-sri-lanka', '/custom-software-development-sri-lanka'],
    faqs: [
      {
        question: 'Can customers order through WhatsApp?',
        answer: 'Yes. Menu items and CTAs can be connected to a pre-filled WhatsApp order or inquiry flow.',
      },
      {
        question: 'Can I update my menu later?',
        answer: 'Yes. DexLanka can build an admin/CMS option or provide maintenance support for menu updates.',
      },
    ],
    ctaLabel: 'Get Restaurant Website Quote',
    whatsappMessage: whatsappMessages.restaurant,
  },
  {
    slug: 'hotel-booking-website-sri-lanka',
    path: '/hotel-booking-website-sri-lanka',
    kind: 'local',
    title: 'Hotel Booking Website Development Sri Lanka | DexLanka',
    metaDescription:
      'DexLanka builds hotel and villa websites in Sri Lanka with room pages, inquiry forms, booking flows, galleries, Google Map, SEO, and mobile responsive design.',
    eyebrow: 'Hotel Websites',
    heading: 'Hotel Booking Website Development Sri Lanka',
    summary:
      'DexLanka creates hotel, villa, resort, and guest house websites that present rooms clearly, improve direct inquiries, and support booking or quote request flows.',
    whoFor: ['hotels', 'villas', 'resorts', 'guest houses', 'tour operators', 'boutique stays'],
    features: ['Room pages', 'Booking inquiry form', 'Gallery', 'Amenities sections', 'Google Map', 'SEO-ready location pages'],
    benefits: ['More direct booking inquiries', 'Better guest trust', 'Reduced dependence on third-party profiles', 'Clear mobile experience'],
    techStack: ['React', 'Next.js', 'Cloudflare', 'SEO', 'Forms', 'Analytics'],
    pricing: 'Hotel websites are estimated based on rooms, booking logic, payment needs, content, and language support.',
    relatedProjectIds: [3],
    relatedServicePaths: ['/web-development-sri-lanka', '/custom-software-development-sri-lanka', '/mobile-app-development-sri-lanka'],
    faqs: [
      {
        question: 'Can the website support room booking requests?',
        answer: 'Yes. We can add inquiry forms, availability request flows, WhatsApp CTAs, or custom booking logic.',
      },
      {
        question: 'Can you add location SEO for hotels?',
        answer: 'Yes. Hotel pages can include local SEO structure, service area wording, metadata, and Google Map details.',
      },
    ],
    ctaLabel: 'Request Hotel Website Quote',
  },
  {
    slug: 'custom-software-development-sri-lanka',
    path: '/custom-software-development-sri-lanka',
    kind: 'local',
    title: 'Custom Software Development Company in Sri Lanka | DexLanka',
    metaDescription:
      'DexLanka builds custom software in Sri Lanka including dashboards, admin panels, POS systems, inventory systems, booking systems, and business web apps.',
    eyebrow: 'Custom Software',
    heading: 'Custom Software Development Company in Sri Lanka',
    summary:
      'DexLanka builds custom business software for SMEs that have outgrown spreadsheets, manual processes, or off-the-shelf tools that do not match their workflow.',
    whoFor: ['SMEs', 'operations teams', 'founders', 'retail businesses', 'service businesses', 'internal admin teams'],
    features: ['Admin dashboards', 'User roles', 'Reports', 'Workflow automation', 'Database design', 'API integrations'],
    benefits: ['Software matched to your workflow', 'Fewer manual tasks', 'Better reporting', 'Scalable foundation'],
    techStack: ['React', 'Supabase', 'Next.js', 'PostgreSQL', 'Cloudflare', 'Laravel-ready integrations'],
    pricing: 'Custom software is scoped after a free consultation because features, workflows, and integrations vary widely.',
    relatedProjectIds: [13, 11, 10],
    relatedServicePaths: ['/pos-system-sri-lanka', '/inventory-management-system-sri-lanka', '/admin-dashboard-development'],
    faqs: [
      {
        question: 'Can DexLanka replace our spreadsheets with software?',
        answer: 'Yes. We can review your spreadsheet workflow and design a database-backed system with dashboards and reports.',
      },
      {
        question: 'Can you build only the first version?',
        answer: 'Yes. We can start with an MVP version, launch the most important workflow, and improve it over time.',
      },
    ],
    ctaLabel: 'Request a Free Consultation',
  },
  {
    slug: 'react-development-agency-sri-lanka',
    path: '/react-development-agency-sri-lanka',
    kind: 'local',
    title: 'React Development Agency in Sri Lanka | DexLanka',
    metaDescription:
      'Hire DexLanka as your React development agency in Sri Lanka for websites, dashboards, SaaS MVPs, admin panels, and custom web applications.',
    eyebrow: 'React Development',
    heading: 'React Development Agency in Sri Lanka',
    summary:
      'DexLanka builds modern React interfaces for websites, dashboards, SaaS products, portals, internal tools, and business applications.',
    whoFor: ['startups', 'software teams', 'SMEs', 'agencies needing React support', 'dashboard projects'],
    features: ['React UI development', 'Reusable components', 'Dashboard interfaces', 'API integration', 'Responsive layouts', 'Frontend performance'],
    benefits: ['Modern app experience', 'Maintainable frontend code', 'Fast iteration', 'Scalable UI structure'],
    techStack: ['React', 'TypeScript', 'Vite', 'Next.js', 'Tailwind CSS', 'Supabase'],
    pricing: 'React projects can be fixed-scope or milestone-based depending on the product and collaboration model.',
    relatedProjectIds: [4, 7, 11],
    relatedServicePaths: ['/react-supabase-development-agency', '/admin-dashboard-development', '/saas-mvp-development'],
    faqs: [
      {
        question: 'Can DexLanka work on an existing React app?',
        answer: 'Yes. We can audit the current codebase, fix UI issues, add features, or rebuild selected sections.',
      },
      {
        question: 'Do you use TypeScript?',
        answer: 'Yes. TypeScript can be used where project size and maintainability require stronger code structure.',
      },
    ],
    ctaLabel: 'Hire React Developer',
  },
  {
    slug: 'supabase-developer-sri-lanka',
    path: '/supabase-developer-sri-lanka',
    kind: 'local',
    title: 'Supabase Developer in Sri Lanka | DexLanka',
    metaDescription:
      'DexLanka builds Supabase-powered web apps in Sri Lanka with authentication, PostgreSQL, storage, edge functions, dashboards, and business workflows.',
    eyebrow: 'Supabase Development',
    heading: 'Supabase Developer in Sri Lanka',
    summary:
      'DexLanka uses Supabase to help startups and SMEs build secure, database-backed apps faster with authentication, storage, dashboards, APIs, and real-time features.',
    whoFor: ['MVP founders', 'dashboard projects', 'internal tools', 'SaaS apps', 'SMEs needing database apps'],
    features: ['Supabase Auth', 'PostgreSQL schema', 'Storage setup', 'Row-level security planning', 'Admin dashboards', 'Realtime features'],
    benefits: ['Faster MVP launch', 'Managed backend foundation', 'Secure user access', 'Lower early-stage infrastructure complexity'],
    techStack: ['Supabase', 'PostgreSQL', 'React', 'Next.js', 'Edge Functions', 'Cloudflare'],
    pricing: 'Supabase builds are estimated by data model, auth roles, storage, integrations, and dashboard complexity.',
    relatedProjectIds: [11, 13],
    relatedServicePaths: ['/react-supabase-development-agency', '/saas-mvp-development', '/custom-software-development-sri-lanka'],
    faqs: [
      {
        question: 'Can DexLanka set up Supabase authentication?',
        answer: 'Yes. We can configure login, signup, profile data, roles, and protected app flows.',
      },
      {
        question: 'Can Supabase support admin dashboards?',
        answer: 'Yes. Supabase works well for dashboards, reports, CRUD tools, user data, and internal operations apps.',
      },
    ],
    ctaLabel: 'Request Supabase Consultation',
  },
];

export const internationalServicePages: MarketingPage[] = [
  {
    slug: 'react-supabase-development-agency',
    path: '/react-supabase-development-agency',
    kind: 'international',
    title: 'React Supabase Development Agency | DexLanka',
    metaDescription:
      'DexLanka is a Sri Lankan React and Supabase development agency helping startups build affordable SaaS MVPs, dashboards, portals, and custom web apps.',
    eyebrow: 'React + Supabase Agency',
    heading: 'React Supabase Development Agency for Startups',
    summary:
      'DexLanka is a Sri Lankan software studio helping startups and small businesses build affordable, modern React, Supabase, Next.js, SaaS, dashboard, marketplace, and custom web app solutions.',
    whoFor: ['startup founders', 'small SaaS teams', 'agencies needing delivery support', 'founders validating MVPs'],
    features: ['React frontend', 'Supabase backend', 'Auth and roles', 'Database schema', 'Storage', 'Dashboards'],
    benefits: ['Launch faster', 'Reduce early build cost', 'Keep a modern stack', 'Start with maintainable foundations'],
    techStack: ['React', 'Supabase', 'Next.js', 'TypeScript', 'PostgreSQL', 'Cloudflare'],
    pricing: 'Typical MVP phases start from a scoped fixed estimate after a free project audit.',
    relatedProjectIds: [4, 11, 13],
    relatedServicePaths: ['/saas-mvp-development', '/admin-dashboard-development', '/hire-react-developer-sri-lanka'],
    faqs: [
      {
        question: 'Can DexLanka work with international startups remotely?',
        answer: 'Yes. We work remotely with clear milestones, async updates, demos, and scoped deliverables.',
      },
      {
        question: 'Is Supabase suitable for an MVP?',
        answer: 'For many SaaS and dashboard MVPs, Supabase is a practical backend choice for auth, database, storage, and fast iteration.',
      },
    ],
    ctaLabel: 'Request a Free Project Audit',
  },
  {
    slug: 'saas-mvp-development',
    path: '/saas-mvp-development',
    kind: 'international',
    title: 'SaaS MVP Development for Startups | DexLanka',
    metaDescription:
      'Build an affordable SaaS MVP with DexLanka using React, Supabase, Next.js, dashboards, authentication, billing-ready flows, and scalable product structure.',
    eyebrow: 'SaaS MVP Development',
    heading: 'SaaS MVP Development for Startups',
    summary:
      'DexLanka helps founders build the first usable version of a SaaS product with the core features needed to test customers, workflows, and market demand.',
    whoFor: ['bootstrapped founders', 'startup teams', 'B2B SaaS ideas', 'marketplace MVPs', 'internal product teams'],
    features: ['MVP scope planning', 'User authentication', 'Dashboards', 'CRUD workflows', 'Admin tools', 'Analytics-ready setup'],
    benefits: ['Avoid overbuilding', 'Launch a testable product', 'Collect real feedback', 'Prepare for future iterations'],
    techStack: ['React', 'Next.js', 'Supabase', 'TypeScript', 'Stripe-ready flows', 'Cloudflare'],
    pricing: 'Sample pricing range depends on scope; a focused MVP can be planned in milestones from an audit.',
    relatedProjectIds: [11, 13],
    relatedServicePaths: ['/react-supabase-development-agency', '/startup-web-app-development', '/admin-dashboard-development'],
    faqs: [
      {
        question: 'Can you help define the MVP scope?',
        answer: 'Yes. We can identify the smallest useful feature set before design and development.',
      },
      {
        question: 'Can billing be added later?',
        answer: 'Yes. Billing can be planned as a later phase if the first MVP mainly needs validation.',
      },
    ],
    ctaLabel: 'Request a Free Project Audit',
  },
  {
    slug: 'admin-dashboard-development',
    path: '/admin-dashboard-development',
    kind: 'international',
    title: 'Admin Dashboard Development | DexLanka',
    metaDescription:
      'DexLanka builds admin dashboards, analytics panels, internal tools, CRUD systems, reports, and operations portals using React, Supabase, and Next.js.',
    eyebrow: 'Admin Dashboards',
    heading: 'Admin Dashboard Development',
    summary:
      'DexLanka builds clean, practical dashboards for teams that need to manage users, orders, inventory, bookings, content, reports, or operational workflows.',
    whoFor: ['SaaS teams', 'internal operations teams', 'marketplaces', 'e-commerce owners', 'agencies'],
    features: ['Role-based access', 'Data tables', 'Charts and reports', 'CRUD screens', 'Filters/search', 'Export-ready workflows'],
    benefits: ['Improve daily operations', 'Make data easier to act on', 'Reduce manual admin work', 'Centralize business workflows'],
    techStack: ['React', 'Supabase', 'Next.js', 'Recharts', 'TypeScript', 'Tailwind CSS'],
    pricing: 'Dashboard pricing depends on roles, data sources, modules, reports, and integration complexity.',
    relatedProjectIds: [11, 13],
    relatedServicePaths: ['/saas-mvp-development', '/supabase-developer-sri-lanka', '/custom-software-development-sri-lanka'],
    faqs: [
      {
        question: 'Can the dashboard connect to an existing API?',
        answer: 'Yes. Dashboards can connect to REST APIs, Supabase, PostgreSQL, or other available data sources.',
      },
      {
        question: 'Can staff permissions be customized?',
        answer: 'Yes. Roles and permissions can be designed around admin, manager, staff, and client workflows.',
      },
    ],
    ctaLabel: 'Request a Free Project Audit',
  },
  {
    slug: 'laravel-to-react-migration',
    path: '/laravel-to-react-migration',
    kind: 'international',
    title: 'Laravel to React Migration Services | DexLanka',
    metaDescription:
      'Migrate Laravel Blade interfaces to modern React frontends with DexLanka. Improve UI structure, dashboards, API integration, and frontend maintainability.',
    eyebrow: 'Laravel to React',
    heading: 'Laravel to React Migration',
    summary:
      'DexLanka helps teams modernize older Laravel Blade interfaces by moving selected screens or full frontends to React while respecting existing backend logic.',
    whoFor: ['Laravel product owners', 'SaaS teams', 'agencies', 'teams with outdated admin panels'],
    features: ['Frontend audit', 'React component plan', 'API integration', 'Dashboard rebuilds', 'Incremental migration', 'Responsive UI improvements'],
    benefits: ['Modern user experience', 'Maintainable UI components', 'Better frontend velocity', 'Lower migration risk with phased delivery'],
    techStack: ['Laravel APIs', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js'],
    pricing: 'Migration estimates depend on page count, API readiness, authentication, and whether the migration is phased.',
    relatedProjectIds: [11, 13],
    relatedServicePaths: ['/react-development-agency-sri-lanka', '/admin-dashboard-development', '/startup-web-app-development'],
    faqs: [
      {
        question: 'Can migration be done screen by screen?',
        answer: 'Yes. Incremental migration is often safer than replacing a working product all at once.',
      },
      {
        question: 'Do you change the backend?',
        answer: 'Only where needed. Many migrations can keep Laravel as the backend while React handles the frontend.',
      },
    ],
    ctaLabel: 'Request a Free Project Audit',
  },
  {
    slug: 'startup-web-app-development',
    path: '/startup-web-app-development',
    kind: 'international',
    title: 'Startup Web App Development | DexLanka',
    metaDescription:
      'DexLanka helps startups build affordable web apps, MVPs, portals, dashboards, marketplaces, and SaaS products using React, Supabase, and Next.js.',
    eyebrow: 'Startup Web Apps',
    heading: 'Startup Web App Development',
    summary:
      'DexLanka works with startup founders to shape, design, build, and launch practical web apps without unnecessary complexity in the first version.',
    whoFor: ['early-stage founders', 'bootstrapped startups', 'small businesses launching software', 'startup studios'],
    features: ['MVP planning', 'Product UI', 'Authentication', 'Database-backed workflows', 'Admin panel', 'Launch support'],
    benefits: ['Affordable development partner', 'Clear scope', 'Modern stack', 'Remote-friendly delivery'],
    techStack: ['React', 'Supabase', 'Next.js', 'TypeScript', 'Cloudflare', 'Analytics'],
    pricing: 'Sample project ranges are provided after a free audit and feature breakdown.',
    relatedProjectIds: [4, 11, 13],
    relatedServicePaths: ['/saas-mvp-development', '/react-supabase-development-agency', '/hire-react-developer-sri-lanka'],
    faqs: [
      {
        question: 'Can you build a clickable prototype first?',
        answer: 'Yes. For unclear ideas, a design/prototype phase can reduce risk before development.',
      },
      {
        question: 'Can you continue after MVP launch?',
        answer: 'Yes. DexLanka can support maintenance, improvements, feature expansion, and ongoing product work.',
      },
    ],
    ctaLabel: 'Request a Free Project Audit',
  },
  {
    slug: 'hire-react-developer-sri-lanka',
    path: '/hire-react-developer-sri-lanka',
    kind: 'international',
    title: 'Hire React Developer Sri Lanka | DexLanka',
    metaDescription:
      'Hire a React developer from Sri Lanka through DexLanka for websites, dashboards, SaaS MVPs, frontend fixes, component work, and app development.',
    eyebrow: 'Hire React Developer',
    heading: 'Hire React Developer in Sri Lanka',
    summary:
      'DexLanka provides React development support for founders, agencies, and small teams that need reliable frontend delivery without hiring a full in-house team.',
    whoFor: ['startup founders', 'agencies', 'small software teams', 'business owners needing React expertise'],
    features: ['React components', 'Frontend fixes', 'Responsive UI', 'API integration', 'Dashboard screens', 'Performance improvements'],
    benefits: ['Flexible support', 'Affordable Sri Lankan talent', 'Modern frontend stack', 'Clear communication'],
    techStack: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'Supabase'],
    pricing: 'Engagements can be scoped per project, milestone, or ongoing support requirement.',
    relatedProjectIds: [4, 7, 11],
    relatedServicePaths: ['/react-development-agency-sri-lanka', '/react-supabase-development-agency', '/startup-web-app-development'],
    faqs: [
      {
        question: 'Can DexLanka join an existing project?',
        answer: 'Yes. We can review the codebase, understand the current structure, and work on scoped frontend tasks.',
      },
      {
        question: 'Can you work with my designer or backend developer?',
        answer: 'Yes. We can collaborate with existing teams using design files, API documentation, and project milestones.',
      },
    ],
    ctaLabel: 'Request a Free Project Audit',
  },
];

const localPageBySlug = (slug: string) => localServicePages.find((page) => page.slug === slug) as MarketingPage;

export const requiredServiceAliasPages: MarketingPage[] = [
  {
    ...localPageBySlug('web-development-sri-lanka'),
    slug: 'website-development-sri-lanka',
    path: '/website-development-sri-lanka',
    title: 'Website Development Company in Sri Lanka | DexLanka',
    eyebrow: 'Website Development Sri Lanka',
    heading: 'Website Development Company in Sri Lanka',
    summary:
      'DexLanka builds mobile-friendly websites that help Sri Lankan customers find your business, understand your services, and contact you faster through WhatsApp, phone, or forms.',
    pricing: 'Starter websites begin from Rs 25,000 when the scope is simple. Business websites start from Rs 75,000 / Rs 120,000 depending on pages and features.',
    whatsappMessage: whatsappMessages.website,
  },
  {
    ...localPageBySlug('react-development-agency-sri-lanka'),
    slug: 'react-development-sri-lanka',
    path: '/react-development-sri-lanka',
    title: 'React Development Company in Sri Lanka | DexLanka',
    eyebrow: 'React Development Sri Lanka',
    heading: 'React Development Company in Sri Lanka',
    summary:
      'DexLanka builds modern React websites, dashboards, SaaS interfaces, admin panels, and custom web apps for Sri Lankan businesses and international startup teams.',
    whatsappMessage: whatsappMessages.international,
  },
  {
    ...localPageBySlug('supabase-developer-sri-lanka'),
    slug: 'supabase-development-sri-lanka',
    path: '/supabase-development-sri-lanka',
    title: 'Supabase Development Services in Sri Lanka | DexLanka',
    eyebrow: 'Supabase Development Sri Lanka',
    heading: 'Supabase Development Services in Sri Lanka',
    summary:
      'DexLanka builds Supabase-powered apps with authentication, PostgreSQL databases, storage, dashboards, APIs, and secure business workflows.',
    whatsappMessage: whatsappMessages.international,
  },
];

const industryBaseFaqs = (industry: string) => [
  {
    question: `How much does a ${industry.toLowerCase()} website cost?`,
    answer:
      'A simple website can start from Rs 25,000, while advanced booking, ordering, e-commerce, dashboard, or content-heavy websites are quoted after confirming the scope.',
  },
  {
    question: 'Can DexLanka connect WhatsApp and Google Maps?',
    answer:
      'Yes. Industry websites can include WhatsApp CTAs, Google Maps, phone links, inquiry forms, reviews, galleries, and local SEO wording.',
  },
  {
    question: 'Can the website be improved later?',
    answer:
      'Yes. You can start with the essentials and later add e-commerce, booking, blog, SEO pages, dashboards, analytics, or maintenance support.',
  },
];

const makeIndustryPage = ({
  slug,
  path,
  industry,
  features,
  problems,
  projectIds = [2, 7, 9],
}: {
  slug: string;
  path: string;
  industry: string;
  features: string[];
  problems: string;
  projectIds?: number[];
}): MarketingPage => ({
  slug,
  path,
  kind: 'industry',
  title: `${industry} Websites | DexLanka`,
  metaDescription: `DexLanka builds ${industry.toLowerCase()} websites in Sri Lanka with mobile-friendly design, WhatsApp CTAs, Google Maps, local SEO, pricing guidance, and inquiry forms.`,
  eyebrow: `${industry} Websites`,
  heading: `${industry} Website Design for Sri Lankan Businesses`,
  summary: `DexLanka builds ${industry.toLowerCase()} websites that help customers understand your offer, trust your business, and contact you faster through WhatsApp, phone, forms, and maps.`,
  problem: problems,
  solution: `We create a clear mobile-first website with service/product details, trust sections, local SEO wording, WhatsApp lead capture, contact options, and room to add advanced features later.`,
  whoFor: [industry, 'Sri Lankan SMEs', 'service businesses', 'shops', 'local business owners'],
  features,
  benefits: ['More local inquiries', 'Professional online trust', 'Better Google visibility', 'Faster WhatsApp leads', 'Clearer service presentation'],
  techStack: ['React', 'Tailwind CSS', 'SEO', 'Google Maps', 'WhatsApp', 'Analytics-ready setup'],
  pricing: 'Starter industry websites can begin from Rs 25,000. Final pricing depends on pages, content, features, integrations, and support requirements.',
  relatedProjectIds: projectIds,
  relatedServicePaths: ['/website-development-sri-lanka', '/ecommerce-website-development-sri-lanka', '/custom-software-development-sri-lanka'],
  faqs: industryBaseFaqs(industry),
  ctaLabel: `Get ${industry} Website Quote`,
  whatsappMessage: `Hi DexLanka, I need a ${industry.toLowerCase()} website. Can I get package details?`,
});

export const industryPages: MarketingPage[] = [
  {
    ...makeIndustryPage({
      slug: 'restaurant-websites',
      path: '/restaurant-websites',
      industry: 'Restaurant',
      problems: 'Restaurants often lose orders when menus are hard to view on mobile, locations are unclear, food photos are scattered on social media, and customers cannot quickly order or book a table.',
      features: ['Digital menu', 'WhatsApp orders', 'Table booking', 'Google Maps', 'Food gallery', 'Customer reviews', 'Mobile-friendly design', 'SEO setup', 'Delivery platform links', 'Starting price guidance'],
      projectIds: [2],
    }),
    title: 'Restaurant Websites in Sri Lanka | DexLanka',
    metaDescription:
      'Restaurant websites in Sri Lanka by DexLanka with digital menus, WhatsApp orders, table booking, Google Maps, food galleries, reviews, SEO, and quote CTAs.',
    heading: 'Restaurant Websites with Menus, WhatsApp Orders, and Table Booking',
    relatedServicePaths: ['/restaurant-website-design-sri-lanka', '/ecommerce-website-development-sri-lanka', '/website-development-sri-lanka'],
    faqs: [
      ...industryBaseFaqs('Restaurant'),
      {
        question: 'Can my restaurant website include delivery platform links?',
        answer: 'Yes. We can add links to Uber Eats, PickMe Food, direct WhatsApp ordering, phone ordering, and delivery information where relevant.',
      },
    ],
    whatsappMessage: whatsappMessages.restaurant,
  },
  makeIndustryPage({
    slug: 'shop-websites',
    path: '/shop-websites',
    industry: 'Shop',
    problems: 'Retail shops can lose sales when products, opening hours, location, stock details, and order options are only visible on social media posts.',
    features: ['Product highlights', 'WhatsApp inquiry buttons', 'Shop location map', 'Opening hours', 'Gallery', 'Product category pages', 'Customer trust sections', 'Local SEO'],
    projectIds: [8],
  }),
  makeIndustryPage({
    slug: 'salon-websites',
    path: '/salon-websites',
    industry: 'Salon',
    problems: 'Salons need customers to quickly see services, prices, styles, location, and booking options before they choose where to visit.',
    features: ['Service list', 'Price guidance', 'Gallery', 'WhatsApp booking', 'Google Maps', 'Opening hours', 'Reviews placeholder', 'Local SEO'],
  }),
  makeIndustryPage({
    slug: 'clinic-websites',
    path: '/clinic-websites',
    industry: 'Clinic',
    problems: 'Clinics need clear service information, doctor schedules, location details, appointment options, and trust content for patients searching on mobile.',
    features: ['Service pages', 'Appointment inquiry', 'Doctor/profile sections', 'Location map', 'Opening hours', 'FAQ', 'Mobile-friendly design', 'Local SEO'],
  }),
  makeIndustryPage({
    slug: 'travel-agency-websites',
    path: '/travel-agency-websites',
    industry: 'Travel Agency',
    problems: 'Travel agencies need to present tour packages, destinations, inquiry options, galleries, and trust details beyond scattered social media posts.',
    features: ['Tour package pages', 'Inquiry forms', 'WhatsApp quote buttons', 'Destination gallery', 'Itinerary sections', 'Reviews placeholder', 'SEO setup'],
    projectIds: [3],
  }),
  makeIndustryPage({
    slug: 'cake-shop-websites',
    path: '/cake-shop-websites',
    industry: 'Cake Shop',
    problems: 'Cake shops need customers to browse designs, understand order options, send references, and contact quickly for custom cake requests.',
    features: ['Cake gallery', 'Custom order inquiry', 'WhatsApp orders', 'Price guidance', 'Delivery area details', 'Reference upload placeholder', 'Local SEO'],
  }),
  makeIndustryPage({
    slug: 'personal-brand-websites',
    path: '/personal-brand-websites',
    industry: 'Personal Brand',
    problems: 'Personal brands need a professional website that organizes services, portfolio, social links, contact options, and credibility in one place.',
    features: ['Bio/about section', 'Portfolio', 'Services', 'Testimonials placeholder', 'Contact form', 'Social links', 'Blog-ready structure', 'SEO setup'],
    projectIds: [1, 7],
  }),
];

export const servicePages = [...localServicePages, ...requiredServiceAliasPages, ...industryPages, ...internationalServicePages];

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  category: 'Local SEO' | 'International SEO';
  excerpt: string;
  date: string;
  readingTime: string;
  relatedServicePaths: string[];
  sections: Array<{ heading: string; body: string; bullets?: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-website-development-company-homagama',
    title: 'Best Website Development Company in Homagama',
    metaDescription:
      'A practical guide for Homagama businesses choosing a website development company, including trust factors, SEO, WhatsApp CTAs, and pricing questions.',
    category: 'Local SEO',
    excerpt: 'How Homagama businesses can choose a web development partner that focuses on inquiries, trust, SEO, and mobile users.',
    date: '2026-05-09',
    readingTime: '4 min read',
    relatedServicePaths: ['/web-development-sri-lanka', '/restaurant-website-design-sri-lanka', '/custom-software-development-sri-lanka'],
    sections: [
      {
        heading: 'What local businesses should look for',
        body: 'A good website development company should understand your service area, customer behavior, mobile usage, and the inquiry path from Google search to WhatsApp or phone call.',
        bullets: ['Clear business copy', 'Fast mobile layout', 'SEO-ready page structure', 'Contact form and WhatsApp CTA'],
      },
      {
        heading: 'Why location still matters',
        body: 'For businesses in Homagama, Kottawa, Maharagama, Nugegoda, Gampaha, Kandy, Galle, and Colombo, local wording, map details, service pages, and trust sections can help users understand the service area.',
      },
      {
        heading: 'How DexLanka helps',
        body: 'DexLanka builds business websites with conversion-focused structure, mobile responsiveness, local SEO foundations, and ongoing support options.',
      },
    ],
    faqs: [
      { question: 'Can DexLanka work with Homagama businesses?', answer: 'Yes. DexLanka is based near Homagama and supports clients across Sri Lanka.' },
      { question: 'Do I need SEO for a small business website?', answer: 'Yes. Even basic SEO helps search engines understand your services, location, and business category.' },
    ],
  },
  {
    slug: 'website-cost-sri-lanka',
    title: 'How Much Does a Website Cost in Sri Lanka?',
    metaDescription:
      'Understand website pricing in Sri Lanka for starter, business, e-commerce, and custom website projects, including what affects the final cost.',
    category: 'Local SEO',
    excerpt: 'A practical breakdown of Sri Lankan website pricing and the features that change project cost.',
    date: '2026-05-09',
    readingTime: '5 min read',
    relatedServicePaths: ['/web-development-sri-lanka', '/ecommerce-website-development-sri-lanka', '/packages'],
    sections: [
      {
        heading: 'Typical website price ranges',
        body: 'A simple starter website can begin from Rs 25,000 when the project only needs a few pages and basic features. Business websites, e-commerce stores, POS systems, and custom software cost more based on functionality.',
        bullets: ['Starter Website: From Rs 25,000', 'Business Website: From Rs 75,000 / Rs 120,000', 'E-commerce Website: From Rs 180,000 / Rs 250,000'],
      },
      {
        heading: 'What changes the price',
        body: 'The final price depends on page count, copywriting, admin panels, payments, product uploads, design complexity, content, integrations, and support needs.',
      },
      {
        heading: 'How to get a useful quote',
        body: 'Share your business type, number of pages, required features, examples you like, and launch timeline so the estimate is based on real scope.',
      },
    ],
    faqs: [
      { question: 'Can I start small and upgrade later?', answer: 'Yes. Many businesses start with a focused website and add CMS, blog, or e-commerce features later.' },
      { question: 'Does hosting affect the price?', answer: 'Hosting, domains, email, and maintenance can be separate depending on the setup.' },
    ],
  },
  {
    slug: 'best-pos-system-small-shops-sri-lanka',
    title: 'Best POS System for Small Shops in Sri Lanka',
    metaDescription:
      'Learn what small shops in Sri Lanka should look for in a POS system, including billing, stock, invoices, staff access, and reports.',
    category: 'Local SEO',
    excerpt: 'Core POS features Sri Lankan shop owners should consider before choosing or building a system.',
    date: '2026-05-09',
    readingTime: '4 min read',
    relatedServicePaths: ['/pos-system-sri-lanka', '/inventory-management-system-sri-lanka', '/custom-software-development-sri-lanka'],
    sections: [
      {
        heading: 'Core POS features',
        body: 'Small shops need fast billing, product search, stock updates, invoices, returns, discounts, customer records, and daily sales reports.',
      },
      {
        heading: 'Why custom POS can help',
        body: 'A custom POS can match local workflows, staff roles, product categories, Sinhala/Tamil/English data needs, and reporting expectations.',
      },
      {
        heading: 'Planning before development',
        body: 'Before building a POS, list your products, branches, user roles, reports, printer needs, payment methods, and inventory process.',
      },
    ],
    faqs: [
      { question: 'Can POS and inventory be connected?', answer: 'Yes. Sales can update stock automatically when POS and inventory are built together.' },
      { question: 'Can DexLanka build a custom POS?', answer: 'Yes. DexLanka builds POS and inventory systems based on business workflow.' },
    ],
  },
  {
    slug: 'restaurants-sri-lanka-online-ordering-websites',
    title: 'Why Restaurants in Sri Lanka Need Online Ordering Websites',
    metaDescription:
      'See why Sri Lankan restaurants should use mobile-friendly websites with menus, WhatsApp orders, reservations, maps, and local SEO.',
    category: 'Local SEO',
    excerpt: 'How restaurant websites can reduce repeated questions and turn mobile visitors into orders or reservations.',
    date: '2026-05-09',
    readingTime: '4 min read',
    relatedServicePaths: ['/restaurant-website-design-sri-lanka', '/ecommerce-website-development-sri-lanka', '/web-development-sri-lanka'],
    sections: [
      {
        heading: 'Customers check menus first',
        body: 'Many diners search on mobile before calling or visiting. A clear menu page, location, opening hours, and WhatsApp CTA make that decision easier.',
      },
      {
        heading: 'Online ordering does not need to be complex',
        body: 'Restaurants can start with WhatsApp ordering and later move to cart, checkout, COD, delivery zones, or payment integration.',
      },
      {
        heading: 'Local SEO matters',
        body: 'Restaurant pages should include location wording, food categories, maps, photos, and metadata that match how customers search.',
      },
    ],
    faqs: [
      { question: 'Can a restaurant website use WhatsApp orders?', answer: 'Yes. WhatsApp ordering is a practical starting point for many Sri Lankan restaurants.' },
      { question: 'Can menu updates be handled later?', answer: 'Yes. Updates can be handled through maintenance or a CMS/admin panel.' },
    ],
  },
  {
    slug: 'start-online-store-sri-lanka',
    title: 'How to Start an Online Store in Sri Lanka',
    metaDescription:
      'A simple guide to starting an e-commerce website in Sri Lanka with products, COD, payments, delivery, inventory, and SEO.',
    category: 'Local SEO',
    excerpt: 'The key decisions Sri Lankan businesses should make before launching an online store.',
    date: '2026-05-09',
    readingTime: '5 min read',
    relatedServicePaths: ['/ecommerce-website-development-sri-lanka', '/inventory-management-system-sri-lanka', '/web-development-sri-lanka'],
    sections: [
      {
        heading: 'Start with the product and order flow',
        body: 'Define product categories, variants, delivery areas, payment options, COD process, order notifications, and who manages fulfillment.',
      },
      {
        heading: 'Plan trust signals',
        body: 'Add return policy, delivery details, WhatsApp contact, customer reviews, clear product photos, and secure checkout wording.',
      },
      {
        heading: 'Prepare for growth',
        body: 'Inventory, order dashboards, analytics, SEO pages, and product uploads should be planned early so the store can grow without a full rebuild.',
      },
    ],
    faqs: [
      { question: 'Can I start with COD only?', answer: 'Yes. Many stores start with COD and add online payments later.' },
      { question: 'Do I need an admin dashboard?', answer: 'Yes. A dashboard helps manage products, orders, customers, and inventory.' },
    ],
  },
  {
    slug: 'cod-vs-online-payment-sri-lankan-ecommerce',
    title: 'COD vs Online Payment for Sri Lankan E-commerce',
    metaDescription:
      'Compare COD and online payment options for Sri Lankan e-commerce stores, including trust, operations, order quality, and checkout planning.',
    category: 'Local SEO',
    excerpt: 'How to choose payment options for a Sri Lankan online store without hurting conversions or operations.',
    date: '2026-05-09',
    readingTime: '4 min read',
    relatedServicePaths: ['/ecommerce-website-development-sri-lanka', '/pos-system-sri-lanka', '/custom-software-development-sri-lanka'],
    sections: [
      {
        heading: 'COD can improve early trust',
        body: 'Cash on delivery is familiar to many Sri Lankan shoppers and can reduce hesitation for new stores.',
      },
      {
        heading: 'Online payment can improve commitment',
        body: 'Card or wallet payments can reduce fake orders and support smoother fulfillment, but require payment gateway setup and clear policies.',
      },
      {
        heading: 'Use both when possible',
        body: 'Many stores benefit from offering COD and online payments, then tracking order quality and customer behavior.',
      },
    ],
    faqs: [
      { question: 'Can DexLanka build COD checkout?', answer: 'Yes. COD can be included with order dashboard and WhatsApp alerts.' },
      { question: 'Can payment gateways be added later?', answer: 'Yes. Online payment can be added as a later phase if planned correctly.' },
    ],
  },
  {
    slug: 'website-features-hotels-villas-sri-lanka',
    title: 'Best Website Features for Hotels and Villas in Sri Lanka',
    metaDescription:
      'Important hotel and villa website features in Sri Lanka, including room pages, booking inquiries, photos, maps, reviews, and SEO.',
    category: 'Local SEO',
    excerpt: 'Features that help hotels, villas, and guest houses get more direct booking inquiries.',
    date: '2026-05-09',
    readingTime: '4 min read',
    relatedServicePaths: ['/hotel-booking-website-sri-lanka', '/web-development-sri-lanka', '/custom-software-development-sri-lanka'],
    sections: [
      {
        heading: 'Room and experience pages',
        body: 'Guests need clear room details, amenities, photos, check-in details, location, nearby attractions, and direct inquiry options.',
      },
      {
        heading: 'Trust and booking flow',
        body: 'A strong hotel website should include reviews, gallery, map, policies, WhatsApp, and a booking or availability inquiry flow.',
      },
      {
        heading: 'SEO for direct inquiries',
        body: 'Location-based pages and metadata can help travelers find your hotel outside large booking platforms.',
      },
    ],
    faqs: [
      { question: 'Can hotel websites include booking forms?', answer: 'Yes. Booking inquiry forms or custom availability flows can be included.' },
      { question: 'Can DexLanka build villa websites?', answer: 'Yes. DexLanka builds websites for villas, hotels, resorts, and guest houses.' },
    ],
  },
  {
    slug: 'small-businesses-more-whatsapp-inquiries',
    title: 'How Small Businesses Can Get More WhatsApp Inquiries',
    metaDescription:
      'Learn how Sri Lankan small businesses can improve WhatsApp inquiries with website CTAs, service pages, trust copy, forms, and local SEO.',
    category: 'Local SEO',
    excerpt: 'Simple website changes that make it easier for mobile visitors to contact your business on WhatsApp.',
    date: '2026-05-09',
    readingTime: '4 min read',
    relatedServicePaths: ['/web-development-sri-lanka', '/restaurant-website-design-sri-lanka', '/custom-software-development-sri-lanka'],
    sections: [
      {
        heading: 'Make the CTA specific',
        body: 'Use clear buttons such as Get Free Website Quote, Talk on WhatsApp, or Request a Free Consultation instead of vague contact text.',
      },
      {
        heading: 'Use pre-filled messages',
        body: 'Pre-filled WhatsApp text helps customers start with useful context and reduces back-and-forth.',
      },
      {
        heading: 'Build trust before the CTA',
        body: 'Add service details, project examples, FAQs, support promises, pricing guidance, and contact consistency.',
      },
    ],
    faqs: [
      { question: 'Should WhatsApp be sticky?', answer: 'A sticky WhatsApp button can help mobile users contact you without searching for details.' },
      { question: 'Can DexLanka add this to my website?', answer: 'Yes. DexLanka can add conversion-focused CTAs and WhatsApp flows.' },
    ],
  },
  {
    slug: 'why-every-sri-lankan-business-needs-website',
    title: 'Why Every Sri Lankan Business Needs a Website',
    metaDescription:
      'Learn why Sri Lankan businesses need websites for Google visibility, trust, WhatsApp leads, service presentation, and long-term brand value.',
    category: 'Local SEO',
    excerpt: 'A business website gives Sri Lankan customers one trusted place to understand your services and contact you.',
    date: '2026-05-10',
    readingTime: '4 min read',
    relatedServicePaths: ['/website-development-sri-lanka', '/restaurant-websites', '/shop-websites'],
    sections: [
      {
        heading: 'A website builds trust beyond social media',
        body: 'Customers may find you on Facebook, Instagram, TikTok, or Google, but a website gives your business a professional home with your services, location, contact details, portfolio, and proof in one place.',
      },
      {
        heading: 'Google visibility creates long-term value',
        body: 'A properly structured website can rank for service, location, and industry searches in Sri Lanka, helping customers find you even when they are not following your social pages.',
      },
      {
        heading: 'WhatsApp lead capture becomes easier',
        body: 'Clear website CTAs can send customers directly to WhatsApp with useful pre-filled messages, reducing friction and making inquiries easier to track.',
      },
    ],
    faqs: [
      { question: 'Is a Facebook page enough for a small business?', answer: 'A Facebook page helps, but a website gives stronger control, search visibility, structure, and professional trust.' },
      { question: 'Can I start with a simple website?', answer: 'Yes. Many businesses start with a focused 1-3 page website and improve it later.' },
    ],
  },
  {
    slug: 'website-vs-facebook-page-business-sri-lanka',
    title: 'Website vs Facebook Page: What Is Better for Your Business?',
    metaDescription:
      'Compare websites and Facebook pages for Sri Lankan businesses, including trust, Google visibility, control, WhatsApp leads, and long-term growth.',
    category: 'Local SEO',
    excerpt: 'A Facebook page can support marketing, but a website gives your business more control and search visibility.',
    date: '2026-05-10',
    readingTime: '4 min read',
    relatedServicePaths: ['/website-development-sri-lanka', '/shop-websites', '/personal-brand-websites'],
    sections: [
      {
        heading: 'Facebook is useful, but you do not control the platform',
        body: 'Social platforms can change reach, layouts, rules, and visibility. A website gives your business a stable place to present services, pricing, FAQs, contact options, and proof.',
      },
      {
        heading: 'Websites work better for Google search',
        body: 'Customers searching for restaurants, shops, clinics, salons, software companies, and local services often use Google. A website gives Google structured pages to understand and index.',
      },
      {
        heading: 'Use both together',
        body: 'The best setup is often a website for trust and search, with Facebook and Instagram used for updates, community, ads, and retargeting.',
      },
    ],
    faqs: [
      { question: 'Should I close my Facebook page after building a website?', answer: 'No. Keep social pages active and link them to your website for a stronger overall presence.' },
      { question: 'Can DexLanka turn my Facebook page into a website?', answer: 'Yes. DexLanka can use your existing content, photos, services, and contact details to plan a professional website.' },
    ],
  },
  {
    slug: 'restaurant-website-features-sri-lanka',
    title: 'Best Features for a Restaurant Website in Sri Lanka',
    metaDescription:
      'Important restaurant website features in Sri Lanka, including digital menus, WhatsApp orders, table booking, Google Maps, food galleries, reviews, and SEO.',
    category: 'Local SEO',
    excerpt: 'Restaurant websites should help mobile visitors see the menu, order, book, find the location, and trust the food experience.',
    date: '2026-05-10',
    readingTime: '4 min read',
    relatedServicePaths: ['/restaurant-website-design-sri-lanka', '/restaurant-websites', '/ecommerce-website-development-sri-lanka'],
    sections: [
      {
        heading: 'Start with the mobile menu',
        body: 'Customers often check menus from phones. A restaurant website should load quickly, show food categories clearly, and make it easy to call or message before ordering.',
        bullets: ['Digital menu', 'Food gallery', 'Price guidance', 'WhatsApp order CTA'],
      },
      {
        heading: 'Make location and booking easy',
        body: 'Google Maps, opening hours, table booking, phone links, and parking or delivery notes reduce repeated questions and help customers decide faster.',
      },
      {
        heading: 'Add trust and local SEO',
        body: 'Reviews, real food photos, delivery platform links, schema, metadata, and area wording can help the restaurant look more credible and searchable.',
      },
    ],
    faqs: [
      { question: 'Can a restaurant website start without online payments?', answer: 'Yes. Many restaurants start with WhatsApp ordering and table booking before adding checkout or payments.' },
      { question: 'Can DexLanka add menu updates later?', answer: 'Yes. Updates can be handled through maintenance or a content/admin setup.' },
    ],
  },
  {
    slug: 'what-is-pos-system-shops-sri-lanka',
    title: 'What Is a POS System and Why Shops Need It?',
    metaDescription:
      'Understand what a POS system does for Sri Lankan shops, including billing, sales, stock, customers, invoices, staff access, and reports.',
    category: 'Local SEO',
    excerpt: 'A POS system helps shops bill faster, track stock, manage customers, and understand daily sales.',
    date: '2026-05-10',
    readingTime: '4 min read',
    relatedServicePaths: ['/pos-system-sri-lanka', '/inventory-management-system-sri-lanka', '/custom-software-development-sri-lanka'],
    sections: [
      {
        heading: 'A POS system connects sales and stock',
        body: 'Instead of writing bills manually, a POS system records products, sales, discounts, returns, invoices, staff actions, and stock movement in one place.',
      },
      {
        heading: 'Shops need clearer reports',
        body: 'Daily sales, best-selling items, low-stock products, customer records, and staff activity reports help owners make better decisions.',
      },
      {
        heading: 'Custom POS can match your workflow',
        body: 'Some shops need branch support, product variants, barcode flows, supplier records, repair jobs, or Sinhala/Tamil/English data. Custom development can fit those needs.',
      },
    ],
    faqs: [
      { question: 'Can POS and inventory work together?', answer: 'Yes. Sales can reduce stock automatically when POS and inventory are connected.' },
      { question: 'Can DexLanka build a POS system for small shops?', answer: 'Yes. DexLanka builds POS and inventory systems based on business workflow and scope.' },
    ],
  },
  {
    slug: 'inventory-management-software-small-businesses',
    title: 'How Inventory Management Software Helps Small Businesses',
    metaDescription:
      'Learn how inventory management software helps small businesses track stock, suppliers, purchases, sales, low-stock alerts, and reports.',
    category: 'Local SEO',
    excerpt: 'Inventory software helps business owners reduce stock confusion and get clearer reports.',
    date: '2026-05-10',
    readingTime: '4 min read',
    relatedServicePaths: ['/inventory-management-system-sri-lanka', '/pos-system-sri-lanka', '/custom-software-development-sri-lanka'],
    sections: [
      {
        heading: 'Spreadsheets become hard to manage',
        body: 'As products, suppliers, staff, and branches increase, spreadsheets can become slow, error-prone, and difficult to keep updated.',
      },
      {
        heading: 'Inventory software creates one source of truth',
        body: 'Stock levels, purchases, sales, adjustments, suppliers, product costs, and low-stock alerts can be managed from a central system.',
      },
      {
        heading: 'Reports help owners act faster',
        body: 'Clear reports can show stock value, fast-moving products, slow-moving products, reorder needs, and branch-level performance.',
      },
    ],
    faqs: [
      { question: 'Can existing spreadsheet data be imported?', answer: 'Yes, when the data is clean enough to map into the new system.' },
      { question: 'Can inventory software include staff access?', answer: 'Yes. User roles can control what each staff member can see or change.' },
    ],
  },
  {
    slug: 'react-vs-wordpress-business-websites',
    title: 'React vs WordPress: Which Is Better for Business Websites?',
    metaDescription:
      'Compare React and WordPress for business websites, including performance, SEO, admin editing, custom features, cost, and maintenance.',
    category: 'Local SEO',
    excerpt: 'React and WordPress can both work for business websites, but the better choice depends on content, features, budget, and support.',
    date: '2026-05-10',
    readingTime: '5 min read',
    relatedServicePaths: ['/react-development-sri-lanka', '/website-development-sri-lanka', '/custom-software-development-sri-lanka'],
    sections: [
      {
        heading: 'WordPress is strong for content editing',
        body: 'WordPress can be a good fit when a business needs frequent content edits, many blog posts, and familiar CMS workflows.',
      },
      {
        heading: 'React is strong for custom interfaces',
        body: 'React works well for custom websites, dashboards, SaaS products, interactive experiences, and web apps that need tailored UI and app-like behavior.',
      },
      {
        heading: 'Choose based on business needs',
        body: 'The best choice depends on admin editing needs, performance goals, SEO plan, design complexity, custom features, hosting, and maintenance expectations.',
      },
    ],
    faqs: [
      { question: 'Is React good for SEO?', answer: 'React can be SEO-ready when metadata, prerendering/static generation, sitemap, schema, and content structure are handled properly.' },
      { question: 'Can DexLanka help choose the stack?', answer: 'Yes. DexLanka can review your goals and recommend a practical stack.' },
    ],
  },
  {
    slug: 'choose-software-company-sri-lanka',
    title: 'How to Choose a Software Company in Sri Lanka',
    metaDescription:
      'Learn how to choose a software company in Sri Lanka for websites, apps, POS systems, inventory systems, dashboards, and custom software.',
    category: 'Local SEO',
    excerpt: 'Choose a software company based on clarity, process, relevant work, communication, scope, support, and business understanding.',
    date: '2026-05-10',
    readingTime: '5 min read',
    relatedServicePaths: ['/custom-software-development-sri-lanka', '/website-development-sri-lanka', '/mobile-app-development-sri-lanka'],
    sections: [
      {
        heading: 'Look for clear scope and business understanding',
        body: 'A good software company should ask about your workflow, customers, staff roles, reporting needs, budget, and timeline before giving a serious quote.',
      },
      {
        heading: 'Review communication and support',
        body: 'Fast communication, documented scope, staged delivery, testing, maintenance, and launch support matter as much as design and code.',
      },
      {
        heading: 'Avoid choosing by lowest price only',
        body: 'Very low pricing can lead to missing features, weak support, poor security, or a rebuild later. Compare what is included and excluded.',
      },
    ],
    faqs: [
      { question: 'Should I request a proposal?', answer: 'Yes. A proposal should explain scope, timeline, price, deliverables, support, and assumptions.' },
      { question: 'Can DexLanka provide a scoped quote?', answer: 'Yes. DexLanka can prepare a quote after understanding the project requirements.' },
    ],
  },
  {
    slug: 'mobile-friendly-websites-get-more-customers',
    title: 'Why Mobile-Friendly Websites Get More Customers',
    metaDescription:
      'See why mobile-friendly websites improve inquiries, trust, SEO, WhatsApp clicks, speed, and user experience for Sri Lankan businesses.',
    category: 'Local SEO',
    excerpt: 'Most customers check businesses from phones, so mobile layout directly affects trust and inquiries.',
    date: '2026-05-10',
    readingTime: '4 min read',
    relatedServicePaths: ['/website-development-sri-lanka', '/restaurant-websites', '/ecommerce-website-development-sri-lanka'],
    sections: [
      {
        heading: 'Mobile visitors decide quickly',
        body: 'If text is hard to read, buttons are too small, images are slow, or contact details are hidden, visitors may leave before sending a WhatsApp message.',
      },
      {
        heading: 'Mobile UX supports SEO and conversions',
        body: 'Fast pages, stable layouts, readable content, clear headings, and visible CTAs help both users and search engines understand the site.',
      },
      {
        heading: 'WhatsApp should be easy to reach',
        body: 'Mobile websites should place WhatsApp, phone, forms, and map links in predictable places so customers can contact without hunting.',
      },
    ],
    faqs: [
      { question: 'Can DexLanka improve an old mobile layout?', answer: 'Yes. DexLanka can redesign or optimize existing pages for mobile usability and conversions.' },
      { question: 'Does mobile speed matter?', answer: 'Yes. Slow mobile pages can reduce inquiries and affect Core Web Vitals.' },
    ],
  },
  {
    slug: 'react-supabase-mvp-development-guide',
    title: 'React + Supabase MVP Development Guide',
    metaDescription:
      'A startup-friendly guide to building MVPs with React and Supabase, covering auth, database, storage, dashboards, and launch scope.',
    category: 'International SEO',
    excerpt: 'Why React and Supabase are a practical stack for many SaaS MVPs and internal tools.',
    date: '2026-05-09',
    readingTime: '5 min read',
    relatedServicePaths: ['/react-supabase-development-agency', '/saas-mvp-development', '/supabase-developer-sri-lanka'],
    sections: [
      {
        heading: 'Why this stack works for MVPs',
        body: 'React gives a flexible frontend while Supabase provides authentication, PostgreSQL, storage, and APIs without building every backend feature from scratch.',
      },
      {
        heading: 'What to plan first',
        body: 'Define user roles, core workflows, data model, dashboard needs, file storage, and launch metrics before development.',
      },
      {
        heading: 'Avoid overbuilding',
        body: 'Start with the feature set needed to validate the product, then add billing, automation, and advanced analytics after user feedback.',
      },
    ],
    faqs: [
      { question: 'Is Supabase enough for a SaaS MVP?', answer: 'For many MVPs, yes. The final choice depends on data, scale, security, and integration requirements.' },
      { question: 'Can DexLanka build React + Supabase apps?', answer: 'Yes. DexLanka builds React, Supabase, Next.js, dashboard, and SaaS MVP solutions.' },
    ],
  },
  {
    slug: 'laravel-blade-to-react-migration-checklist',
    title: 'Laravel Blade to React Migration Checklist',
    metaDescription:
      'A practical checklist for migrating Laravel Blade interfaces to React without breaking existing backend workflows.',
    category: 'International SEO',
    excerpt: 'How to plan a Laravel Blade to React migration in safer phases.',
    date: '2026-05-09',
    readingTime: '5 min read',
    relatedServicePaths: ['/laravel-to-react-migration', '/react-development-agency-sri-lanka', '/admin-dashboard-development'],
    sections: [
      {
        heading: 'Audit before rebuilding',
        body: 'List current pages, forms, data dependencies, authentication behavior, permissions, API readiness, and high-risk workflows.',
      },
      {
        heading: 'Choose a migration path',
        body: 'Some teams migrate screen by screen, while others rebuild a separate frontend consuming Laravel APIs.',
      },
      {
        heading: 'Test critical flows',
        body: 'Authentication, forms, validation, payments, admin actions, and reporting should be tested before each release.',
      },
    ],
    faqs: [
      { question: 'Can Laravel stay as the backend?', answer: 'Yes. React can often become the frontend while Laravel remains the backend API.' },
      { question: 'Can migration be phased?', answer: 'Yes. Phased migration can reduce risk for active products.' },
    ],
  },
  {
    slug: 'best-tech-stack-small-saas-mvp',
    title: 'Best Tech Stack for a Small SaaS MVP',
    metaDescription:
      'Compare practical tech stack choices for a small SaaS MVP, including React, Next.js, Supabase, PostgreSQL, Cloudflare, and payment-ready flows.',
    category: 'International SEO',
    excerpt: 'A pragmatic SaaS MVP stack for founders who need speed, affordability, and maintainability.',
    date: '2026-05-09',
    readingTime: '5 min read',
    relatedServicePaths: ['/saas-mvp-development', '/react-supabase-development-agency', '/startup-web-app-development'],
    sections: [
      {
        heading: 'Prioritize speed and maintainability',
        body: 'A good MVP stack should help you launch quickly without creating a codebase that becomes expensive to change.',
      },
      {
        heading: 'A practical starting stack',
        body: 'React or Next.js, Supabase/PostgreSQL, Tailwind CSS, Cloudflare hosting, and analytics can cover many early SaaS needs.',
      },
      {
        heading: 'When to customize',
        body: 'Complex compliance, enterprise integrations, real-time scale, or advanced billing may require additional backend planning.',
      },
    ],
    faqs: [
      { question: 'Is Next.js required for every SaaS?', answer: 'No. The right choice depends on SEO needs, app structure, hosting, and team preferences.' },
      { question: 'Can DexLanka advise on stack choice?', answer: 'Yes. A free project audit can clarify the right stack for your MVP.' },
    ],
  },
  {
    slug: 'startup-web-app-cost',
    title: 'How Much Does a Startup Web App Cost?',
    metaDescription:
      'Understand startup web app cost drivers such as scope, design, authentication, dashboards, integrations, billing, and ongoing support.',
    category: 'International SEO',
    excerpt: 'The main factors that affect startup web app pricing and how to scope an MVP responsibly.',
    date: '2026-05-09',
    readingTime: '5 min read',
    relatedServicePaths: ['/startup-web-app-development', '/saas-mvp-development', '/admin-dashboard-development'],
    sections: [
      {
        heading: 'Cost follows scope',
        body: 'Authentication, roles, dashboards, databases, integrations, billing, design complexity, and reporting all change the estimate.',
      },
      {
        heading: 'Start with a useful MVP',
        body: 'Founders can control cost by launching the smallest version that solves the core problem and collects feedback.',
      },
      {
        heading: 'Plan post-launch work',
        body: 'Budget for fixes, hosting, monitoring, improvements, and new features after users test the first version.',
      },
    ],
    faqs: [
      { question: 'Can DexLanka provide a fixed quote?', answer: 'Yes, after scope is clear enough to define deliverables and milestones.' },
      { question: 'Can the project be split into phases?', answer: 'Yes. Phased delivery is often the best way to reduce risk and cost.' },
    ],
  },
  {
    slug: 'react-admin-dashboard-development-guide',
    title: 'React Admin Dashboard Development Guide',
    metaDescription:
      'A guide to building React admin dashboards with role-based access, data tables, reports, filters, charts, and operational workflows.',
    category: 'International SEO',
    excerpt: 'What a useful admin dashboard should include before development starts.',
    date: '2026-05-09',
    readingTime: '5 min read',
    relatedServicePaths: ['/admin-dashboard-development', '/react-development-agency-sri-lanka', '/supabase-developer-sri-lanka'],
    sections: [
      {
        heading: 'Start with user roles',
        body: 'Admin, manager, staff, support, and customer roles determine screens, permissions, and data visibility.',
      },
      {
        heading: 'Design around daily tasks',
        body: 'Dashboards should support repeated actions such as searching, filtering, editing, approving, exporting, and reporting.',
      },
      {
        heading: 'Keep UI predictable',
        body: 'Tables, tabs, forms, filters, charts, and status badges should be consistent so users can work quickly.',
      },
    ],
    faqs: [
      { question: 'Can dashboards include charts?', answer: 'Yes. Charts and reports can be added for sales, inventory, users, orders, or custom metrics.' },
      { question: 'Can DexLanka connect to existing data?', answer: 'Yes. Dashboards can connect to APIs, Supabase, PostgreSQL, or other available systems.' },
    ],
  },
  {
    slug: 'why-hire-sri-lankan-software-developer',
    title: 'Why Hire a Sri Lankan Software Developer?',
    metaDescription:
      'Learn why startups and small businesses hire Sri Lankan software developers for affordable React, SaaS, dashboard, and custom web app development.',
    category: 'International SEO',
    excerpt: 'Why Sri Lankan development teams can be a practical option for startups that need modern software at sensible cost.',
    date: '2026-05-09',
    readingTime: '4 min read',
    relatedServicePaths: ['/hire-react-developer-sri-lanka', '/react-supabase-development-agency', '/startup-web-app-development'],
    sections: [
      {
        heading: 'Good value for startup work',
        body: 'Sri Lankan software teams can offer strong technical delivery at rates that are practical for startups, small businesses, and agencies.',
      },
      {
        heading: 'Remote collaboration is normal',
        body: 'Clear milestones, async communication, demos, and documentation make remote software work manageable across time zones.',
      },
      {
        heading: 'Choose for fit, not only price',
        body: 'Review communication, technical stack, past work, process, and support expectations before hiring any developer.',
      },
    ],
    faqs: [
      { question: 'Does DexLanka work internationally?', answer: 'Yes. DexLanka supports international startups and small businesses remotely.' },
      { question: 'Can I hire DexLanka for React work?', answer: 'Yes. DexLanka supports React websites, dashboards, web apps, and MVPs.' },
    ],
  },
];

export const getServicePageByPath = (path: string) => servicePages.find((page) => page.path === path);

export const getBlogPostBySlug = (slug?: string) => blogPosts.find((post) => post.slug === slug);
