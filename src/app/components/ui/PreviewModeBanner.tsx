import React from 'react';
import { Info } from 'lucide-react';

export const PreviewModeBanner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-bold text-center">
          <span className="font-['Space_Mono']">PREVIEW MODE:</span> You're viewing default content. 
          <span className="hidden sm:inline"> Deploy your site to enable database and editing features.</span>
        </p>
      </div>
    </div>
  );
};
