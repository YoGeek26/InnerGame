import React from 'react';
import { Badge as BadgeType } from '../../types';
import Badge from '../common/Badge';

interface RecentBadgesProps {
  badges: BadgeType[];
}

const RecentBadges: React.FC<RecentBadgesProps> = ({ badges }) => {
  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);
  
  // Show unlocked badges first, then some locked ones
  const displayBadges = [...unlockedBadges, ...lockedBadges].slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Your Badges</h3>
      </div>
      <div className="p-5">
        <div className="flex justify-around">
          {displayBadges.map(badge => (
            <Badge key={badge.id} badge={badge} />
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View all badges
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentBadges;
