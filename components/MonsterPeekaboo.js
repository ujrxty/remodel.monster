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
      transition: isVisible ? 'transform 2s ease-out' : 'transform 0.3s ease-in',
      transform: `rotate(${position.rotation}deg)`,
      zIndex: 50,
    };

    switch (position.edge) {
      case 'top':
        return {
          ...baseStyles,
          top: isVisible ? '0' : '-256px',
          left: `${position.offset}%`,
          transform: `${baseStyles.transform} translateX(-50%)`,
        };
      case 'bottom':
        return {
          ...baseStyles,
          bottom: isVisible ? '0' : '-256px',
          left: `${position.offset}%`,
          transform: `${baseStyles.transform} translateX(-50%)`,
        };
      case 'left':
        return {
          ...baseStyles,
          left: isVisible ? '0' : '-256px',
          top: `${position.offset}%`,
          transform: `${baseStyles.transform} translateY(-50%)`,
        };
      case 'right':
        return {
          ...baseStyles,
          right: isVisible ? '0' : '-256px',
          top: `${position.offset}%`,
          transform: `${baseStyles.transform} translateY(-50%)`,
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