
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink, Play } from "lucide-react";
import { useState, useEffect } from 'react';
import { galleryItems } from '@/components/GalleryGrid';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import Footer from '@/components/Footer';


const ProjectDetail = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [project, setProject] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const projectId = parseInt(id || '0');
    const foundProject = galleryItems.find(item => item.id === projectId);
    setProject(foundProject);

    // Add animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [id]);

  const handleLiveDemo = () => {
    setDemoLoading(true);

    // Simulate loading for 1.5 seconds
    setTimeout(() => {
      setDemoLoading(false);
      toast({
        title: "Demo Launched",
        description: `${project?.title} demo is now running in a new tab`,
      });
      // Open a demo URL in a new tab
      window.open(`https://rashmitharkl.github.io/tranquil_haven/${id}`, '_blank');
    }, 1500);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/gallery">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollArea className="h-screen">
        <div className="container mx-auto py-6 md:py-12 px-4">
          <div className="mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
            <Link to="/gallery">
              <Button variant="outline" className="mb-4 md:mb-6 hover-scale">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Gallery
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            <div className={`relative overflow-hidden rounded-lg bg-muted opacity-0 transform ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto object-cover aspect-video transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div>
              <span className={`inline-block px-3 py-1 bg-primary/80 text-white text-xs font-semibold rounded-full mb-3 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
                {project.category}
              </span>
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 md:mb-6 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
                {project.title}
              </h1>
              <p className={`text-base md:text-lg mb-4 md:mb-6 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
                {project.description}
              </p>

              <h2 className={`text-xl md:text-2xl font-semibold mb-3 md:mb-4 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
                Project Overview
              </h2>
              <p className={`mb-4 md:mb-6 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "700ms", animationFillMode: "forwards" }}>
                This {project.category.toLowerCase()} project showcases our team's expertise in creating
                high-quality solutions that meet our clients' needs. We employed the latest technologies
                and best practices to deliver exceptional results.
              </p>

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Technologies Used</h3>
                  <ul className="list-disc list-inside space-y-1 text-foreground/70">
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Node.js</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Project Duration</h3>
                  <p className="text-foreground/70">3 months</p>

                  <h3 className="font-semibold text-lg mt-4 mb-2">Client</h3>
                  <p className="text-foreground/70">Tech Innovators Inc.</p>
                </div>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "900ms", animationFillMode: "forwards" }}>
                <Button
                  className={`bg-primary hover:bg-primary/80 live-demo-btn ${demoLoading ? 'animate-pulse' : 'hover-scale'}`}
                  onClick={handleLiveDemo}
                  disabled={demoLoading}
                >
                  {demoLoading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Loading Demo...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4 animate-pulse" />
                      View Live Demo
                    </>
                  )}
                </Button>

                <Button variant="outline" className="hover-scale group" asChild>
                  <a href={`https://github.com/example/${project.id}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    Source Code
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className={`mt-8 md:mt-16 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Project Details</h2>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies
                tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod,
                nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <p className="mb-4">
                Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl
                sit amet nisl. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget
                aliquam nisl nisl sit amet nisl.
              </p>
              <h3 className="text-lg md:text-xl font-semibold mb-3 mt-6">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Responsive design for all devices</li>
                <li>Fast loading times and optimized performance</li>
                <li>Intuitive user interface and seamless user experience</li>
                <li>Robust backend architecture with scalable solutions</li>
                <li>Comprehensive analytics and reporting capabilities</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default ProjectDetail;
