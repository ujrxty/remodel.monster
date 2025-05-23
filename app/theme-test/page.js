"use client";
import { useState } from "react";

export default function ThemeTest() {
  const [showVars, setShowVars] = useState(false);

  return (
    <div className="p-8 space-y-8 bg-background">
      <h1 className="text-4xl font-bold">Theme Test Page</h1>
      
      {/* Debug CSS Variables */}
      <button 
        onClick={() => setShowVars(!showVars)}
        className="px-4 py-2 bg-primary text-primary-foreground border-2 border-border shadow-md"
      >
        {showVars ? 'Hide' : 'Show'} CSS Variables
      </button>
      
      {showVars && (
        <div className="p-4 bg-muted font-mono text-xs space-y-1 overflow-auto">
          <div>--border: {getComputedStyle(document.documentElement).getPropertyValue('--border')}</div>
          <div>--radius: {getComputedStyle(document.documentElement).getPropertyValue('--radius')}</div>
          <div>--shadow-sm: {getComputedStyle(document.documentElement).getPropertyValue('--shadow-sm')}</div>
          <div>--shadow-md: {getComputedStyle(document.documentElement).getPropertyValue('--shadow-md')}</div>
          <div>--primary: {getComputedStyle(document.documentElement).getPropertyValue('--primary')}</div>
          <div>--font-sans: {getComputedStyle(document.documentElement).getPropertyValue('--font-sans')}</div>
          <div>--font-mono: {getComputedStyle(document.documentElement).getPropertyValue('--font-mono')}</div>
          <div>body font-family: {getComputedStyle(document.body).fontFamily}</div>
        </div>
      )}

      {/* Font Tests */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Font Tests</h2>
        <div className="space-y-2">
          <p className="font-sans text-lg">Default (font-sans): The quick brown fox jumps over the lazy dog</p>
          <p className="font-mono text-lg">Monospace (font-mono): The quick brown fox jumps over the lazy dog</p>
          <p className="font-serif text-lg">Serif (font-serif): The quick brown fox jumps over the lazy dog</p>
          <p className="text-lg" style={{fontFamily: 'DM Sans, sans-serif'}}>Direct DM Sans: The quick brown fox jumps over the lazy dog</p>
          <p className="text-lg" style={{fontFamily: 'Space Mono, monospace'}}>Direct Space Mono: The quick brown fox jumps over the lazy dog</p>
          <p className="text-lg" style={{fontFamily: 'var(--font-sans)'}}>Using CSS var: The quick brown fox jumps over the lazy dog</p>
        </div>
      </div>

      {/* TweakCN Style Card */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">TweakCN Style Card (using their exact classes)</h2>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col p-6 space-y-1">
            <div className="font-semibold tracking-tight text-2xl">Create an account</div>
            <div className="text-sm text-muted-foreground">Enter your email below to create your account</div>
          </div>
          <div className="p-6 pt-0">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
              Create account
            </button>
          </div>
        </div>
      </div>

      {/* Neo-Brutalism Attempt */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Neo-Brutalism Attempt</h2>
        <div className="border-2 border-black bg-card text-card-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col p-6 space-y-1">
            <div className="font-semibold tracking-tight text-2xl">Create an account</div>
            <div className="text-sm text-muted-foreground">Enter your email below to create your account</div>
          </div>
          <div className="p-6 pt-0">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors border-2 border-black bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] h-9 px-4 py-2 w-full">
              Create account
            </button>
          </div>
        </div>
      </div>

      {/* Testing individual shadow classes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Shadow Classes Test</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-background border border-border shadow-sm">shadow-sm</div>
          <div className="p-4 bg-background border border-border shadow">shadow</div>
          <div className="p-4 bg-background border border-border shadow-md">shadow-md</div>
          <div className="p-4 bg-background border border-border shadow-lg">shadow-lg</div>
        </div>
      </div>

      {/* Border tests */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Border Tests</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-background border border-border">border-border</div>
          <div className="p-4 bg-background border-2 border-border">border-2 border-border</div>
          <div className="p-4 bg-background border-2 border-black">border-2 border-black</div>
        </div>
      </div>
    </div>
  );
}