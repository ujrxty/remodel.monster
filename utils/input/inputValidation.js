/**
 * Input Validation Utilities
 * 
 * This module provides enhanced validation functions for form fields
 * with specific error messages and validation logic.
 */


/**
 * Error messages for different validation failures
 */
export const errorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phoneNumber: 'Please enter a valid 10-digit phone number',
  phoneNumberFormat: 'Phone number must be in format (XXX) XXX-XXXX',
  zip: 'Please enter a valid 5-digit zip code',
  zipFormat: 'Zip code must be 5 digits or XXXXX-XXXX format',
  state: 'Please select a valid state',
  minLength: (value) => `Must be at least ${value} characters`,
  maxLength: (value) => `Cannot exceed ${value} characters`,
  pattern: 'Please enter a valid value',
  enum: 'Please select a valid option',
  minValue: (value) => `Must be at least ${value}`,
  maxValue: (value) => `Cannot exceed ${value}`,
  integer: 'Must be a whole number',
  date: 'Please enter a valid date',
  futureDate: 'Date must be in the future',
  pastDate: 'Date must be in the past',
  invalidChars: 'Contains invalid characters'
};

/**
 * Validates if a value is not empty
 * @param {any} value - The value to check
 * @returns {boolean} - True if value is not empty
 */
export function isNotEmpty(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (typeof value === 'number') return true;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return !!value;
}

/**
 * Validates an email address
 * @param {string} value - The email to validate
 * @returns {boolean} - True if email is valid
 */
export function isValidEmail(value) {
  if (!value) return false;
  
  // Basic RFC 5322 compliant regex with some common TLD validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(value)) return false;
  
  // Additional checks for common issues
  if (value.indexOf('..') > -1) return false; // Double dots
  if (value.split('@').length > 2) return false; // Multiple @ symbols
  
  // Check TLD length (at least 2 characters)
  const tld = value.split('.').pop();
  if (tld.length < 2) return false;
  
  return true;
}

/**
 * Validates a phone number (formatted or unformatted)
 * @param {string} value - The phone number to validate
 * @param {boolean} requireFormat - Whether to require standard format
 * @returns {boolean} - True if phone number is valid
 */
export function isValidPhoneNumber(value, requireFormat = false) {
  if (!value) return false;
  
  // Extract just the digits for validation
  const digits = typeof value === 'string' ? value.replace(/\D/g, '') : value;
  
  if (requireFormat) {
    // Check for (XXX) XXX-XXXX format
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
  } else {
    // US phone numbers are EXACTLY 10 digits
    return digits.length === 10;
  }
}

/**
 * Validates a zip code according to API specs
 * @param {string} value - The zip code to validate
 * @returns {boolean} - True if zip code is valid
 */
export function isValidZipCode(value) {
  if (!value) return false;
  
  // API requires 5-8 digit format
  return /^\d{5,8}$/.test(value);
}

/**
 * Validates a number is within range
 * @param {number|string} value - The value to check
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {boolean} - True if value is within range
 */
export function isInRange(value, min, max) {
  if (value === null || value === undefined || value === '') return false;
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return false;
  
  if (min !== undefined && numValue < min) return false;
  if (max !== undefined && numValue > max) return false;
  
  return true;
}

/**
 * Validates a date string
 * @param {string} value - The date string to validate
 * @param {Date} minDate - Minimum allowed date
 * @param {Date} maxDate - Maximum allowed date
 * @returns {boolean} - True if date is valid and within range
 */
export function isValidDate(value, minDate, maxDate) {
  if (!value) return false;
  
  // Try to parse the date
  const date = new Date(value);
  if (isNaN(date.getTime())) return false;
  
  // Check min date
  if (minDate && date < minDate) return false;
  
  // Check max date
  if (maxDate && date > maxDate) return false;
  
  return true;
}

/**
 * Validates a value against a regular expression pattern
 * @param {string} value - The value to check
 * @param {string|RegExp} pattern - The pattern to test against
 * @returns {boolean} - True if value matches pattern
 */
export function matchesPattern(value, pattern) {
  if (!value) return false;
  
  const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);
  return regex.test(value);
}

/**
 * Validates a field value against a set of rules
 * @param {string} fieldName - The name of the field
 * @param {any} value - The field value
 * @param {Object} validation - Validation rules
 * @returns {string|null} - Error message or null if valid
 */
export function validateField(fieldName, value, validation = {}) {
  // Skip validation if no validation rules provided
  if (Object.keys(validation).length === 0) return null;
  
  // Required field check
  if (validation.required && !isNotEmpty(value)) {
    return errorMessages.required;
  }
  
  // Skip further validation if empty and not required
  if (!isNotEmpty(value)) return null;
  
  // Field-specific validation based on field name
  switch (fieldName) {
    case 'email':
      if (!isValidEmail(value)) {
        return errorMessages.email;
      }
      break;
      
    case 'phoneNumber':
      if (!isValidPhoneNumber(value, validation.formatted)) {
        return validation.formatted ? errorMessages.phoneNumberFormat : errorMessages.phoneNumber;
      }
      break;
      
    case 'zip':
      if (!isValidZipCode(value)) {
        return errorMessages.zipFormat;
      }
      break;
  }
  
  // Min/max length validation
  if (typeof value === 'string') {
    if (validation.minLength && value.length < validation.minLength) {
      return errorMessages.minLength(validation.minLength);
    }
    
    if (validation.maxLength && value.length > validation.maxLength) {
      return errorMessages.maxLength(validation.maxLength);
    }
  }
  
  // Numeric range validation
  if (validation.min !== undefined || validation.max !== undefined) {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (!isNaN(numValue)) {
      if (validation.min !== undefined && numValue < validation.min) {
        return errorMessages.minValue(validation.min);
      }
      
      if (validation.max !== undefined && numValue > validation.max) {
        return errorMessages.maxValue(validation.max);
      }
    }
  }
  
  // Pattern validation
  if (validation.pattern && !matchesPattern(value, validation.pattern)) {
    return validation.patternMessage || errorMessages.pattern;
  }
  
  // Date validation
  if (validation.isDate) {
    if (!isValidDate(value, validation.minDate, validation.maxDate)) {
      if (validation.minDate && new Date(value) < validation.minDate) {
        return errorMessages.futureDate;
      }
      if (validation.maxDate && new Date(value) > validation.maxDate) {
        return errorMessages.pastDate;
      }
      return errorMessages.date;
    }
  }
  
  // Custom validation function
  if (validation.validator && typeof validation.validator === 'function') {
    const customError = validation.validator(value);
    if (customError) {
      return customError;
    }
  }
  
  return null;
}

/**
 * Creates a validator function for a specific field
 * @param {string} fieldName - The field name
 * @param {Object} validationRules - Validation rules for the field
 * @returns {Function} - Validator function for the field
 */
export function createFieldValidator(fieldName, validationRules) {
  return (value) => validateField(fieldName, value, validationRules);
}

/**
 * Validates a complete form data object against a form schema
 * @param {Object} formData - The form data to validate
 * @param {Object} formSchema - The schema defining validation rules
 * @param {Array} visibleFields - Fields that should be validated (optional)
 * @returns {Object} - Object containing errors for invalid fields
 */
export function validateForm(formData, formSchema, visibleFields = null) {
  const errors = {};
  
  if (!formSchema || !formSchema.fields) return errors;
  
  // Determine which fields to validate
  const fieldsToValidate = visibleFields || Object.keys(formSchema.fields);
  
  // Validate each field
  fieldsToValidate.forEach(fieldName => {
    const field = formSchema.fields[fieldName];
    
    // Skip fields without validation rules
    if (!field || !field.validation) return;
    
    const value = formData[fieldName];
    const error = validateField(fieldName, value, field.validation);
    
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return errors;
}