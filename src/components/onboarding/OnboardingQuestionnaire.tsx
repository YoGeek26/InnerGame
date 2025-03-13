import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import { ChevronRight, X, Send, Smile, SkipForward } from 'lucide-react';

// Define question types and structures
interface QuestionOption {
  id: string;
  text: string;
  value: string;
  icon?: string;
}

interface MultiSelectOption extends QuestionOption {
  selected: boolean;
}

interface BaseQuestion {
  id: string;
  type: 'text' | 'single-choice' | 'multi-choice';
  text: string;
  subtext?: string;
}

interface TextQuestion extends BaseQuestion {
  type: 'text';
}

interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single-choice';
  options: QuestionOption[];
}

interface MultiChoiceQuestion extends BaseQuestion {
  type: 'multi-choice';
  options: MultiSelectOption[];
  minSelections?: number;
}

type Question = TextQuestion | SingleChoiceQuestion | MultiChoiceQuestion;

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string | React.ReactNode;
}

// Define user profile interface that will be built during the questionnaire
interface UserProfile {
  experienceLevel?: string;
  lastInteraction?: string;
  challenges?: string[];
  attractionStyle?: string;
  groupBehavior?: string;
  approachedBefore?: string;
  conversationLength?: string;
  datingApps?: string;
  datingAppStruggles?: string[];
  goals?: string[];
  trainingFrequency?: string;
}

const OnboardingQuestionnaire: React.FC<{ onComplete: () => void; onClose?: () => void }> = ({ 
  onComplete,
  onClose
}) => {
  const { user, updateUserProfile } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userResponse, setUserResponse] = useState<string>('');
  const [multiSelectResponses, setMultiSelectResponses] = useState<MultiSelectOption[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Define all questionnaire questions
  const questions: Question[] = [
    {
      id: 'welcome',
      type: 'single-choice',
      text: "👋 Hey there! Welcome to FlirtPlay. Before we start your training, let's personalize your experience!",
      subtext: "I'll ask you a few quick questions so I can tailor your challenges and coaching just for you. Ready?",
      options: [
        { id: 'ready', text: "Yes, let's go!", value: 'ready' },
        { id: 'unsure', text: "I'm not sure...", value: 'unsure' }
      ]
    },
    {
      id: 'experience-level',
      type: 'single-choice',
      text: "Alright, first things first...",
      subtext: "How would you rate your current level in dating & attraction?",
      options: [
        { id: 'beginner', text: "Beginner - I feel uncomfortable and struggle to approach or maintain a conversation", value: 'beginner' },
        { id: 'intermediate', text: "Intermediate - I can talk to women, but I hit a plateau and don't progress further", value: 'intermediate' },
        { id: 'advanced', text: "Advanced - I already have experience but want to refine my skills and be more natural", value: 'advanced' }
      ]
    },
    {
      id: 'last-interaction',
      type: 'single-choice',
      text: "When was your last successful flirtatious interaction in real life?",
      options: [
        { id: 'never', text: "I can't remember / never really tried", value: 'never' },
        { id: 'months', text: "A few months ago, but nothing significant", value: 'months' },
        { id: 'week', text: "This week, but I want to optimize my results", value: 'week' }
      ]
    },
    {
      id: 'challenges',
      type: 'multi-choice',
      text: "What's your biggest challenge right now?",
      subtext: "Select all that apply",
      options: [
        { id: 'rejection', text: "😰 Fear of rejection", value: 'fear-of-rejection', selected: false },
        { id: 'witty', text: "🤐 Lack of witty responses", value: 'lack-of-witty-responses', selected: false },
        { id: 'opportunities', text: "⏳ Not enough opportunities to meet women", value: 'lack-of-opportunities', selected: false },
        { id: 'apps', text: "💬 Struggling to get results on dating apps", value: 'dating-apps-struggle', selected: false }
      ],
      minSelections: 1
    },
    {
      id: 'attraction-style',
      type: 'single-choice',
      text: "Cool! Now let's figure out your personal style.",
      subtext: "How do you prefer to attract women?",
      options: [
        { id: 'confidence', text: "🏆 Confidence & leadership", value: 'confidence' },
        { id: 'humor', text: "😂 Humor & playfulness", value: 'humor' },
        { id: 'mystery', text: "🤫 Mystery & charisma", value: 'mystery' },
        { id: 'adapt', text: "🎭 I adapt to different situations", value: 'adaptable' }
      ]
    },
    {
      id: 'group-behavior',
      type: 'single-choice',
      text: "What do you do in a group setting?",
      options: [
        { id: 'lead', text: "🎤 I take the lead in conversations", value: 'leader' },
        { id: 'impact', text: "😎 I speak less but make an impact", value: 'impactful' },
        { id: 'struggle', text: "🤝 I'm social but struggle to stand out", value: 'social-but-struggle' },
        { id: 'reserved', text: "🫣 I'm more reserved and prefer to listen", value: 'reserved' }
      ]
    },
    {
      id: 'approached-before',
      type: 'single-choice',
      text: "Nice! Now let's see how you handle real-life interactions.",
      subtext: "Have you ever approached a woman in real life (outside of social settings)?",
      options: [
        { id: 'never', text: "❌ No, I've never dared to", value: 'never' },
        { id: 'awkward', text: "⚠️ Yes, but it was awkward and didn't go well", value: 'awkward' },
        { id: 'success', text: "👍 Yes, and I got a number or a good reaction", value: 'success' }
      ]
    },
    {
      id: 'conversation-length',
      type: 'single-choice',
      text: "How long do your conversations last when talking to a woman you like?",
      options: [
        { id: 'less-than-min', text: "⏳ Less than a minute – I freeze quickly", value: 'less-than-minute' },
        { id: '1-5-min', text: "🗣️ 1-5 minutes – I talk but struggle to keep it interesting", value: '1-5-minutes' },
        { id: '5-plus-min', text: "🎯 5+ minutes – I hold conversations but want them to be more engaging", value: '5-plus-minutes' }
      ]
    },
    {
      id: 'dating-apps',
      type: 'single-choice',
      text: "Let's talk about dating apps!",
      subtext: "Do you use Tinder or other dating apps?",
      options: [
        { id: 'no', text: "❌ No, but I want to try", value: 'wants-to-try' },
        { id: 'few-matches', text: "🔄 Yes, but I get few matches or replies", value: 'few-matches' },
        { id: 'no-dates', text: "🤝 Yes, I chat but struggle to get dates", value: 'struggle-to-get-dates' },
        { id: 'want-improvement', text: "🔥 Yes, I get dates but want to improve my game", value: 'wants-improvement' }
      ]
    },
    {
      id: 'dating-app-struggles',
      type: 'multi-choice',
      text: "What's your biggest struggle on dating apps?",
      subtext: "Select all that apply",
      options: [
        { id: 'few-matches', text: "🤔 Few or no matches", value: 'few-matches', selected: false },
        { id: 'dying-convos', text: "💤 Conversations that die quickly", value: 'dying-conversations', selected: false },
        { id: 'no-dates', text: "📅 Hard to turn chats into real-life dates", value: 'no-dates', selected: false }
      ],
      minSelections: 1
    },
    {
      id: 'goals',
      type: 'multi-choice',
      text: "Last step – your WHY!",
      subtext: "Why do you want to improve your skills?",
      options: [
        { id: 'confidence', text: "🏆 Boost my confidence & charisma", value: 'boost-confidence', selected: false },
        { id: 'quality-women', text: "❤️ Meet high-quality women", value: 'meet-quality-women', selected: false },
        { id: 'attraction', text: "🔥 Create more attraction & get concrete results", value: 'create-attraction', selected: false },
        { id: 'relationship', text: "🎯 Find a girlfriend or improve my current relationship", value: 'find-relationship', selected: false },
        { id: 'social', text: "🧠 Just for fun & social growth", value: 'social-growth', selected: false }
      ],
      minSelections: 1
    },
    {
      id: 'training-frequency',
      type: 'single-choice',
      text: "How often do you want to train?",
      options: [
        { id: '1-2', text: "⏳ 1-2 times per week (steady progress)", value: '1-2-per-week' },
        { id: '3-5', text: "🚀 3-5 times per week (I want fast results)", value: '3-5-per-week' },
        { id: 'daily', text: "🔥 Every day! I want a complete transformation!", value: 'daily' }
      ]
    }
  ];

  // Initialize the questionnaire
  useEffect(() => {
    // Add welcome message
    setMessages([
      {
        id: `bot-welcome`,
        type: 'bot',
        content: questions[0].text
      }
    ]);
    setIsTyping(true);
    
    // Simulate bot typing for first subtext
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-welcome-subtext`,
          type: 'bot',
          content: questions[0].subtext || ''
        }
      ]);
      setIsTyping(false);
      setCurrentQuestion(questions[0]);
    }, 1000);
  }, []);
  
  // Handle response submission
  const handleResponseSubmit = (response: string | string[]) => {
    // For single choice questions
    if (typeof response === 'string') {
      // Add user message
      const selectedOption = (currentQuestion as SingleChoiceQuestion).options.find(opt => opt.value === response);
      
      setMessages(prev => [
        ...prev,
        {
          id: `user-${currentQuestion?.id}-${Date.now()}`,
          type: 'user',
          content: selectedOption?.text || response
        }
      ]);
      
      // Update user profile
      setUserProfile(prev => {
        const updatedProfile = { ...prev };
        switch (currentQuestion?.id) {
          case 'welcome':
            // If user is unsure, provide reassurance
            if (response === 'unsure') {
              setTimeout(() => {
                setMessages(prev => [
                  ...prev,
                  {
                    id: `bot-reassurance-${Date.now()}`,
                    type: 'bot',
                    content: "Don't worry! It's quick and will help you improve faster. Let's continue!"
                  }
                ]);
              }, 800);
            }
            break;
          case 'experience-level':
            updatedProfile.experienceLevel = response;
            break;
          case 'last-interaction':
            updatedProfile.lastInteraction = response;
            break;
          case 'attraction-style':
            updatedProfile.attractionStyle = response;
            break;
          case 'group-behavior':
            updatedProfile.groupBehavior = response;
            break;
          case 'approached-before':
            updatedProfile.approachedBefore = response;
            break;
          case 'conversation-length':
            updatedProfile.conversationLength = response;
            break;
          case 'dating-apps':
            updatedProfile.datingApps = response;
            break;
          case 'training-frequency':
            updatedProfile.trainingFrequency = response;
            break;
        }
        return updatedProfile;
      });
    } 
    // For multi-choice questions
    else if (Array.isArray(response)) {
      // Add user message showing all selected options
      const selectedOptions = multiSelectResponses
        .filter(opt => opt.selected)
        .map(opt => opt.text)
        .join(', ');
      
      setMessages(prev => [
        ...prev,
        {
          id: `user-${currentQuestion?.id}-${Date.now()}`,
          type: 'user',
          content: selectedOptions
        }
      ]);
      
      // Update user profile
      setUserProfile(prev => {
        const updatedProfile = { ...prev };
        switch (currentQuestion?.id) {
          case 'challenges':
            updatedProfile.challenges = response;
            break;
          case 'dating-app-struggles':
            updatedProfile.datingAppStruggles = response;
            break;
          case 'goals':
            updatedProfile.goals = response;
            break;
        }
        return updatedProfile;
      });
    }
    
    // Move to next question with typing indicator
    setCurrentQuestion(null);
    setIsTyping(true);
    
    setTimeout(() => {
      const nextIndex = questionIndex + 1;
      
      // If we have more questions, continue
      if (nextIndex < questions.length) {
        const nextQuestion = questions[nextIndex];
        setQuestionIndex(nextIndex);
        
        // Add next question (main text)
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${nextQuestion.id}`,
            type: 'bot',
            content: nextQuestion.text
          }
        ]);
        
        // If there's a subtext, add it after a delay
        if (nextQuestion.subtext) {
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                id: `bot-${nextQuestion.id}-subtext`,
                type: 'bot',
                content: nextQuestion.subtext || ''
              }
            ]);
            
            setIsTyping(false);
            setCurrentQuestion(nextQuestion);
            
            // Reset multi-select options if needed
            if (nextQuestion.type === 'multi-choice') {
              setMultiSelectResponses((nextQuestion as MultiChoiceQuestion).options);
            }
          }, 800);
        } else {
          setIsTyping(false);
          setCurrentQuestion(nextQuestion);
          
          // Reset multi-select options if needed
          if (nextQuestion.type === 'multi-choice') {
            setMultiSelectResponses((nextQuestion as MultiChoiceQuestion).options);
          }
        }
      } 
      // Questionnaire complete - show final message
      else {
        // Get experience level for personalized message
        const experienceLevel = userProfile.experienceLevel || 'beginner';
        const levelEmoji = experienceLevel === 'beginner' ? '🟢' : 
                          experienceLevel === 'intermediate' ? '🟠' : '🔴';
        
        // Determine focus areas based on challenges
        let focusAreas = "";
        if (userProfile.challenges) {
          if (userProfile.challenges.includes('fear-of-rejection')) 
            focusAreas += "Confidence building, ";
          if (userProfile.challenges.includes('lack-of-witty-responses')) 
            focusAreas += "Conversation skills, ";
          if (userProfile.challenges.includes('lack-of-opportunities')) 
            focusAreas += "Approach techniques, ";
          if (userProfile.challenges.includes('dating-apps-struggle')) 
            focusAreas += "Online dating optimization, ";
            
          // Remove trailing comma
          focusAreas = focusAreas.slice(0, -2);
        }
        
        // Add final summary message
        setMessages(prev => [
          ...prev,
          {
            id: `bot-summary`,
            type: 'bot',
            content: "Great! Based on your answers, here's your personalized program:"
          }
        ]);
        
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: `bot-summary-details`,
              type: 'bot',
              content: (
                <div className="space-y-2">
                  <p>🔹 Your Level: {levelEmoji} {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)}</p>
                  <p>🔹 Key Focus Areas: {focusAreas || "All-around skill development"}</p>
                  <p>🔹 Your First Challenge: {getFirstChallenge(experienceLevel)}</p>
                </div>
              )
            }
          ]);
          
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                id: `bot-final`,
                type: 'bot',
                content: "Let's get started! 🚀"
              }
            ]);
            setIsTyping(false);
            setCurrentQuestion({
              id: 'final-actions',
              type: 'single-choice',
              text: '',
              options: [
                { id: 'start', text: "Start My First Challenge", value: 'start' },
                { id: 'progression', text: "See My Progression Plan", value: 'progression' },
                { id: 'explore', text: "Explore the App", value: 'explore' }
              ]
            });
          }, 1000);
        }, 1000);
      }
    }, 1000);
  };
  
  // Get first challenge based on experience level
  const getFirstChallenge = (level: string): string => {
    switch (level) {
      case 'beginner':
        return "Compliment Practice - Give a genuine compliment to someone today";
      case 'intermediate':
        return "Engage in a 5-minute conversation with a stranger";
      case 'advanced':
        return "Approach someone in a public place with a unique opener";
      default:
        return "Start a conversation with someone new today";
    }
  };
  
  // Handle single choice selection
  const handleSingleChoiceSelect = (value: string) => {
    handleResponseSubmit(value);
  };
  
  // Handle multi-choice toggle
  const handleMultiChoiceToggle = (id: string) => {
    setMultiSelectResponses(prev => 
      prev.map(opt => 
        opt.id === id ? { ...opt, selected: !opt.selected } : opt
      )
    );
  };
  
  // Handle multi-choice submit
  const handleMultiChoiceSubmit = () => {
    const selectedValues = multiSelectResponses
      .filter(opt => opt.selected)
      .map(opt => opt.value);
    
    if (selectedValues.length === 0 && currentQuestion?.type === 'multi-choice' && currentQuestion.minSelections) {
      // Show error or prompt to select at least one
      return;
    }
    
    handleResponseSubmit(selectedValues);
  };
  
  // Handle final action selection
  const handleFinalAction = (value: string) => {
    // Update user profile in context
    updateUserProfile(userProfile);
    
    // Add user response
    const selectedOption = (currentQuestion as SingleChoiceQuestion).options.find(opt => opt.value === value);
    setMessages(prev => [
      ...prev,
      {
        id: `user-final-${Date.now()}`,
        type: 'user',
        content: selectedOption?.text || value
      }
    ]);
    
    // Complete the questionnaire
    setTimeout(() => {
      onComplete();
    }, 500);
  };
  
  // Complete the questionnaire
  const handleComplete = () => {
    updateUserProfile(userProfile);
    onComplete();
  };

  // Skip the questionnaire
  const handleSkip = () => {
    // Set default profile values for skipped questionnaire
    const defaultProfile: UserProfile = {
      experienceLevel: 'intermediate',
      challenges: ['lack-of-witty-responses', 'lack-of-opportunities'],
      attractionStyle: 'adaptable',
      trainingFrequency: '3-5-per-week'
    };
    
    // Update profile with default values
    updateUserProfile(defaultProfile);
    onComplete();
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Elegant background overlay with subtle image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat backdrop-blur-sm" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1549045872-0da5c9e2b76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          opacity: 0.2,
        }}
      ></div>
      
      {/* Decorative elements - subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0415] via-[#1f0d26] to-[#31132c] opacity-90"></div>
      
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-fade-in-up relative z-10 overflow-hidden">
        {/* Decorative gradient pattern at top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-burgundy)] to-[var(--color-midnight)]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-midnight)] via-[var(--color-burgundy)] to-[var(--color-gold)]"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] text-white rounded-t-xl relative">
          <h2 className="text-lg font-semibold">FlirtPlay Personalization</h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleSkip}
              className="text-white hover:text-gray-200 transition-colors flex items-center px-3 py-1 bg-black bg-opacity-20 rounded-md text-sm"
            >
              <SkipForward size={16} className="mr-1" />
              Skip
            </button>
            {onClose && (
              <button 
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
        
        {/* Chat container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-3 shadow-md ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-br from-[var(--color-burgundy)] to-[#3f1019] text-white' 
                    : 'bg-white text-gray-800 border border-gray-100'
                }`}
              >
                {typeof message.content === 'string' 
                  ? message.content 
                  : message.content
                }
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl p-3 flex space-x-1 shadow-sm border border-gray-100">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Response area */}
        <div className="p-4 border-t bg-white backdrop-blur-lg bg-opacity-90 rounded-b-xl">
          {currentQuestion?.type === 'single-choice' && (
            <div className="space-y-2">
              {currentQuestion.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    if (currentQuestion.id === 'final-actions') {
                      handleFinalAction(option.value);
                    } else {
                      handleSingleChoiceSelect(option.value);
                    }
                  }}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors flex items-center hover:border-[var(--color-burgundy)] hover:text-[var(--color-burgundy)] shadow-sm transform hover:translate-x-1 hover:scale-[1.01] duration-200"
                >
                  <span>{option.text}</span>
                  <ChevronRight size={18} className="ml-auto text-gray-400" />
                </button>
              ))}
            </div>
          )}
          
          {currentQuestion?.type === 'multi-choice' && (
            <div className="space-y-4">
              <div className="space-y-2">
                {multiSelectResponses.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleMultiChoiceToggle(option.id)}
                    className={`w-full p-3 border rounded-lg text-left flex items-center transition-colors shadow-sm transform hover:translate-x-1 duration-200 ${
                      option.selected 
                        ? 'bg-gradient-to-r from-[var(--color-burgundy)] to-[#3f1019] bg-opacity-10 border-[var(--color-burgundy)] text-[var(--color-burgundy)]' 
                        : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-5 h-5 mr-3 flex-shrink-0 rounded border ${
                      option.selected 
                        ? 'bg-[var(--color-burgundy)] border-[var(--color-burgundy)]' 
                        : 'border-gray-300'
                    }`}>
                      {option.selected && (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5  13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <span>{option.text}</span>
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleMultiChoiceSubmit}
                className="w-full p-3 bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] text-white rounded-lg font-medium hover:opacity-90 transition-colors flex items-center justify-center shadow-md transform hover:translate-y-[-2px] duration-200"
              >
                <span>Continue</span>
                <Send size={18} className="ml-2" />
              </button>
            </div>
          )}
          
          {currentQuestion?.type === 'text' && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userResponse}
                onChange={e => setUserResponse(e.target.value)}
                placeholder="Type your answer..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-[var(--color-burgundy)] focus:border-[var(--color-burgundy)]"
              />
              <button
                onClick={() => {
                  if (userResponse.trim()) {
                    handleResponseSubmit(userResponse);
                    setUserResponse('');
                  }
                }}
                className="p-3 bg-[var(--color-burgundy)] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          )}
          
          {!currentQuestion && !isTyping && (
            <button
              onClick={handleComplete}
              className="w-full p-3 bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] text-white rounded-lg font-medium hover:opacity-90 transition-colors shadow-md transform hover:translate-y-[-2px] duration-200"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;
