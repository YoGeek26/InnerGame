import React from 'react';

interface ProgressBarProps {
  progress: number;
  height?: number;
  showLabel?: boolean;
  color?: string;
  backgroundColor?: string;
  className?: string;
  labelPosition?: 'top' | 'right' | 'inside';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  showLabel = true,
  color = 'var(--color-burgundy)',
  backgroundColor = '#e5e7eb',
  className = '',
  labelPosition = 'right'
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && labelPosition === 'top' && (
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-gray-500">Progress</span>
          <span className="text-xs font-medium text-gray-700">{clampedProgress}%</span>
        </div>
      )}
      
      <div className="relative">
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: `${height}px`, backgroundColor }}
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-in-out"
            style={{ 
              width: `${clampedProgress}%`, 
              backgroundColor: color,
              backgroundImage: color.includes('var') ? 
                `linear-gradient(to right, var(--color-burgundy), var(--color-gold))` : 
                undefined 
            }}
          >
            {showLabel && labelPosition === 'inside' && clampedProgress > 25 && (
              <span className="text-xs font-medium text-white px-2 leading-loose">
                {clampedProgress}%
              </span>
            )}
          </div>
        </div>
        
        {showLabel && labelPosition === 'right' && (
          <span className="absolute right-0 top-0 -mt-1 -mr-12 text-xs font-medium text-gray-700">
            {clampedProgress}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
