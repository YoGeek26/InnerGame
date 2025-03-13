import React, { useState } from 'react';
import { Award, Users, Star, ArrowUp, ArrowDown, Filter, Trophy, Crown } from 'lucide-react';

interface ComebackSubmission {
  id: string;
  userName: string;
  userLevel: number;
  scenario: {
    prompt: string;
    context: string;
  };
  response: string;
  score: number;
  votes: number;
  timestamp: Date;
}

const ComebackRankings: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'day' | 'week' | 'month' | 'alltime'>('week');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'flirty' | 'tests' | 'banter'>('all');
  
  // Sample data - in a real app, this would come from a database
  const submissions: ComebackSubmission[] = [
    {
      id: 'comeback-1',
      userName: 'JohnMaster',
      userLevel: 7,
      scenario: {
        prompt: "You're trying too hard to impress me right now.",
        context: "You're on a date at a nice restaurant and you've been telling a story about your travels."
      },
      response: "I'm not trying to impress anyone. I'm just excited to share my experiences with someone who might appreciate them. But if you'd rather talk about something else, I'm all ears. What gets you excited?",
      score: 9,
      votes: 247,
      timestamp: new Date('2023-08-15')
    },
    {
      id: 'comeback-2',
      userName: 'CharmExpert',
      userLevel: 9,
      scenario: {
        prompt: "Is that your best pickup line? I've heard better.",
        context: "You've just introduced yourself at a bar with a casual opener."
      },
      response: "I save my A-material for the second conversation. Looks like you've just earned an upgrade. [smile] So, what brings you out tonight?",
      score: 10,
      votes: 423,
      timestamp: new Date('2023-08-18')
    },
    {
      id: 'comeback-3',
      userName: 'SmoothTalker',
      userLevel: 6,
      scenario: {
        prompt: "I bet you say that to all the girls you meet.",
        context: "You've just complimented her unique style at a friend's party."
      },
      response: "Actually, I'm pretty selective with my compliments - I only give them when something genuinely catches my eye. Your style did. But if you'd prefer, I can go back to discussing the weather?",
      score: 8,
      votes: 189,
      timestamp: new Date('2023-08-20')
    },
    {
      id: 'comeback-4',
      userName: 'CharmingDavid',
      userLevel: 8,
      scenario: {
        prompt: "Are you always this awkward or are you just trying to impress me?",
        context: "You're on a date and the conversation has hit a momentary lull."
      },
      response: "I prefer to call it 'authentically human' rather than awkward. And if I were trying to impress you, I'd be telling you about my gold medal in the awkwardness Olympics. So consider yourself lucky.",
      score: 9,
      votes: 302,
      timestamp: new Date('2023-08-22')
    },
    {
      id: 'comeback-5',
      userName: 'ConfidentAlex',
      userLevel: 5,
      scenario: {
        prompt: "I'm not really looking for anything serious right now.",
        context: "A few dates in, the person you're seeing brings this up unexpectedly."
      },
      response: "That's perfectly fine. I'm more focused on enjoying quality time with interesting people than rushing into labels. Let's just keep getting to know each other and see where it naturally goes. No pressure.",
      score: 9,
      votes: 276,
      timestamp: new Date('2023-08-25')
    },
  ];
  
  // Filter submissions based on selected filters
  const filteredSubmissions = submissions
    .filter(submission => {
      // Time filter
      const now = new Date();
      if (timeFilter === 'day') {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return submission.timestamp >= yesterday;
      } else if (timeFilter === 'week') {
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - 7);
        return submission.timestamp >= lastWeek;
      } else if (timeFilter === 'month') {
        const lastMonth = new Date(now);
        lastMonth.setMonth(now.getMonth() - 1);
        return submission.timestamp >= lastMonth;
      }
      return true; // 'alltime' or default
    })
    .filter(submission => {
      // Category filter
      if (categoryFilter === 'all') return true;
      if (categoryFilter === 'flirty' && submission.scenario.prompt.includes('impress')) return true;
      if (categoryFilter === 'tests' && submission.scenario.prompt.includes('pickup line')) return true;
      if (categoryFilter === 'banter' && submission.scenario.prompt.includes('awkward')) return true;
      return false;
    })
    .sort((a, b) => b.score - a.score || b.votes - a.votes);

  return (
    <div className="luxury-card p-6">
      <div className="flex items-center justify-between border-b pb-6 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Trophy className="mr-2 h-6 w-6 text-[var(--color-gold)]" />
            Top Ranked Comebacks
          </h2>
          <p className="text-gray-600 mt-1">See the most acclaimed responses from the community</p>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[var(--color-burgundy)] focus:border-[var(--color-burgundy)]"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="alltime">All Time</option>
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[var(--color-burgundy)] focus:border-[var(--color-burgundy)]"
          >
            <option value="all">All Categories</option>
            <option value="flirty">Flirty Teasing</option>
            <option value="tests">Test Questions</option>
            <option value="banter">Witty Banter</option>
          </select>
        </div>
      </div>
      
      {filteredSubmissions.length > 0 ? (
        <div className="space-y-6">
          {/* Top 3 Featured with medals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {filteredSubmissions.slice(0, 3).map((submission, idx) => (
              <div 
                key={submission.id}
                className="luxury-card p-5 relative"
              >
                <div className={`absolute -top-3 -right-3 rounded-full p-2 ${
                  idx === 0 ? 'bg-[var(--color-gold)]' : 
                  idx === 1 ? 'bg-gray-300' : 
                  'bg-amber-700'
                }`}>
                  <Crown className={`h-6 w-6 ${
                    idx === 0 ? 'text-white' : 
                    idx === 1 ? 'text-gray-700' : 
                    'text-amber-200'
                  }`} />
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="bg-gray-200 rounded-full p-2">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="ml-2">
                    <p className="font-medium">{submission.userName}</p>
                    <p className="text-xs text-gray-500">Level {submission.userLevel}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700 italic">"{submission.scenario.prompt}"</p>
                  <p className="text-xs text-gray-500 mt-1">{submission.scenario.context}</p>
                </div>
                
                <div className="border-l-4 border-[var(--color-burgundy)] pl-3 py-1">
                  <p className="text-gray-800">{submission.response}</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-[var(--color-gold)] mr-1" />
                    <span className="font-medium">{submission.score}/10</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>{submission.votes} votes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Rest of rankings */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Other Top Responses</h3>
            
            <div className="space-y-4">
              {filteredSubmissions.slice(3).map((submission, idx) => (
                <div 
                  key={submission.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                        <span className="font-medium text-gray-700">#{idx + 4}</span>
                      </div>
                      <div>
                        <p className="font-medium">{submission.userName}</p>
                        <p className="text-xs text-gray-500">Level {submission.userLevel}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-[var(--color-gold)] mr-1" />
                      <span className="font-medium mr-3">{submission.score}/10</span>
                      <div className="flex items-center text-gray-500">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        <span>{submission.votes}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 italic mb-1">{submission.scenario.prompt}</p>
                    <p className="text-gray-900">{submission.response}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-gray-800 font-medium text-lg">No comebacks found</h3>
          <p className="text-gray-600 mt-1">Try adjusting your filters or check back later</p>
        </div>
      )}
      
      <div className="mt-8 bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] rounded-lg p-5 text-white">
        <div className="flex items-center">
          <Award className="h-10 w-10 mr-4" />
          <div>
            <h3 className="font-bold text-lg mb-1">Submit Your Comebacks</h3>
            <p className="text-gray-200">Complete Battle de Répartie scenarios to submit your responses to the rankings</p>
            <button 
              className="mt-3 px-4 py-2 bg-white text-[var(--color-burgundy)] rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Try Battle Challenges
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComebackRankings;
