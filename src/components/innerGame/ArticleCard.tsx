import React from 'react';
import { Article } from '../../types';
import { Clock, Star, ChevronRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <div 
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <div className="text-xs px-2 py-1 rounded-full bg-white/80 text-gray-800">
            {article.category}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.summary}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {article.readTime} min
            </div>
            <div>
              {article.publishDate.toLocaleDateString('en-US', { 
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
          
          <div className="text-[var(--color-burgundy)] font-medium text-sm flex items-center">
            Read Article
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              +{article.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
