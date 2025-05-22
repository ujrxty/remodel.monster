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

module.exports = {
  jobTypeFieldMap,
  getAllJobTypeFields,
  getRequiredFields,
  getVisibleFields,
  areRequiredFieldsFilled,
  getValidationErrors
};