/**
 * Job Type Configuration
 * Controls which job types are available in dropdown and provides click-to-call numbers
 */

export const jobTypeConfig = {
  additions: {
    enabled: false,
    DID: null,
    label: "Home Additions"
  },
  bathroom: {
    enabled: true,
    DID: null, 
    label: "Bathroom Remodeling"
  },
  cabinets: {
    enabled: false,
    DID: null,
    label: "Cabinet Installation"
  },
  deck: {
    enabled: false,
    DID: null,
    label: "Deck Construction"
  },
  doors: {
    enabled: false,
    DID: null,
    label: "Door Installation"
  },
  electrical: {
    enabled: true,
    DID: null,
    label: "Electrical Work"
  },
  fencing: {
    enabled: false,
    DID: null,
    label: "Fence Installation"
  },
  flooring: {
    enabled: true,
    DID: null,
    label: "Flooring Installation"
  },
  garage_doors: {
    enabled: false,
    DID: null,
    label: "Garage Door Services"
  },
  gutters: {
    enabled: false,
    DID: null,
    label: "Gutter Installation"
  },
  handy_man: {
    enabled: false,
    DID: null,
    label: "Handyman Services"
  },
  home_security: {
    enabled: false,
    DID: null,
    label: "Home Security Systems"
  },
  hvac: {
    enabled: true,
    DID: null,
    label: "HVAC Services"
  },
  insulation: {
    enabled: false,
    DID: null,
    label: "Insulation Services"
  },
  kitchen: {
    enabled: false,
    DID: null,
    label: "Kitchen Remodeling"
  },
  landscaping: {
    enabled: false,
    DID: null,
    label: "Landscaping Services"
  },
  painting: {
    enabled: false,
    DID: null,
    label: "Painting Services"
  },
  pest_control: {
    enabled: true,
    DID: null,
    label: "Pest Control"
  },
  plumbing: {
    enabled: true,
    DID: null,
    label: "Plumbing Services"
  },
  remodeling: {
    enabled: false,
    DID: null,
    label: "General Remodeling"
  },
  roof: {
    enabled: true,
    DID: null,
    label: "Roofing Services"
  },
  siding: {
    enabled: false,
    DID: null,
    label: "Siding Installation"
  },
  stair_lift: {
    enabled: false,
    DID: null,
    label: "Stair Lift Installation"
  },
  sunrooms: {
    enabled: false,
    DID: null,
    label: "Sunroom Construction"
  },
  swimming_pool: {
    enabled: false,
    DID: null,
    label: "Swimming Pool Installation"
  },
  trees: {
    enabled: false,
    DID: null,
    label: "Tree Services"
  },
  windows: {
    enabled: true,
    DID: "tel:+18662043787",
    label: "Window Installation"
  }
};

/**
 * Get all enabled job types for dropdown
 */
export function getEnabledJobTypes() {
  return Object.entries(jobTypeConfig)
    .filter(([_, config]) => config.enabled)
    .map(([value, config]) => ({
      value,
      label: config.label
    }));
}

/**
 * Get DID (phone number) for specific job type
 */
export function getJobTypeDID(jobType) {
  return jobTypeConfig[jobType]?.DID || null;
}

/**
 * Check if job type is enabled
 */
export function isJobTypeEnabled(jobType) {
  return jobTypeConfig[jobType]?.enabled || false;
}

/**
 * Get job type label
 */
export function getJobTypeLabel(jobType) {
  return jobTypeConfig[jobType]?.label || jobType;
}