import React from 'react';
import { Badge as BadgeType } from '../../types';
import { Award, Lock } from 'lucide-react';

interface BadgeProps {
  badge: BadgeType;
  size?: 'sm' | 'md' | 'lg';
}

const Badge: React.FC<BadgeProps> = ({ badge, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
  };
  
  const iconSize = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} relative rounded-full flex items-center justify-center ${
        badge.unlocked 
          ? 'bg-gradient-to-br from-purple-500 to-indigo-600' 
          : 'bg-gray-300'
      }`}>
        <Award size={iconSize[size]} className={badge.unlocked ? 'text-white' : 'text-gray-500'} />
        {!badge.unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
            <Lock size={iconSize[size] / 2} className="text-white opacity-80" />
          </div>
        )}
      </div>
      <p className="mt-2 text-center text-sm font-medium">{badge.name}</p>
    </div>
  );
};

export default Badge;
