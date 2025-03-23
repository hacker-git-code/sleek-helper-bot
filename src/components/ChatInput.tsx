
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image, X, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full max-w-4xl mx-auto",
        "transition-all duration-300 ease-in-out",
        isFocused ? "scale-[1.01]" : "scale-100"
      )}
      layout
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      whileHover={{ y: -2 }}
    >
      <div className={cn(
        "relative flex items-end rounded-full p-1",
        "bg-white/90 backdrop-blur-md border border-border/80 shadow-md",
        "transition-all duration-300",
        isFocused ? "shadow-lg border-primary/20 bg-white" : ""
      )}>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground shrink-0"
        >
          <Image className="h-5 w-5" />
        </Button>
        
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground shrink-0"
        >
          <Smile className="h-5 w-5" />
        </Button>
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask me anything..."
          className={cn(
            "flex-1 max-h-32 bg-transparent border-0 focus:ring-0 focus:outline-none",
            "text-sm py-3 px-2 resize-none",
            "placeholder:text-muted-foreground/70"
          )}
          disabled={isLoading}
        />

        <AnimatePresence>
          {message.length > 0 && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setMessage('')}
              className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {message.length > 0 ? (
            <motion.div
              key="send"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                type="submit"
                disabled={isLoading || !message.trim()}
                className={cn(
                  "h-10 w-10 rounded-xl ml-1 shrink-0 bg-gradient-to-r from-primary to-primary/90",
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                )}
              >
                <Send className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="mic"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                type="button"
                variant="ghost"
                disabled={isLoading}
                className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground shrink-0"
              >
                <Mic className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
};

export default ChatInput;
