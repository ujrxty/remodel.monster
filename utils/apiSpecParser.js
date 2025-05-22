/**
 * API Spec Parser
 * Parses API_SPECS.md and converts to offermage field configuration
 */

const fs = require('fs-extra');
const path = require('path');

/**
 * Parse the API specs markdown file and extract field definitions
 * @param {string} specPath - Path to API_SPECS.md
 * @returns {Object} Parsed field configuration
 */
async function parseApiSpecs(specPath) {
  const content = await fs.readFile(specPath, 'utf-8');
  
  // Extract sections from markdown
  const sections = extractSections(content);
  
  // Parse field definitions from fullpost section
  const fields = parseFieldDefinitions(sections.fullpost);
  
  // Extract conditional logic
  const conditionalFields = extractConditionalLogic(fields);
  
  // Generate form steps
  const steps = generateFormSteps(fields);
  
  return {
    fields,
    steps,
    api: {
      endpoint: 'https://leads-inst523-client.phonexa.com/fullpost/',
      method: 'POST',
      apiId: 'BEB36867357C435CA9FE69AACB4D9909',
      apiPassword: '00c1e7396',
      productId: 267
    }
  };
}

/**
 * Extract sections from markdown content
 * @param {string} content - Markdown content
 * @returns {Object} Sections object
 */
function extractSections(content) {
  const sections = {};
  
  // Find Full Post section
  const fullPostMatch = content.match(/## 3\.3 Full Post([\s\S]*?)(?=\n## |$)/);
  if (fullPostMatch) {
    sections.fullpost = fullPostMatch[1];
  }
  
  return sections;
}

/**
 * Parse field definitions from table format
 * @param {string} tableContent - Markdown table content
 * @returns {Object} Field definitions
 */
function parseFieldDefinitions(tableContent) {
  const fields = {};
  
  // Extract table rows
  const rows = tableContent.match(/\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|/g);
  
  if (!rows) return fields;
  
  // Skip header rows
  rows.slice(3).forEach(row => {
    const cols = row.split('|').map(s => s.trim()).filter(Boolean);
    
    if (cols.length >= 5) {
      const [fieldName, required, description, format, example] = cols;
      
      // Skip if not a valid field name
      if (!fieldName || fieldName.includes('---')) return;
      
      fields[fieldName] = {
        name: fieldName,
        required: parseRequired(required),
        description: cleanDescription(description),
        format: parseFormat(format),
        example: example,
        type: inferFieldType(fieldName, format, description),
        validation: extractValidation(format, description),
        options: extractOptions(format),
        condition: extractCondition(required)
      };
    }
  });
  
  return fields;
}

/**
 * Parse required field value
 * @param {string} required - Required column value
 * @returns {boolean|Object} Required status or condition
 */
function parseRequired(required) {
  if (required === 'YES') return true;
  if (required === 'NO') return false;
  
  // Handle conditional requirements
  if (required.includes('Unless')) {
    return {
      conditional: true,
      condition: required
    };
  }
  
  return false;
}

/**
 * Clean description text
 * @param {string} description - Field description
 * @returns {string} Cleaned description
 */
function cleanDescription(description) {
  return description
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parse format specification
 * @param {string} format - Format column value
 * @returns {Object} Format specification
 */
function parseFormat(format) {
  const formatObj = {};
  
  // Extract length constraints
  const lengthMatch = format.match(/Length (\d+)(?:-(\d+))?/);
  if (lengthMatch) {
    formatObj.minLength = parseInt(lengthMatch[1]);
    if (lengthMatch[2]) {
      formatObj.maxLength = parseInt(lengthMatch[2]);
    } else {
      formatObj.maxLength = formatObj.minLength;
    }
  }
  
  // Extract numeric constraints
  const numericMatch = format.match(/Numeric (\d+)-(\d+)/);
  if (numericMatch) {
    formatObj.min = parseInt(numericMatch[1]);
    formatObj.max = parseInt(numericMatch[2]);
  }
  
  // Extract enum values
  const enumMatch = format.match(/One of the following: \[(.*?)\]/);
  if (enumMatch) {
    formatObj.enum = enumMatch[1]
      .split(',')
      .map(v => v.trim().replace(/`/g, ''));
  }
  
  return formatObj;
}

/**
 * Infer field type from name and format
 * @param {string} fieldName - Field name
 * @param {Object} format - Format object
 * @param {string} description - Field description
 * @returns {string} Field type
 */
function inferFieldType(fieldName, format, description) {
  if (fieldName.includes('email')) return 'email';
  if (fieldName.includes('phone')) return 'tel';
  if (fieldName.includes('date') || fieldName.includes('Date')) return 'date';
  if (fieldName === 'zip') return 'text';
  if (fieldName === 'state') return 'select';
  
  // Check format
  if (typeof format === 'object') {
    if (format.enum) return 'select';
    if (format.min !== undefined && format.max !== undefined) return 'number';
  }
  
  // Check description
  if (description.toLowerCase().includes('select')) return 'select';
  if (description.includes('YES') && description.includes('NO')) return 'radio';
  
  return 'text';
}

/**
 * Extract validation rules from format
 * @param {Object} format - Format object
 * @param {string} description - Field description
 * @returns {Object} Validation rules
 */
function extractValidation(format, description) {
  const validation = {};
  
  if (typeof format === 'object') {
    if (format.minLength) validation.minLength = format.minLength;
    if (format.maxLength) validation.maxLength = format.maxLength;
    if (format.min) validation.min = format.min;
    if (format.max) validation.max = format.max;
  }
  
  // Add specific patterns
  if (description.includes('email')) {
    validation.pattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  } else if (description.includes('phone')) {
    validation.pattern = '^\\d{3,12}$';
  } else if (description.includes('zip')) {
    validation.pattern = '^\\d{5,8}$';
  } else if (description.includes('state')) {
    validation.pattern = '^[A-Z]{2}$';
  }
  
  return validation;
}

/**
 * Extract options from format
 * @param {Object} format - Format object
 * @returns {Array} Options array
 */
function extractOptions(format) {
  if (typeof format === 'object' && format.enum) {
    return format.enum.map(value => ({
      value: value,
      label: formatLabel(value)
    }));
  }
  return null;
}

/**
 * Format value as label
 * @param {string} value - Option value
 * @returns {string} Formatted label
 */
function formatLabel(value) {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Extract conditional logic from required field
 * @param {string|Object} required - Required field value
 * @returns {string|null} Condition string
 */
function extractCondition(required) {
  if (typeof required === 'object' && required.condition) {
    // Parse condition like "NO Unless (@jobType = 'additions')"
    const match = required.condition.match(/@(\w+)\s*=\s*"([^"]+)"/);
    if (match) {
      return `${match[1]} === "${match[2]}"`;
    }
  }
  return null;
}

/**
 * Extract fields with conditional logic
 * @param {Object} fields - All field definitions
 * @returns {Object} Conditional fields
 */
function extractConditionalLogic(fields) {
  const conditionalFields = {};
  
  Object.entries(fields).forEach(([name, field]) => {
    if (field.condition) {
      conditionalFields[name] = {
        ...field,
        dependsOn: extractDependency(field.condition)
      };
    }
  });
  
  return conditionalFields;
}

/**
 * Extract dependency from condition
 * @param {string} condition - Condition string
 * @returns {string} Dependency field name
 */
function extractDependency(condition) {
  const match = condition.match(/(\w+)\s*===/);
  return match ? match[1] : null;
}

/**
 * Generate form steps based on fields
 * @param {Object} fields - Field definitions
 * @returns {Array} Form steps
 */
function generateFormSteps(fields) {
  const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      fields: ['firstName', 'lastName', 'email', 'phoneNumber']
    },
    {
      id: 'location',
      title: 'Location',
      fields: ['address', 'city', 'state', 'zip']
    },
    {
      id: 'preferences',
      title: 'Preferences',
      fields: ['bestCallTime', 'purchaseTimeFrame', 'ownHome', 'creditRating']
    },
    {
      id: 'jobDetails',
      title: 'Job Details',
      fields: ['jobType']
    },
    {
      id: 'jobSpecifics',
      title: 'Job Specific Details',
      fields: [] // Will be populated dynamically based on jobType
    },
    {
      id: 'compliance',
      title: 'Terms & Compliance',
      fields: ['tcpa', 'tcpaLanguage']
    }
  ];
  
  // Add conditional fields to jobSpecifics step
  Object.entries(fields).forEach(([name, field]) => {
    if (field.condition && name !== 'jobType') {
      steps[4].fields.push(name);
    }
  });
  
  return steps;
}

module.exports = {
  parseApiSpecs,
  parseFieldDefinitions,
  generateFormSteps
};