import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
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

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const galleryItems: GalleryItem[] = [
  
  {
    id: 1,
    title: "Scriptoria",
    category: "Web Development Literary Masterpieces",
    imageUrl: Book,
    liveDemoUrl:  "https://rashmitharkl.github.io/booksmith_interactive/",
    description: "A professional and elegant website designed to showcase creative writing and development services."
  },

  {
    id: 2,
    title: "Delectable Restaurant",
    category: "Web Development",
    imageUrl: Hotel,
    liveDemoUrl:  "https://rashmitharkl.github.io/delectable/",
    description: "A stylish and modern website designed to showcase culinary artistry and dining experiences."
  },
  {
    id: 3,
    title: "Tranquil Haven Resort",
    category: "Web Development",
    imageUrl: Resort,
    liveDemoUrl: "https://rashmitharkl.github.io/tranquil_haven/",
    description: "A refined website crafted to highlight luxury stays and exceptional guest experiences."
  },
  {
    id: 4,
    title: "Tech Venture",
    category: "Web Development",
    imageUrl: Tech,
    // liveDemoUrl: "#",
    description:"Modern, responsive website showcasing the latest in tech innovation."
  },
  {
    id: 5,
    title: "Art Gallery",
    category: "Web Development",
    imageUrl: Art,
    liveDemoUrl: "https://rashmitharkl.github.io/Art-Gallery/",
    description:"Elegant and responsive website designed to elevate the dining experience online."
  },
  {
    id: 6,
    title: "Pixel Genius",
    category: "Web Development",
    imageUrl: Pixel,
     // liveDemoUrl: "https://rashmitharkl.github.io/PixelGenius/",
    description: "A modern, responsive website designed to showcase engaging content with intuitive user interface."
  },

  {
    id: 7,
    title: "Pulchr Design ",
    category: "Web Development",
    imageUrl: Design,
    liveDemoUrl: "https://rashmitharkl.github.io/flourishify/",
    description: "A sleek and modern website platform designed to deliver intuitive UI and seamless user experience."
  },

  {
    id: 8,
    title: "Tech Pulse Computers",
    category: "Web Development",
    imageUrl: Com,
    liveDemoUrl: "https://rashmitharkl.github.io/pixel-store/",
    description: "Modern website built with cutting-edge technologies for optimal user experience."
  },

  {
    id: 9,
    title: "Fast Guard",
    category: "Web Development",
    imageUrl: Fast,
    liveDemoUrl: "https://win1.dragonsof.com/",
    description: "A professional content-focused web platform designed to turn ideas into impactful digital experiences."
  },

 

 
  
  {
    id: 10,
    title: "Note Tacking App",
    category: "Mobile Applications",
    imageUrl: Note,
    description: "Native and cross-platform mobile app for iOS and Android with custom experience."
  },
  {
    id: 11,
    title: "Dashboard UX Design",
    category: "UI/UX Design",
    imageUrl: "/placeholder.svg",
    description: "User-centric design solution that elevates product quality with intuitive navigation."
  },
  {
    id: 12,
    title: "Online Marketplace",
    category: "E-Commerce",
    imageUrl: "/placeholder.svg",
    description: "Custom online store and marketplace solutions to boost revenue."
  },
  {
    id: 13,
    title: "Enterprise Management System",
    category: "Desktop Applications",
    imageUrl: "/placeholder.svg",
    description: "High-performance desktop application for Windows and MacOS platforms."
  },
  {
    id: 14,
    title: "SEO & Marketing Campaign",
    category: "Digital Marketing",
    imageUrl: "/placeholder.svg",
    description: "Strategic digital marketing solutions to increase brand awareness and drive business growth."
  }
];

const categories = ["All", "Web Development", "Mobile Applications", "UI/UX Design", "E-Commerce", "Desktop Applications", "Digital Marketing"];

const GalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="flex space-x-2 md:space-x-4 min-w-max">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full ${activeCategory === category ? "bg-primary" : "bg-secondary/50"
                  }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden glass-card hover-scale border-0 shadow-lg`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                  style={{
                    transform: hoveredItem === item.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="inline-block px-3 py-1 bg-primary/80 text-white text-xs font-semibold rounded-full mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <div
                  className="absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300"
                  style={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                >
                  <Button variant="default" className="bg-primary hover:bg-primary/80" asChild>
                    <Link to={`/project/${item.id}`}>
                      <ExternalLink size={18} className="mr-2" />
                      View Project
                    </Link>
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-foreground/80">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;
