import { Message } from '../types';

// OpenAI API integration service
export const callOpenAI = async (
  messages: Message[],
  isPremium: boolean
): Promise<string> => {
  // In a real implementation, this would make an API call to OpenAI
  // This is a simulation for demonstration purposes
  
  try {
    // Convert our Messages to OpenAI format
    const formattedMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));
    
    // Add system message for context
    const systemMessage = {
      role: 'system',
      content: `You are a helpful, empathetic AI seduction coach. Your goal is to help the user improve their dating skills, 
      confidence, and ability to create meaningful romantic connections. Provide practical advice, but keep responses concise 
      (max 3 paragraphs). Be supportive and encouraging, not judgmental. Your name is 'AI Seduction Coach'.`
    };
    
    const finalMessages = [systemMessage, ...formattedMessages];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would be:
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: finalMessages,
        max_tokens: isPremium ? 500 : 250,
        temperature: 0.7
      })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
    */
    
    // For now, return simulated responses
    const userLastMessage = messages[messages.length - 1].content.toLowerCase();
    
    if (userLastMessage.includes('approach') || userLastMessage.includes('talk to')) {
      return "Approaching someone new can be intimidating, but remember to focus on being genuinely curious about them rather than trying to impress. A simple observation about the environment or a genuine question often works better than rehearsed pickup lines. What specific situation are you struggling with?";
    } else if (userLastMessage.includes('confidence') || userLastMessage.includes('nervous')) {
      return "Building confidence comes from small successes over time. Try setting small, achievable goals like making eye contact and smiling at three new people tomorrow. Each positive interaction will reinforce your confidence. Would you like some specific confidence-building exercises?";
    } else if (userLastMessage.includes('text') || userLastMessage.includes('message')) {
      return "When texting, keep your messages positive, engaging, and concise. Ask open-ended questions that invite conversation. Remember that timing is important - don't overwhelm with too many messages too quickly. Would you like to role-play a specific texting scenario?";
    } else if (userLastMessage.includes('date') || userLastMessage.includes('dating')) {
      return "Great dates are about creating shared experiences and genuine connection. Choose activities that allow for conversation but also give you something to talk about. Active dates like mini-golf or cooking classes often work better than just dinner and a movie. What kind of date are you planning?";
    } else if (userLastMessage.includes('rejected') || userLastMessage.includes('rejection')) {
      return "Rejection is part of dating and doesn't reflect your worth. Try to see each rejection as data, not failure. Ask yourself: Is there something I could improve, or was this simply not the right match? Remember that even the most attractive people face rejection regularly. How specifically did the rejection happen?";
    } else {
      return "That's an interesting point about attraction and connection. Remember that authentic interaction is key to building chemistry. Focus on being present, showing genuine interest, and maintaining a positive, confident energy. Is there a specific aspect of this you'd like to explore further?";
    }
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
};
