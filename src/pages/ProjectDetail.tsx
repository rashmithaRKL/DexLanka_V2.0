
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink, Play, Github, Calendar, User, Award, CheckCircle, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import { useState, useEffect } from 'react';
import { useProjectById } from '@/hooks/useProjects';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import Footer from '@/components/Footer';


const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = parseInt(id || '0');
  const { project, loading } = useProjectById(projectId);
  const [isLoaded, setIsLoaded] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Add animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleLiveDemo = () => {
    setDemoLoading(true);

    // Simulate loading for 1.5 seconds
    setTimeout(() => {
      setDemoLoading(false);

      if (project?.liveDemoUrl) {
        toast({
          title: "Demo Launched",
          description: `${project?.title} demo is now running in a new tab`,
        });
        window.open(project.liveDemoUrl, '_blank');
      } else {
        toast({
          title: "Demo Not Available",
          description: "This project doesn't have a live demo link yet.",
        });
      }
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-4">Loading project...</h2>
        </div>
      </div>
    );
  }

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
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  minHeight: '400px'
                }}
              />
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                    <Award className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`bg-primary/80 text-white text-xs font-semibold opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
                  {project.category}
                </Badge>
                {project.featured && (
                  <Badge variant="outline" className={`border-yellow-400 text-yellow-400 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "320ms", animationFillMode: "forwards" }}>
                    <Award className="h-3 w-3 mr-1" />
                    Featured Project
                  </Badge>
                )}
              </div>
              
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 md:mb-6 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
                {project.title}
              </h1>
              
              <p className={`text-base md:text-lg mb-6 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
                {project.description}
              </p>

              {/* Project Stats */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/70">Duration</p>
                    <p className="font-semibold">{project.projectDuration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/70">Client</p>
                    <p className="font-semibold">{project.client}</p>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className={`mb-6 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "700ms", animationFillMode: "forwards" }}>
                <h3 className="font-semibold text-lg mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
                {project.liveDemoUrl && (
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
                )}

                {project.githubUrl && (
                  <Button variant="outline" className="hover-scale group" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div className={`mt-8 md:mt-16 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Project Overview
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="mb-6 text-lg leading-relaxed">
                {project.overview}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className={`mt-8 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}>
            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className={`mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "1200ms", animationFillMode: "forwards" }}>
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Challenges
              </h3>
              <div className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-400" />
                Solutions
              </h3>
              <div className="space-y-3">
                {project.solutions.map((solution, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                    <Lightbulb className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className={`mt-8 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "1300ms", animationFillMode: "forwards" }}>
            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Results & Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.results.map((result, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium">{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          {project.testimonials && (
            <div className={`mt-8 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`} style={{ animationDelay: "1400ms", animationFillMode: "forwards" }}>
              <h3 className="text-lg md:text-xl font-semibold mb-4">Client Testimonial</h3>
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20">
                <blockquote className="text-lg italic mb-4">
                  "{project.testimonials.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{project.testimonials.author}</p>
                    <p className="text-sm text-foreground/70">{project.testimonials.position}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default ProjectDetail;
