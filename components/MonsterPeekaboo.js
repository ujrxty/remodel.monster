"use client";
import { useState, useEffect, useCallback } from 'react';

export default function MonsterPeekaboo() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ edge: 'bottom', offset: 50, rotation: 0 });

  const getRandomPosition = useCallback(() => {
    const edges = ['top', 'right', 'bottom', 'left'];
    const edge = edges[Math.floor(Math.random() * edges.length)];
    const offset = Math.random() * 60 + 20; // 20-80% along the edge
    
    const rotations = {
      top: 180,
      right: 270,
      bottom: 0,
      left: 90
    };
    
    return { edge, offset, rotation: rotations[edge] };
  }, []);

  const showMonster = useCallback(() => {
    setPosition(getRandomPosition());
    setIsVisible(true);
    
    // Auto-hide after pause
    setTimeout(() => {
      if (isVisible) {
        setIsVisible(false);
      }
    }, 3000); // Pause for 3 seconds
  }, [getRandomPosition, isVisible]);

  useEffect(() => {
    // Initial show after 5 seconds
    const initialTimer = setTimeout(showMonster, 5000);
    
    // Show every 30 seconds
    const interval = setInterval(() => {
      if (!isVisible) {
        showMonster();
      }
    }, 30000);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [showMonster, isVisible]);

  const handleClick = () => {
    setIsVisible(false);
  };

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed',
      width: '256px',
      height: '256px',
      cursor: 'pointer',
      transition: isVisible ? 'all 2s ease-out' : 'all 0.3s ease-in',
      zIndex: 50,
    };

    const peekAmount = 100; // pixels to show when peeking

    switch (position.edge) {
      case 'top':
        return {
          ...baseStyles,
          top: isVisible ? `-${256 - peekAmount}px` : '-256px',
          left: `${position.offset}%`,
          transform: `translateX(-50%) rotate(${position.rotation}deg)`,
        };
      case 'bottom':
        return {
          ...baseStyles,
          bottom: isVisible ? `-${256 - peekAmount}px` : '-256px',
          left: `${position.offset}%`,
          transform: `translateX(-50%) rotate(${position.rotation}deg)`,
        };
      case 'left':
        return {
          ...baseStyles,
          left: isVisible ? `-${256 - peekAmount}px` : '-256px',
          top: `${position.offset}%`,
          transform: `translateY(-50%) rotate(${position.rotation}deg)`,
        };
      case 'right':
        return {
          ...baseStyles,
          right: isVisible ? `-${256 - peekAmount}px` : '-256px',
          top: `${position.offset}%`,
          transform: `translateY(-50%) rotate(${position.rotation}deg)`,
        };
      default:
        return baseStyles;
    }
  };

  return (
    <img
      src="/monster-favicon.webp"
      alt="Remodel Monster"
      style={getPositionStyles()}
      onClick={handleClick}
      onTouchStart={handleClick}
    />
  );
}