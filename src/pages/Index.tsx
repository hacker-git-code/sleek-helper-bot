
import React from 'react';
import { motion } from 'framer-motion';
import ThemeProvider from '@/components/ThemeProvider';
import Header from '@/components/Header';
import ChatContainer from '@/components/ChatContainer';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-[100dvh] bg-background overflow-hidden">
        <motion.div 
          className="fixed inset-0 pointer-events-none -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Abstract Background with improved gradients */}
          <div className="absolute top-0 right-0 w-2/3 h-1/3 bg-gradient-to-bl from-accent/40 to-accent/10 rounded-full filter blur-[100px] transform translate-x-1/3 -translate-y-1/2 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-1/3 bg-gradient-to-tr from-accent/30 to-accent/5 rounded-full filter blur-[100px] transform -translate-x-1/3 translate-y-1/2 animate-blob animation-delay-4000"></div>
          
          {/* Additional subtle accent */}
          <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-[120px] transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          
          {/* Minimal grid pattern with improved opacity */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.07]"></div>
        </motion.div>
        
        <Header />
        
        <motion.main 
          className="flex-1 container px-4 pb-4 pt-12 mx-auto max-w-4xl flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex-1 flex flex-col">
            <div className="mt-auto">
              <motion.div
                className="rounded-2xl shadow-sm overflow-hidden bg-white/60 backdrop-blur-md border border-white/40 relative h-[70vh]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <ChatContainer />
              </motion.div>
            </div>
          </div>
        </motion.main>
        
        <motion.footer 
          className="py-4 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Minimalist AI • Designed with simplicity in mind
        </motion.footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
