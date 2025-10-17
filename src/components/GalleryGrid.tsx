import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  liveDemoUrl?: string;
}

const categories = ["All", "Web Development", "Mobile Applications", "UI/UX Design", "E-Commerce", "Desktop Applications", "Digital Marketing"];

const GalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { projects, loading } = useProjects();

  // Convert projects to gallery items format
  const galleryItems: GalleryItem[] = projects.map(project => ({
    id: project.id,
    title: project.title,
    category: project.category,
    imageUrl: project.imageUrl,
    description: project.description,
    liveDemoUrl: project.liveDemoUrl
  }));

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden glass-card border-0 shadow-lg animate-pulse">
                <div className="aspect-[16/10] bg-secondary/50"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-secondary/50 rounded mb-2"></div>
                  <div className="h-3 bg-secondary/30 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
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
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out"
                  style={{
                    transform: hoveredItem === item.id ? 'scale(1.05)' : 'scale(1)',
                    objectFit: 'cover',
                    objectPosition: 'center'
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
        )}
      </div>
    </section>
  );
};

export default GalleryGrid;
