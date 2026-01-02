import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedText from '@/components/AnimatedText';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TemplateViewer from '@/components/TemplateViewer/TemplateViewer';
import { useTemplate } from '@/hooks/useApi';
import { useSEO } from '@/hooks/useSEO';

const TemplateDemo = () => {
  const { id } = useParams();
  const templateId = id ? parseInt(id) : null;
  const { template, loading } = useTemplate(templateId);

  useSEO({
    title: template ? `${template.title} - Live Demo | DexLanka` : 'Template Demo | DexLanka',
    description: template?.description || 'View the live demo of this template',
    url: `/demo/template/${id}`,
  });

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-8 bg-darkBlue border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Link to={template ? `/template/${template.id}` : '/templates'}>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <AnimatedText
                  text="Live Demo"
                  animation="slide-up"
                  className="inline-block text-xl text-dexRed font-medium mb-2"
                />
                {template && (
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{template.title}</h1>
                )}
              </div>
            </div>
            {template && (
              <Link to={`/template/${template.id}`}>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Demo Content */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="glass rounded-2xl p-6 md:p-8">
              <TemplateViewer template={template!} loading={loading} />
            </div>

            {/* Template Info Footer */}
            {template && (
              <div className="mt-6 glass rounded-lg p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Template Type</p>
                    <p className="text-white font-medium capitalize">
                      {template.demo_type?.replace('_', ' ') || 'Not specified'}
                    </p>
                  </div>
                  {template.category && (
                    <div>
                      <p className="text-gray-400 text-sm">Category</p>
                      <p className="text-white font-medium capitalize">{template.category}</p>
                    </div>
                  )}
                  {template.price && (
                    <div>
                      <p className="text-gray-400 text-sm">Price</p>
                      <p className="text-white font-medium">${template.price}</p>
                    </div>
                  )}
                  <Link to={`/template/${template.id}`}>
                    <Button className="bg-dexRed hover:bg-dexRed/90">
                      View Full Details
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TemplateDemo;

