import React, { useState } from 'react';
import { Maximize2, Minimize2, Monitor, Smartphone, Tablet, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DeviceFrame, { DeviceType } from './DeviceFrame';
import { getDemoEntryPointUrl } from '@/lib/templateStorage';
import { getTemplateLivePreviewUrl } from '@/lib/storageAdapter';
import { TemplateItem } from '@/lib/supabase';

interface WebTemplateViewerProps {
  template: TemplateItem;
}

const WebTemplateViewer: React.FC<WebTemplateViewerProps> = ({ template }) => {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Use storage adapter to get correct URL based on storage type
  const demoUrl = getTemplateLivePreviewUrl(template) ||
    (template.demo_config?.entryPoint
      ? getDemoEntryPointUrl(template.id, template.demo_config.entryPoint)
      : getDemoEntryPointUrl(template.id, 'index.html'));

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const iframeContent = (
    <iframe
      key={iframeKey}
      src={demoUrl}
      className="w-full h-full border-0"
      title={`${template.title} Demo`}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      allow="fullscreen"
      loading="lazy"
    />
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
          <h3 className="text-white font-semibold">{template.title} - Live Demo</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="text-white border-gray-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleFullscreen}
              className="text-white border-gray-700"
            >
              <Minimize2 className="h-4 w-4 mr-2" />
              Exit Fullscreen
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">{iframeContent}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Device Preview:</span>
          <div className="flex gap-2">
            <Button
              variant={device === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDevice('desktop')}
              className={device === 'desktop' ? 'bg-dexRed' : ''}
            >
              <Monitor className="h-4 w-4 mr-1" />
              Desktop
            </Button>
            <Button
              variant={device === 'tablet' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDevice('tablet')}
              className={device === 'tablet' ? 'bg-dexRed' : ''}
            >
              <Tablet className="h-4 w-4 mr-1" />
              Tablet
            </Button>
            <Button
              variant={device === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDevice('mobile')}
              className={device === 'mobile' ? 'bg-dexRed' : ''}
            >
              <Smartphone className="h-4 w-4 mr-1" />
              Mobile
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} className="text-white border-gray-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleFullscreen} className="text-white border-gray-700">
            <Maximize2 className="h-4 w-4 mr-2" />
            Fullscreen
          </Button>
        </div>
      </div>

      {/* Device Frame with Template */}
      <div className="flex justify-center">
        <DeviceFrame device={device}>{iframeContent}</DeviceFrame>
      </div>

      {/* Info */}
      <div className="text-center text-sm text-gray-400">
        <p>Interactive demo of {template.title}</p>
        {template.demo_config?.entryPoint && (
          <p className="text-xs mt-1">Entry point: {template.demo_config.entryPoint}</p>
        )}
      </div>
    </div>
  );
};

export default WebTemplateViewer;

