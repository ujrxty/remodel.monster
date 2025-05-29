/**
 * Conditional Logic Handler
 * Manages conditional field visibility and requirements
 */

/**
 * Map of dependencies between fields and jobType values
 * This defines which job-specific fields are shown based on the jobType selection
 */
const jobTypeFieldMap = {
  // Fields shown when jobType is "additions"
  additions: ['addition_type'],
  
  // Fields shown when jobType is "bathroom"
  bathroom: ['bathroomProjectType'],
  
  // Fields shown when jobType is "cabinets"
  cabinets: ['cabinetsProjectType'],
  
  // Fields shown when jobType is "deck"
  deck: ['deckMaterial'],
  
  // Fields shown when jobType is "doors"
  doors: ['doorProjectType', 'doorsMaterial', 'preHung'],
  
  // Fields shown when jobType is "electrical"
  electrical: ['electricalProjectType', 'electricalServiceType'],
  
  // Fields shown when jobType is "fencing"
  fencing: ['fenceType'],
  
  // Fields shown when jobType is "flooring"
  flooring: ['flooringInquiyType', 'flooringType'],
  
  // Fields shown when jobType is "garage_doors"
  garage_doors: ['garageDoorsProjectType', 'numberOfDoors', 'openers'],
  
  // Fields shown when jobType is "gutters"
  gutters: ['protection'],
  
  // Fields shown when jobType is "home_security"
  home_security: ['homeSecurityBuildingType'],
  
  // Fields shown when jobType is "hvac"
  hvac: ['hvacAirType', 'hvacProjectType', 'hvacSystemType'],
  
  // Fields shown when jobType is "insulation"
  insulation: ['insulationServiceType'],
  
  // Fields shown when jobType is "kitchen"
  kitchen: ['kitchenProjectType'],
  
  // Fields shown when jobType is "landscaping"
  landscaping: ['landscapingProjectType', 'landscapingServiceType'],
  
  // Fields shown when jobType is "painting"
  painting: ['paintingProjectType'],
  
  // Fields shown when jobType is "pest_control"
  pest_control: ['pestControlProjectType'],
  
  // Fields shown when jobType is "plumbing"
  plumbing: ['plumbingProjectType', 'plumbingServiceType'],
  
  // Fields shown when jobType is "remodeling"
  remodeling: ['remodelingLocationInHome', 'remodelingProjectType'],
  
  // Fields shown when jobType is "roof"
  roof: ['roofProjectType', 'roofingType'],
  
  // Fields shown when jobType is "siding"
  siding: ['sidingProjectType', 'sidingType'],
  
  // Fields shown when jobType is "stair_lift"
  stair_lift: ['stairLiftProjectType', 'stairLiftStairType', 'numStairs', 'carryWeight'],
  
  // Fields shown when jobType is "sunrooms"
  sunrooms: ['sunroomNumRooms', 'sunroomLength', 'sunroomWidth'],
  
  // Fields shown when jobType is "swimming_pool"
  swimming_pool: ['swimmingPoolProjectType', 'swimmingPoolServiceType', 'poolType'],
  
  // Fields shown when jobType is "trees"
  trees: ['treesProjectType'],
  
  // Fields shown when jobType is "windows"
  windows: ['windowsProjectType', 'numberOfWindows']
};

/**
 * Get all job-specific fields that could potentially be required based on jobType
 * @returns {Array} List of all job-specific field names
 */
function getAllJobTypeFields() {
  const allFields = new Set();
  
  Object.values(jobTypeFieldMap).forEach(fields => {
    fields.forEach(field => allFields.add(field));
  });
  
  return Array.from(allFields);
}

/**
 * Get required fields based on form data state
 * @param {Object} formData - Current form data
 * @returns {Array} List of required field names
 */
function getRequiredFields(formData) {
  const requiredFields = [
    // Always required fields
    'firstName', 'lastName', 'email', 'phoneNumber',
    'address', 'zip', 'userIp', 'webSiteUrl', 'bestCallTime',
    'purchaseTimeFrame', 'ownHome', 'jobType', 'tcpa', 'tcpaLanguage'
  ];
  
  // Add job-specific required fields
  if (formData.jobType && jobTypeFieldMap[formData.jobType]) {
    requiredFields.push(...jobTypeFieldMap[formData.jobType]);
  }
  
  return requiredFields;
}

/**
 * Get visible fields based on form data state
 * @param {Object} formData - Current form data
 * @returns {Object} Map of field names to visibility
 */
function getVisibleFields(formData) {
  const allFields = getAllJobTypeFields();
  const visibleFields = {};
  
  // Initially hide all job-specific fields
  allFields.forEach(field => {
    visibleFields[field] = false;
  });
  
  // Show fields based on selected jobType
  if (formData.jobType && jobTypeFieldMap[formData.jobType]) {
    jobTypeFieldMap[formData.jobType].forEach(field => {
      visibleFields[field] = true;
    });
  }
  
  return visibleFields;
}

/**
 * Check if all required fields are filled
 * @param {Object} formData - Current form data
 * @returns {boolean} Whether all required fields are filled
 */
function areRequiredFieldsFilled(formData) {
  const requiredFields = getRequiredFields(formData);
  
  return requiredFields.every(field => {
    return formData[field] !== undefined && formData[field] !== '';
  });
}

/**
 * Get validation errors for current form state
 * @param {Object} formData - Current form data
 * @param {Object} validators - Field validation functions
 * @returns {Object} Field validation errors
 */
function getValidationErrors(formData, validators) {
  const errors = {};
  const requiredFields = getRequiredFields(formData);
  
  // Check required fields
  requiredFields.forEach(field => {
    if (!formData[field]) {
      errors[field] = 'This field is required';
    }
  });
  
  // Apply field-specific validation
  Object.entries(formData).forEach(([field, value]) => {
    if (validators[field] && value !== undefined && value !== '') {
      const error = validators[field](value);
      if (error) {
        errors[field] = error;
      }
    }
  });
  
  return errors;
}

/**
 * Validates conditional fields for a specific job type
 * @param {string} jobType - The selected job type
 * @param {object} formData - The current form data
 * @returns {Array} Array of validation error messages
 */
function validateConditionalFieldsForJobType(jobType, formData) {
  const errors = [];
  const requiredFields = jobTypeFieldMap[jobType] || [];
  
  requiredFields.forEach(fieldName => {
    const value = formData[fieldName];
    if (!value || value === '') {
      // Get human-readable field name for error message
      const fieldLabel = getFieldLabel(fieldName);
      errors.push(`${fieldLabel} is required for ${getJobTypeLabel(jobType)} projects`);
    }
  });
  
  return errors;
}

/**
 * Get human-readable field labels for error messages
 */
function getFieldLabel(fieldName) {
  const labelMap = {
    numberOfWindows: 'Number of Windows',
    windowsProjectType: 'Window Project Type',
    doorProjectType: 'Door Project Type', 
    doorsMaterial: 'Door Material',
    preHung: 'Pre-Hung Door',
    hvacAirType: 'HVAC Air Type',
    hvacProjectType: 'HVAC Project Type',
    hvacSystemType: 'HVAC System Type',
    kitchenProjectType: 'Kitchen Project Type',
    bathroomProjectType: 'Bathroom Project Type',
    addition_type: 'Addition Type',
    cabinetsProjectType: 'Cabinets Project Type',
    deckMaterial: 'Deck Material',
    electricalProjectType: 'Electrical Project Type',
    electricalServiceType: 'Electrical Service Type',
    fenceType: 'Fence Type',
    flooringInquiyType: 'Flooring Inquiry Type',
    flooringType: 'Flooring Type',
    garageDoorsProjectType: 'Garage Door Project Type',
    numberOfDoors: 'Number of Doors',
    openers: 'Door Openers',
    protection: 'Gutter Protection',
    homeSecurityBuildingType: 'Building Type',
    insulationServiceType: 'Insulation Service Type',
    landscapingProjectType: 'Landscaping Project Type',
    landscapingServiceType: 'Landscaping Service Type',
    paintingProjectType: 'Painting Project Type',
    pestControlProjectType: 'Pest Control Project Type',
    plumbingProjectType: 'Plumbing Project Type',
    plumbingServiceType: 'Plumbing Service Type',
    remodelingLocationInHome: 'Remodeling Location',
    remodelingProjectType: 'Remodeling Project Type',
    roofProjectType: 'Roof Project Type',
    roofingType: 'Roofing Type',
    sidingProjectType: 'Siding Project Type',
    sidingType: 'Siding Type',
    carryWeight: 'Weight Capacity',
    numStairs: 'Number of Stairs',
    stairLiftProjectType: 'Stair Lift Project Type',
    stairLiftStairType: 'Stair Type',
    sunroomNumRooms: 'Number of Rooms',
    sunroomLength: 'Sunroom Length',
    sunroomWidth: 'Sunroom Width',
    poolType: 'Pool Type',
    swimmingPoolProjectType: 'Swimming Pool Project Type',
    swimmingPoolServiceType: 'Swimming Pool Service Type',
    treesProjectType: 'Trees Project Type'
  };
  
  return labelMap[fieldName] || fieldName;
}

/**
 * Get human-readable job type labels
 */
function getJobTypeLabel(jobType) {
  const jobTypeMap = {
    windows: 'Window',
    doors: 'Door', 
    hvac: 'HVAC',
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    additions: 'Addition',
    cabinets: 'Cabinet',
    deck: 'Deck',
    electrical: 'Electrical',
    fencing: 'Fencing',
    flooring: 'Flooring',
    garage_doors: 'Garage Door',
    gutters: 'Gutter',
    handy_man: 'Handyman',
    home_security: 'Home Security',
    insulation: 'Insulation',
    landscaping: 'Landscaping',
    painting: 'Painting',
    pest_control: 'Pest Control',
    plumbing: 'Plumbing',
    remodeling: 'Remodeling',
    roof: 'Roofing',
    siding: 'Siding',
    stair_lift: 'Stair Lift',
    sunrooms: 'Sunroom',
    swimming_pool: 'Swimming Pool',
    trees: 'Tree Service'
  };
  
  return jobTypeMap[jobType] || jobType;
}

module.exports = {
  jobTypeFieldMap,
  getAllJobTypeFields,
  getRequiredFields,
  getVisibleFields,
  areRequiredFieldsFilled,
  getValidationErrors,
  validateConditionalFieldsForJobType,
  getFieldLabel,
  getJobTypeLabel
};