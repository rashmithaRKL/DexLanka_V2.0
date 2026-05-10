export const SITE_URL = 'https://dexlanka.com';

export const BUSINESS_INFO = {
  name: 'DexLanka Software Solutions',
  shortName: 'DexLanka',
  location: 'Meegoda, Homagama, Sri Lanka',
  addressLocality: 'Meegoda',
  addressRegion: 'Western Province',
  addressCountry: 'LK',
  phone: '+94 70 558 8789',
  phoneHref: '+94705588789',
  email: 'info@dexlanka.com',
  hours: 'Monday to Saturday, 9:00 AM to 6:00 PM',
  website: SITE_URL,
  whatsappMessage:
    'Hi DexLanka, I am interested in building a website/app/software system for my business. Can I get a free quote?',
};

export const whatsappUrl = `https://wa.me/${BUSINESS_INFO.phoneHref.replace('+', '')}?text=${encodeURIComponent(
  BUSINESS_INFO.whatsappMessage
)}`;

export const serviceAreas = [
  'Homagama',
  'Meegoda',
  'Kottawa',
  'Maharagama',
  'Nugegoda',
  'Colombo',
  'Gampaha',
  'Negombo',
  'Kandy',
  'Galle',
  'Kurunegala',
  'All Sri Lanka',
];

export const trustTechnologies = ['React', 'Supabase', 'Next.js', 'Cloudflare', 'UI/UX', 'SEO', 'Mobile Responsive'];

export const whyDexLanka = [
  'Modern mobile-responsive design',
  'Local Sri Lankan support',
  'Clear communication',
  'Business-focused software',
  'SEO-ready website structure',
  'Ongoing maintenance and support',
  'International-ready development quality',
];

export const processSteps = [
  {
    title: 'Free consultation',
    description: 'We clarify your business goal, target customers, must-have features, budget, and launch timeline.',
  },
  {
    title: 'Design',
    description: 'We plan the content, user journey, UI structure, and conversion points before development starts.',
  },
  {
    title: 'Development',
    description: 'We build the website, app, dashboard, POS, inventory system, or custom software using modern tools.',
  },
  {
    title: 'Testing',
    description: 'We test mobile responsiveness, forms, speed, browser behavior, SEO basics, and key business flows.',
  },
  {
    title: 'Launch',
    description: 'We help deploy the project, connect domains, set up analytics, and prepare the handover.',
  },
  {
    title: 'Support',
    description: 'After launch, DexLanka can help with updates, backups, bug fixes, hosting checks, and improvements.',
  },
];

export const packageGuidance = [
  {
    title: 'Starter Website',
    price: 'LKR 45,000-85,000',
    features: ['5 pages', 'Mobile responsive design', 'WhatsApp button', 'Contact form', 'Google Map', 'Basic SEO'],
  },
  {
    title: 'Business Website',
    price: 'LKR 120,000-250,000',
    features: ['10 pages', 'CMS/admin panel', 'Blog', 'SEO setup', 'Analytics', 'Social integration'],
    isPopular: true,
  },
  {
    title: 'E-commerce Website',
    price: 'LKR 250,000-600,000+',
    features: ['Products', 'Cart', 'Checkout', 'Payment/COD', 'Order dashboard', 'WhatsApp order alerts'],
  },
  {
    title: 'POS / Inventory System',
    price: 'LKR 300,000-1,200,000+',
    features: ['Products', 'Stock control', 'Invoices', 'Staff login', 'Reports', 'Suppliers and customers'],
  },
  {
    title: 'Maintenance',
    price: 'LKR 10,000-50,000/month',
    features: ['Updates', 'Backups', 'Content changes', 'Support', 'Hosting monitoring', 'Bug fixes'],
  },
];

export const homepageFaqs = [
  {
    question: 'How much does a website cost in Sri Lanka?',
    answer:
      'A basic business website usually starts from LKR 45,000, while CMS, e-commerce, POS, inventory, and custom software projects depend on features, integrations, and timeline.',
  },
  {
    question: 'Can DexLanka build websites for businesses outside Sri Lanka?',
    answer:
      'Yes. DexLanka works with Sri Lankan SMEs and international startups on React, Supabase, Next.js, SaaS, dashboard, and custom web app projects.',
  },
  {
    question: 'Do you provide support after launch?',
    answer:
      'Yes. DexLanka can help with updates, backups, content changes, bug fixes, hosting monitoring, SEO improvements, and ongoing maintenance.',
  },
  {
    question: 'Can I request a free quote on WhatsApp?',
    answer:
      'Yes. Use the WhatsApp quote button and share your project idea, business type, needed features, and preferred timeline.',
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
  kind: 'local' | 'international';
  title: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  summary: string;
  whoFor: string[];
  features: string[];
  benefits: string[];
  techStack: string[];
  pricing: string;
  relatedProjectIds: number[];
  relatedServicePaths: string[];
  faqs: Array<{ question: string; answer: string }>;
  ctaLabel: string;
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
        answer: 'Yes. DexLanka supports businesses in Homagama, Meegoda, Colombo, nearby areas, and all Sri Lanka.',
      },
      {
        question: 'Will my website include WhatsApp and Google Map?',
        answer: 'Yes. Business websites can include WhatsApp CTAs, contact forms, Google Map embeds, and service area content.',
      },
    ],
    ctaLabel: 'Get Free Website Quote',
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
  },
  {
    slug: 'restaurant-website-design-sri-lanka',
    path: '/restaurant-website-design-sri-lanka',
    kind: 'local',
    title: 'Restaurant Website Design in Sri Lanka | DexLanka',
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
    pricing: 'Restaurant websites can start from the starter website range, with online ordering scoped separately.',
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
    title: 'Laravel to React Migration | DexLanka',
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

export const servicePages = [...localServicePages, ...internationalServicePages];

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
        body: 'For businesses in Homagama, Meegoda, Kottawa, Maharagama, and Colombo, local wording, map details, service pages, and trust sections can help users understand that support is nearby.',
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
    slug: 'business-website-cost-sri-lanka',
    title: 'How Much Does a Business Website Cost in Sri Lanka?',
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
        body: 'A starter website may range from LKR 45,000-85,000, while business websites, e-commerce stores, and custom systems cost more based on functionality.',
        bullets: ['Starter Website: LKR 45,000-85,000', 'Business Website: LKR 120,000-250,000', 'E-commerce Website: LKR 250,000-600,000+'],
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
    slug: 'start-ecommerce-website-sri-lanka',
    title: 'How to Start an E-commerce Website in Sri Lanka',
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
