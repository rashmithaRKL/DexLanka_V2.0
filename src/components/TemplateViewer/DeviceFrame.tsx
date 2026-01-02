import React from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface DeviceFrameProps {
  device: DeviceType;
  children: React.ReactNode;
  className?: string;
}

const DeviceFrame: React.FC<DeviceFrameProps> = ({ device, children, className = '' }) => {
  const deviceConfig = {
    desktop: {
      width: '100%',
      maxWidth: '1920px',
      icon: Monitor,
      label: 'Desktop',
      aspectRatio: '16/9',
    },
    tablet: {
      width: '768px',
      maxWidth: '768px',
      icon: Tablet,
      label: 'Tablet',
      aspectRatio: '4/3',
    },
    mobile: {
      width: '375px',
      maxWidth: '375px',
      icon: Smartphone,
      label: 'Mobile',
      aspectRatio: '9/16',
    },
  };

  const config = deviceConfig[device];
  const Icon = config.icon;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-400">{config.label}</span>
      </div>
      <div
        className="relative border-8 border-gray-800 rounded-lg bg-gray-900 shadow-2xl overflow-hidden"
        style={{
          width: device === 'desktop' ? config.width : config.width,
          maxWidth: config.maxWidth,
          aspectRatio: config.aspectRatio,
        }}
      >
        {/* Device frame bezel */}
        {device === 'mobile' && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-2xl z-10" />
        )}
        {device === 'tablet' && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-800 rounded-b-lg z-10" />
        )}

        {/* Content area */}
        <div className="w-full h-full overflow-auto bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DeviceFrame;

