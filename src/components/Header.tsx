
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Menu, Settings, Moon, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isCompact?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isCompact = false }) => {
  return (
    <motion.header
      className={cn(
        "w-full py-4 px-4",
        "flex items-center justify-between",
        "bg-background/70 backdrop-blur-sm z-10 border-b border-border/20",
        "transition-all duration-300 ease-out"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <MessageCircle className="h-4 w-4 text-primary-foreground" />
          </div>
          
          <div className="flex flex-col">
            <h1 className={cn(
              "font-semibold tracking-tight", 
              isCompact ? "text-base" : "text-lg"
            )}>
              Minimalist AI
            </h1>
            {!isCompact && (
              <p className="text-xs text-muted-foreground">Elegantly simple. Refreshingly smart.</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Moon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
