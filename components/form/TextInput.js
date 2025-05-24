"use client";
import React from 'react';

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
    let newValue = e.target.value;
    
    // Apply phone number masking
    if (type === 'tel' || name === 'phoneNumber') {
      newValue = formatPhoneNumber(newValue);
    }
    
    onChange(name, newValue);
  };
  
  // Phone number formatting function
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Apply formatting based on length
    if (digits.length >= 6) {
      return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6,10)}`;
    } else if (digits.length >= 3) {
      return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
    } else if (digits.length > 0) {
      return `(${digits}`;
    }
    return digits;
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
        className="block text-sm font-medium text-foreground mb-1"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      
      <input
        id={id}
        name={name}
        type={type}
        value={value || ''}
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
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}
