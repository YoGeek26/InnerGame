import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AiCoachPreview: React.FC = () => {
  return (
    <div className="luxury-card overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">Your AI Coach</h2>
          <div className="bg-blue-100 rounded-full p-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">Get personalized advice and feedback from your AI seduction coach</p>
        
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-800">Would you like me to review your last conversation and suggest improvements?</p>
              <p className="text-xs text-gray-500 mt-1">Powered by OpenAI GPT-4o</p>
            </div>
          </div>
        </div>
        
        <Link 
          to="/ai-coach" 
          className="inline-flex items-center px-4 py-2 luxury-gradient text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Talk to Your Coach
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default AiCoachPreview;
