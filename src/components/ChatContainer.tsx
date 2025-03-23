
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage, { MessageType } from './ChatMessage';
import ChatInput from './ChatInput';
import LoadingDots from './LoadingDots';
import { useChatbot } from '@/hooks/useChatbot';

const ChatContainer: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useChatbot();
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isScrolledToBottom) {
      scrollToBottom();
    }
  }, [messages, isScrolledToBottom]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Detect if user has scrolled away from bottom
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isBottom = scrollHeight - scrollTop - clientHeight < 10;
      setIsScrolledToBottom(isBottom);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-2 scroll-smooth"
        onScroll={handleScroll}
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <motion.div 
              className="text-center p-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent flex items-center justify-center">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-8 h-8 text-primary" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M12 16a4 4 0 100-8 4 4 0 000 8z"></path>
                    <path d="M18 9v4"></path>
                    <path d="M18 20a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path d="M4 5h10"></path>
                    <path d="M4 9h6"></path>
                    <path d="M4 15h6"></path>
                    <path d="M4 19h6"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">How can I assist you today?</h3>
              <p className="text-muted-foreground text-sm">
                I'm your AI assistant, designed to help with information, creative ideas, and conversations.
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="py-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <motion.div 
                className="flex justify-start mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-border/50">
                  <LoadingDots className="text-primary" />
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {!isScrolledToBottom && messages.length > 2 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-28 right-8 p-2 rounded-full bg-primary text-primary-foreground shadow-md"
            onClick={scrollToBottom}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex-shrink-0 p-4 pb-6">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
