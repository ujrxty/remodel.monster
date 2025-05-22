/**
 * Schema validator for offer configurations
 * Validates a config object against the offerSchema
 */

const offerSchema = require('../schemas/offerSchema');

/**
 * Validates a value against a schema definition
 * @param {any} value - The value to validate
 * @param {Object} schema - The schema to validate against
 * @param {string} path - The current path in the object (for error messages)
 * @returns {Array} Array of validation errors, empty if valid
 */
function validateValue(value, schema, path = '') {
  const errors = [];
  
  // Check if required field is present
  if (schema.required && (value === undefined || value === null || value === '')) {
    errors.push(`${path} is required`);
    return errors;
  }
  
  // If value is undefined/null and not required, it's valid
  if (value === undefined || value === null) {
    return errors;
  }
  
  // Check type
  if (schema.type) {
    let valid = true;
    
    switch (schema.type) {
      case 'string':
        valid = typeof value === 'string';
        break;
      case 'number':
        valid = typeof value === 'number';
        break;
      case 'boolean':
        valid = typeof value === 'boolean';
        break;
      case 'object':
        valid = typeof value === 'object' && !Array.isArray(value);
        break;
      case 'array':
        valid = Array.isArray(value);
        break;
    }
    
    if (!valid) {
      errors.push(`${path} should be of type ${schema.type}`);
    }
  }
  
  // Check enum values
  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${path} should be one of: ${schema.enum.join(', ')}`);
  }
  
  // Validate string format if specified
  if (schema.type === 'string' && schema.format) {
    switch (schema.format) {
      case 'color':
        // Basic color format validation (hex, rgb, rgba)
        if (!/^(#[0-9A-Fa-f]{3,8}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\))$/.test(value)) {
          errors.push(`${path} should be a valid color format (hex, rgb, rgba)`);
        }
        break;
      case 'date-time':
        // Check if valid date-time string
        if (isNaN(Date.parse(value))) {
          errors.push(`${path} should be a valid date-time string`);
        }
        break;
    }
  }
  
  // Validate array items
  if (schema.type === 'array' && schema.items && Array.isArray(value)) {
    value.forEach((item, index) => {
      const itemErrors = validateValue(item, schema.items, `${path}[${index}]`);
      errors.push(...itemErrors);
    });
  }
  
  // Validate object properties
  if (schema.type === 'object' && typeof value === 'object' && !Array.isArray(value)) {
    // If properties are defined, validate against them
    if (schema.properties) {
      Object.keys(schema.properties).forEach(propKey => {
        const propSchema = schema.properties[propKey];
        const propValue = value[propKey];
        const propPath = path ? `${path}.${propKey}` : propKey;
        
        const propErrors = validateValue(propValue, propSchema, propPath);
        errors.push(...propErrors);
      });
    }
    
    // If additionalProperties is defined and has a schema
    if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
      Object.keys(value).forEach(propKey => {
        // Skip properties that were already validated via properties
        if (schema.properties && schema.properties[propKey]) {
          return;
        }
        
        const propValue = value[propKey];
        const propPath = path ? `${path}.${propKey}` : propKey;
        
        const propErrors = validateValue(propValue, schema.additionalProperties, propPath);
        errors.push(...propErrors);
      });
    }
  }
  
  // Validate min/max for numbers
  if (schema.type === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) {
      errors.push(`${path} should be >= ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      errors.push(`${path} should be <= ${schema.maximum}`);
    }
  }
  
  // Validate min/max length for strings
  if (schema.type === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push(`${path} should have length >= ${schema.minLength}`);
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push(`${path} should have length <= ${schema.maxLength}`);
    }
  }
  
  return errors;
}

/**
 * Validates a complete offer configuration against the schema
 * @param {Object} config - The offer configuration to validate
 * @returns {Object} Validation result with isValid flag and errors array
 */
function validateOfferConfig(config) {
  const errors = validateValue(config, { type: 'object', properties: offerSchema });
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

module.exports = {
  validateOfferConfig
};