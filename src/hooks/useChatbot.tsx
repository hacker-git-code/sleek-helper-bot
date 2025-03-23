
import { useState, useCallback, useEffect } from 'react';
import { MessageType } from '@/components/ChatMessage';
import { v4 as uuidv4 } from 'uuid';

export function useChatbot() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const formattedMessages = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const getBotResponse = useCallback(async (userMessage: string): Promise<string> => {
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple responses for demonstration
    const responses = [
      "I understand what you're saying. How can I help further?",
      "That's an interesting perspective. Let me think about that...",
      "I'd love to explore that topic more with you.",
      "Thanks for sharing that with me. What else is on your mind?",
      `I see you mentioned "${userMessage.split(' ').slice(0, 3).join(' ')}..." That's fascinating.`,
      "I'm designed to assist with a wide range of topics. What specific information are you looking for?",
      "I appreciate your question. Let me provide some thoughts on that.",
      "That's a great question! I'd be happy to share what I know about this subject.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get bot response
      const botResponse = await getBotResponse(content);
      
      // Add bot message
      setTimeout(() => {
        const botMessage: MessageType = {
          id: uuidv4(),
          content: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error getting response:', error);
      setIsLoading(false);
    }
  }, [getBotResponse]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    clearMessages
  };
}
