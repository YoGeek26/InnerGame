import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import ChallengeCard from '../components/common/ChallengeCard';
import { Award, CheckCircle, Clock, TrendingUp, Filter, Search, Calendar, Users, MessageSquare, Target, BarChart4 } from 'lucide-react';
import ProgressBar from '../components/common/ProgressBar';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'approaching' | 'conversation' | 'dating' | 'inner-game' | 'texting';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: string[];
  xpReward: number;
  timeEstimate: string;
  isCompleted: boolean;
  isLocked: boolean;
  requiredLevel?: number;
  badgeReward?: {
    id: string;
    name: string;
    icon: string;
  };
  statistics?: {
    completionRate: number;
    averageTime: string;
    usersCompleted: number;
  };
}

const ChallengesPage: React.FC = () => {
  const { user, addXP, addBadge } = useUser();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // Sample challenges data
  const challenges: Challenge[] = [
    {
      id: 'challenge-1',
      title: 'The 5-Day Approach Challenge',
      description: 'Approach 5 new people in 5 days to build your confidence and social skills.',
      category: 'approaching',
      difficulty: 'beginner',
      steps: [
        'Day 1: Ask a stranger for the time or directions.',
        'Day 2: Give a genuine compliment to 2 strangers.',
        'Day 3: Start a brief conversation with someone at a cafe or store.',
        'Day 4: Approach someone you find attractive and introduce yourself.',
        'Day 5: Have a 5+ minute conversation with someone new.'
      ],
      xpReward: 250,
      timeEstimate: '5 days',
      isCompleted: false,
      isLocked: false,
      statistics: {
        completionRate: 68,
        averageTime: '5.3 days',
        usersCompleted: 1452
      },
      badgeReward: {
        id: 'badge-approach-1',
        name: 'Approach Warrior',
        icon: 'users'
      }
    },
    {
      id: 'challenge-2',
      title: 'Conversation Thread Master',
      description: 'Learn and practice the art of threading conversations to avoid awkward silences.',
      category: 'conversation',
      difficulty: 'intermediate',
      steps: [
        'Study the concept of conversational threading in the linked article.',
        'Identify 3 threading opportunities in your next conversation.',
        'Practice with a friend, identifying at least 5 different threads.',
        'During a real interaction, maintain a conversation for 10+ minutes using threading.',
        'Reflect and note which threading techniques worked best for you.'
      ],
      xpReward: 350,
      timeEstimate: '1 week',
      isCompleted: false,
      isLocked: false,
      statistics: {
        completionRate: 42,
        averageTime: '8.5 days',
        usersCompleted: 875
      }
    },
    {
      id: 'challenge-3',
      title: 'Dating App Profile Optimization',
      description: 'Transform your dating app profile to maximize matches and responses.',
      category: 'dating',
      difficulty: 'beginner',
      steps: [
        'Take new profile photos following our guide.',
        'Craft an engaging bio using the provided templates.',
        'Set up A/B testing with two different profile versions.',
        'Run both profiles for 3 days and compare results.',
        'Implement the winning formula and track improvement in match rate.'
      ],
      xpReward: 200,
      timeEstimate: '1 week',
      isCompleted: true,
      isLocked: false,
      statistics: {
        completionRate: 78,
        averageTime: '6.2 days',
        usersCompleted: 2103
      }
    },
    {
      id: 'challenge-4',
      title: 'Confidence Building Routine',
      description: 'Develop daily habits that boost your inner confidence and self-esteem.',
      category: 'inner-game',
      difficulty: 'beginner',
      steps: [
        'Start a daily affirmation practice with the provided scripts.',
        'Implement a 15-minute confidence body language routine.',
        'Practice vocal tonality exercises for 3 days.',
        'Complete the rejection desensitization mini-challenge.',
        'Create and recite your personal empowerment statement daily.'
      ],
      xpReward: 300,
      timeEstimate: '2 weeks',
      isCompleted: false,
      isLocked: false,
      statistics: {
        completionRate: 65,
        averageTime: '16.8 days',
        usersCompleted: 1897
      },
      badgeReward: {
        id: 'badge-confidence-1',
        name: 'Inner Game Master',
        icon: 'target'
      }
    },
    {
      id: 'challenge-5',
      title: 'Advanced Text Game Challenge',
      description: 'Master the art of engaging, flirty texting that builds attraction.',
      category: 'texting',
      difficulty: 'advanced',
      steps: [
        'Analyze your current texting patterns using our framework.',
        'Implement the 2:1 message ratio guideline for 3 conversations.',
        'Practice using emotional spikes in your texts.',
        'Successfully plan and confirm a date primarily through text.',
        'Review and optimize based on response patterns.'
      ],
      xpReward: 400,
      timeEstimate: '10 days',
      isCompleted: false,
      isLocked: true,
      requiredLevel: 7,
      statistics: {
        completionRate: 31,
        averageTime: '12.4 days',
        usersCompleted: 643
      }
    },
    {
      id: 'challenge-6',
      title: 'Social Circle Expansion',
      description: 'Systematically grow your social network to create more dating opportunities.',
      category: 'approaching',
      difficulty: 'intermediate',
      steps: [
        'Identify 3 interest-based communities relevant to you.',
        'Attend at least 2 events or meetups from these communities.',
        'Make 3 new connections at each event (minimum 6 total).',
        'Follow up with your new connections within 48 hours.',
        'Plan a small gathering with at least 2 of your new connections.'
      ],
      xpReward: 350,
      timeEstimate: '3 weeks',
      isCompleted: false,
      isLocked: true,
      requiredLevel: 6,
      statistics: {
        completionRate: 38,
        averageTime: '24.5 days',
        usersCompleted: 724
      }
    }
  ];
  
  // Filter challenges based on active filters
  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = activeCategory === 'all' || challenge.category === activeCategory;
    const matchesDifficulty = activeDifficulty === 'all' || challenge.difficulty === activeDifficulty;
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });
  
  const handleStartChallenge = (challenge: Challenge) => {
    if (challenge.isLocked) return;
    setActiveChallenge(challenge);
    setCurrentStep(0);
  };
  
  const handleCompleteStep = () => {
    if (!activeChallenge) return;
    
    if (currentStep < activeChallenge.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the challenge
      addXP(activeChallenge.xpReward);
      
      // Award badge if applicable
      if (activeChallenge.badgeReward) {
        const { id, name, icon } = activeChallenge.badgeReward;
        addBadge({
          id,
          name,
          description: `Earned by completing the ${activeChallenge.title} challenge`,
          icon,
          earnedAt: new Date()
        });
      }
      
      // Reset and close the active challenge
      setActiveChallenge(null);
      setCurrentStep(0);
    }
  };
  
  // Stats for user's challenge history
  const challengeStats = {
    completed: challenges.filter(c => c.isCompleted).length,
    inProgress: 2,
    totalXPEarned: challenges.filter(c => c.isCompleted).reduce((sum, c) => sum + c.xpReward, 0),
    streak: 3
  };

  return (
    <div className="space-y-6">
      {activeChallenge ? (
        <div className="luxury-card p-6">
          <button
            onClick={() => setActiveChallenge(null)}
            className="text-[var(--color-burgundy)] mb-4 flex items-center hover:underline"
          >
            <Clock className="h-4 w-4 mr-1 transform rotate-180" />
            Back to challenges
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{activeChallenge.title}</h1>
              <p className="text-gray-600">{activeChallenge.description}</p>
              
              <div className="flex items-center space-x-3 mt-3">
                <div className={`text-xs px-2 py-1 rounded-full ${
                  activeChallenge.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  activeChallenge.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {activeChallenge.difficulty}
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                  {activeChallenge.category.replace('-', ' ')}
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {activeChallenge.timeEstimate}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-600">Reward</div>
              <div className="text-xl font-bold text-[var(--color-burgundy)]">+{activeChallenge.xpReward} XP</div>
              {activeChallenge.badgeReward && (
                <div className="mt-1 text-xs text-gray-600 flex items-center justify-center">
                  <Award className="h-3 w-3 mr-1 text-[var(--color-gold)]" />
                  +1 Badge
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium text-gray-900">Progress</h2>
              <div className="text-sm text-gray-600">
                Step {currentStep + 1} of {activeChallenge.steps.length}
              </div>
            </div>
            
            <ProgressBar 
              progress={(currentStep / activeChallenge.steps.length) * 100}
              height={8}
              labelPosition="top"
              color="var(--color-burgundy)"
            />
          </div>
          
          <div className="mt-6">
            <h2 className="font-medium text-gray-900 mb-4">Challenge Steps</h2>
            <div className="space-y-4">
              {activeChallenge.steps.map((step, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    index < currentStep 
                      ? 'border-green-200 bg-green-50' 
                      : index === currentStep 
                      ? 'border-[var(--color-burgundy)] bg-[var(--color-burgundy)]/5' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                      index < currentStep 
                        ? 'bg-green-500 text-white' 
                        : index === currentStep 
                        ? 'bg-[var(--color-burgundy)] text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className={`${
                        index < currentStep 
                          ? 'text-green-800 line-through' 
                          : index === currentStep 
                          ? 'text-gray-900 font-medium' 
                          : 'text-gray-600'
                      }`}>
                        {step}
                      </p>
                      
                      {index === currentStep && (
                        <button
                          onClick={handleCompleteStep}
                          className="mt-3 px-4 py-2 bg-[var(--color-burgundy)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-burgundy)]/90 transition-colors"
                        >
                          Mark as Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {activeChallenge.statistics && (
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <BarChart4 className="h-4 w-4 mr-2 text-gray-500" />
                Challenge Statistics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">                  <div className="text-sm text-gray-600 mb-1">Completion Rate</div>
                  <div className="text-xl font-bold text-gray-900">{activeChallenge.statistics.completionRate}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Avg. Time</div>
                  <div className="text-xl font-bold text-gray-900">{activeChallenge.statistics.averageTime}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Users Completed</div>
                  <div className="text-xl font-bold text-gray-900">{activeChallenge.statistics.usersCompleted.toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] rounded-lg p-5 text-white">
            <div className="flex items-center">
              <div className="mr-4">
                <Target className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Need help with this challenge?</h3>
                <p className="text-gray-200 mb-3">Get personalized guidance from our AI coach or connect with community members.</p>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-white text-[var(--color-burgundy)] rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Ask AI Coach
                  </button>
                  <button className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors">
                    Community Forum
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="luxury-card p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Challenges</h1>
            <p className="text-gray-600">Complete these challenges to improve your skills and earn rewards</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Completed</div>
                    <div className="text-xl font-bold text-gray-900">{challengeStats.completed}</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">In Progress</div>
                    <div className="text-xl font-bold text-gray-900">{challengeStats.inProgress}</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full p-2 mr-3">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">XP Earned</div>
                    <div className="text-xl font-bold text-gray-900">{challengeStats.totalXPEarned}</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-center">
                  <div className="bg-amber-100 rounded-full p-2 mr-3">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Current Streak</div>
                    <div className="text-xl font-bold text-gray-900">{challengeStats.streak} days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="luxury-card p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex overflow-x-auto space-x-2 pb-2 sm:pb-0">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                    activeCategory === 'all'
                      ? 'bg-[var(--color-burgundy)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Categories
                </button>
                <button
                  onClick={() => setActiveCategory('approaching')}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                    activeCategory === 'approaching'
                      ? 'bg-[var(--color-burgundy)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Users className="h-4 w-4 inline mr-1" />
                  Approaching
                </button>
                <button
                  onClick={() => setActiveCategory('conversation')}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                    activeCategory === 'conversation'
                      ? 'bg-[var(--color-burgundy)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <MessageSquare className="h-4 w-4 inline mr-1" />
                  Conversation
                </button>
                <button
                  onClick={() => setActiveCategory('texting')}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                    activeCategory === 'texting'
                      ? 'bg-[var(--color-burgundy)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <MessageSquare className="h-4 w-4 inline mr-1" />
                  Texting
                </button>
                <button
                  onClick={() => setActiveCategory('dating')}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                    activeCategory === 'dating'
                      ? 'bg-[var(--color-burgundy)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Dating
                </button>
                <button
                  onClick={() => setActiveCategory('inner-game')}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                    activeCategory === 'inner-game'
                      ? 'bg-[var(--color-burgundy)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Target className="h-4 w-4 inline mr-1" />
                  Inner Game
                </button>
              </div>
              
              <div className="flex space-x-2 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search challenges..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[var(--color-burgundy)] focus:border-[var(--color-burgundy)]"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={activeDifficulty}
                    onChange={(e) => setActiveDifficulty(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[var(--color-burgundy)] focus:border-[var(--color-burgundy)] appearance-none bg-white"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  title={challenge.title}
                  description={challenge.description}
                  difficulty={challenge.difficulty}
                  category={challenge.category}
                  xpReward={challenge.xpReward}
                  timeEstimate={challenge.timeEstimate}
                  steps={challenge.steps.length}
                  isCompleted={challenge.isCompleted}
                  isLocked={challenge.isLocked}
                  requiredLevel={challenge.requiredLevel}
                  hasBadgeReward={!!challenge.badgeReward}
                  onClick={() => handleStartChallenge(challenge)}
                />
              ))}
            </div>
            
            {filteredChallenges.length === 0 && (
              <div className="text-center py-10">
                <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-gray-800 font-medium text-lg">No challenges found</h3>
                <p className="text-gray-600 mt-1">Try adjusting your filters or search query</p>
              </div>
            )}
            
            <div className="mt-8 bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] rounded-lg p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="mb-4 md:mb-0 md:mr-6 md:flex-1">
                  <h3 className="text-xl font-bold mb-2">Daily Challenge Streak</h3>
                  <p className="text-gray-200 mb-2">Complete at least one challenge step every day to build your streak and earn bonus rewards.</p>
                  <div className="flex items-center">
                    <div className="bg-white/20 rounded-lg px-3 py-1 text-sm mr-3">
                      Current Streak: <span className="font-bold">{challengeStats.streak} days</span>
                    </div>
                    <div className="bg-white/20 rounded-lg px-3 py-1 text-sm">
                      Best Streak: <span className="font-bold">14 days</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 text-center md:w-1/4">
                  <p className="text-sm mb-1">Next Milestone</p>
                  <p className="text-xl font-bold mb-2">7 days</p>
                  <div className="bg-white/20 rounded-full px-3 py-1 text-xs inline-flex items-center">
                    <Award className="h-3 w-3 mr-1 text-[var(--color-gold)]" />
                    +100 XP Bonus
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChallengesPage;
