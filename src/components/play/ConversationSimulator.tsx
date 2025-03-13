import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User, Check, Sparkles, Image, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface ConversationScenario {
  id: string;
  message: string;
  sender: 'ai' | 'user';
  options?: {
    id: string;
    text: string;
    nextScenarioId: string;
    qualityScore: number;
  }[];
}

interface ConversationProfile {
  name: string;
  age: number;
  bio: string;
  interests: string[];
  image: string;
}

interface ConversationSimulatorProps {
  title: string;
  scenarioType: 'tinder' | 'whatsapp' | 'irl';
  onComplete: () => void;
}

const ConversationSimulator: React.FC<ConversationSimulatorProps> = ({ title, scenarioType, onComplete }) => {
  const [messages, setMessages] = useState<{ id: number; sender: 'ai' | 'user'; text: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [complete, setComplete] = useState(false);
  const [currentScenarioId, setCurrentScenarioId] = useState('intro');
  const [showOptions, setShowOptions] = useState(false);
  const [score, setScore] = useState(0);
  const [showGuidance, setShowGuidance] = useState(false);
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  
  const profile: ConversationProfile = {
    name: scenarioType === 'tinder' ? 'Emma' : scenarioType === 'whatsapp' ? 'Sophie' : 'Olivia',
    age: 28,
    bio: scenarioType === 'tinder' 
      ? "Travel enthusiast 🌍 Yoga instructor 🧘‍♀️ Dog lover 🐕\nLooking for someone who can make me laugh and join me on adventures!"
      : "Just a coffee lover with a photography obsession. I enjoy hiking on weekends and trying new restaurants.",
    interests: ["Photography", "Hiking", "Travel", "Coffee", "Reading"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  };
  
  // Define the conversation scenarios and branching paths
  const scenarios: { [key: string]: ConversationScenario } = {
    'intro': {
      id: 'intro',
      message: scenarioType === 'tinder' 
        ? "Hey! I like your profile. I'm also into photography. What kind of photos do you usually take?"
        : scenarioType === 'whatsapp'
        ? "Hey! It was nice meeting you at the coffee shop yesterday. How's your day going?"
        : "Hi there! I noticed you're reading one of my favorite books. How are you enjoying it so far?",
      sender: 'ai',
      options: [
        { 
          id: 'option1', 
          text: scenarioType === 'tinder' 
            ? "I mostly do travel photography. I've been to 20 countries so far. What about you?"
            : scenarioType === 'whatsapp'
            ? "It's going well, thanks for asking! Just finished a busy day at work. How about you?"
            : "I'm really loving it! The character development is amazing. Are you a big reader?",
          nextScenarioId: 'response1',
          qualityScore: 8
        },
        { 
          id: 'option2', 
          text: scenarioType === 'tinder'
            ? "Thanks! I'm not actually that into photography, that's just something I put on my profile."
            : scenarioType === 'whatsapp'
            ? "Hey! Yeah, it was nice meeting you too. I'm good."
            : "It's okay I guess. What other books do you like?",
          nextScenarioId: 'response2',
          qualityScore: 4
        },
        { 
          id: 'option3', 
          text: scenarioType === 'tinder'
            ? "I love capturing moments of people in their natural environment. There's something powerful about candid emotions. What draws you to photography?"
            : scenarioType === 'whatsapp'
            ? "It's been a great day! Just got back from an amazing hiking trail with incredible views. The kind of scenery you'd probably capture beautifully with your camera!"
            : "I'm absolutely captivated by it! The way the author weaves themes of identity through the narrative is brilliant. What other authors do you enjoy in this genre?",
          nextScenarioId: 'response3',
          qualityScore: 10
        }
      ]
    },
    'response1': {
      id: 'response1',
      message: scenarioType === 'tinder'
        ? "That's awesome! I've only been to a few countries, but I love capturing landscapes and cityscapes. I'd love to travel more. What's been your favorite destination so far?"
        : scenarioType === 'whatsapp'
        ? "I've had a productive day too! Just finished a photography session at the park. So, I was wondering if you'd like to grab coffee again sometime this week?"
        : "Yes, I read all the time! I particularly love fiction that explores complex characters. What other genres do you enjoy besides this one?",
      sender: 'ai',
      options: [
        {
          id: 'option1-1',
          text: scenarioType === 'tinder'
            ? "Definitely Japan. The contrast between traditional temples and futuristic cities is amazing for photography. Do you have a dream destination?"
            : scenarioType === 'whatsapp'
            ? "Coffee sounds great! How about Thursday evening after work? There's a new place I've been wanting to try."
            : "I mostly read science fiction and historical fiction. I like books that transport me to different worlds or times. What are you reading currently?",
          nextScenarioId: 'good-progress',
          qualityScore: 9
        },
        {
          id: 'option1-2',
          text: scenarioType === 'tinder'
            ? "I've been to so many places it's hard to choose. I'm very well-traveled and have seen pretty much everything worth seeing."
            : scenarioType === 'whatsapp'
            ? "Maybe. I'll have to check my schedule. I'm pretty busy usually."
            : "I don't really have time to read much else. Life is pretty busy, you know?",
          nextScenarioId: 'negative-turn',
          qualityScore: 3
        }
      ]
    },
    'response2': {
      id: 'response2',
      message: scenarioType === 'tinder'
        ? "Oh, I see. So what are you actually interested in then?"
        : scenarioType === 'whatsapp'
        ? "Just good? Anything interesting happen today?"
        : "I see. Well, I enjoy a range of genres from classic literature to contemporary fiction. Do you read often?",
      sender: 'ai',
      options: [
        {
          id: 'option2-1',
          text: scenarioType === 'tinder'
            ? "Actually, I'm really into hiking and outdoor adventures. I'd love to know more about your photography though - what inspired you to get into it?"
            : scenarioType === 'whatsapp'
            ? "Sorry for the short reply! I was in the middle of something. My day's been quite eventful actually - I just got promoted at work! How was your photography session?"
            : "You know what, I actually do read quite a bit but I've been in a bit of a slump lately. This book is helping me get back into it. What got you into reading?",
          nextScenarioId: 'recovery',
          qualityScore: 8
        },
        {
          id: 'option2-2',
          text: scenarioType === 'tinder'
            ? "I'm mainly just here to meet people and see what happens."
            : scenarioType === 'whatsapp'
            ? "Not really. Just another day."
            : "Not really. I'm only reading this because a friend recommended it.",
          nextScenarioId: 'conversation-dead',
          qualityScore: 2
        }
      ]
    },
    'response3': {
      id: 'response3',
      message: scenarioType === 'tinder'
        ? "I love how you described that! I'm drawn to photography for similar reasons. I find it's like freezing little moments of truth in time. I particularly love capturing the interplay of light and shadow in urban environments. Have you explored night photography at all?"
        : scenarioType === 'whatsapp'
        ? "Wow, that sounds amazing! I'm a sucker for good hiking trails and beautiful views. Which trail was it? And yes, I would've definitely had my camera ready! Would you like to join me for a photography hike sometime? I know some great spots."
        : "I'm impressed by your analysis! I'm particularly fond of Ishiguro and Atwood in this space - authors who blend literary excellence with thought-provoking themes. I'm part of a book club that meets at the café around the corner. We're discussing this exact book next Saturday if you'd be interested in joining?",
      sender: 'ai',
      options: [
        {
          id: 'option3-1',
          text: scenarioType === 'tinder'
            ? "I've dabbled in night photography and it's fascinating! The city transforms after dark. I'd love to exchange some techniques sometime, maybe even during a photo walk? I know some great urban spots with amazing lighting."
            : scenarioType === 'whatsapp'
            ? "It was Sunset Ridge - the views at golden hour are spectacular! A photography hike sounds perfect. I'd love to learn from your expertise and explore those spots you mentioned. How about this weekend if the weather's good?"
            : "That's such a kind invitation! I'd genuinely love to join. Discussing literature with passionate readers always brings new perspectives I wouldn't have considered. Ishiguro is actually one of my favorites too - 'Never Let Me Go' was transformative for me. What time does the club meet?",
          nextScenarioId: 'excellent-connection',
          qualityScore: 10
        },
        {
          id: 'option3-2',
          text: scenarioType === 'tinder'
            ? "I've tried night photography but it's technically challenging. I appreciate the artistic aspects you mentioned though. Maybe we could discuss more over coffee sometime?"
            : scenarioType === 'whatsapp'
            ? "It was at Meadow Park. I'm not an expert hiker but I enjoyed it. A photography hike sounds interesting - I'd be up for that sometime."
            : "A book club could be fun. I haven't read anything by those authors you mentioned, but I'd be open to checking them out. What time does it start?",
          nextScenarioId: 'good-progress',
          qualityScore: 7
        }
      ]
    },
    'excellent-connection': {
      id: 'excellent-connection',
      message: scenarioType === 'tinder'
        ? "That sounds absolutely perfect! I love how passionate you are about photography. I'm free this Saturday evening for that photo walk if you are? And maybe we could grab a bite after to discuss our shots. Here's my number - text me and we can coordinate the details. I'm really looking forward to this!"
        : scenarioType === 'whatsapp'
        ? "This weekend works perfectly! Let's plan for Saturday at 3pm - the lighting should be gorgeous then. I know a trail at Cedar Valley that has this amazing waterfall surrounded by rock formations. And thank you, but I'm no expert - just enthusiastic! I'm excited to see what you capture too. Let's exchange some of our favorite photography spots over dinner after the hike? I know a cozy place nearby."
        : "The club meets at 6:30pm. It's such a pleasure to meet another Ishiguro fan! 'Never Let Me Go' is heartbreakingly beautiful. The way he explores what makes us human is unmatched. I'm really looking forward to hearing your thoughts at the club. Would you like to exchange numbers so I can send you the details? Maybe we could even grab coffee before the meeting to discuss your impressions of the current chapters?",
      sender: 'ai'
    },
    'good-progress': {
      id: 'good-progress',
      message: scenarioType === 'tinder'
        ? "That sounds like a plan! I'd enjoy getting coffee and talking more about photography and travel. Are you free sometime this weekend?"
        : scenarioType === 'whatsapp'
        ? "Thursday evening works for me! The new place on Elm Street? I've heard good things about it. Looking forward to it!"
        : "The book club starts at 6:30pm. It's a friendly group, very welcoming to new members. Would you be interested in joining us this Saturday?",
      sender: 'ai'
    },
    'recovery': {
      id: 'recovery',
      message: scenarioType === 'tinder'
        ? "No worries! I actually love hiking too. What's your favorite trail? And regarding photography, I got into it during a trip to Iceland - the landscapes there practically demanded to be captured!"
        : scenarioType === 'whatsapp'
        ? "Congratulations on the promotion! That's fantastic news. My photography session was great - I was capturing some urban landscapes downtown. Would you be up for celebrating your promotion with a drink this weekend?"
        : "I completely understand reading slumps - they happen to all of us! I actually got into reading through my grandmother. She had this amazing collection of classics. What types of books usually help you get out of a reading slump?",
      sender: 'ai'
    },
    'negative-turn': {
      id: 'negative-turn',
      message: scenarioType === 'tinder'
        ? "I see. Well, I hope you've enjoyed all your travels."
        : scenarioType === 'whatsapp'
        ? "Okay, just let me know if you want to meet up."
        : "I understand being busy. Life gets that way sometimes.",
      sender: 'ai'
    },
    'conversation-dead': {
      id: 'conversation-dead',
      message: scenarioType === 'tinder'
        ? "Cool. Well, good luck with that."
        : scenarioType === 'whatsapp'
        ? "Alright then. Take care."
        : "I see. Well, enjoy the book then.",
      sender: 'ai'
    }
  };
  
  useEffect(() => {
    // Initialize with the first message
    setMessages([
      { id: 1, sender: 'ai', text: scenarios['intro'].message }
    ]);
    setShowOptions(true);
  }, []);
  
  const handleOptionSelect = (option: { id: string; text: string; nextScenarioId: string; qualityScore: number }) => {
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user' as const,
      text: option.text
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setMessageHistory(prev => [...prev, option.text]);
    
    // Update score
    setScore(prev => prev + option.qualityScore);
    
    // Hide options while processing
    setShowOptions(false);
    
    // Wait a moment then show AI response
    setTimeout(() => {
      const nextScenario = scenarios[option.nextScenarioId];
      
      if (nextScenario) {
        const newAiMessage = {
          id: messages.length + 2,
          sender: 'ai' as const,
          text: nextScenario.message
        };
        
        setMessages(prev => [...prev, newAiMessage]);
        setCurrentScenarioId(option.nextScenarioId);
        
        // Check if there are more options to show
        if (nextScenario.options) {
          setShowOptions(true);
        } else {
          // No more options means conversation path has ended
          setTimeout(() => {
            setComplete(true);
          }, 1000);
        }
      } else {
        console.error(`No scenario found with ID: ${option.nextScenarioId}`);
      }
    }, 1000);
  };
  
  const handleCustomResponse = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user' as const,
      text: inputValue
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setMessageHistory(prev => [...prev, inputValue]);
    setInputValue('');
    
    // In a real app, this would use AI to evaluate the response
    // For now, we'll use a simple algorithm
    
    // Simple quality assessment based on length and engagement
    let qualityScore = 0;
    
    // Length check (too short is bad, too long is also not ideal)
    if (inputValue.length < 20) {
      qualityScore += 3;
    } else if (inputValue.length < 100) {
      qualityScore += 7;
    } else {
      qualityScore += 5;
    }
    
    // Check for questions (engagement)
    if (inputValue.includes('?')) {
      qualityScore += 2;
    }
    
    // Check for mentioning something from the profile
    if (profile.interests.some(interest => 
      inputValue.toLowerCase().includes(interest.toLowerCase()))) {
      qualityScore += 2;
    }
    
    // Cap at 10
    qualityScore = Math.min(10, qualityScore);
    
    // Update score
    setScore(prev => prev + qualityScore);
    
    // Simulate AI response
    setTimeout(() => {
      let responseScenarioId = 'good-progress';
      
      if (qualityScore >= 8) {
        responseScenarioId = 'excellent-connection';
      } else if (qualityScore >= 5) {
        responseScenarioId = 'good-progress';
      } else if (qualityScore >= 3) {
        responseScenarioId = 'recovery';
      } else {
        responseScenarioId = 'conversation-dead';
      }
      
      const responseScenario = scenarios[responseScenarioId];
      
      const newAiMessage = {
        id: messages.length + 2,
        sender: 'ai' as const,
        text: responseScenario.message
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      setCurrentScenarioId(responseScenarioId);
      
      // Check if there are more options
      if (responseScenario.options) {
        setShowOptions(true);
      } else {
        // End of conversation path
        setTimeout(() => {
          setComplete(true);
        }, 1000);
      }
    }, 1500);
  };
  
  const handleComplete = () => {
    // Add XP based on quality score
    onComplete();
  };
  
  return (
    <div className="luxury-card p-5">
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button 
            onClick={() => setShowGuidance(!showGuidance)}
            className="text-[var(--color-burgundy)] text-sm font-medium hover:underline flex items-center"
          >
            {showGuidance ? 'Hide Tips' : 'Show Tips'}
            {showGuidance ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />}
          </button>
        </div>
        
        {scenarioType === 'tinder' && (
          <div className="flex items-center mt-3 bg-white p-3 rounded-lg border border-gray-200">
            <img 
              src={profile.image} 
              alt={profile.name} 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-3">
              <h3 className="font-bold text-lg">{profile.name}, {profile.age}</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line">{profile.bio}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {profile.interests.map((interest, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {scenarioType === 'whatsapp' && (
          <div className="flex items-center mt-3 bg-white p-3 rounded-lg border border-gray-200">
            <img 
              src={profile.image} 
              alt={profile.name} 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <h3 className="font-bold">{profile.name}</h3>
              <p className="text-xs text-gray-500">last seen today at 3:42 PM</p>
            </div>
          </div>
        )}
        
        {scenarioType === 'irl' && (
          <div className="mt-3 bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm italic">You notice {profile.name} reading at a café. She seems absorbed in her book, but occasionally glances up at people walking by.</p>
          </div>
        )}
        
        {showGuidance && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
              Conversation Tips
            </h4>
            <ul className="mt-2 text-sm text-blue-700 space-y-1">
              <li>• Ask open-ended questions that require more than yes/no answers</li>
              <li>• Reference details from their profile to show you're paying attention</li>
              <li>• Share relevant information about yourself to build connection</li>
              <li>• Keep a positive, upbeat tone throughout the conversation</li>
              <li>• Move towards suggesting a specific meetup when the conversation flows well</li>
            </ul>
          </div>
        )}
      </div>
      
      <div className="h-[400px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-[var(--color-burgundy)] text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        
        {showOptions && !complete && currentScenarioId && scenarios[currentScenarioId].options ? (
          <div className="border-t pt-4 space-y-3">
            <p className="text-sm text-gray-500 font-medium mb-2">Choose your response:</p>
            {scenarios[currentScenarioId].options?.map(option => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {option.text}
              </button>
            ))}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">or</span>
              </div>
            </div>
            <form onSubmit={handleCustomResponse} className="mt-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Write your own response..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[var(--color-burgundy)] focus:border-[var(--color-burgundy)]"
              />
              <button
                type="submit"
                className="mt-2 w-full px-4 py-2 bg-[var(--color-burgundy)] text-white rounded-lg hover:opacity-90 transition-opacity"
                disabled={!inputValue.trim()}
              >
                Send Custom Response
              </button>
            </form>
          </div>
        ) : complete ? (
          <div className="border-t pt-4">
            <div className="bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-gold)] text-white rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="bg-white rounded-full p-1 mr-3">
                  <Sparkles className="h-5 w-5 text-[var(--color-burgundy)]" />
                </div>
                <div>
                  <h3 className="font-medium">Conversation Complete!</h3>
                  <p className="mt-1 text-sm opacity-90">
                    {score >= 25 ? 
                      'Exceptional! You created a genuine connection and secured a date. Your conversation was engaging, thoughtful, and showed authentic interest.' :
                     score >= 15 ?
                      'Good job! You maintained a positive conversation and kept things flowing. With a bit more engagement and personalization, you could secure more dates.' :
                      'You completed the conversation, but there\'s room for improvement. Try asking more questions and showing genuine interest in the other person.'}
                  </p>
                  <div className="mt-3 pt-3 border-t border-white/30 flex items-center">
                    <div>
                      <p className="text-sm opacity-80">Your score:</p>
                      <p className="text-xl font-bold">{score}/30</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleComplete}
              className="w-full px-4 py-3 luxury-gradient text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Complete & Collect XP
            </button>
          </div>
        ) : (
          <div className="border-t pt-4 flex justify-center">
            <div className="flex space-x-2 items-center">
              <div className="w-2 h-2 rounded-full bg-[var(--color-burgundy)] animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-burgundy)] animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-burgundy)] animate-bounce" style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationSimulator;
