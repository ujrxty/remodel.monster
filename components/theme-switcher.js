"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { 
  getAvailableThemes, 
  loadThemeFromUrl, 
  getCurrentThemeName,
  getCurrentThemeUrl
} from "@/lib/theme-loader";

/**
 * ThemeSwitcher component for switching between light/dark modes and theme options
 */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [themes, setThemes] = useState([]);
  const [currentThemeName, setCurrentThemeName] = useState("Default");
  const [mounted, setMounted] = useState(false);
  
  // Mount on client-side only to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Fetch available themes on component mount
  useEffect(() => {
    async function fetchThemes() {
      try {
        const availableThemes = await getAvailableThemes();
        setThemes(availableThemes);
        
        // Get current theme name
        const themeName = getCurrentThemeName();
        setCurrentThemeName(themeName || "Default");
        
        // Load the current theme
        const themeUrl = getCurrentThemeUrl();
        if (themeUrl) {
          try {
            await loadThemeFromUrl(themeUrl);
          } catch (err) {
            console.warn("Failed to load initial theme:", err);
            // Fallback to first available theme
            if (availableThemes && availableThemes.length > 0) {
              await loadThemeFromUrl(availableThemes[0].url);
            }
          }
        }
      } catch (error) {
        console.error("Error initializing themes:", error);
      }
    }
    
    fetchThemes();
  }, []);
  
  // Handle theme change
  const handleThemeChange = async (themeUrl) => {
    try {
      if (!themeUrl) {
        console.warn("No theme URL provided");
        return;
      }
      
      const theme = await loadThemeFromUrl(themeUrl);
      if (theme) {
        setCurrentThemeName(theme.name || getCurrentThemeName() || "Default");
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error changing theme:", error);
      // Keep UI open on error
    }
  };
  
  // Toggle between light and dark mode
  // Add prevention for update loops
  const safeSetTheme = (newTheme) => {
    // Only set theme if it's actually different to prevent loops
    if (newTheme !== theme) {
      setTheme(newTheme);
    }
  };

  const toggleMode = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    
    // Update the theme in context - this will handle all class changes
    safeSetTheme(newTheme);
    
    // Dispatch a custom event to ensure CSS variables are updated
    try {
      if (typeof window !== 'undefined' && window.CustomEvent) {
        const event = new CustomEvent('themeChanged', { detail: { theme: newTheme } });
        window.dispatchEvent(event);
      }
    } catch (e) {
      console.warn('Could not dispatch theme change event:', e);
    }
  };
  
  // Don't render anything on the server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed z-50 bottom-4 right-4 flex flex-col gap-2">
      {/* Theme selection dropdown */}
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-12 right-0 w-56 p-2 rounded-lg bg-popover border border-border shadow-lg dark:shadow-accent/10 animate-in fade-in-0 zoom-in-95">
            <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
              Select Theme
            </div>
            <div className="grid gap-1 p-1">
              {themes.map((item) => (
                <button
                  key={item.url}
                  onClick={() => handleThemeChange(item.url)}
                  className={`flex items-center justify-start w-full gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground ${
                    currentThemeName === item.name 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground"
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Theme selection button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background border border-border hover:bg-accent p-2 rounded-full shadow-lg transition-colors"
          title="Select theme"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" 
            />
          </svg>
        </button>
      </div>
      
      {/* Dark/Light mode toggle */}
      <button
        onClick={toggleMode}
        className="bg-background border border-border hover:bg-accent p-2 rounded-full shadow-lg transition-colors"
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "dark" ? (
          // Sun icon for dark mode (click to go light)
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        ) : (
          // Moon icon for light mode (click to go dark)
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
        )}
      </button>
    </div>
  );
}