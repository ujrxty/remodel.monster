"use client";
import React from 'react';

/**
 * Generic form step component
 * @param {Object} props Component props
 * @returns {JSX.Element} Rendered form step
 */
export default function FormStep({ 
  title = "Form Step",
  description = "Please fill out the information below.",
  children
}) {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-3 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
