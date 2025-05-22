"use client";
import React from 'react';

/**
 * Enhanced radio group component with label and improved styling
 * @param {Object} props Component props
 * @returns {JSX.Element} Rendered radio group
 */
export default function RadioGroup({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  inline = false,
  disabled = false,
  helpText,
  // Optional validation function
  onValidate,
  // Visual style - 'default', 'card'
  variant = 'default',
  // Size adjustment
  size = 'default' // 'small', 'default', 'large'
}) {
  /**
   * Handle radio selection change
   */
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(name, newValue);
    
    // Run validation if provided
    if (onValidate) {
      onValidate(name, newValue);
    }
  };
  
  // Size-based styles
  const sizeStyles = {
    small: {
      radio: 'h-3 w-3',
      text: 'text-xs',
      padding: 'py-1'
    },
    default: {
      radio: 'h-4 w-4',
      text: 'text-sm',
      padding: 'py-2'
    },
    large: {
      radio: 'h-5 w-5',
      text: 'text-base',
      padding: 'py-2.5'
    }
  };
  
  // Get styles for current size
  const currentSize = sizeStyles[size] || sizeStyles.default;
  
  // Card variant styles
  const isCardVariant = variant === 'card';
  
  return (
    <div className="w-full">
      <div className="block text-sm font-medium text-foreground mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </div>
      
      <div 
        className={`
          ${inline ? 'flex flex-wrap gap-3' : 'space-y-2'}
          ${disabled ? 'opacity-60' : ''}
        `}
      >
        {options.map(option => {
          const optionId = `${name}-${option.value}`;
          const isChecked = value === option.value;
          
          return isCardVariant ? (
            // Card style radio option
            <label
              key={option.value}
              htmlFor={optionId}
              className={`
                block relative rounded-md border-2 p-3 cursor-pointer transition-all
                ${isChecked 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/10' 
                  : 'border-border hover:border-muted-foreground'}
                ${disabled ? 'cursor-not-allowed opacity-70' : ''}
                ${inline ? 'flex-1 min-w-[150px]' : 'w-full'}
              `}
            >
              <input
                id={optionId}
                name={name}
                type="radio"
                value={option.value}
                checked={isChecked}
                onChange={handleChange}
                disabled={disabled}
                required={required}
                className="sr-only"
              />
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <div
                    className={`
                      ${currentSize.radio} rounded-full border flex items-center justify-center
                      ${isChecked 
                        ? 'border-primary bg-primary' 
                        : 'border-muted-foreground bg-background'}
                    `}
                  >
                    {isChecked && (
                      <div className="rounded-full bg-white" style={{ width: '40%', height: '40%' }}></div>
                    )}
                  </div>
                </div>
                <div className="ml-3 text-sm">
                  <div className={`font-medium text-foreground ${currentSize.text}`}>
                    {option.label}
                  </div>
                  {option.description && (
                    <p className="text-muted-foreground text-xs mt-1">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </label>
          ) : (
            // Default style radio option
            <div key={option.value} className="flex items-center">
              <input
                id={optionId}
                name={name}
                type="radio"
                value={option.value}
                checked={isChecked}
                onChange={handleChange}
                disabled={disabled}
                required={required}
                className={`
                  ${currentSize.radio} border-border text-primary focus:ring-primary 
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
              />
              <label
                htmlFor={optionId}
                className={`ml-2 block ${currentSize.text} text-foreground ${disabled ? 'opacity-70' : ''}`}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}