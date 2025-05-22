/**
 * Input Utilities Index
 * 
 * This file exports all input-related utilities from the input directory
 * for easier imports throughout the application.
 */

export * from './inputValidation';

/**
 * Common validation schemas for reuse
 */
export const validationSchemas = {
  // Personal information fields
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    patternMessage: 'Please enter a valid name'
  },
  
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    patternMessage: 'Please enter a valid email address'
  },
  
  phone: {
    required: true,
    pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
    patternMessage: 'Please format as (XXX) XXX-XXXX'
  },
  
  // Location fields
  address: {
    required: true,
    minLength: 5,
    maxLength: 100
  },
  
  zipCode: {
    required: true,
    pattern: /^\d{5}(-\d{4})?$/,
    patternMessage: 'Please enter a valid zip code'
  },
  
  // Numeric fields
  integer: {
    pattern: /^[0-9]+$/,
    patternMessage: 'Please enter a whole number'
  },
  
  currency: {
    pattern: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/,
    patternMessage: 'Please enter a valid currency amount'
  },
  
  // Date fields
  date: {
    isDate: true,
    patternMessage: 'Please enter a valid date'
  },
  
  futureDate: {
    isDate: true,
    minDate: new Date(),
    patternMessage: 'Please enter a future date'
  }
};

/**
 * Field configuration presets for common field types
 */
export const fieldPresets = {
  firstName: {
    type: 'text',
    label: 'First Name',
    required: true,
    validation: validationSchemas.name,
    autoComplete: 'given-name'
  },
  
  lastName: {
    type: 'text',
    label: 'Last Name',
    required: true,
    validation: validationSchemas.name,
    autoComplete: 'family-name'
  },
  
  email: {
    type: 'email',
    label: 'Email Address',
    required: true,
    validation: validationSchemas.email,
    autoComplete: 'email'
  },
  
  phone: {
    type: 'tel',
    label: 'Phone Number',
    required: true,
    validation: validationSchemas.phone,
    mask: true,
    autoComplete: 'tel'
  },
  
  address: {
    type: 'text',
    label: 'Street Address',
    required: true,
    validation: validationSchemas.address,
    autoComplete: 'street-address'
  },
  
  zipCode: {
    type: 'zip',
    label: 'Zip Code',
    required: true,
    validation: validationSchemas.zipCode,
    mask: true,
    autoComplete: 'postal-code'
  },
  
  dateOfBirth: {
    type: 'date',
    label: 'Date of Birth',
    required: true,
    validation: {
      ...validationSchemas.date,
      maxDate: new Date()
    },
    autoComplete: 'bday'
  }
};