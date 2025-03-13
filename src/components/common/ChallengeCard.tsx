import React from 'react';
import { Award, Clock, Lock, CheckCircle, ChevronRight, Zap } from 'lucide-react';

interface ChallengeCardProps {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  xpReward: number;
  timeEstimate: string;
  steps: number;
  isCompleted: boolean;
  isLocked: boolean;
  requiredLevel?: number;
  hasBadgeReward?: boolean;
  onClick: () => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  difficulty,
  category,
  xpReward,
  timeEstimate,
  steps,
  isCompleted,
  isLocked,
  requiredLevel,
  hasBadgeReward,
  onClick
}) => {
  return (
    <div 
      className={`luxury-card overflow-hidden cursor-pointer ${
        isLocked 
          ? 'opacity-75' 
          : 'transform transition-transform hover:scale-[1.02]'
      }`}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex space-x-2">
            <div className={`text-xs px-2 py-1 rounded-full ${
              difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              difficulty === 'intermediate' ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              {difficulty}
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
              {category.replace('-', ' ')}
            </div>
          </div>
          
          {isCompleted && (
            <div className="bg-green-100 rounded-full p-1">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          )}
          
          {isLocked && (
            <div className="bg-gray-100 rounded-full p-1">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-xs text-gray-500 space-x-3 mb-4">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {timeEstimate}
          </div>
          <div className="flex items-center">
            <Zap className="h-3 w-3 mr-1" />
            {steps} steps
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="text-[var(--color-burgundy)] font-bold">+{xpReward} XP</div>
            {hasBadgeReward && (
              <div className="ml-2 flex items-center text-xs text-gray-600">
                <Award className="h-3 w-3 mr-1 text-[var(--color-gold)]" />
                Badge
              </div>
            )}
          </div>
          
          {isLocked ? (
            <div className="text-xs text-gray-500 flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              Unlocks at Level {requiredLevel}
            </div>
          ) : (
            <div className="text-xs text-[var(--color-burgundy)] font-medium flex items-center">
              {isCompleted ? 'View Details' : 'Start Challenge'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
