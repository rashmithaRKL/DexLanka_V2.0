export interface TemplateItem {
  id: number
  title: string
  category: string
  price: number
  description: string
  image: string
  tags: string[]
  rating: number
  sales: number
  previewUrl?: string
  isFeatured?: boolean
}

export const templateCatalog: TemplateItem[] = [
  {
    id: 1,
    title: 'Modern Business Website',
    category: 'website',
    price: 49,
    description: 'A sleek and professional website template perfect for businesses looking to make a strong online presence.',
    image: '/placeholder.svg',
    tags: ['Business', 'Modern', 'Responsive'],
    rating: 4.8,
    sales: 234,
    previewUrl: '#',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'E-Commerce Store Template',
    category: 'ecommerce',
    price: 79,
    description: 'Complete e-commerce solution with shopping cart, checkout, and product management features.',
    image: '/placeholder.svg',
    tags: ['E-Commerce', 'Shopping', 'Modern'],
    rating: 4.9,
    sales: 456,
    previewUrl: '#',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Portfolio Showcase',
    category: 'portfolio',
    price: 35,
    description: 'Elegant portfolio template designed for creatives, designers, and artists to showcase their work.',
    image: '/placeholder.svg',
    tags: ['Portfolio', 'Creative', 'Minimal'],
    rating: 4.7,
    sales: 189,
    previewUrl: '#',
  },
  {
    id: 4,
    title: 'Restaurant Menu Website',
    category: 'website',
    price: 45,
    description: 'Beautiful restaurant template with menu display, online ordering, and reservation system.',
    image: '/placeholder.svg',
    tags: ['Restaurant', 'Food', 'Responsive'],
    rating: 4.6,
    sales: 167,
    previewUrl: '#',
  },
  {
    id: 5,
    title: 'SaaS Dashboard Template',
    category: 'applications',
    price: 59,
    description: 'Modern dashboard UI for SaaS products with charts, tables, and components.',
    image: '/placeholder.svg',
    tags: ['SaaS', 'Dashboard', 'Tailwind'],
    rating: 4.8,
    sales: 312,
    previewUrl: '#',
    isFeatured: true,
  },
]





