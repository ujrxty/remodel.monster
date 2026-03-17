"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

function Hero({ isInjured, setIsInjured, handleSubmit, progress = 0, hideButtons = false, children }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const stepNumber = mounted ? Math.round((progress / 100) * 5) : 0;

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
    <div className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden pt-[106px]">
      {/* Background image with overlay */}
      <picture className="absolute inset-0 hidden md:block">
        <source
          media="(min-width: 1200px)"
          srcSet="/uploads/hero-landscape-1920.webp"
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/uploads/hero-landscape-1024.webp"
          type="image/webp"
        />
        <source
          srcSet="/uploads/hero-landscape-640.webp"
          type="image/webp"
        />
        <img
          src="/uploads/hero-landscape.png"
          alt="Home improvement background"
          className="w-full h-full object-cover"
          fetchPriority="high"
          width={1536}
          height={1024}
        />
      </picture>
      <picture className="absolute inset-0 block md:hidden">
        <source
          media="(min-width: 640px)"
          srcSet="/uploads/hero-portrait-768.webp"
          type="image/webp"
        />
        <source
          srcSet="/uploads/hero-portrait-640.webp"
          type="image/webp"
        />
        <img
          src="/uploads/hero-portrait.png"
          alt="Home improvement background"
          className="w-full h-full object-cover"
          fetchPriority="high"
          width={1024}
          height={1536}
        />
      </picture>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Subtle ambient decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative w-full max-w-2xl mx-auto px-4 py-12 md:py-16">
        {/* Headline - shown on step 1 */}
        {!hideButtons && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <p className="text-amber-400 font-medium tracking-wide uppercase text-sm mb-3">
              Premium Home Improvement Services
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif leading-tight">
              Transform Your Home
              <span className="block text-amber-400">With Confidence</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg mx-auto">
              Connect with vetted, top-rated professionals for windows, roofing, HVAC, bathroom, and more.
            </p>
          </motion.div>
        )}

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="glass-card rounded-2xl p-6 md:p-8 shadow-2xl glow-amber border border-white/10"
        >
          {/* Step indicator */}
          {hideButtons && mounted && (
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    s <= stepNumber
                      ? "bg-primary w-8"
                      : "bg-muted w-2"
                  )}
                />
              ))}
            </div>
          )}

          {!hideButtons ? (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-foreground">
                Ready to get started?
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Free 60-second qualification — no obligation
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  variant={isInjured === 'No' ? 'destructive' : 'outline'}
                  className={cn(
                    "text-lg py-6 px-12 rounded-xl font-semibold transition-all duration-200",
                    "hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg",
                    isInjured === 'No' && "shadow-lg"
                  )}
                  onClick={handleNoClick}
                >
                  No
                </Button>

                <Button
                  variant={isInjured === 'Yes' ? 'default' : 'outline'}
                  className={cn(
                    "text-lg py-6 px-12 rounded-xl font-semibold transition-all duration-200",
                    "hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg",
                    isInjured === 'Yes' && "shadow-lg"
                  )}
                  onClick={handleYesClick}
                  autoFocus
                >
                  Yes
                </Button>
              </div>
            </>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={progress}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Progress bar */}
          <div className="mt-6">
            <Progress value={progress} className="h-1.5 bg-muted/50" />
            {!hideButtons && (
              <p className="mt-3 text-center text-xs text-muted-foreground tracking-wide">
                Takes less than 60 seconds
              </p>
            )}
          </div>
        </motion.div>

        {/* Trust signals */}
        {!hideButtons && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center justify-center gap-6 mt-8 text-slate-400 text-sm"
          >
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Free Quotes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>No Obligation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Licensed Pros</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Hero;
