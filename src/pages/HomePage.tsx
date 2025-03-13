import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import ProgressBar from '../components/common/ProgressBar';
import DailyChallenge from '../components/dashboard/DailyChallenge';
import SkillsOverview from '../components/dashboard/SkillsOverview';
import RecentBadges from '../components/dashboard/RecentBadges';
import AiCoachPreview from '../components/dashboard/AiCoachPreview';
import OnboardingQuestionnaire from '../components/onboarding/OnboardingQuestionnaire';
import QuestionnaireButton from '../components/onboarding/QuestionnaireButton';
import { Challenge } from '../types';
import { Trophy, ArrowRight, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const DAILY_QUOTES = [
  'The greatest seducer isn\'t the one with the best lines, but the one who listens with true presence.',
  'Self-confidence is the most attractive quality a person can have. How can anyone see how amazing you are if you don\'t see it yourself?',
  'Approach every interaction with genuine curiosity rather than expectation, and watch how people respond differently.',
  'The art of seduction is knowing what she really wants and slowly giving it to her in a way that takes her on a journey.',
  'True charm comes from authenticity. When you\'re comfortable in your own skin, others naturally find you captivating.',
  'Growth happens outside your comfort zone. Each approach, regardless of outcome, is developing your confidence.',
  'The most powerful way to impress someone is to be genuinely interested in them rather than trying to be interesting.',
];

const HomePage: React.FC = () => {
  const { user, addXP, hasCompletedQuestionnaire, completeQuestionnaire } = useUser();
  const [showQuestionnaire, setShowQuestionnaire] = useState<boolean>(false);
  const [dailyChallenge, setDailyChallenge] = useState<Challenge>({
    id: 'daily-1',
    title: 'Approach Challenge',
    description: 'Give a genuine compliment to a stranger today',
    difficulty: 'medium',
    xpReward: 50,
    completed: false,
    category: 'daily',
    icon: 'message-circle'
  });

  // Get today's quote based on the day of the year
  const [quote, setQuote] = useState("");
  
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % DAILY_QUOTES.length;
    setQuote(DAILY_QUOTES[quoteIndex]);
  }, []);

  const handleCompleteChallenge = () => {
    setDailyChallenge({
      ...dailyChallenge,
      completed: true
    });
  };

  const handleOpenQuestionnaire = () => {
    setShowQuestionnaire(true);
  };

  const handleCloseQuestionnaire = () => {
    setShowQuestionnaire(false);
  };

  const handleCompleteQuestionnaire = () => {
    completeQuestionnaire();
    setShowQuestionnaire(false);
  };

  return (
    <div className="space-y-6">
      {!hasCompletedQuestionnaire && !showQuestionnaire && (
        <QuestionnaireButton onClick={handleOpenQuestionnaire} />
      )}

      {showQuestionnaire && (
        <OnboardingQuestionnaire 
          onComplete={handleCompleteQuestionnaire} 
          onClose={handleCloseQuestionnaire} 
        />
      )}

      <div className="luxury-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600">Continue your seduction journey</p>
          </div>
          <div className="bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] rounded-lg p-2">
            <Trophy className="h-6 w-6 text-[var(--color-gold)]" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Level {user.level}</span>
              <span className="elite-badge">{user.xp} XP</span>
            </div>
            <span className="text-sm text-gray-500">{1000 - (user.xp % 1000)} XP to Level {user.level + 1}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="luxury-progress-bar" style={{ width: `${(user.xp % 1000) / 10}%` }}></div>
          </div>
        </div>
      </div>
      
      {/* Daily Quote Section */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" 
             style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509994196812-897f5a6ab49c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")' }}></div>
        <div className="luxury-card p-6 blur-bg relative z-10 backdrop-blur">
          <div className="flex items-center mb-3">
            <Quote className="h-5 w-5 text-[var(--color-burgundy)] mr-2" />
            <h3 className="text-lg font-semibold text-[var(--color-midnight)]">Today's Inspiration</h3>
          </div>
          <p className="text-gray-800 italic">{quote}</p>
          <div className="mt-3 flex justify-end">
            <span className="text-xs text-gray-500">New quote every day</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DailyChallenge challenge={dailyChallenge} onComplete={handleCompleteChallenge} />
        </div>
        <div>
          <SkillsOverview user={user} />
        </div>
      </div>
      
      {/* Elegant female image section */}
      <div className="luxury-card overflow-hidden">
        <div className="relative h-64">
          <img 
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
            alt="Elegant woman" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-xl font-bold mb-1">Master the Art of Seduction</h2>
            <p className="text-sm text-gray-200 mb-3">Learn the subtleties of attraction and connection</p>
            <Link 
              to="/inner-game" 
              className="inline-flex items-center px-3 py-1.5 bg-[var(--color-gold)] text-[var(--color-midnight)] rounded-lg text-sm font-medium hover:bg-amber-400 transition-colors"
            >
              Explore Techniques
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <AiCoachPreview />
        </div>
        <div>
          <RecentBadges badges={user.badges} />
        </div>
      </div>
      
      <div className="luxury-gradient rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Ready for a challenge?</h2>
          <p className="text-indigo-100 mb-4">Test your skills in interactive simulations and real-world scenarios</p>
          <Link 
            to="/play" 
            className="inline-flex items-center px-4 py-2 bg-white text-[var(--color-burgundy)] rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Practice Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
