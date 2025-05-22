"use client";
import React, { useState } from 'react';
import FormStep from './FormStep';

/**
 * Date input component 
 * @param {Object} props Component props
 * @returns {JSX.Element} Rendered date component
 */
export default function Date({
  selectedTime,
  setSelectedTime
}) {
  const [error, setError] = useState("");
  
  const handleChange = (e) => {
    setError("");
    setSelectedTime(e.target.value);
  };
  
  return (
    <FormStep
      title="When did this happen?"
      description="Please select the date."
    >
      <div className="w-full max-w-md mx-auto">
        <input
          type="date"
          value={selectedTime}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]}
          className={`w-full px-3 py-2 border ${error ? 'border-destructive' : 'border-border'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground`}
        />
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>
    </FormStep>
  );
}
