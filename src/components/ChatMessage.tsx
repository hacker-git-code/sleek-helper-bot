
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <motion.div
      className={cn(
        "flex w-full mb-4",
        isBot ? "justify-start" : "justify-end"
      )}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl",
          isBot ? "bg-white shadow-sm border border-border/50" : "bg-primary text-primary-foreground",
          "transform transition-all duration-200 ease-out",
          isBot ? "hover:shadow-md" : "hover:bg-primary/95"
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <span className={cn(
          "text-xs mt-1 block",
          isBot ? "text-muted-foreground" : "text-primary-foreground/70"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
