"use client";
import React, { useState, useRef, useEffect } from 'react';

/**
 * Enhanced select input component with label and improved UI
 * @param {Object} props Component props
 * @returns {JSX.Element} Rendered select input
 */
export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  placeholder = "Select an option",
  disabled = false,
  readOnly = false,
  helpText,
  // Optional function for validation
  onValidate,
  // Enhanced features
  grouped = false,
  searchable = false,
  size = 'default' // 'small', 'default', 'large'
}) {
  const id = `field-${name}`;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    if (!searchable) return;
    
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input when dropdown opens
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, searchable]);
  
  // Get selected option label
  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '';
  
  // Filter options based on search term
  const filteredOptions = searchable && searchTerm
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;
  
  /**
   * Handle option selection
   */
  const handleSelectOption = (optionValue) => {
    onChange(name, optionValue);
    setIsOpen(false);
    setSearchTerm('');
    
    // Run validation if provided
    if (onValidate) {
      onValidate(name, optionValue);
    }
  };
  
  /**
   * Toggle dropdown open/closed
   */
  const toggleDropdown = () => {
    if (!disabled && !readOnly) {
      setIsOpen(!isOpen);
    }
  };
  
  // Size-based styles
  const sizeStyles = {
    small: 'text-xs py-1',
    default: 'text-sm py-2',
    large: 'text-base py-3',
  };
  
  // Use the standard select for simple cases, custom UI for enhanced features
  const useCustomUI = searchable || grouped;
  
  // Compose CSS classes
  const selectClasses = `
    w-full px-3 ${sizeStyles[size]} border 
    ${error ? 'border-destructive' : 'border-border'} 
    rounded-md shadow-sm 
    focus:outline-none focus:ring-primary focus:border-primary 
    bg-background text-foreground
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${readOnly ? 'bg-muted' : ''}
    ${useCustomUI ? 'cursor-pointer appearance-none' : ''}
  `;
  
  const customSelectClasses = `
    w-full px-3 ${sizeStyles[size]} border 
    ${error ? 'border-destructive' : 'border-border'} 
    rounded-md shadow-sm 
    focus:outline-none 
    bg-background text-foreground
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${readOnly ? 'bg-muted' : ''}
    cursor-pointer flex items-center justify-between
  `;
  
  return (
    <div className="w-full">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-0.5 text-left"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      
      {useCustomUI ? (
        // Custom enhanced select UI
        <div className="relative" ref={dropdownRef}>
          <div 
            className={customSelectClasses}
            onClick={toggleDropdown}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-labelledby={id}
            aria-controls={`${id}-listbox`}
          >
            <span className={!value ? 'text-muted-foreground' : ''}>
              {displayValue || placeholder}
            </span>
            <span className="ml-2">
              <svg 
                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          
          {isOpen && (
            <div 
              id={`${id}-listbox`}
              className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto"
              role="listbox"
            >
              {searchable && (
                <div className="p-2 border-b border-border">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-2 py-1 border border-border rounded-md text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              
              <ul className="py-1" role="listbox">
                {filteredOptions.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-muted-foreground">
                    No options found
                  </li>
                ) : (
                  filteredOptions.map((option) => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={value === option.value}
                      className={`
                        px-3 py-2 text-sm cursor-pointer
                        ${value === option.value ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}
                      `}
                      onClick={() => handleSelectOption(option.value)}
                    >
                      {option.label}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
          
          {/* Hidden native select for form submission */}
          <select
            id={id}
            name={name}
            value={value || ''}
            onChange={(e) => onChange(name, e.target.value)}
            required={required}
            disabled={disabled || readOnly}
            className="sr-only"
            aria-hidden="true"
          >
            <option value="" disabled>{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        // Standard native select
        <select
          id={id}
          name={name}
          value={value || ''}
          onChange={(e) => {
            const newValue = e.target.value;
            onChange(name, newValue);
            if (onValidate) onValidate(name, newValue);
          }}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className={selectClasses}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      
      {error && (
        <p className="mt-0.5 text-sm text-destructive">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="mt-0.5 text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}