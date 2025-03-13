import React from 'react';
import { ForumPost } from '../../types';
import { MessageSquare, Heart, Eye, Check, Pin, Clock } from 'lucide-react';

interface ForumPostCardProps {
  post: ForumPost;
}

const ForumPostCard: React.FC<ForumPostCardProps> = ({ post }) => {
  const { title, author, category, tags, createdAt, replies, likes, lastReply, isPinned, isResolved } = post;
  
  // Calculate time ago
  const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return `${interval} year${interval === 1 ? '' : 's'} ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval === 1 ? '' : 's'} ago`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval === 1 ? '' : 's'} ago`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    }
    
    return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
  };

  return (
    <div className="border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <div className="p-4 flex">
        {/* Avatar column */}
        <div className="mr-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={author.avatar || `https://ui-avatars.com/api/?name=${author.name}&background=random`} 
              alt={author.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center">
                {isPinned && (
                  <div className="mr-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center">
                    <Pin className="h-3 w-3 mr-1" />
                    Pinned
                  </div>
                )}
                
                {isResolved && (
                  <div className="mr-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Resolved
                  </div>
                )}
                
                <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {category}
                </div>
              </div>
              
              <h3 className="font-medium text-gray-900 mt-1 hover:text-[var(--color-burgundy)]">
                {title}
              </h3>
              
              <div className="flex flex-wrap mt-2 gap-1">
                {tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-xs text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {timeAgo(createdAt)}
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap items-center justify-between">
            <div className="flex items-center text-sm">
              <span className="text-gray-700 mr-1">by</span>
              <span className="font-medium text-gray-900">{author.name}</span>
              <div className="ml-2 px-1.5 py-0.5 bg-gray-100 text-xs text-gray-600 rounded">
                Level {author.level}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2 sm:mt-0">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{replies}</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1" />
                <span>{likes}</span>
              </div>
            </div>
          </div>
          
          {lastReply && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <div>
                Latest reply by <span className="font-medium text-gray-700">{lastReply.author.name}</span>
              </div>
              <div>{timeAgo(lastReply.createdAt)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumPostCard;
