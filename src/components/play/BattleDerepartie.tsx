import React, { useState, useEffect } from 'react';
import { BattleScenario } from '../../types';
import { Zap, Sparkles, Check, X, ArrowRight, ThumbsUp } from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface BattleDeRepartieProps {
  battleId: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  onComplete: () => void;
  onBack: () => void;
}

const BattleDeRepartie: React.FC<BattleDeRepartieProps> = ({
  battleId,
  title,
  description,
  difficulty,
  onComplete,
  onBack
}) => {
  const { addXP } = useUser();
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [battleComplete, setBattleComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  // Sample scenarios - in a real app these would come from a database or API
  const scenarios: BattleScenario[] = [
    {
      id: 'scenario-1',
      prompt: "I bet you use that line on everyone you meet.",
      context: "You're at a bar and someone attractive seems skeptical of your introduction.",
      difficulty: 'easy',
      tips: "A witty response that turns the skepticism into playfulness could work well here."
    },
    {
      id: 'scenario-2',
      prompt: "Are you always this awkward or are you just trying to impress me?",
      context: "You're on a date and the conversation has hit a momentary lull.",
      difficulty: 'medium',
      tips: "Self-deprecating humor can diffuse tension, or confidently own the moment - either approach can work well."
    },
    {
      id: 'scenario-3',
      prompt: "I'm not really looking for anything serious right now.",
      context: "A few dates in, the person you're seeing brings this up unexpectedly.",
      difficulty: 'hard',
      tips: "This requires emotional intelligence - neither seeming desperate nor dismissive. Think about what you actually want and respond authentically."
    }
  ];
  
  const currentScenario = scenarios[currentScenarioIndex];
  
  // Sample AI evaluation function - in a real app, this would call the OpenAI API
  const evaluateResponse = async (response: string): Promise<{ feedback: string, score: number }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple evaluation logic - in a real app, this would use NLP
    const responseLength = response.length;
    const hasConfidence = /confident|self-assured|relaxed|calm|cool|collected/i.test(response);
    const isPlayful = /joke|haha|funny|laugh|smile|grin|playful/i.test(response);
    const isDefensive = /whatever|fine|sorry|apologize|my bad/i.test(response);
    
    let score = 0;
    let feedback = "";
    
    // Score based on length (simple heuristic - real system would be more sophisticated)
    if (responseLength < 20) {
      score += 1;
      feedback += "Your response is quite brief. Adding a bit more detail might make it more engaging. ";
    } else if (responseLength < 100) {
      score += 3;
      feedback += "Good length for a comeback - not too short, not too long. ";
    } else {
      score += 2;
      feedback += "Your response is quite lengthy for a comeback. Sometimes brevity can make witty responses more impactful. ";
    }
    
    // Score based on tone/content
    if (hasConfidence) {
      score += 3;
      feedback += "I like your confident tone - that's attractive and shows emotional resilience. ";
    }
    
    if (isPlayful) {
      score += 3;
      feedback += "Great use of playfulness and humor to diffuse the tension. ";
    }
    
    if (isDefensive) {
      score -= 2;
      feedback += "Be careful of coming across as defensive or apologetic when it's not necessary. ";
    }
    
    // Cap the score between 1-10
    score = Math.min(10, Math.max(1, score));
    
    // Add scenario-specific feedback
    switch (currentScenarioIndex) {
      case 0:
        if (score > 7) {
          feedback += "You handled this classic 'test' excellently. Your response maintained frame and turned potential skepticism into an engaging exchange.";
        } else {
          feedback += "This was a classic 'test' to see how you handle subtle challenges. Remember to respond with confidence rather than justifying yourself.";
        }
        break;
      case 1:
        if (score > 7) {
          feedback += "Perfect way to handle a comment about awkwardness. You didn't get flustered and maintained your composure while creating attraction.";
        } else {
          feedback += "When someone points out awkwardness, it's often a playful tease rather than a serious criticism. Responding with confidence or humor works best.";
        }
        break;
      case 2:
        if (score > 7) {
          feedback += "Excellent response to a potentially difficult situation. You showed emotional maturity while maintaining your value and boundaries.";
        } else {
          feedback += "This scenario tests your abundance mindset and emotional resilience. The key is to respond authentically without seeming desperate or dismissive.";
        }
        break;
    }
    
    return { feedback, score };
  };
  
  const handleSubmit = async () => {
    if (!userResponse.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const { feedback, score } = await evaluateResponse(userResponse);
      setFeedback(feedback);
      setScore(score);
      setShowFeedback(true);
      
      // Add points to total score
      setScore(prevScore => prevScore + score);
    } catch (error) {
      console.error('Error evaluating response:', error);
      setFeedback("Sorry, we couldn't evaluate your response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleNextScenario = () => {
    setUserResponse('');
    setFeedback(null);
    setShowFeedback(false);
    
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prevIndex => prevIndex + 1);
    } else {
      setBattleComplete(true);
      addXP(150); // Award XP for completing the battle
    }
  };
  
  return (
    <div className="luxury-card p-6">
      {battleComplete ? (
        <div className="space-y-6">
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-gold)] text-white mb-4">
              <ThumbsUp className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Battle Complete!</h2>
            <p className="text-gray-600">You've successfully completed all scenarios</p>
            
            <div className="mt-6 bg-gray-50 rounded-xl p-6 inline-block">
              <p className="text-lg font-medium text-gray-800">Your Score: <span className="text-[var(--color-burgundy)]">{score} / 30</span></p>
              <p className="text-sm text-gray-500 mt-1">+150 XP earned</p>
            </div>
          </div>
          
          <button
            onClick={onComplete}
            className="w-full py-3 bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-gold)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Complete Battle
          </button>
        </div>
      ) : (
        <>
          <div>
            <button
              onClick={onBack}
              className="text-[var(--color-burgundy)] mb-4 flex items-center hover:underline"
            >
              <ArrowRight className="h-4 w-4 mr-1 transform rotate-180" />
              Back to battles
            </button>
            
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <div className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
              Scenario {currentScenarioIndex + 1} of {scenarios.length}
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium ${
              currentScenario.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              currentScenario.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentScenario.difficulty}
            </div>
          </div>
          
          <div className="border-l-4 border-[var(--color-gold)] pl-4 py-2 bg-amber-50 rounded-r mt-6">
            <p className="text-gray-700 font-medium flex items-center">
              <Sparkles className="h-4 w-4 text-[var(--color-gold)] mr-2" />
              Powered by OpenAI GPT-4o
            </p>
            <p className="text-sm text-gray-500">This challenge uses AI to evaluate your responses</p>
          </div>
          
          <div className="mt-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="font-medium text-gray-700">Context:</p>
              <p className="text-gray-600 mt-1">{currentScenario.context}</p>
              
              <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-medium text-gray-900">They say to you:</p>
                <p className="text-gray-800 mt-1 text-lg italic">"{currentScenario.prompt}"</p>
              </div>
            </div>
            
            {!showFeedback ? (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your comeback:
                </label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[var(--color-burgundy)] focus:border-[var(--color-burgundy)]"
                  rows={4}
                  placeholder="Type your witty comeback..."
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                />
                
                <button 
                  className="mt-4 w-full py-2 bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] text-white rounded-lg font-medium disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !userResponse.trim()}
                >
                  {isSubmitting ? 'Analyzing...' : 'Submit & Get Feedback'}
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-[var(--color-burgundy)] rounded-full p-1 mr-2">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900">Your Response</h3>
                  </div>
                  <p className="text-gray-700">{userResponse}</p>
                </div>
                
                <div className="bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] text-white rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-white rounded-full p-1 mr-2">
                      <Sparkles className="h-4 w-4 text-[var(--color-burgundy)]" />
                    </div>
                    <h3 className="font-medium">AI Coach Feedback</h3>
                  </div>
                  <p>{feedback}</p>
                  
                  <div className="mt-4 pt-4 border-t border-white/30 flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-80">Score for this response:</p>
                      <p className="text-xl font-bold">{score}/10</p>
                    </div>
                    <button 
                      className="px-4 py-2 bg-white text-[var(--color-burgundy)] rounded-lg font-medium"
                      onClick={handleNextScenario}
                    >
                      {currentScenarioIndex < scenarios.length - 1 ? 'Next Scenario' : 'Complete Battle'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BattleDeRepartie;
