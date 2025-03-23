
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage, { MessageType } from './ChatMessage';
import ChatInput from './ChatInput';
import LoadingDots from './LoadingDots';
import { useChatbot } from '@/hooks/useChatbot';
import { ArrowDown, Bot, Minimize2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const ChatContainer: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading, clearMessages } = useChatbot();
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isScrolledToBottom) {
      scrollToBottom();
    }
  }, [messages, isScrolledToBottom]);

  // Open chat when first message is sent
  useEffect(() => {
    if (messages.length > 0 && !isChatOpen) {
      setIsChatOpen(true);
    }
  }, [messages.length]);

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

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  const handleMinimizeChat = () => {
    setIsChatOpen(false);
  };

  const handleClearChat = () => {
    clearMessages();
    toast({
      title: "Chat cleared",
      description: "Your conversation history has been deleted",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {isChatOpen ? (
          <motion.div 
            className="flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-between items-center px-4 py-2 border-b border-border/20">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium">Chat Assistant</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full hover:bg-muted text-muted-foreground hover:text-destructive"
                      disabled={messages.length === 0}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear conversation?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your entire chat history. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleClearChat}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Clear
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-muted"
                  onClick={handleMinimizeChat}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
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
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent to-accent/30 flex items-center justify-center">
                        <Bot className="w-8 h-8 text-primary/80" />
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
                      <div className="bg-gradient-to-br from-white to-accent/30 px-4 py-3 rounded-2xl shadow-sm border border-border/50">
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
                  <ArrowDown className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex-shrink-0 p-4 pb-6 mt-auto">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
