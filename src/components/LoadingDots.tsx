
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingDotsProps {
  className?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ className }) => {
  return (
    <div className={cn("flex space-x-1.5 p-2", className)}>
      <div className="w-2 h-2 rounded-full bg-current animate-loading-dot-1" />
      <div className="w-2 h-2 rounded-full bg-current animate-loading-dot-2" />
      <div className="w-2 h-2 rounded-full bg-current animate-loading-dot-3" />
    </div>
  );
};

export default LoadingDots;
