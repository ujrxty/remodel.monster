"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Use the theme-aware Button component
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Use theme-aware Progress component 
import { Progress } from "@/components/ui/progress";

/**
 * Hero section with Question-as-CTA design
 * Generated from offer configuration
 */
function Hero({ isInjured, setIsInjured, handleSubmit, progress = 10, hideButtons = false, children }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Use theme variables directly for glow effects
    // Add animation styles when component mounts using the theme colors
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes form-glow {
        0% { box-shadow: 0 0 30px hsl(var(--primary) / 0.15); }
        25% { box-shadow: 0 0 40px hsl(var(--primary) / 0.2); }
        50% { box-shadow: 0 0 30px hsl(var(--primary) / 0.15); }
        75% { box-shadow: 0 0 40px hsl(var(--primary) / 0.25); }
        100% { box-shadow: 0 0 30px hsl(var(--primary) / 0.15); }
      }
      
      @keyframes border-glow {
        0% { border-color: hsl(var(--border) / 0.2); }
        50% { border-color: hsl(var(--border) / 0.5); }
        100% { border-color: hsl(var(--border) / 0.2); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
      setMounted(false);
    };
  }, []);

  const handleYesClick = () => {
    setIsInjured('Yes');
    setTimeout(() => {
      handleSubmit();
    }, 300);
  };

  const handleNoClick = () => {
    setIsInjured('No');
    setTimeout(() => {
      handleSubmit();
    }, 300);
  };
  
  return (
    <div className="relative w-full">
      {/* Background with overlay - use CSS background color as fallback */}
      <div 
        className="absolute inset-0 bg-primary/30 bg-cover bg-center hidden md:block" 
        style={{ 
          backgroundImage: "url('/uploads/hero-landscape.png')",
          filter: "brightness(0.65) blur(1px)",
          backgroundPosition: "center center"
        }}
      ></div>
      <div 
        className="absolute inset-0 bg-primary/30 bg-cover bg-center block md:hidden" 
        style={{ 
          backgroundImage: "url('/uploads/hero-portrait.png')",
          filter: "brightness(0.65) blur(1px)",
          backgroundPosition: "center center"
        }}
      ></div>
      {/* Theme color overlay - lighter in light mode, darker in dark mode for better text contrast */}
      <div className="absolute inset-0 bg-white/40 dark:bg-black/60"></div>
      <div className="relative max-w-[1100px] mx-auto px-4 md:px-6 py-2 md:py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-foreground"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
        >
          {!hideButtons && (
            <>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Ready to Transform Your Home?
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl md:text-2xl mb-4 max-w-2xl mx-auto"
              >
                Get top-quality, affordable, and convenient home improvements delivered online right at your fingertips.
                <br />Answer one quick question to find out more.
              </motion.p>
            </>
          )}
          
          {/* Question as CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="form-inverted form-card rounded-2xl p-3 md:p-5 max-w-md mx-auto shadow-lg border-2"
            style={{ 
              animation: mounted ? "form-glow 5s infinite, border-glow 3s infinite" : "none",
              transform: "translateZ(0)", 
              backfaceVisibility: "hidden" 
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              {!hideButtons ? ('Ready to transform your home?') : ''}
            </h2>
            
            {!hideButtons ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant={isInjured === 'No' ? 'destructive' : 'outline'}
                  className={cn(
                    "text-lg py-5 px-10 w-full sm:w-auto",
                    "hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-150",
                    isInjured === 'No' ? "shadow-lg" : "border-2 border-border"
                  )}
                  onClick={handleNoClick}
                >
                  No
                </Button>
                
                <Button 
                  variant={isInjured === 'Yes' ? 'default' : 'outline'}
                  className={cn(
                    "text-lg py-5 px-10 w-full sm:w-auto",
                    "hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-150",
                    isInjured === 'Yes' ? "shadow-lg" : "border-2 border-border"
                  )}
                  onClick={handleYesClick}
                  autoFocus
                >
                  Yes
                </Button>
              </div>
            ) : (
              <>
                {/* Just show the current form step directly */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={progress}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 25 }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </>
            )}
            
            {/* Progress indicator */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <Progress value={progress} className="h-2" />
              <p className="mt-2">Free 60-second qualification check</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;