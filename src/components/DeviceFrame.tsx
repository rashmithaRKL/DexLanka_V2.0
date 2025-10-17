
import React from 'react';
import { Smartphone, Monitor, Tablet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeviceFrameProps {
  type: 'mobile' | 'desktop' | 'web';
  url: string;
  className?: string;
}

const DeviceFrame = ({ type, url, className }: DeviceFrameProps) => {
  let width, height, frameClass, icon;

  switch (type) {
    case 'mobile':
      width = 320;
      height = 640;
      frameClass = 'rounded-[32px] border-8 border-gray-800';
      icon = <Smartphone className="text-gray-400" />;
      break;
    case 'desktop':
      width = 960;
      height = 600;
      frameClass = 'rounded-lg border-8 border-gray-800 border-b-[30px]';
      icon = <Monitor className="text-gray-400" />;
      break;
    case 'web':
      width = 960;
      height = 600;
      frameClass = 'rounded-t-lg border-t-8 border-x-8 border-gray-800';
      icon = <Monitor className="text-gray-400" />;
      break;
    default:
      width = 960;
      height = 600;
      frameClass = 'rounded-lg border-8 border-gray-800';
      icon = <Monitor className="text-gray-400" />;
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="flex items-center mb-2 gap-2">
        {icon}
        <span className="text-muted-foreground">
          {type === 'mobile' ? 'Mobile App View' : type === 'desktop' ? 'Desktop App View' : 'Website View'}
        </span>
      </div>
      <div className={cn('bg-white relative overflow-hidden', frameClass)} style={{ width, height }}>
        <iframe
          src={url}
          className="w-full h-full"
          title={`${type} preview`}
          sandbox="allow-same-origin allow-scripts"
          loading="lazy"
        />
        {type === 'web' && (
          <div className="absolute left-0 bottom-0 right-0 h-10 bg-gray-800 flex items-center justify-center">
            <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceFrame;
