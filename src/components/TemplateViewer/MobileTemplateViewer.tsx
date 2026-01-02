import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTemplatePublicUrl } from '@/lib/templateStorage';
import { TemplateItem } from '@/lib/supabase';

interface MobileTemplateViewerProps {
  template: TemplateItem;
}

const MobileTemplateViewer: React.FC<MobileTemplateViewerProps> = ({ template }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const screenshots = template.demo_config?.screenshots || template.screenshots || [];
  const videoUrl = template.demo_config?.videoUrl;
  const apkUrl = template.demo_config?.apkUrl;

  const nextScreenshot = () => {
    if (screenshots.length > 0) {
      setCurrentScreenshotIndex((prev) => (prev + 1) % screenshots.length);
    }
  };

  const prevScreenshot = () => {
    if (screenshots.length > 0) {
      setCurrentScreenshotIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    }
  };

  // Get screenshot URL - could be from storage or external URL
  const getScreenshotUrl = (screenshot: string): string => {
    if (screenshot.startsWith('http://') || screenshot.startsWith('https://')) {
      return screenshot;
    }
    // Assume it's a filename in screenshots folder
    return getTemplatePublicUrl(template.id, screenshot, 'screenshots');
  };

  return (
    <div className="space-y-6">
      {/* Video Demo (if available) */}
      {videoUrl && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">Video Demo</h3>
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              src={videoUrl}
              controls
              className="w-full h-full"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Screenshots Gallery */}
      {screenshots.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Screenshots</h3>
          <div className="relative">
            <div className="flex items-center justify-center">
              <div className="relative max-w-md">
                <img
                  src={getScreenshotUrl(screenshots[currentScreenshotIndex])}
                  alt={`${template.title} screenshot ${currentScreenshotIndex + 1}`}
                  className="w-full h-auto rounded-lg border border-gray-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                {screenshots.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 border-gray-700 hover:bg-black/70"
                      onClick={prevScreenshot}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 border-gray-700 hover:bg-black/70"
                      onClick={nextScreenshot}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Screenshot Indicators */}
            {screenshots.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentScreenshotIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentScreenshotIndex
                        ? 'w-8 bg-dexRed'
                        : 'w-2 bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to screenshot ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Screenshot Counter */}
            <div className="text-center text-sm text-gray-400 mt-2">
              {currentScreenshotIndex + 1} / {screenshots.length}
            </div>
          </div>

          {/* Thumbnail Grid */}
          {screenshots.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {screenshots.map((screenshot, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScreenshotIndex(index)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                    index === currentScreenshotIndex
                      ? 'border-dexRed'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <img
                    src={getScreenshotUrl(screenshot)}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover aspect-video"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* App Information */}
      <div className="glass rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">App Information</h3>
        {template.demo_config?.packageName && (
          <div>
            <span className="text-gray-400 text-sm">Package Name:</span>
            <p className="text-white font-mono text-sm">{template.demo_config.packageName}</p>
          </div>
        )}
        {template.technologies && template.technologies.length > 0 && (
          <div>
            <span className="text-gray-400 text-sm">Technologies:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {template.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-dexRed/20 text-dexRed text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        {apkUrl && (
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full border-gray-700 text-white hover:bg-gray-800"
              onClick={() => window.open(apkUrl, '_blank')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download APK (Demo)
            </Button>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Note: Full source code available after purchase
            </p>
          </div>
        )}
      </div>

      {/* No Content Message */}
      {screenshots.length === 0 && !videoUrl && (
        <div className="text-center py-12 border border-gray-700 rounded-lg">
          <p className="text-gray-400">No demo content available</p>
          <p className="text-gray-500 text-sm mt-2">
            Screenshots or video demo will be displayed here
          </p>
        </div>
      )}
    </div>
  );
};

export default MobileTemplateViewer;

