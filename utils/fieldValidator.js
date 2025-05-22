/**
 * Field Validator
 * Provides validation rules and patterns for form fields
 */

/**
 * Common validation patterns
 */
const validationPatterns = {
  // Contact information
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phoneNumber: /^\d{3,12}$/,
  
  // Location 
  zip: /^\d{5,8}$/,
  state: /^[A-Z]{2}$/,
  
  // Network
  userIp: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
  userAgent: /.{1,254}/,
  
  // Identifiers
  jornayaLeadId: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  trustedFormURL: /^https:\/\/cert\.trustedform\.com\/[0-9a-f]{40,}\/?$/i,
  
  // URLs
  webSiteUrl: /^https?:\/\/.{1,253}/i,
  
  // Names
  firstName: /^.{1,254}$/,
  lastName: /^.{1,254}$/,
  
  // Address
  address: /^.{1,254}$/,
  city: /^.{1,254}$/,
  
  // Numeric ranges
  numStairs: /^(?:[0-9]|[1-9][0-9]|[1-2][0-9]{2}|300)$/,
  carryWeight: /^(?:[0-9]|[1-9][0-9]|[1-2][0-9]{2}|300)$/,
  numberOfDoors: /^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/,
  numberOfWindows: /^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/,
  sunroomLength: /^(?:[0-9]|[1-9][0-9]|[1-2][0-9]{2}|300)$/,
  sunroomWidth: /^(?:[0-9]|[1-9][0-9]|[1-2][0-9]{2}|300)$/,
  sunroomNumRooms: /^(?:[0-9]|[1-9][0-9]|[1-2][0-9]{2}|300)$/
};

/**
 * Enum values for fields with specific options
 */
const enumValues = {
  purchaseTimeFrame: ['Immediately', 'Within_1_month', '1-3_months', 'more_than_3_months'],
  ownHome: ['YES', 'NO', 'NA'],
  tcpa: ['YES', 'NO', 'NA'],
  jobType: [
    'additions', 'bathroom', 'cabinets', 'deck', 'doors', 'electrical', 
    'fencing', 'flooring', 'garage_doors', 'gutters', 'handy_man', 
    'home_security', 'hvac', 'insulation', 'kitchen', 'landscaping', 
    'painting', 'pest_control', 'plumbing', 'remodeling', 'roof', 
    'siding', 'stair_lift', 'sunrooms', 'swimming_pool', 'trees', 'windows'
  ],
  
  // Job-specific enums
  addition_type: ['Ground_floor', 'Second_floor', 'Other'],
  bathroomProjectType: ['Bath_sinks', 'Full_bathroom', 'Tile'],
  cabinetsProjectType: ['Install_new_custom_cabinets', 'Install_new_pre-made_cabinets', 'Repair_existing_cabinets', 'Reface_existing_cabinets'],
  deckMaterial: ['Composite', 'Wood', 'Other'],
  doorProjectType: ['New_installation', 'Repair'],
  doorsMaterial: ['Wood', 'Metal', 'Composite', 'Other'],
  preHung: ['YES', 'NO'],
  electricalProjectType: ['Install', 'Repair'],
  electricalServiceType: ['Electric_for_home_addition_or_remodel', 'Electrical_wiring_or_panel_upgrade', 'Generator', 'Home_energy_audit', 'Low_voltage_wiring', 'Outdoor_lighting'],
  fenceType: ['Wood', 'Metal', 'Composite', 'Electric', 'Other'],
  flooringInquiyType: ['Installation', 'Repair'],
  flooringType: ['Hardwood', 'Vinyl', 'Carpet', 'Tile', 'Composite'],
  garageDoorsProjectType: ['New_Construction', 'Replacement'],
  homeSecurityBuildingType: ['House', 'Condo_unit_or_apartment', 'Office', 'Large_building', 'Other'],
  hvacAirType: ['Cooling', 'Heating', 'Heating_and_cooling'],
  hvacProjectType: ['New_unit_installed', 'Repair'],
  hvacSystemType: ['Central_AC', 'Gas_boiler', 'Propane_boiler', 'Oil_boiler', 'Electric_boiler', 'Heat_pump', 'Water_heater', 'Gas_furnace', 'Propane_furnace', 'Oil_furnace', 'Electric_furnace'],
  insulationServiceType: ['Blown_in', 'Spray_foam', 'Batten'],
  kitchenProjectType: ['Floor_plan', 'Cabinets', 'Appliances', 'Counter_tops_or_sinks', 'Flooring'],
  landscapingProjectType: ['Landscaping', 'Lawn_Care', 'Sprinklers'],
  landscapingServiceType: ['Front_Yard', 'Back_Yard'],
  openers: ['YES', 'NO'],
  paintingProjectType: ['Exterior_Painting', 'Interior_Painting', 'Specialty_Painting_Faux_Finishes', 'Specialty_Painting_Textures', 'Other'],
  pestControlProjectType: ['Ant_Control', 'Bee_Removal', 'Small_animals', 'Termites'],
  plumbingProjectType: ['Install', 'Repair'],
  plumbingServiceType: ['Drain_cleaning', 'Install_or_repair_water_heater', 'Plumbing_work', 'Septic_install_or_replace', 'Septic_repair', 'Septic_clean_or_pump_out', 'Sewer_main', 'Well_pumps', 'Water_main'],
  poolType: ['Swimming_Pool', 'Sauna', 'Hot_Tub'],
  protection: ['YES', 'NO'],
  remodelingLocationInHome: ['Bathroom', 'Basement', 'Kitchen'],
  remodelingProjectType: ['Multiple_Rooms', 'Single_Room'],
  roofProjectType: ['New_roof_for_new_home', 'New_roof_for_an_existing_home', 'Repair', 'Shingle_over_existing_roof'],
  roofingType: ['Asphalt_shingle', 'Cedar_shake', 'Metal', 'Tar', 'Tile', 'Natural_state'],
  sidingProjectType: ['Replace_siding', 'Siding_repair'],
  sidingType: ['Vinyl', 'Wood', 'Metal', 'Stucco', 'Brick_or_stone', 'Other'],
  stairLiftProjectType: ['Private', 'Public'],
  stairLiftStairType: ['Straight_staircase', 'Curved_staircase'],
  swimmingPoolProjectType: ['Indoor', 'Outdoor'],
  swimmingPoolServiceType: ['Repair', 'Install'],
  treesProjectType: ['Trees', 'Shrubs', 'Stump_removal'],
  windowsProjectType: ['Interested_in_replacement_windows', 'Need_repair_services_at_this_time', 'Need_repair_but_interested_in_new_windows']
};

/**
 * Error messages for different validation failures
 */
const errorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phoneNumber: 'Please enter a valid phone number (3-12 digits)',
  zip: 'Please enter a valid zip code (5-8 digits)',
  state: 'Please enter a valid 2-letter state code',
  minLength: value => `Must be at least ${value} characters`,
  maxLength: value => `Must be no more than ${value} characters`,
  pattern: 'Please enter a valid value',
  enum: 'Please select a valid option'
};

/**
 * Validate a field value against defined rules
 * @param {string} fieldName - Name of the field to validate
 * @param {*} value - Field value
 * @param {Object} rules - Validation rules
 * @returns {string|null} Error message or null if valid
 */
function validateField(fieldName, value, rules = {}) {
  // Required check
  if (rules.required && !value) {
    return errorMessages.required;
  }
  
  // Skip further validation if empty and not required
  if (!value) return null;
  
  // Pattern validation
  if (rules.pattern) {
    const pattern = rules.pattern instanceof RegExp 
      ? rules.pattern 
      : new RegExp(rules.pattern);
    
    if (!pattern.test(value)) {
      return rules.errorMessage || errorMessages.pattern;
    }
  }
  
  // Use predefined pattern if available
  if (validationPatterns[fieldName] && !validationPatterns[fieldName].test(value)) {
    return errorMessages[fieldName] || errorMessages.pattern;
  }
  
  // Length validation
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return rules.errorMessage || errorMessages.minLength(rules.minLength);
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.errorMessage || errorMessages.maxLength(rules.maxLength);
    }
  }
  
  // Enum validation
  if (enumValues[fieldName] && !enumValues[fieldName].includes(value)) {
    return errorMessages.enum;
  }
  
  return null;
}

/**
 * Generate validation functions for a form schema
 * @param {Object} formSchema - Schema defining form fields and validation
 * @returns {Object} Validation functions
 */
function createValidators(formSchema) {
  const validators = {};
  
  if (!formSchema || !formSchema.fields) return validators;
  
  Object.entries(formSchema.fields).forEach(([name, field]) => {
    validators[name] = value => validateField(name, value, field.validation);
  });
  
  return validators;
}

module.exports = {
  validationPatterns,
  enumValues,
  errorMessages,
  validateField,
  createValidators
};