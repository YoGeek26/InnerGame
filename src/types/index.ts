export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  skills: Skill[];
  badges: Badge[];
  progress: {
    innerGame: number;
    conversation: number;
    approach: number;
    storytelling: number;
  };
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  category: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  imageUrl: string;
  readTime: number;
  publishDate: Date;
  tags: string[];
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  scenarioType: string;
  difficulty: string;
  completed: boolean;
  image: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

export interface BattleScenario {
  id: string;
  prompt: string;
  context: string;
  difficulty: string;
  tips: string;
}

export interface ComebackBattle {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  scenarioType: string;
  image: string;
  scenarios?: BattleScenario[];
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    level: number;
    avatar?: string;
  };
  category: string;
  tags: string[];
  createdAt: Date;  replies: number;
  likes: number;
  lastReply?: {
    id: string;
    author: {
      id: string;
      name: string;
    };
    createdAt: Date;
  };
  isPinned?: boolean;
  isResolved?: boolean;
}

export interface ForumReply {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    level: number;
    avatar?: string;
  };
  createdAt: Date;
  likes: number;
  isAcceptedAnswer?: boolean;
}

export interface UserExercise {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'challenge';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: string[];
  completed: boolean;
  dueDate?: Date;
  xpReward: number;
}

export interface CoachingInsight {
  id: string;
  conversationId: string;
  topic: string;
  insight: string;
  createdAt: Date;
  category: 'approach' | 'conversation' | 'dating' | 'psychology' | 'other';
}

export interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'moderator' | 'editor';
  lastLogin?: Date;
  permissions: string[];
}

export interface AppStatistics {
  totalUsers: number;
  activeUsers: number;
  averageSession: number;
  completionRates: {
    challenges: number;
    articles: number;
    exercises: number;
  };
  popularContent: {
    id: string;
    title: string;
    type: string;
    views: number;
  }[];
}
