"use client";
import React from 'react';
import { formatPhone, unformatPhone } from '@/lib/utils';

/**
 * Simple text input component
 */
export default function TextInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  min,
  max,
  onBlur,
  autoComplete,
  disabled = false,
  readOnly = false,
  helpText,
  onValidate
}) {
  const id = `field-${name}`;
  
  const handleChange = (e) => {
    let inputValue = e.target.value;
    
    // Special handling for phone number fields
    if (type === 'tel' || name === 'phoneNumber') {
      // Store unformatted digits in state
      const digitsOnly = unformatPhone(inputValue);
      onChange(name, digitsOnly);
    } else {
      onChange(name, inputValue);
    }
  };

  // Get display value (formatted for phone, raw for others)
  const getDisplayValue = () => {
    if (type === 'tel' || name === 'phoneNumber') {
      return formatPhone(value);
    }
    return value || '';
  };
  
  const inputClasses = `
    w-full px-3 py-2 border 
    ${error ? 'border-destructive' : 'border-border'} 
    rounded-md shadow-sm 
    focus:outline-none focus:ring-primary focus:border-primary 
    bg-background text-foreground
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${readOnly ? 'bg-muted' : ''}
  `;
  
  return (
    <div className="w-full">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-0.5 text-left"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      
      <input
        id={id}
        name={name}
        type={type}
        value={getDisplayValue()}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        className={inputClasses}
        min={min}
        max={max}
      />
      
      {error && (
        <p className="mt-0.5 text-sm text-destructive">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="mt-0.5 text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}
