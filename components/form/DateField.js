"use client";
import React, { useState } from 'react';

/**
 * Enhanced date input component with validation and formatting
 * @param {Object} props Component props
 * @returns {JSX.Element} Rendered date input
 */
export default function DateField({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  min,
  max,
  helpText,
  disabled = false,
  readOnly = false,
  placeholder = 'MM/DD/YYYY',
  // Special function for validation
  onValidate,
  // Whether to use native date picker or formatted text input
  useDatePicker = true
}) {
  const id = `field-${name}`;
  
  // For formatted text input mode
  const [displayValue, setDisplayValue] = useState('');
  
  // Initialize display value from value if provided
  React.useEffect(() => {
    if (!useDatePicker && value) {
      // If value is ISO format, convert to MM/DD/YYYY
      if (value.includes('-')) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const year = date.getFullYear();
          setDisplayValue(`${month}/${day}/${year}`);
        } else {
          setDisplayValue(value);
        }
      } else {
        setDisplayValue(value);
      }
    }
  }, [value, useDatePicker]);
  
  /**
   * Handle change for formatted text input
   */
  const handleFormattedChange = (e) => {
    const input = e.target.value;
    
    // Allow backspace and deletion
    if (input.length < displayValue.length) {
      setDisplayValue(input);
      return;
    }
    
    // Simple date formatting: just allow digits and slashes
    const digits = input.replace(/\D/g, '');
    let formatted = digits;
    if (digits.length >= 2) formatted = digits.slice(0, 2) + '/' + digits.slice(2);
    if (digits.length >= 4) formatted = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4, 8);
    
    setDisplayValue(formatted);
    
    // Convert to ISO format for storage if complete date
    if (formatted.length === 10 && formatted.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const [month, day, year] = formatted.split('/');
      const isoDate = `${year}-${month}-${day}`;
      
      // Validate date before storing
      const date = new Date(isoDate);
      if (!isNaN(date.getTime())) {
        onChange(name, isoDate);
        
        // Validate against min/max
        if (onValidate) {
          let validationError = null;
          
          if (min && date < new Date(min)) {
            validationError = `Date must be after ${new Date(min).toLocaleDateString()}`;
          }
          
          if (max && date > new Date(max)) {
            validationError = `Date must be before ${new Date(max).toLocaleDateString()}`;
          }
          
          onValidate(name, isoDate, validationError);
        }
      } else if (onValidate) {
        onValidate(name, input, 'Please enter a valid date');
      }
    }
  };
  
  /**
   * Handle native date picker change
   */
  const handleDatePickerChange = (e) => {
    const newValue = e.target.value;
    onChange(name, newValue);
    
    // Validate if needed
    if (onValidate) {
      let validationError = null;
      
      if (newValue) {
        const date = new Date(newValue);
        
        if (min && date < new Date(min)) {
          validationError = `Date must be after ${new Date(min).toLocaleDateString()}`;
        }
        
        if (max && date > new Date(max)) {
          validationError = `Date must be before ${new Date(max).toLocaleDateString()}`;
        }
      }
      
      onValidate(name, newValue, validationError);
    }
  };
  
  // Compose CSS classes
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
      
      {useDatePicker ? (
        // Native date picker
        <input
          id={id}
          name={name}
          type="date"
          value={value || ''}
          onChange={handleDatePickerChange}
          required={required}
          min={min}
          max={max}
          disabled={disabled}
          readOnly={readOnly}
          className={inputClasses}
        />
      ) : (
        // Formatted text input
        <input
          id={id}
          name={name}
          type="text"
          value={displayValue}
          onChange={handleFormattedChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className={inputClasses}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}