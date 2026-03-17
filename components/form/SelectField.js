"use client";
import React, { useState, useRef, useEffect } from 'react';

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
  onValidate,
  grouped = false,
  searchable = false,
  size = 'default'
}) {
  const id = `field-${name}`;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!searchable) return;

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
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

  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '';

  const filteredOptions = searchable && searchTerm
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  const handleSelectOption = (optionValue) => {
    onChange(name, optionValue);
    setIsOpen(false);
    setSearchTerm('');
    if (onValidate) {
      onValidate(name, optionValue);
    }
  };

  const toggleDropdown = () => {
    if (!disabled && !readOnly) {
      setIsOpen(!isOpen);
    }
  };

  const sizeStyles = {
    small: 'text-xs py-1.5',
    default: 'text-sm py-2.5',
    large: 'text-base py-3',
  };

  const useCustomUI = searchable || grouped;

  const baseClasses = `
    w-full px-4 ${sizeStyles[size]} border rounded-xl transition-colors duration-200
    ${error ? 'border-destructive' : 'border-border hover:border-foreground/20'}
    bg-background text-foreground
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${readOnly ? 'bg-muted' : ''}
  `;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-1.5"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>

      {useCustomUI ? (
        <div className="relative" ref={dropdownRef}>
          <div
            className={`${baseClasses} cursor-pointer flex items-center justify-between`}
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
              className="absolute z-10 w-full mt-1 bg-card border border-border rounded-xl shadow-lg max-h-60 overflow-auto"
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
                    className="w-full px-3 py-1.5 border border-border rounded-lg text-sm bg-background"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              <ul className="py-1" role="listbox">
                {filteredOptions.length === 0 ? (
                  <li className="px-4 py-2 text-sm text-muted-foreground">
                    No options found
                  </li>
                ) : (
                  filteredOptions.map((option) => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={value === option.value}
                      className={`
                        px-4 py-2 text-sm cursor-pointer transition-colors
                        ${value === option.value ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}
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
          className={baseClasses}
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
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}

      {helpText && !error && (
        <p className="mt-1 text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}
