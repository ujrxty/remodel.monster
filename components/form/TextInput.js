"use client";
import React from 'react';
import { formatPhone, unformatPhone } from '@/lib/utils';

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
    if (type === 'tel' || name === 'phoneNumber') {
      const digitsOnly = unformatPhone(inputValue);
      onChange(name, digitsOnly);
    } else {
      onChange(name, inputValue);
    }
  };

  const getDisplayValue = () => {
    if (type === 'tel' || name === 'phoneNumber') {
      return formatPhone(value);
    }
    return value || '';
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-1.5"
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
        className={`
          w-full px-4 py-2.5 border rounded-xl text-sm transition-colors duration-200
          ${error ? 'border-destructive' : 'border-border hover:border-foreground/20'}
          bg-background text-foreground placeholder:text-muted-foreground
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          ${readOnly ? 'bg-muted' : ''}
        `}
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
