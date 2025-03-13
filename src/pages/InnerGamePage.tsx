import React, { useState } from 'react';
import ArticleCard from '../components/innerGame/ArticleCard';
import { Article } from '../types';
import { BookOpen, Search, Filter, Clock, ChevronRight, Award, BarChart, Star, PlayCircle, Check, Download, Share2 } from 'lucide-react';

const InnerGamePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sorting, setSorting] = useState<'recent' | 'popular'>('recent');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  
  // Sample articles data
  const articles: Article[] = [
    {
      id: 'article-1',
      title: 'The Psychology of Confidence: How to Build Unshakable Inner Game',
      category: 'mindset',
      summary: 'Discover the core psychological principles behind true confidence and learn practical steps to develop an unshakable inner game that transforms your dating life.',
      content: `# The Psychology of Confidence: How to Build Unshakable Inner Game

## Introduction

True confidence is perhaps the most attractive quality you can develop. It's the foundation of charisma, social success, and dating abundance. But genuine confidence isn't about pick-up lines or techniques—it's built from within.

In this comprehensive guide, we'll explore the psychology behind authentic confidence and provide actionable steps to develop your inner game.

## Understanding the Confidence Paradox

The first critical insight is what psychologists call the "confidence paradox": the more you desperately seek validation or approval, the less confident you appear. True confidence comes from self-validation rather than external validation.

Research in social psychology shows that people who are seeking approval actually display subtle non-verbal cues that others can detect. These include:

- Excessive nodding
- Higher vocal pitch
- Nervous laughter
- Frequent validation-seeking questions

When you build genuine inner confidence, these behaviors naturally disappear.

## The Three Pillars of Unshakable Confidence

### 1. Self-Acceptance

The foundation of confidence is accepting yourself fully—both strengths and weaknesses. This doesn't mean complacency; it means having an accurate and compassionate relationship with yourself.

**Exercise: The Self-Inventory**
- List 5 personal strengths that you genuinely believe in
- List 3 areas where you're still growing
- Write a statement of self-acceptance that acknowledges both

### 2. Competence Through Experience

Confidence grows with competence, and competence comes from experience. There's no shortcut around this fundamental truth.

**Exercise: The Exposure Ladder**
- Identify a social skill you want to improve
- Break it down into 10 steps of increasing difficulty
- Commit to climbing one rung each week
- Document your progress and insights

### 3. Outcome Independence

The most attractive form of confidence comes from being fully present and engaged in social interactions without being attached to specific outcomes.

**Exercise: Process vs. Outcome Journaling**
- After social interactions, write what you enjoyed about the process
- Note what you learned, regardless of the outcome
- Focus on what you contributed rather than what you received

## Breaking the Approval Addiction

Many of us unconsciously seek approval in our interactions. This approval-seeking behavior is the opposite of confidence and creates unattractive neediness.

The antidote is to develop self-approval first. Here's how:

1. **Identify your core values** - Live according to what matters to you
2. **Create meaningful goals** - Derive satisfaction from progress
3. **Practice self-compassion** - Treat yourself with the kindness you'd show a good friend
4. **Set healthy boundaries** - Say no when needed without guilt
5. **Stop apologizing unnecessarily** - Reserve apologies for genuine wrongdoing

## Body Language and Confidence

Your body language not only communicates confidence to others but also to your own brain. Research in embodied cognition shows that adopting confident postures actually changes your hormone levels and psychological state.

Try this 2-minute confidence ritual before social situations:

1. Stand in an expansive posture (feet shoulder-width apart, hands on hips or raised)
2. Roll your shoulders back and down
3. Take deep, diaphragmatic breaths
4. Slightly lift your chin
5. Hold for 2 minutes
6. Smile genuinely

## Handling Rejection with Confidence

The ultimate test of confidence is how you handle rejection. Confident people don't take rejection personally; they understand it's simply a misalignment or bad timing.

When faced with rejection:

1. Thank the person for their honesty
2. Maintain your composure and dignity
3. Extract the learning opportunity
4. Refocus on your larger goals
5. Reconnect with your support system

## Daily Practices for Building Inner Game

Confidence is built through consistent daily habits:

1. **Morning affirmations** - Specific, present-tense statements that reinforce your core values
2. **Visualization** - Mentally rehearse confident behavior in upcoming situations
3. **Social momentum** - Start with small, low-stake interactions early in the day
4. **Skill development** - Regularly learn and practice new social skills
5. **Evening reflection** - Review your daily wins and growth opportunities

## Conclusion

Building unshakable inner game is a journey, not a destination. It requires consistent effort, self-compassion, and a willingness to move outside your comfort zone. But the rewards—in dating and in life—are immeasurable.

Remember: True confidence isn't about being perfect. It's about being perfectly comfortable with who you are, while continuing to grow into who you want to become.`,
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
      readTime: 15,
      publishDate: new Date('2023-08-10'),
      tags: ['confidence', 'psychology', 'inner-game', 'self-improvement']
    },
    {
      id: 'article-2',
      title: 'The Art of Emotional Resilience in Dating',
      category: 'psychology',
      summary: 'Learn how to develop emotional resilience that will help you navigate rejection, uncertainty, and disappointment while maintaining your confidence and positivity.',
      content: 'Full article content here...',
      imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&q=80',
      readTime: 12,
      publishDate: new Date('2023-08-15'),
      tags: ['resilience', 'emotions', 'rejection', 'dating']
    },
    {
      id: 'article-3',
      title: 'Developing a Genuine Abundance Mindset',
      category: 'mindset',
      summary: 'Discover how to cultivate an authentic abundance mindset that eliminates neediness and transforms your dating experiences from scarcity to abundance.',
      content: 'Full article content here...',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
      readTime: 10,
      publishDate: new Date('2023-08-18'),
      tags: ['abundance', 'mindset', 'neediness', 'psychology']
    },
    {
      id: 'article-4',
      title: 'The Science of Charisma: Research-Backed Principles',
      category: 'psychology',
      summary: 'Explore the scientific research behind charisma and learn evidence-based techniques to enhance your personal magnetism in social and dating situations.',
      content: 'Full article content here...',
      imageUrl: 'https://images.unsplash.com/photo-1519575706483-221027bfbb31?auto=format&fit=crop&q=80',
      readTime: 18,
      publishDate: new Date('2023-08-22'),
      tags: ['charisma', 'attraction', 'psychology', 'research']
    },
    {
      id: 'article-5',
      title: 'Overcoming Approach Anxiety: Cognitive Techniques',
      category: 'psychology',
      summary: 'Master powerful cognitive behavioral techniques to overcome approach anxiety and start conversations with confidence and ease.',
      content: 'Full article content here...',
      imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80',
      readTime: 14,
      publishDate: new Date('2023-08-25'),
      tags: ['approach-anxiety', 'cognitive-techniques', 'psychology', 'fear']
    },
    {
      id: 'article-6',
      title: 'The Growth Mindset in Dating and Relationships',
      category: 'mindset',
      summary: 'Apply Carol Dweck's revolutionary growth mindset concepts to dramatically improve your learning curve and resilience in dating and relationships.',
      content: 'Full article content here...',
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80',
      readTime: 11,
      publishDate: new Date('2023-08-28'),
      tags: ['growth-mindset', 'learning', 'relationships', 'self-improvement']
    },
    {
      id: 'article-7',
      title: 'Building Social Freedom: Breaking Your Comfort Zone',
      category: 'practice',
      summary: 'Learn practical exercises and challenges that progressively expand your social comfort zone and develop lasting social freedom.',
      content: 'Full article content here...',
      imageUrl: 'https://images.unsplash.com/photo-1484712401471-05c7215830eb?auto=format&fit=crop&q=80',
      readTime: 13,
      publishDate: new Date('2023-09-02'),
      tags: ['social-freedom', 'comfort-zone', 'exercises', 'practice']
    },
    {
      id: 'article-8',
      title: 'Developing Powerful Eye Contact: The Window to Connection',
      category: 'practice',
      summary: 'Master the subtle art of confident eye contact to create instant rapport, project confidence, and deepen attraction in any interaction.',
      content: 'Full article content here...',
      imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80',
      readTime: 9,
      publishDate: new Date('2023-09-05'),
      tags: ['eye-contact', 'non-verbal', 'attraction', 'connection']
    }
  ];
  
  // Filter and sort articles
  let filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.join(' ').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Sort articles
  filteredArticles = filteredArticles.sort((a, b) => {
    if (sorting === 'recent') {
      return b.publishDate.getTime() - a.publishDate.getTime();
    } else {
      // For demonstration, we'll sort by read time as a proxy for popularity
      return b.readTime - a.readTime;
    }
  });
  
  // Handle article selection
  const handleArticleClick = (article: Article) => {
    setActiveArticle(article);
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-6">
      {activeArticle ? (
        <div className="luxury-card p-6">
          <button
            onClick={() => setActiveArticle(null)}
            className="text-[var(--color-burgundy)] mb-4 flex items-center hover:underline"
          >
            <ChevronRight className="h-4 w-4 mr-1 transform rotate-180" />
            Back to articles
          </button>
          
          <div className="mb-6">
                        <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              <img 
                src={activeArticle.imageUrl} 
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <div className="text-xs px-2 py-1 rounded-full bg-white/80 text-gray-800 inline-block mb-2">
                  {activeArticle.category}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{activeArticle.title}</h1>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {activeArticle.readTime} min read
                </div>
                <div className="text-gray-500 text-sm">
                  {activeArticle.publishDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="h-5 w-5 text-gray-500" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Download className="h-5 w-5 text-gray-500" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Star className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {activeArticle.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index} className="text-3xl font-bold mt-6 mb-4">{paragraph.substring(2)}</h1>;
                } else if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.substring(3)}</h2>;
                } else if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-bold mt-5 mb-2">{paragraph.substring(4)}</h3>;
                } else if (paragraph.startsWith('**Exercise: ')) {
                  return (
                    <div key={index} className="bg-[var(--color-burgundy)]/5 border-l-4 border-[var(--color-burgundy)] p-4 my-4">
                      <h4 className="font-bold text-[var(--color-burgundy)] mb-2">{paragraph.match(/\*\*(.*?)\*\*/)?.[1]}</h4>
                      <p>{paragraph.replace(/\*\*.*?\*\*/, '')}</p>
                    </div>
                  );
                } else if (paragraph.startsWith('- ')) {
                  return (
                    <ul key={index} className="list-disc pl-5 my-4">
                      {paragraph.split('\n').map((item, i) => (
                        <li key={i} className="my-1">{item.substring(2)}</li>
                      ))}
                    </ul>
                  );
                } else if (paragraph.startsWith('1. ')) {
                  return (
                    <ol key={index} className="list-decimal pl-5 my-4">
                      {paragraph.split('\n').map((item, i) => {
                        const num = item.match(/^\d+\. /)?.[0] || '';
                        return <li key={i} className="my-1">{item.substring(num.length)}</li>;
                      })}
                    </ol>
                  );
                } else {
                  return <p key={index} className="my-4">{paragraph}</p>;
                }
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 mb-6">
                {activeArticle.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] rounded-lg p-5 text-white">
                <div className="flex items-center">
                  <div className="mr-4">
                    <PlayCircle className="h-12 w-12" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Apply This Knowledge</h3>
                    <p className="text-gray-200 mb-3">Ready to put these concepts into practice? Try a related challenge now.</p>
                    <button className="px-4 py-2 bg-white text-[var(--color-burgundy)] rounded-lg font-medium hover:bg-gray-100 transition-colors">
                      View Related Challenges
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-bold text-xl mb-4">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {articles
                    .filter(a => a.id !== activeArticle.id && a.category === activeArticle.category)
                    .slice(0, 2)
                    .map(article => (
                      <div 
                        key={article.id}
                        onClick={() => handleArticleClick(article)}
                        className="flex border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="w-1/3">
                          <img 
                            src={article.imageUrl} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">{article.title}</h4>
                          <p className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {article.readTime} min read
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="luxury-card p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Inner Game Resources</h1>
            <p className="text-gray-600">Learn psychological principles and develop the mindset for dating success</p>
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
                  All Topics
                </button>
                <button
                  onClick={() => setActiveCategory('mindset')}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                    activeCategory === 'mindset'
                      ? 'bg-[var(--color-burgundy)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Mindset
                </button>
                <button
                  onClick={() => setActiveCategory('psychology')}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                    activeCategory === 'psychology'
                      ? 'bg-[var(--color-burgundy)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Psychology
                </button>
                <button
                  onClick={() => setActiveCategory('practice')}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                    activeCategory === 'practice'
                      ? 'bg-[var(--color-burgundy)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Practical Exercises
                </button>
              </div>
              
              <div className="flex space-x-2 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[var(--color-burgundy)] focus:border-[var(--color-burgundy)]"
                  />
                </div>
                
                <div className="relative">
                  <select
                    value={sorting}
                    onChange={(e) => setSorting(e.target.value as 'recent' | 'popular')}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-[var(--color-burgundy)] focus:border-[var(--color-burgundy)]"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map(article => (
                <ArticleCard 
                  key={article.id}
                  article={article}
                  onClick={() => handleArticleClick(article)}
                />
              ))}
            </div>
            
            {filteredArticles.length === 0 && (
              <div className="text-center py-10">
                <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-gray-800 font-medium text-lg">No articles found</h3>
                <p className="text-gray-600 mt-1">Try adjusting your search or filters</p>
              </div>
            )}
            
            <div className="mt-8 bg-gradient-to-r from-[var(--color-burgundy)] to-[var(--color-midnight)] rounded-lg p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="mb-4 md:mb-0 md:mr-6 md:flex-1">
                  <h3 className="text-xl font-bold mb-2">Track Your Inner Game Progress</h3>
                  <p className="text-gray-200 mb-4">Reading articles earns you XP and helps track your mindset development.</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-white/10 rounded-lg p-3 flex items-center">
                      <div className="bg-white/20 rounded-full p-2 mr-3">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-200">Articles Read</p>
                        <p className="text-xl font-bold">3 / 8</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-3 flex items-center">
                      <div className="bg-white/20 rounded-full p-2 mr-3">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-200">XP Earned</p>
                        <p className="text-xl font-bold">450</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-3 flex items-center">
                      <div className="bg-white/20 rounded-full p-2 mr-3">
                        <BarChart className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-200">Progress</p>
                        <p className="text-xl font-bold">38%</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 md:w-1/4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Check className="h-4 w-4 mr-2 text-[var(--color-gold)]" /> 
                    Reading Benefits
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-[var(--color-gold)]" />
                      <span>150 XP per article</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-[var(--color-gold)]" />
                      <span>Enhanced mindset scores</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-[var(--color-gold)]" />
                      <span>Special badges at milestones</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InnerGamePage;
