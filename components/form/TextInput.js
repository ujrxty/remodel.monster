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
    onChange(name, e.target.value);
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
