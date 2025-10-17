import Note from '../assets/images/Note.png';
import Art from '../assets/images/image.png';
import Fast from '../assets/images/fast.png';
import Book from '../assets/images/book.png';
import Tech from '../assets/images/tech.png';
import Hotel from '../assets/images/hotel.png';
import Resort from '../assets/images/resort.png';
import Food from '../assets/images/food.png';
import Pixel from '../assets/images/pixel.png';
import Design from '../assets/images/design.png';
import Com from '../assets/images/Com.png';
import Create from '../assets/images/create.png';

export interface ProjectDetails {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  projectDuration: string;
  client: string;
  featured: boolean;
  overview: string;
  keyFeatures: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  testimonials?: {
    quote: string;
    author: string;
    position: string;
  };
}

export const projectDetails: ProjectDetails[] = [
  {
    id: 1,
    title: "Scriptoria",
    category: "Web Development Literary Masterpieces",
    imageUrl: Book,
    description: "A professional and elegant website designed to showcase creative writing and development services.",
    liveDemoUrl: "https://rashmitharkl.github.io/booksmith_interactive/",
    githubUrl: "https://github.com/rashmitharkl/booksmith_interactive",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    projectDuration: "3 weeks",
    client: "Literary Publishing House",
    featured: true,
    overview: "Scriptoria is a sophisticated web platform designed for literary enthusiasts and creative writers. The project involved creating an immersive digital experience that showcases literary works while providing tools for writers to manage and publish their content.",
    keyFeatures: [
      "Interactive book showcase with 3D animations",
      "Writer dashboard for content management",
      "Advanced search and filtering system",
      "Responsive design for all devices",
      "SEO optimization for better visibility",
      "Social media integration"
    ],
    challenges: [
      "Creating smooth 3D book animations without performance issues",
      "Implementing complex search algorithms for large content libraries",
      "Ensuring cross-browser compatibility for older devices"
    ],
    solutions: [
      "Used CSS transforms and GPU acceleration for smooth animations",
      "Implemented Elasticsearch for fast and accurate search results",
      "Created progressive enhancement for older browsers"
    ],
    results: [
      "40% increase in user engagement",
      "60% faster page load times",
      "95% user satisfaction rating",
      "Featured in top literary blogs"
    ],
    testimonials: {
      quote: "Scriptoria transformed how we showcase our literary works. The interactive features and smooth animations have significantly increased reader engagement.",
      author: "Sarah Johnson",
      position: "Editor-in-Chief"
    }
  },
  {
    id: 2,
    title: "Delectable Restaurant",
    category: "Web Development",
    imageUrl: Hotel,
    description: "A stylish and modern website designed to showcase culinary artistry and dining experiences.",
    liveDemoUrl: "https://rashmitharkl.github.io/delectable/",
    githubUrl: "https://github.com/rashmitharkl/delectable",
    technologies: ["React", "CSS3", "JavaScript", "Node.js", "MongoDB"],
    projectDuration: "4 weeks",
    client: "Delectable Restaurant Chain",
    featured: true,
    overview: "Delectable Restaurant's website combines elegant design with powerful functionality to create an unforgettable online dining experience. The platform features menu management, online reservations, and customer reviews.",
    keyFeatures: [
      "Dynamic menu with real-time updates",
      "Online reservation system",
      "Customer review and rating system",
      "Mobile-optimized ordering interface",
      "Multi-location support",
      "Integration with POS systems"
    ],
    challenges: [
      "Synchronizing menu updates across multiple locations",
      "Implementing secure payment processing",
      "Creating intuitive reservation management"
    ],
    solutions: [
      "Built centralized menu management system",
      "Integrated Stripe for secure payments",
      "Developed admin dashboard for reservation tracking"
    ],
    results: [
      "35% increase in online reservations",
      "50% reduction in phone call volume",
      "4.8/5 customer satisfaction rating",
      "25% increase in average order value"
    ],
    testimonials: {
      quote: "The new website has revolutionized our customer experience. Online reservations have streamlined our operations significantly.",
      author: "Chef Marco Rossi",
      position: "Head Chef & Owner"
    }
  },
  {
    id: 3,
    title: "Tranquil Haven Resort",
    category: "Web Development",
    imageUrl: Resort,
    description: "A refined website crafted to highlight luxury stays and exceptional guest experiences.",
    liveDemoUrl: "https://rashmitharkl.github.io/tranquil_haven/",
    githubUrl: "https://github.com/rashmitharkl/tranquil_haven",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    projectDuration: "6 weeks",
    client: "Tranquil Haven Resort Group",
    featured: false,
    overview: "Tranquil Haven Resort's website showcases luxury accommodations with stunning visuals and seamless booking functionality. The platform emphasizes the resort's unique amenities and personalized guest services.",
    keyFeatures: [
      "Virtual tour with 360° room views",
      "Real-time availability and pricing",
      "Guest service portal",
      "Event planning and booking",
      "Multi-language support",
      "Mobile app integration"
    ],
    challenges: [
      "Creating immersive virtual tours",
      "Integrating complex booking algorithms",
      "Managing multiple property locations"
    ],
    solutions: [
      "Implemented WebGL for 360° virtual tours",
      "Built dynamic pricing engine",
      "Created centralized property management system"
    ],
    results: [
      "45% increase in direct bookings",
      "30% reduction in booking cancellations",
      "4.9/5 guest satisfaction rating",
      "200% increase in virtual tour engagement"
    ],
    testimonials: {
      quote: "The virtual tour feature has been a game-changer. Guests can now experience our resort before booking, leading to higher satisfaction rates.",
      author: "Emma Thompson",
      position: "Resort Manager"
    }
  },
  {
    id: 4,
    title: "Tech Venture",
    category: "Web Development",
    imageUrl: Tech,
    description: "Modern, responsive website showcasing the latest in tech innovation.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    projectDuration: "2 weeks",
    client: "Tech Innovation Hub",
    featured: false,
    overview: "Tech Venture is a cutting-edge platform designed to showcase innovative technology solutions and connect startups with investors. The website features dynamic content management and real-time analytics.",
    keyFeatures: [
      "Dynamic startup showcase",
      "Investor matching system",
      "Real-time market analytics",
      "Interactive technology demos",
      "News and blog integration",
      "Event management system"
    ],
    challenges: [
      "Handling large amounts of real-time data",
      "Creating engaging technology demonstrations",
      "Implementing complex matching algorithms"
    ],
    solutions: [
      "Used WebSockets for real-time updates",
      "Built interactive demo framework",
      "Implemented AI-powered matching system"
    ],
    results: [
      "60% increase in investor engagement",
      "40% more successful startup connections",
      "50% improvement in demo completion rates",
      "Featured in TechCrunch"
    ]
  },
  {
    id: 5,
    title: "Art Gallery",
    category: "Web Development",
    imageUrl: Art,
    description: "Elegant and responsive website designed to elevate the art viewing experience online.",
    liveDemoUrl: "https://rashmitharkl.github.io/Art-Gallery/",
    githubUrl: "https://github.com/rashmitharkl/Art-Gallery",
    technologies: ["React", "CSS3", "JavaScript", "Three.js", "WebGL"],
    projectDuration: "5 weeks",
    client: "Contemporary Art Gallery",
    featured: true,
    overview: "The Art Gallery website provides an immersive digital experience for viewing and purchasing artwork. The platform features high-resolution image viewing, artist profiles, and secure transaction processing.",
    keyFeatures: [
      "High-resolution artwork viewing",
      "3D gallery navigation",
      "Artist portfolio management",
      "Secure online purchasing",
      "Augmented reality preview",
      "Artwork recommendation engine"
    ],
    challenges: [
      "Optimizing high-resolution image loading",
      "Creating smooth 3D navigation",
      "Implementing secure payment processing"
    ],
    solutions: [
      "Implemented progressive image loading",
      "Used Three.js for 3D gallery experience",
      "Integrated multiple payment gateways"
    ],
    results: [
      "70% increase in online art sales",
      "85% user satisfaction with viewing experience",
      "40% increase in artist registrations",
      "Featured in Art & Design magazines"
    ],
    testimonials: {
      quote: "The 3D gallery feature has transformed how people experience art online. Sales have increased dramatically since launch.",
      author: "Dr. Maria Santos",
      position: "Gallery Director"
    }
  },
  {
    id: 6,
    title: "Pixel Genius",
    category: "Web Development",
    imageUrl: Pixel,
    description: "A modern, responsive website designed to showcase engaging content with intuitive user interface.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    projectDuration: "3 weeks",
    client: "Creative Agency",
    featured: false,
    overview: "Pixel Genius is a creative agency website that showcases innovative design solutions and digital marketing services. The platform emphasizes visual storytelling and client portfolio presentation.",
    keyFeatures: [
      "Interactive portfolio showcase",
      "Case study presentations",
      "Client testimonial carousel",
      "Service pricing calculator",
      "Contact form with file upload",
      "Blog and news section"
    ],
    challenges: [
      "Creating engaging animations without performance impact",
      "Building flexible portfolio management",
      "Implementing responsive design for all devices"
    ],
    solutions: [
      "Used CSS animations and GPU acceleration",
      "Built modular portfolio system",
      "Implemented mobile-first design approach"
    ],
    results: [
      "55% increase in client inquiries",
      "40% improvement in page engagement",
      "90% mobile user satisfaction",
      "Featured in design inspiration sites"
    ]
  },
  {
    id: 7,
    title: "Pulchr Design",
    category: "Web Development",
    imageUrl: Design,
    description: "A sleek and modern website platform designed to deliver intuitive UI and seamless user experience.",
    liveDemoUrl: "https://rashmitharkl.github.io/flourishify/",
    githubUrl: "https://github.com/rashmitharkl/flourishify",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    projectDuration: "4 weeks",
    client: "Design Studio",
    featured: true,
    overview: "Pulchr Design represents the pinnacle of modern web design, featuring cutting-edge UI/UX principles and innovative interaction patterns. The website serves as both a portfolio and a design system showcase.",
    keyFeatures: [
      "Advanced animation system",
      "Interactive design showcase",
      "Client project timeline",
      "Design system documentation",
      "Blog with rich media",
      "Contact form with project brief"
    ],
    challenges: [
      "Creating complex animations that work across devices",
      "Building comprehensive design system",
      "Optimizing for various screen sizes"
    ],
    solutions: [
      "Implemented performance-optimized animations",
      "Created modular design component library",
      "Used responsive design patterns"
    ],
    results: [
      "65% increase in design inquiries",
      "50% improvement in user engagement",
      "95% client satisfaction rating",
      "Awarded Best Design Website 2024"
    ],
    testimonials: {
      quote: "Pulchr Design's website perfectly represents their design philosophy. The attention to detail and user experience is exceptional.",
      author: "James Wilson",
      position: "Creative Director"
    }
  },
  {
    id: 8,
    title: "Tech Pulse Computers",
    category: "Web Development",
    imageUrl: Com,
    description: "Modern website built with cutting-edge technologies for optimal user experience.",
    liveDemoUrl: "https://rashmitharkl.github.io/pixel-store/",
    githubUrl: "https://github.com/rashmitharkl/pixel-store",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
    projectDuration: "6 weeks",
    client: "Tech Retail Store",
    featured: false,
    overview: "Tech Pulse Computers is a comprehensive e-commerce platform for computer hardware and accessories. The website features advanced product filtering, inventory management, and secure payment processing.",
    keyFeatures: [
      "Advanced product filtering and search",
      "Real-time inventory tracking",
      "Secure payment processing",
      "Customer account management",
      "Product comparison tool",
      "Technical support integration"
    ],
    challenges: [
      "Managing large product catalogs",
      "Implementing complex filtering systems",
      "Ensuring secure payment processing"
    ],
    solutions: [
      "Built efficient database indexing",
      "Created dynamic filtering algorithms",
      "Integrated multiple payment gateways"
    ],
    results: [
      "80% increase in online sales",
      "45% improvement in conversion rates",
      "30% reduction in cart abandonment",
      "4.7/5 customer satisfaction rating"
    ]
  },
  {
    id: 9,
    title: "Fast Guard",
    category: "Web Development",
    imageUrl: Fast,
    description: "A professional content-focused web platform designed to turn ideas into impactful digital experiences.",
    liveDemoUrl: "https://win1.dragonsof.com/",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    projectDuration: "3 weeks",
    client: "Security Services Company",
    featured: true,
    overview: "Fast Guard is a professional security services website that emphasizes trust, reliability, and comprehensive protection solutions. The platform features service showcases, client testimonials, and emergency contact systems.",
    keyFeatures: [
      "Service showcase with detailed descriptions",
      "Client testimonial system",
      "Emergency contact integration",
      "Security consultation booking",
      "Real-time status updates",
      "Multi-language support"
    ],
    challenges: [
      "Building trust through design",
      "Implementing emergency contact features",
      "Creating multilingual support"
    ],
    solutions: [
      "Used professional color scheme and typography",
      "Integrated real-time communication systems",
      "Built dynamic language switching"
    ],
    results: [
      "50% increase in service inquiries",
      "60% improvement in client retention",
      "4.9/5 trust rating from clients",
      "Featured in security industry publications"
    ],
    testimonials: {
      quote: "Fast Guard's website perfectly conveys our professionalism and reliability. The emergency contact system has been invaluable for our clients.",
      author: "Michael Chen",
      position: "Security Operations Manager"
    }
  },
  {
    id: 10,
    title: "Note Taking App",
    category: "Mobile Applications",
    imageUrl: Note,
    description: "Native and cross-platform mobile app for iOS and Android with custom experience.",
    technologies: ["React Native", "TypeScript", "Redux", "SQLite", "Firebase"],
    projectDuration: "8 weeks",
    client: "Productivity Solutions Inc.",
    featured: false,
    overview: "A comprehensive note-taking application that combines simplicity with powerful features. The app offers cloud synchronization, collaboration tools, and advanced organization capabilities.",
    keyFeatures: [
      "Cross-platform synchronization",
      "Rich text editing with markdown",
      "Collaborative note sharing",
      "Advanced search and tagging",
      "Offline mode support",
      "Voice-to-text integration"
    ],
    challenges: [
      "Ensuring seamless cross-platform sync",
      "Implementing offline functionality",
      "Creating intuitive user interface"
    ],
    solutions: [
      "Built robust sync engine with conflict resolution",
      "Implemented local storage with background sync",
      "Used native platform design guidelines"
    ],
    results: [
      "100,000+ downloads in first month",
      "4.8/5 App Store rating",
      "90% user retention rate",
      "Featured in productivity app lists"
    ]
  },
  {
    id: 11,
    title: "Dashboard UX Design",
    category: "UI/UX Design",
    imageUrl: "/placeholder.svg",
    description: "User-centric design solution that elevates product quality with intuitive navigation.",
    technologies: ["Figma", "Adobe XD", "Principle", "InVision", "Sketch"],
    projectDuration: "4 weeks",
    client: "Enterprise Software Company",
    featured: false,
    overview: "A comprehensive dashboard design system that transforms complex data into intuitive, actionable insights. The design emphasizes clarity, efficiency, and user productivity.",
    keyFeatures: [
      "Comprehensive design system",
      "Interactive prototypes",
      "User research integration",
      "Accessibility compliance",
      "Responsive design patterns",
      "Component library"
    ],
    challenges: [
      "Simplifying complex data visualization",
      "Ensuring accessibility compliance",
      "Creating scalable design system"
    ],
    solutions: [
      "Used progressive disclosure principles",
      "Implemented WCAG 2.1 guidelines",
      "Built modular component architecture"
    ],
    results: [
      "40% improvement in user task completion",
      "60% reduction in user training time",
      "95% accessibility compliance score",
      "Awarded UX Excellence Award"
    ]
  },
  {
    id: 12,
    title: "Online Marketplace",
    category: "E-Commerce",
    imageUrl: "/placeholder.svg",
    description: "Custom online store and marketplace solutions to boost revenue.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    projectDuration: "12 weeks",
    client: "Marketplace Platform",
    featured: false,
    overview: "A comprehensive marketplace platform that connects buyers and sellers with advanced features like multi-vendor support, payment processing, and inventory management.",
    keyFeatures: [
      "Multi-vendor marketplace",
      "Advanced payment processing",
      "Inventory management system",
      "Seller dashboard and analytics",
      "Review and rating system",
      "Mobile-responsive design"
    ],
    challenges: [
      "Managing complex multi-vendor logistics",
      "Implementing secure payment systems",
      "Scaling for high transaction volumes"
    ],
    solutions: [
      "Built robust vendor management system",
      "Integrated multiple payment processors",
      "Implemented microservices architecture"
    ],
    results: [
      "200% increase in vendor registrations",
      "150% growth in transaction volume",
      "99.9% uptime achievement",
      "4.6/5 seller satisfaction rating"
    ]
  },
  {
    id: 13,
    title: "Enterprise Management System",
    category: "Desktop Applications",
    imageUrl: "/placeholder.svg",
    description: "High-performance desktop application for Windows and MacOS platforms.",
    technologies: ["Electron", "React", "TypeScript", "SQLite", "Node.js"],
    projectDuration: "16 weeks",
    client: "Enterprise Corporation",
    featured: false,
    overview: "A comprehensive enterprise management system that streamlines business operations with modules for HR, finance, inventory, and customer relationship management.",
    keyFeatures: [
      "Multi-module integration",
      "Advanced reporting and analytics",
      "User role management",
      "Data backup and recovery",
      "API integration capabilities",
      "Offline functionality"
    ],
    challenges: [
      "Integrating multiple business modules",
      "Ensuring data security and compliance",
      "Creating intuitive user interface"
    ],
    solutions: [
      "Built modular architecture with shared services",
      "Implemented enterprise-grade security",
      "Used progressive disclosure for complex features"
    ],
    results: [
      "50% reduction in administrative time",
      "99.9% data accuracy improvement",
      "40% increase in operational efficiency",
      "ROI of 300% within first year"
    ]
  },
  {
    id: 14,
    title: "SEO & Marketing Campaign",
    category: "Digital Marketing",
    imageUrl: "/placeholder.svg",
    description: "Strategic digital marketing solutions to increase brand awareness and drive business growth.",
    technologies: ["Google Analytics", "Google Ads", "Facebook Ads", "SEO Tools", "Marketing Automation"],
    projectDuration: "Ongoing",
    client: "E-commerce Business",
    featured: false,
    overview: "A comprehensive digital marketing campaign that combines SEO optimization, paid advertising, and content marketing to drive organic growth and increase brand visibility.",
    keyFeatures: [
      "Comprehensive SEO audit and optimization",
      "Multi-channel paid advertising",
      "Content marketing strategy",
      "Social media management",
      "Analytics and reporting",
      "Conversion rate optimization"
    ],
    challenges: [
      "Competing in saturated market",
      "Measuring campaign effectiveness",
      "Optimizing for multiple channels"
    ],
    solutions: [
      "Implemented data-driven targeting",
      "Built comprehensive analytics dashboard",
      "Created channel-specific optimization strategies"
    ],
    results: [
      "300% increase in organic traffic",
      "150% improvement in conversion rates",
      "200% growth in social media engagement",
      "50% reduction in customer acquisition cost"
    ]
  }
];

// Helper function to get project by ID
export const getProjectById = (id: number): ProjectDetails | undefined => {
  return projectDetails.find(project => project.id === id);
};

// Helper function to get featured projects
export const getFeaturedProjects = (): ProjectDetails[] => {
  return projectDetails.filter(project => project.featured);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): ProjectDetails[] => {
  if (category === "All") return projectDetails;
  return projectDetails.filter(project => project.category === category);
};
