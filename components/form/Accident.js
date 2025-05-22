"use client";
import React from 'react';
import FormStep from './FormStep';

/**
 * Accident details form component
 * @param {Object} props Component props
 * @returns {JSX.Element} Rendered accident component
 */
export default function Accident({
  isAccident, 
  setIsAccident
}) {
  return (
    <FormStep
      title="Tell us about what happened"
      description="Please provide details about your situation"
    >
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-card-foreground">Were you involved in an accident?</label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setIsAccident('Yes')}
              className={`px-4 py-2 rounded-md ${
                isAccident === 'Yes'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setIsAccident('No')}
              className={`px-4 py-2 rounded-md ${
                isAccident === 'No'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </FormStep>
  );
}