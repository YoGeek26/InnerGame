import React, { useState } from 'react';
import { Simulation, ComebackBattle } from '../types';
import SimulationCard from '../components/play/SimulationCard';
import ConversationSimulator from '../components/play/ConversationSimulator';
import BattleDeRepartie from '../components/play/BattleDerepartie';
import ComebackRankings from '../components/play/ComebackRankings';
import { Gamepad2, MessageCircle, Users, Sparkles, ArrowLeft, Search, Zap, Trophy } from 'lucide-react';
import { useUser } from '../context/UserContext';

const PlayPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeSimulation, setActiveSimulation] = useState<Simulation | null>(null);
  const [activeBattle, setActiveBattle] = useState<ComebackBattle | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { addXP } = useUser();

  const simulations: Simulation[] = [
    {
      id: '1',
      title: 'Tinder Opening Messages',
      description: 'Practice creating engaging first messages that get responses',
      scenarioType: 'tinder',
      difficulty: 'beginner',
      completed: false,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      title: 'Coffee Shop Approach',
      description: 'Simulate approaching someone at a coffee shop with natural conversation',
      scenarioType: 'irl',
      difficulty: 'intermediate',
      completed: false,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80',
    },
    {
      id: '3',
      title: 'WhatsApp Date Planning',
      description: 'Learn how to smoothly transition from chat to planning a date',
      scenarioType: 'whatsapp',
      difficulty: 'beginner',
      completed: true,
      image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&q=80',
    },
    {
      id: '4',
      title: 'Bar Approach Scenario',
      description: 'Practice approaching a group at a bar with confidence',
      scenarioType: 'irl',
      difficulty: 'advanced',
      completed: false,
      image: 'https://images.unsplash.com/photo-1470338950318-40320a722782?auto=format&fit=crop&q=80',
    },
    {
      id: '5',
      title: 'Tinder Profile Review',
      description: 'Get feedback on your profile and learn what works and what doesn\'t',
      scenarioType: 'tinder',
      difficulty: 'intermediate',
      completed: false,
      image: 'https://images.unsplash.com/photo-1516914589966-a4c9b8016823?auto=format&fit=crop&q=80',
    },
    {
      id: '6',
      title: 'First Date Conversation',
      description: 'Master the art of engaging first date conversation',
      scenarioType: 'irl',
      difficulty: 'intermediate',
      completed: false,
      image: 'https://images.unsplash.com/photo-1609885843788-51c5bd8fd7ae?auto=format&fit=crop&q=80',
    },
  ];
  
  const comebackBattles: ComebackBattle[] = [
    {
      id: 'battle-1',
      title: 'Battle de Répartie: Flirty Teasing',
      description: 'Practice quick-witted responses to playful teasing',
      difficulty: 'intermediate',
      scenarioType: 'battle',
      image: 'https://images.unsplash.com/photo-1528588301452-6d3ca8008ced?auto=format&fit=crop&q=80',
      scenarios: [
        {
          id: 'scenario-1',
          prompt: "You're trying too hard to impress me right now.",
          context: "You're on a date at a nice restaurant and you've been telling a story about your travels.",
          difficulty: 'easy',
          tips: "When someone says you're trying too hard, they're often testing your confidence. Respond with self-assurance rather than defensiveness."
        },
        {
          id: 'scenario-2',
          prompt: "Is that your best pickup line? I've heard better.",
          context: "You've just introduced yourself at a bar with a casual opener.",
          difficulty: 'medium',
          tips: "This is a classic test to see if you get flustered. Maintaining your composure and responding with humor works well."
        }
      ]
    },
    {
      id: 'battle-2',
      title: 'Battle de Répartie: Test Questions',
      description: 'Master the art of handling unexpected challenges and tests',
      difficulty: 'advanced',
      scenarioType: 'battle',
      image: 'https://images.unsplash.com/photo-1508214477096-870701b76b58?auto=format&fit=crop&q=80',
    },
    {
      id: 'battle-3',
      title: 'Battle de Répartie: Witty Banter',
      description: 'Develop lightning-fast comebacks for social settings',
      difficulty: 'beginner',
      scenarioType: 'battle',
      image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80',
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Activities', icon: <Gamepad2 size={16} /> },
    { id: 'tinder', label: 'Tinder', icon: <MessageCircle size={16} /> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle size={16} /> },
    { id: 'irl', label: 'In-Person', icon: <Users size={16} /> },
    { id: 'battle', label: 'Comeback Battles', icon: <Zap size={16} /> },
    { id: 'rankings', label: 'Top Rankings', icon: <Trophy size={16} /> },
  ];

  const filteredItems = [...simulations, ...comebackBattles].filter(item => {
    const matchesCategory = activeTab === 'all' || item.scenarioType === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSimulationClick = (simulation: Simulation) => {
    setActiveSimulation(simulation);
    setActiveBattle(null);
  };
  
  const handleBattleClick = (battle: ComebackBattle) => {
    setActiveBattle(battle);
    setActiveSimulation(null);
  };

  const handleCompleteSimulation = () => {
    if (activeSimulation) {
      // Add XP reward
      addXP(100);
      
      // Mark simulation as completed
      const updatedSimulation = {
        ...activeSimulation,
        completed: true
      };
      
      // In a real app, we would update this in a database
      console.log('Simulation completed:', updatedSimulation);
      
      // Return to simulation list
      setActiveSimulation(null);
    }
  };
  
  const handleCompleteBattle = () => {
    if (activeBattle) {
      // Add XP reward
      addXP(150);
      
      // In a real app, we would update this in a database
      console.log('Battle completed:', activeBattle);
      
      // Return to battle list
      setActiveBattle(null);
    }
  };

  return (
    <div className="space-y-6">
      {activeSimulation ? (
        <div>
          <button
            onClick={() => setActiveSimulation(null)}
            className="flex items-center text-[var(--color-burgundy)] font-medium mb-4 hover:text-[var(--color-gold)]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to simulations
          </button>
          
          <ConversationSimulator
            title={activeSimulation.title}
            scenarioType={activeSimulation.scenarioType as 'tinder' | 'whatsapp' | 'irl'}
            onComplete={handleCompleteSimulation}
          />
        </div>
      ) : activeBattle ? (
        <BattleDeRepartie
          battleId={activeBattle.id}
          title={activeBattle.title}
          description={activeBattle.description}
          difficulty={activeBattle.difficulty}
          onComplete={handleCompleteBattle}
          onBack={() => setActiveBattle(null)}
        />
      ) : activeTab === 'rankings' ? (
        <ComebackRankings />
      ) : (
        <>
          <div className="luxury-card p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Let's Play</h1>
            <p className="text-gray-600">Interactive simulations to practice and improve your skills</p>
          </div>
          
          <div className="luxury-card p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex overflow-x-auto space-x-2 pb-2 sm:pb-0">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-[var(--color-burgundy)] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[var(--color-burgundy)] focus:border-[var(--color-burgundy)]"
                />
              </div>
            </div>
            
            {/* Battle de Répartie Feature Highlight */}
            {(activeTab === 'all' || activeTab === 'battle') && (
              <div className="mb-8 bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] rounded-xl p-5 text-white">
                <div className="flex items-start">
                  <div className="bg-[var(--color-gold)] rounded-full p-2 mr-4">
                    <Zap className="h-6 w-6 text-[var(--color-midnight)]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">Battle de Répartie</h2>
                    <p className="text-gray-200 mb-3">New! Challenge yourself with quick-witted comebacks and responses</p>
                    <p className="text-xs text-gray-300 mb-4">Powered by OpenAI GPT-4o</p>
                    <button 
                      onClick={() => setActiveTab('battle')}
                      className="px-4 py-2 bg-white text-[var(--color-burgundy)] rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      Try Battles
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => {
                if ('completed' in item) {
                  // This is a simulation
                  return (
                    <SimulationCard
                      key={item.id}
                      simulation={item as Simulation}
                      onClick={() => handleSimulationClick(item as Simulation)}
                    />
                  );
                } else {
                  // This is a battle
                  const battle = item as ComebackBattle;
                  return (
                    <div 
                      key={battle.id}
                      onClick={() => handleBattleClick(battle)}
                      className="luxury-card overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
                    >
                      <div className="relative h-40">
                        <img 
                          src={battle.image} 
                          alt={battle.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                        <div className="absolute top-2 right-2 bg-[var(--color-gold)] text-[var(--color-midnight)] px-2 py-1 rounded text-xs font-bold">
                          {battle.difficulty}
                        </div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <div className="flex items-center">
                            <Zap className="h-4 w-4 text-[var(--color-gold)] mr-1" />
                            <span className="text-xs font-medium text-white">Battle de Répartie</span>
                          </div>
                          <h3 className="text-white font-bold mt-1">{battle.title}</h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-600 text-sm">{battle.description}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            
            {filteredItems.length === 0 && activeTab !== 'rankings' && (
              <div className="text-center py-10">
                <p className="text-gray-500 font-medium">No activities found matching your search</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayPage;
