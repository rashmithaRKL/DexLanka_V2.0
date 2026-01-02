import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import WebTemplateViewer from './WebTemplateViewer';
import MobileTemplateViewer from './MobileTemplateViewer';
import { TemplateItem } from '@/lib/supabase';

interface TemplateViewerProps {
  template: TemplateItem;
  loading?: boolean;
}

const TemplateViewer: React.FC<TemplateViewerProps> = ({ template, loading = false }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-dexRed mx-auto mb-4" />
          <p className="text-gray-400">Loading template demo...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-gray-400">Template not found</p>
        </div>
      </div>
    );
  }

  const demoType = template.demo_type || 'static_html';

  // Determine viewer based on demo type
  const isWebTemplate =
    demoType === 'static_html' ||
    demoType === 'react' ||
    demoType === 'java_web' ||
    demoType === 'flutter_web' ||
    demoType === 'react_native_web';

  const isMobileTemplate =
    demoType === 'kotlin_android' ||
    demoType === 'flutter_mobile' ||
    demoType === 'react_native_mobile';

  const isDesktopTemplate = demoType === 'desktop';

  // External URL - redirect or show iframe
  if (demoType === 'external' && template.live_preview_url) {
    return (
      <div className="space-y-4">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <p className="font-medium text-white mb-1">External Demo</p>
              <p className="text-gray-400">
                This template demo is hosted externally. Click the button below to view it.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <a
            href={template.live_preview_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-dexRed text-white rounded-lg font-medium hover:bg-dexRed/90 transition-colors inline-flex items-center gap-2"
          >
            Open External Demo
          </a>
        </div>
      </div>
    );
  }

  // Web templates (HTML, React, etc.)
  if (isWebTemplate) {
    return <WebTemplateViewer template={template} />;
  }

  // Mobile templates (Android, iOS)
  if (isMobileTemplate) {
    return <MobileTemplateViewer template={template} />;
  }

  // Desktop templates (similar to mobile but may have different layout)
  if (isDesktopTemplate) {
    return <MobileTemplateViewer template={template} />;
  }

  // Fallback
  return (
    <div className="text-center py-20">
      <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
      <p className="text-gray-400 mb-2">Demo type not configured</p>
      <p className="text-gray-500 text-sm">
        Please configure the demo type for this template in the admin panel.
      </p>
    </div>
  );
};

export default TemplateViewer;

