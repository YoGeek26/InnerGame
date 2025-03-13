import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { User, Skill, Badge } from '../types';

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

interface UserContextType {
  user: User;
  addXP: (amount: number) => void;
  updateSkill: (skillId: string, newLevel: number) => void;
  addBadge: (badge: Badge) => void;
  hasCompletedQuestionnaire: boolean;
  updateUserProfile: (profile: UserProfile) => void;
  completeQuestionnaire: () => void;
}

// Create context with a meaningful default value to prevent errors
const defaultUserContext: UserContextType = {
  user: {
    id: '',
    name: '',
    email: '',
    level: 0,
    xp: 0,
    skills: [],
    badges: [],
    progress: {
      innerGame: 0,
      conversation: 0,
      approach: 0,
      storytelling: 0
    }
  },
  addXP: () => {},
  updateSkill: () => {},
  addBadge: () => {},
  hasCompletedQuestionnaire: false,
  updateUserProfile: () => {},
  completeQuestionnaire: () => {}
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Alex',
    email: 'alex@example.com',
    level: 5,
    xp: 2350,
    skills: [
      {
        id: 'skill-1',
        name: 'Approaching',
        level: 3,
        maxLevel: 10,
        category: 'approach'
      },
      {
        id: 'skill-2',
        name: 'Conversation',
        level: 4,
        maxLevel: 10,
        category: 'conversation'
      },
      {
        id: 'skill-3',
        name: 'Texting',
        level: 5,
        maxLevel: 10,
        category: 'conversation'
      },
      {
        id: 'skill-4',
        name: 'Dating',
        level: 2,
        maxLevel: 10,
        category: 'dating'
      },
    ],
    badges: [
      {
        id: 'badge-1',
        name: 'First Approach',
        description: 'Successfully completed your first approach',
        icon: 'award',
        earnedAt: new Date('2023-08-15')
      },
      {
        id: 'badge-2',
        name: 'Conversation Master',
        description: 'Maintained a 10-minute conversation',
        icon: 'message-circle',
        earnedAt: new Date('2023-08-18')
      },
      {
        id: 'badge-3',
        name: 'Number Collector',
        description: 'Got your first phone number',
        icon: 'phone',
        earnedAt: new Date('2023-08-25')
      }
    ],
    progress: {
      innerGame: 65,
      conversation: 78,
      approach: 42,
      storytelling: 55
    }
  });

  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({});

  // Memoize functions to prevent unnecessary re-renders
  const addXP = useCallback((amount: number) => {
    setUser(prevUser => {
      const newXP = prevUser.xp + amount;
      // Calculate new level (assuming 1000 XP per level)
      const newLevel = Math.floor(newXP / 1000) + 1;
      
      return {
        ...prevUser,
        xp: newXP,
        level: newLevel
      };
    });
  }, []);

  const updateSkill = useCallback((skillId: string, newLevel: number) => {
    setUser(prevUser => {
      return {
        ...prevUser,
        skills: prevUser.skills.map(skill => 
          skill.id === skillId ? { ...skill, level: newLevel } : skill
        )
      };
    });
  }, []);

  const addBadge = useCallback((badge: Badge) => {
    setUser(prevUser => {
      // Check if badge already exists
      if (prevUser.badges.some(b => b.id === badge.id)) {
        return prevUser;
      }
      
      return {
        ...prevUser,
        badges: [...prevUser.badges, badge]
      };
    });
  }, []);

  const updateUserProfile = useCallback((profile: UserProfile) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  }, []);

  const completeQuestionnaire = useCallback(() => {
    setHasCompletedQuestionnaire(true);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    addXP,
    updateSkill,
    addBadge,
    hasCompletedQuestionnaire,
    updateUserProfile,
    completeQuestionnaire
  }), [
    user, 
    addXP, 
    updateSkill, 
    addBadge, 
    hasCompletedQuestionnaire, 
    updateUserProfile, 
    completeQuestionnaire
  ]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
