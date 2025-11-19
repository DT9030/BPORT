'use client';

import { cn } from '@/lib/utils';

type TemplatePreviewProps = {
  name: string;
  category: string;
  className?: string;
  height?: number;
  width?: number;
};

export function TemplatePreview({
  name,
  category,
  className,
  height = 200,
  width = 300,
}: TemplatePreviewProps) {
  const colors: Record<string, string> = {
    fresher: 'from-blue-500 to-cyan-400',
    professional: 'from-indigo-500 to-purple-500',
    business: 'from-emerald-500 to-teal-400',
  };

  const categoryColors: Record<string, string> = {
    fresher: 'bg-blue-100 text-blue-800',
    professional: 'bg-indigo-100 text-indigo-800',
    business: 'bg-emerald-100 text-emerald-800',
  };

  return (
    <div 
      className={cn(
        'relative rounded-lg overflow-hidden border shadow-sm',
        'flex flex-col justify-between',
        'bg-gradient-to-br',
        colors[category] || 'from-gray-200 to-gray-300',
        className
      )}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <span className={cn(
          'inline-block px-2 py-1 mt-2 text-xs font-medium rounded-full',
          categoryColors[category] || 'bg-gray-100 text-gray-800'
        )}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>
      <div className="bg-white/20 backdrop-blur-sm p-4">
        <div className="h-2 bg-white/50 rounded-full w-3/4 mb-2"></div>
        <div className="h-2 bg-white/30 rounded-full w-1/2"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
        <span className="text-white font-medium">Click to Preview</span>
      </div>
    </div>
  );
}
