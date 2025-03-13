import React from 'react';
import ProgressBar from '../common/ProgressBar';
import { User } from '../../types';
import { MessageCircle, Footprints, BookOpen, Sparkles } from 'lucide-react';

interface SkillsOverviewProps {
  user: User;
}

const SkillsOverview: React.FC<SkillsOverviewProps> = ({ user }) => {
  const skillsData = [
    { 
      name: 'Inner Game', 
      value: user.progress.innerGame, 
      icon: <BookOpen size={18} className="text-purple-600" />,
      color: 'bg-purple-600'
    },
    { 
      name: 'Conversation', 
      value: user.progress.conversation, 
      icon: <MessageCircle size={18} className="text-blue-600" />,
      color: 'bg-blue-600'
    },
    { 
      name: 'Approach', 
      value: user.progress.approach, 
      icon: <Footprints size={18} className="text-green-600" />,
      color: 'bg-green-600'
    },
    { 
      name: 'Storytelling', 
      value: user.progress.storytelling, 
      icon: <Sparkles size={18} className="text-yellow-600" />,
      color: 'bg-yellow-600'
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Your Skills</h3>
      </div>
      <div className="p-5 space-y-4">
        {skillsData.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {skill.icon}
                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-500">{skill.value}%</span>
            </div>
            <ProgressBar 
              value={skill.value} 
              max={100} 
              color={skill.color} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsOverview;
