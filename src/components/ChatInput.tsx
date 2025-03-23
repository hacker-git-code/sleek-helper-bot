
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image, X, Smile, Paperclip, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const { toast } = useToast();

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

  const handleFeatureClick = (feature: string) => {
    toast({
      title: `${feature} feature`,
      description: `The ${feature} feature is coming soon!`,
      duration: 3000,
    });
    setShowExtras(false);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full max-w-3xl mx-auto",
        "transition-all duration-300 ease-in-out",
        isFocused ? "scale-[1.01]" : "scale-100"
      )}
      layout
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      whileHover={{ y: -2 }}
    >
      <div className={cn(
        "relative flex items-center rounded-full p-1",
        "bg-white/90 backdrop-blur-md border border-border/80 shadow-md",
        "transition-all duration-300",
        isFocused ? "shadow-lg border-primary/20 bg-white" : ""
      )}>
        <AnimatePresence>
          {showExtras && (
            <motion.div 
              className="flex space-x-1 px-1"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground shrink-0"
                onClick={() => handleFeatureClick('Image upload')}
              >
                <Image className="h-4 w-4" />
              </Button>
              
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground shrink-0"
                onClick={() => handleFeatureClick('Attachment')}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground shrink-0"
                onClick={() => handleFeatureClick('Emoji')}
              >
                <Smile className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground shrink-0"
          onClick={() => setShowExtras(!showExtras)}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Message..."
          className={cn(
            "flex-1 max-h-24 bg-transparent border-0 focus:ring-0 focus:outline-none",
            "text-sm py-2 px-2 resize-none",
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
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground shrink-0"
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
                  "h-8 w-8 rounded-full ml-1 shrink-0 bg-gradient-to-r from-primary to-primary/90",
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                )}
              >
                <Send className="h-3.5 w-3.5" />
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
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground shrink-0"
                onClick={() => handleFeatureClick('Voice input')}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
};

export default ChatInput;
