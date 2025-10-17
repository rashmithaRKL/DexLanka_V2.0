
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DeviceFrame from '@/components/DeviceFrame';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ScrollTabs, ScrollTabsList, ScrollTabsTrigger, ScrollTabsContent } from '@/components/ui/scroll-tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProjectView = () => {
  const [currentProject, setCurrentProject] = useState('project1');
  const isMobile = useIsMobile();

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [descriptionRef, descriptionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [deviceRef, deviceInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = {
    project1: {
      title: 'E-Commerce Website',
      description: 'A fully responsive e-commerce website built with React, Tailwind CSS, and a headless CMS. Features include product filtering, searching, cart functionality, and secure checkout.',
      deviceUrls: {
        mobile: 'https://example.com/mobile',
        web: 'https://i.ibb.co/84XH7sjT/1.png',
        desktop: 'https://example.com/desktop'
      },
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB']
    },
    project2: {
      title: 'Task Management App',
      description: 'A task management application with mobile and desktop interfaces. Users can create tasks, set priorities, schedule deadlines, and organize with tags and categories.',
      deviceUrls: {
        mobile: 'https://example.com/task-app/mobile',
        web: 'https://example.com/task-app',
        desktop: 'https://example.com/task-app/desktop'
      },
      technologies: ['React Native', 'Electron', 'Firebase']
    },
    project3: {
      title: 'Financial Dashboard',
      description: 'Interactive financial dashboard with real-time data visualization, expense tracking, and budget management features, available across all platforms.',
      deviceUrls: {
        mobile: 'https://example.com/finance/mobile',
        web: 'https://example.com/finance',
        desktop: 'https://example.com/finance/desktop'
      },
      technologies: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL']
    }
  };

  const selectedProject = projects[currentProject as keyof typeof projects];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-12 text-center" ref={headerRef}>
            <AnimatedText
              text="Project Showcase"
              animation="slide-up"
              className="inline-block text-xl text-primary font-medium mb-4"
            />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              {selectedProject.title}
            </motion.h1>
          </div>

          {/* Project Selection */}
          <div className="mb-8 flex justify-center">
            <ScrollTabs defaultValue="project1" value={currentProject} onValueChange={setCurrentProject}>
              <ScrollTabsList className="mx-auto mb-8">
                <ScrollTabsTrigger value="project1">E-Commerce Website</ScrollTabsTrigger>
                <ScrollTabsTrigger value="project2">Task Management App</ScrollTabsTrigger>
                <ScrollTabsTrigger value="project3">Financial Dashboard</ScrollTabsTrigger>
              </ScrollTabsList>
            </ScrollTabs>
          </div>

          {/* Project Description */}
          <div
            className="max-w-3xl mx-auto mb-12 text-center"
            ref={descriptionRef}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={descriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground mb-6"
            >
              {selectedProject.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={descriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {selectedProject.technologies.map((tech, index) => (
                <span key={index} className="inline-block px-3 py-1 bg-secondary rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Device Preview Section */}
          <div className="mt-16" ref={deviceRef}>
            <ScrollTabs defaultValue="web">
              <div className="mb-6">
                <ScrollTabsList className="mx-auto">
                  <ScrollTabsTrigger value="web">Website View</ScrollTabsTrigger>
                  <ScrollTabsTrigger value="mobile">Mobile App View</ScrollTabsTrigger>
                  <ScrollTabsTrigger value="desktop">Desktop App View</ScrollTabsTrigger>
                </ScrollTabsList>
              </div>

              <ScrollArea className="w-full">
                <ScrollTabsContent value="web" className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={deviceInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                  >
                    <DeviceFrame
                      type="web"
                      url={selectedProject.deviceUrls.web}
                      className={isMobile ? "scale-75 origin-top" : ""}
                    />
                  </motion.div>
                </ScrollTabsContent>

                <ScrollTabsContent value="mobile" className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={deviceInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                  >
                    <DeviceFrame
                      type="mobile"
                      url={selectedProject.deviceUrls.mobile}
                      className={isMobile ? "scale-90 origin-top" : ""}
                    />
                  </motion.div>
                </ScrollTabsContent>

                <ScrollTabsContent value="desktop" className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={deviceInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                  >
                    <DeviceFrame
                      type="desktop"
                      url={selectedProject.deviceUrls.desktop}
                      className={isMobile ? "scale-75 origin-top" : ""}
                    />
                  </motion.div>
                </ScrollTabsContent>
              </ScrollArea>
            </ScrollTabs>
          </div>

          {/* Back button */}
          <div className="mt-12 text-center">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="mx-auto"
            >
              Back to Projects
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectView;
