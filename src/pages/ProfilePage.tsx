import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Skill, Badge } from '../types';
import { User, Settings, Award, BarChart4, Clock, BookOpen, Calendar, ChevronRight, Edit, CheckCircle, Share2, Download, Upload, Eye, Link, ArrowUpRight } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'badges' | 'stats' | 'settings'>('overview');

  // Calculate time since first badge
  const firstBadgeDate = user.badges.reduce((earliest, badge) => 
    badge.earnedAt < earliest ? badge.earnedAt : earliest, 
    new Date()
  );
  
  const daysSinceStart = Math.floor((new Date().getTime() - firstBadgeDate.getTime()) / (1000 * 3600 * 24));
  
  // Group skills by category
  const skillsByCategory = user.skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      {/* Profile header */}
      <div className="luxury-card p-6">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[var(--color-burgundy)] to-[var(--color-midnight)] flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <div className="ml-2 px-2 py-1 bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-gold)] text-white text-xs rounded-full">
                Level {user.level}
              </div>
            </div>
            <p className="text-gray-600 mt-1">{user.email}</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="text-xs bg-gray-100 rounded-full px-2 py-1 text-gray-600 flex items-center">
                <Award className="h-3 w-3 mr-1" />
                {user.badges.length} Badges
              </div>
              <div className="text-xs bg-gray-100 rounded-full px-2 py-1 text-gray-600 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Member for {daysSinceStart} days
              </div>
              <div className="text-xs bg-gray-100 rounded-full px-2 py-1 text-gray-600 flex items-center">
                <BarChart4 className="h-3 w-3 mr-1" />
                {user.xp} XP Total
              </div>
            </div>
          </div>
          <div className="ml-auto flex space-x-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <Share2 className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <Edit className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
        
        {/* XP progress */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">XP Progress</p>
            <p className="text-sm text-gray-500">{user.xp % 1000}/1000 to level {user.level + 1}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-gold)] h-2.5 rounded-full" 
              style={{ width: `${(user.xp % 1000) / 10}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-500">Level {user.level}</p>
            <p className="text-xs text-gray-500">Level {user.level + 1}</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 px-4 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-[var(--color-burgundy)] text-[var(--color-burgundy)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`pb-2 px-4 text-sm font-medium ${
                activeTab === 'skills'
                  ? 'border-b-2 border-[var(--color-burgundy)] text-[var(--color-burgundy)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`pb-2 px-4 text-sm font-medium ${
                activeTab === 'badges'
                  ? 'border-b-2 border-[var(--color-burgundy)] text-[var(--color-burgundy)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Badges
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`pb-2 px-4 text-sm font-medium ${
                activeTab === 'stats'
                  ? 'border-b-2 border-[var(--color-burgundy)] text-[var(--color-burgundy)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-2 px-4 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'border-b-2 border-[var(--color-burgundy)] text-[var(--color-burgundy)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Progress summary cards */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">Conversation</h3>
                    <div className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-0.5">
                      {user.progress.conversation}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${user.progress.conversation}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">Inner Game</h3>
                    <div className="bg-purple-100 text-purple-800 text-xs rounded-full px-2 py-0.5">
                      {user.progress.innerGame}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: `${user.progress.innerGame}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">Approach</h3>
                    <div className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-0.5">
                      {user.progress.approach}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${user.progress.approach}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Recent achievements */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Recent Achievements</h3>
                <div className="space-y-3">
                  {user.badges.slice(0, 3).map(badge => (
                    <div key={badge.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <div className="bg-[var(--color-gold)] rounded-full p-2 mr-3">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{badge.name}</p>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                      </div>
                      <div className="ml-auto text-xs text-gray-500">
                        {badge.earnedAt.toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Next level benefits */}
              <div className="bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] rounded-lg p-5 text-white">
                <h3 className="font-medium mb-3">Unlock at Level {user.level + 1}</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-[var(--color-gold)]" />
                    <p>Advanced conversation simulation scenarios</p>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-[var(--color-gold)]" />
                    <p>Exclusive AI Coach topic options</p>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-[var(--color-gold)]" />
                    <p>Limited-edition profile badges</p>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 bg-white text-[var(--color-burgundy)] rounded-lg font-medium">
                  Complete more activities to level up
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'skills' && (
            <div>
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category} className="mb-6">
                  <h3 className="font-medium text-gray-900 capitalize mb-3">{category} Skills</h3>
                  
                  <div className="space-y-4">
                    {skills.map(skill => (
                      <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{skill.name}</h4>
                          <div className="text-xs font-medium bg-[var(--color-burgundy)] text-white rounded-full px-2 py-0.5">
                            Level {skill.level}/{skill.maxLevel}
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-[var(--color-burgundy)] h-2 rounded-full" 
                            style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                          ></div>
                        </div>
                        
                        <p className="text-sm text-gray-600">
                          {skill.level === skill.maxLevel ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mastered
                            </span>
                          ) : (
                            `${skill.maxLevel - skill.level} more levels to master`
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Unlock More Skills</h3>
                    <p className="text-sm text-gray-600 mt-1">Complete challenges and earn XP to unlock advanced skills</p>
                  </div>
                  <button className="px-4 py-2 bg-[var(--color-burgundy)] text-white rounded-lg text-sm font-medium">
                    View Challenges
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'badges' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {user.badges.map(badge => (
                  <div key={badge.id} className="border border-gray-200 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-gold)] rounded-full flex items-center justify-center mb-3">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{badge.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                    <p className="text-xs text-gray-500">{badge.earnedAt.toLocaleDateString()}</p>
                  </div>
                ))}
                
                {/* Placeholder for locked badges */}
                {[1, 2, 3, 4].map(i => (
                  <div key={`locked-${i}`} className="border border-gray-200 rounded-lg p-4 text-center bg-gray-50">
                    <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-3">
                      <Award className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-gray-400 mb-1">Locked Badge</h4>
                    <p className="text-xs text-gray-400 mb-2">Complete more challenges to unlock</p>
                    <p className="text-xs text-gray-400">???</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-[var(--color-burgundy)] text-white rounded-lg p-5 mt-6">
                <h3 className="font-medium mb-3">Special Achievement Badges</h3>
                <p className="text-sm text-gray-200 mb-4">Complete special challenges to earn these rare badges</p>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[var(--color-gold)] flex items-center justify-center mb-2">
                      <Award className="h-5 w-5 text-[var(--color-midnight)]" />
                    </div>
                    <h5 className="text-sm font-medium mb-1">Dating Master</h5>
                    <p className="text-xs text-gray-300">Complete 10 dates</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[var(--color-gold)] flex items-center justify-center mb-2">
                      <Award className="h-5 w-5 text-[var(--color-midnight)]" />
                    </div>
                    <h5 className="text-sm font-medium mb-1">Social Butterfly</h5>
                    <p className="text-xs text-gray-300">Approach 50 people</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[var(--color-gold)] flex items-center justify-center mb-2">
                      <Award className="h-5 w-5 text-[var(--color-midnight)]" />
                    </div>
                    <h5 className="text-sm font-medium mb-1">Elite Member</h5>
                    <p className="text-xs text-gray-300">Reach Level 20</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-medium text-gray-900">Activity Time</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">37 hours</p>
                  <p className="text-sm text-gray-600">Total time spent on activities</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <BookOpen className="h-5 w-5 text-purple-500 mr-2" />
                    <h3 className="font-medium text-gray-900">Articles Read</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">24</p>
                  <p className="text-sm text-gray-600">Out of 52 available articles</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="font-medium text-gray-900">Challenges</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">15</p>
                  <p className="text-sm text-gray-600">Challenges completed</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Category Breakdown</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-700">Conversations</p>
                      <p className="text-sm font-medium text-gray-900">65%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-700">Dating</p>
                      <p className="text-sm font-medium text-gray-900">42%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-700">Psychology</p>
                      <p className="text-sm font-medium text-gray-900">78%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-700">Self-Improvement</p>
                      <p className="text-sm font-medium text-gray-900">51%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '51%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Download className="h-5 w-5 text-gray-700 mr-2" />
                  <h3 className="font-medium text-gray-900">Export Statistics</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Download your progress data in CSV format</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                    Last 30 days
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                    Complete history
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Account Information</h3>
                      <p className="text-sm text-gray-600 mt-1">Update your personal details</p>
                    </div>
                    <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <Edit className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Privacy Settings</h3>
                      <p className="text-sm text-gray-600 mt-1">Control what data is visible to others</p>
                    </div>
                    <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <Eye className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Notifications</h3>
                      <p className="text-sm text-gray-600 mt-1">Manage how you receive alerts</p>
                    </div>
                    <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <Settings className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Data Management</h3>
                      <p className="text-sm text-gray-600 mt-1">Export or delete your account data</p>
                    </div>
                    <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <Link className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div>
                    <h3 className="font-medium text-red-800">Delete Account</h3>
                    <p className="text-sm text-red-600 mt-1">This action cannot be undone. All your data will be permanently removed.</p>
                    <button className="mt-3 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50">
                      Request account deletion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
