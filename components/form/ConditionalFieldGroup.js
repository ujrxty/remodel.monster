"use client";
import React, { useMemo, useState, useEffect } from 'react';
import TextInput from './TextInput';
import SelectField from './SelectField';
import RadioGroup from './RadioGroup';
import DateField from './DateField';
import { validateField } from '@/utils/input/inputValidation';

/**
 * Enhanced conditional field group that shows/hides fields based on jobType
 * with improved validation and user experience
 * 
 * @param {Object} props Component props
 * @returns {JSX.Element} Rendered conditional fields
 */
export default function ConditionalFieldGroup({
  jobType,
  formData,
  onChange,
  errors = {},
  setErrors = () => {},
  fieldDefinitions = {}
}) {
  // Local field errors for real-time validation
  const [localErrors, setLocalErrors] = useState({});
  
  // Auto-generated definitions for job-specific fields 
  const [jobSpecificFields, setJobSpecificFields] = useState({});
  
  // Process job-specific fields on mount
  useEffect(() => {
    // Add all conditional fields if they're not defined in the schema
    const tempFields = {};
    
    // Process windows fields
    if (jobType === 'windows') {
      if (!fieldDefinitions.windowsProjectType) {
        tempFields.windowsProjectType = {
          type: 'select',
          label: 'Window Project Type',
          required: true,
          options: [
            { value: 'Interested_in_replacement_windows', label: 'Replacement Windows' },
            { value: 'Need_repair_services_at_this_time', label: 'Repair Services' },
            { value: 'Need_repair_but_interested_in_new_windows', label: 'Repair + Future Replacement' }
          ],
          helpText: 'What type of window project are you planning?'
        };
      }
      
      if (!fieldDefinitions.numberOfWindows) {
        tempFields.numberOfWindows = {
          type: 'number',
          label: 'Number of Windows',
          required: true,
          validation: {
            min: 1,
            max: 100,
            pattern: '^[0-9]+$',
            patternMessage: 'Please enter a valid number'
          },
          helpText: 'How many windows need to be replaced or repaired?'
        };
      }
    }
    
    // Process door fields
    if (jobType === 'doors') {
      if (!fieldDefinitions.doorProjectType) {
        tempFields.doorProjectType = {
          type: 'select',
          label: 'Door Project Type',
          required: true,
          options: [
            { value: 'New_installation', label: 'New Installation' },
            { value: 'Repair', label: 'Repair' }
          ],
          helpText: 'What type of door project are you planning?'
        };
      }
      
      if (!fieldDefinitions.doorsMaterial) {
        tempFields.doorsMaterial = {
          type: 'radio',
          label: 'Door Material',
          required: true,
          options: [
            { value: 'Wood', label: 'Wood' },
            { value: 'Metal', label: 'Metal' },
            { value: 'Composite', label: 'Composite' },
            { value: 'Other', label: 'Other' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.preHung) {
        tempFields.preHung = {
          type: 'radio',
          label: 'Pre-Hung Door?',
          required: true,
          options: [
            { value: 'YES', label: 'Yes' },
            { value: 'NO', label: 'No' }
          ],
          inline: true
        };
      }
    }
    
    // Add more conditional logic for specific services here
    if (jobType === 'hvac') {
      if (!fieldDefinitions.hvacAirType) {
        tempFields.hvacAirType = {
          type: 'radio',
          label: 'Heating/Cooling Needs',
          required: true,
          options: [
            { value: 'Cooling', label: 'Cooling Only' },
            { value: 'Heating', label: 'Heating Only' },
            { value: 'Heating_and_cooling', label: 'Both Heating & Cooling' }
          ],
          variant: 'card',
          inline: true,
          helpText: 'What type of HVAC service do you need?'
        };
      }
      
      if (!fieldDefinitions.hvacProjectType) {
        tempFields.hvacProjectType = {
          type: 'radio',
          label: 'Project Type',
          required: true,
          options: [
            { value: 'New_unit_installed', label: 'New Installation' },
            { value: 'Repair', label: 'Repair' }
            // Remove 'Maintenance' - not accepted by API
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.hvacSystemType) {
        tempFields.hvacSystemType = {
          type: 'select',
          label: 'HVAC System Type',
          required: true,
          options: [
            { value: 'Central_AC', label: 'Central AC' },
            { value: 'Gas_boiler', label: 'Gas Boiler' },
            { value: 'Propane_boiler', label: 'Propane Boiler' },
            { value: 'Oil_boiler', label: 'Oil Boiler' },
            { value: 'Electric_boiler', label: 'Electric Boiler' },
            { value: 'Heat_pump', label: 'Heat Pump' },
            { value: 'Water_heater', label: 'Water Heater' },
            { value: 'Gas_furnace', label: 'Gas Furnace' },
            { value: 'Propane_furnace', label: 'Propane Furnace' },
            { value: 'Oil_furnace', label: 'Oil Furnace' },
            { value: 'Electric_furnace', label: 'Electric Furnace' }
          ],
          searchable: true,
          helpText: 'What type of HVAC system do you need service for?'
        };
      }
    }
    
    // Add electrical fields
    if (jobType === 'electrical') {
      if (!fieldDefinitions.electricalProjectType) {
        tempFields.electricalProjectType = {
          type: 'radio',
          label: 'Project Type',
          required: true,
          options: [
            { value: 'Install', label: 'New Installation' },
            { value: 'Repair', label: 'Repair Work' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.electricalServiceType) {
        tempFields.electricalServiceType = {
          type: 'select',
          label: 'Service Type',
          required: true,
          options: [
            { value: 'Electric_for_home_addition_or_remodel', label: 'Home Addition/Remodel' },
            { value: 'Electrical_wiring_or_panel_upgrade', label: 'Wiring/Panel Upgrade' },
            { value: 'Generator', label: 'Generator Installation' },
            { value: 'Home_energy_audit', label: 'Energy Audit' },
            { value: 'Low_voltage_wiring', label: 'Low Voltage Wiring' },
            { value: 'Outdoor_lighting', label: 'Outdoor Lighting' }
          ],
          searchable: true,
          helpText: 'What type of electrical service do you need?'
        };
      }
    }
    
    // Add plumbing fields
    if (jobType === 'plumbing') {
      if (!fieldDefinitions.plumbingProjectType) {
        tempFields.plumbingProjectType = {
          type: 'radio',
          label: 'Project Type',
          required: true,
          options: [
            { value: 'Install', label: 'New Installation' },
            { value: 'Repair', label: 'Repair Work' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.plumbingServiceType) {
        tempFields.plumbingServiceType = {
          type: 'select',
          label: 'Service Type',
          required: true,
          options: [
            { value: 'Drain_cleaning', label: 'Drain Cleaning' },
            { value: 'Install_or_repair_water_heater', label: 'Water Heater' },
            { value: 'Plumbing_work', label: 'General Plumbing' },
            { value: 'Septic_install_or_replace', label: 'Septic Install/Replace' },
            { value: 'Septic_repair', label: 'Septic Repair' },
            { value: 'Septic_clean_or_pump_out', label: 'Septic Cleaning' },
            { value: 'Sewer_main', label: 'Sewer Main' },
            { value: 'Well_pumps', label: 'Well Pumps' },
            { value: 'Water_main', label: 'Water Main' }
          ],
          searchable: true,
          helpText: 'What type of plumbing service do you need?'
        };
      }
    }
    
    // Single-field job types (quick implementation)
    
    // Additions
    if (jobType === 'additions') {
      if (!fieldDefinitions.addition_type) {
        tempFields.addition_type = {
          type: 'select',
          label: 'Type of Addition',
          required: true,
          options: [
            { value: 'Ground_floor', label: 'Ground Floor' },
            { value: 'Second_floor', label: 'Second Floor' },
            { value: 'Other', label: 'Other' }
          ]
        };
      }
    }
    
    // Cabinets  
    if (jobType === 'cabinets') {
      if (!fieldDefinitions.cabinetsProjectType) {
        tempFields.cabinetsProjectType = {
          type: 'select',
          label: 'Cabinet Project Type',
          required: true,
          options: [
            { value: 'Install_new_custom_cabinets', label: 'Custom Cabinet Installation' },
            { value: 'Install_new_pre-made_cabinets', label: 'Pre-made Cabinet Installation' },
            { value: 'Repair_existing_cabinets', label: 'Repair Existing Cabinets' },
            { value: 'Reface_existing_cabinets', label: 'Reface Existing Cabinets' }
          ]
        };
      }
    }
    
    // Deck
    if (jobType === 'deck') {
      if (!fieldDefinitions.deckMaterial) {
        tempFields.deckMaterial = {
          type: 'radio',
          label: 'Deck Material',
          required: true,
          options: [
            { value: 'Composite', label: 'Composite' },
            { value: 'Wood', label: 'Wood' },
            { value: 'Other', label: 'Other' }
          ],
          variant: 'card',
          inline: true
        };
      }
    }
    
    // Fencing
    if (jobType === 'fencing') {
      if (!fieldDefinitions.fenceType) {
        tempFields.fenceType = {
          type: 'select',
          label: 'Fence Type',
          required: true,
          options: [
            { value: 'Wood', label: 'Wood' },
            { value: 'Metal', label: 'Metal' },
            { value: 'Composite', label: 'Composite' },
            { value: 'Electric', label: 'Electric' },
            { value: 'Other', label: 'Other' }
          ]
        };
      }
    }
    
    // Gutters
    if (jobType === 'gutters') {
      if (!fieldDefinitions.protection) {
        tempFields.protection = {
          type: 'radio',
          label: 'Gutter Protection Needed?',
          required: true,
          options: [
            { value: 'YES', label: 'Yes' },
            { value: 'NO', label: 'No' }
          ],
          inline: true
        };
      }
    }
    
    // Home Security
    if (jobType === 'home_security') {
      if (!fieldDefinitions.homeSecurityBuildingType) {
        tempFields.homeSecurityBuildingType = {
          type: 'select',
          label: 'Building Type',
          required: true,
          options: [
            { value: 'House', label: 'House' },
            { value: 'Condo_unit_or_apartment', label: 'Condo/Apartment' },
            { value: 'Office', label: 'Office' },
            { value: 'Large_building', label: 'Large Building' },
            { value: 'Other', label: 'Other' }
          ]
        };
      }
    }
    
    // Insulation
    if (jobType === 'insulation') {
      if (!fieldDefinitions.insulationServiceType) {
        tempFields.insulationServiceType = {
          type: 'radio',
          label: 'Insulation Type',
          required: true,
          options: [
            { value: 'Blown_in', label: 'Blown-in' },
            { value: 'Spray_foam', label: 'Spray Foam' },
            { value: 'Batten', label: 'Batten' }
          ],
          variant: 'card',
          inline: true
        };
      }
    }
    
    // Painting
    if (jobType === 'painting') {
      if (!fieldDefinitions.paintingProjectType) {
        tempFields.paintingProjectType = {
          type: 'select',
          label: 'Painting Project Type',
          required: true,
          options: [
            { value: 'Exterior_Painting', label: 'Exterior Painting' },
            { value: 'Interior_Painting', label: 'Interior Painting' },
            { value: 'Specialty_Painting_Faux_Finishes', label: 'Specialty - Faux Finishes' },
            { value: 'Specialty_Painting_Textures', label: 'Specialty - Textures' },
            { value: 'Other', label: 'Other' }
          ]
        };
      }
    }
    
    // Pest Control
    if (jobType === 'pest_control') {
      if (!fieldDefinitions.pestControlProjectType) {
        tempFields.pestControlProjectType = {
          type: 'select',
          label: 'Pest Control Type',
          required: true,
          options: [
            { value: 'Ant_Control', label: 'Ant Control' },
            { value: 'Bee_Removal', label: 'Bee Removal' },
            { value: 'Small_animals', label: 'Small Animals' },
            { value: 'Termites', label: 'Termites' }
          ]
        };
      }
    }
    
    // Trees
    if (jobType === 'trees') {
      if (!fieldDefinitions.treesProjectType) {
        tempFields.treesProjectType = {
          type: 'radio',
          label: 'Tree Service Type',
          required: true,
          options: [
            { value: 'Trees', label: 'Tree Work' },
            { value: 'Shrubs', label: 'Shrub Work' },
            { value: 'Stump_removal', label: 'Stump Removal' }
          ],
          variant: 'card',
          inline: true
        };
      }
    }
    
    // Multi-field job types (medium complexity)
    
    // Flooring (2 fields)
    if (jobType === 'flooring') {
      if (!fieldDefinitions.flooringInquiyType) {
        tempFields.flooringInquiyType = {
          type: 'radio',
          label: 'Project Type',
          required: true,
          options: [
            { value: 'Installation', label: 'New Installation' },
            { value: 'Repair', label: 'Repair Work' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.flooringType) {
        tempFields.flooringType = {
          type: 'select',
          label: 'Flooring Type',
          required: true,
          options: [
            { value: 'Hardwood', label: 'Hardwood' },
            { value: 'Vinyl', label: 'Vinyl' },
            { value: 'Carpet', label: 'Carpet' },
            { value: 'Tile', label: 'Tile' },
            { value: 'Composite', label: 'Composite' }
          ]
        };
      }
    }
    
    // Garage Doors (3 fields)
    if (jobType === 'garage_doors') {
      if (!fieldDefinitions.garageDoorsProjectType) {
        tempFields.garageDoorsProjectType = {
          type: 'radio',
          label: 'Project Type',
          required: true,
          options: [
            { value: 'New_Construction', label: 'New Construction' },
            { value: 'Replacement', label: 'Replacement' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.numberOfDoors) {
        tempFields.numberOfDoors = {
          type: 'number',
          label: 'Number of Doors',
          required: true,
          validation: {
            min: 1,
            max: 10,
            pattern: '^[0-9]+$',
            patternMessage: 'Please enter a valid number'
          },
          helpText: 'How many garage doors?'
        };
      }
      
      if (!fieldDefinitions.openers) {
        tempFields.openers = {
          type: 'radio',
          label: 'Include Openers?',
          required: true,
          options: [
            { value: 'YES', label: 'Yes' },
            { value: 'NO', label: 'No' }
          ],
          inline: true
        };
      }
    }
    
    // Landscaping (2 fields)
    if (jobType === 'landscaping') {
      if (!fieldDefinitions.landscapingProjectType) {
        tempFields.landscapingProjectType = {
          type: 'radio',
          label: 'Service Category',
          required: true,
          options: [
            { value: 'Landscaping', label: 'Landscaping' },
            { value: 'Lawn_Care', label: 'Lawn Care' },
            { value: 'Sprinklers', label: 'Sprinkler Systems' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.landscapingServiceType) {
        tempFields.landscapingServiceType = {
          type: 'radio',
          label: 'Area Focus',
          required: true,
          options: [
            { value: 'Front_Yard', label: 'Front Yard' },
            { value: 'Back_Yard', label: 'Back Yard' }
          ],
          variant: 'card',
          inline: true
        };
      }
    }
    
    // Remodeling (2 fields)
    if (jobType === 'remodeling') {
      if (!fieldDefinitions.remodelingLocationInHome) {
        tempFields.remodelingLocationInHome = {
          type: 'radio',
          label: 'Room Location',
          required: true,
          options: [
            { value: 'Bathroom', label: 'Bathroom' },
            { value: 'Basement', label: 'Basement' },
            { value: 'Kitchen', label: 'Kitchen' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.remodelingProjectType) {
        tempFields.remodelingProjectType = {
          type: 'radio',
          label: 'Project Scope',
          required: true,
          options: [
            { value: 'Multiple_Rooms', label: 'Multiple Rooms' },
            { value: 'Single_Room', label: 'Single Room' }
          ],
          variant: 'card',
          inline: true
        };
      }
    }
    
    // Roof (2 fields)
    if (jobType === 'roof') {
      if (!fieldDefinitions.roofProjectType) {
        tempFields.roofProjectType = {
          type: 'select',
          label: 'Roof Project Type',
          required: true,
          options: [
            { value: 'New_roof_for_new_home', label: 'New Roof - New Home' },
            { value: 'New_roof_for_an_existing_home', label: 'New Roof - Existing Home' },
            { value: 'Repair', label: 'Repair' },
            { value: 'Shingle_over_existing_roof', label: 'Shingle Over Existing' }
          ]
        };
      }
      
      if (!fieldDefinitions.roofingType) {
        tempFields.roofingType = {
          type: 'select',
          label: 'Roofing Material',
          required: true,
          options: [
            { value: 'Asphalt_shingle', label: 'Asphalt Shingle' },
            { value: 'Cedar_shake', label: 'Cedar Shake' },
            { value: 'Metal', label: 'Metal' },
            { value: 'Tar', label: 'Tar' },
            { value: 'Tile', label: 'Tile' },
            { value: 'Natural_state', label: 'Natural Slate' }
          ]
        };
      }
    }
    
    // Siding (2 fields)
    if (jobType === 'siding') {
      if (!fieldDefinitions.sidingProjectType) {
        tempFields.sidingProjectType = {
          type: 'radio',
          label: 'Project Type',
          required: true,
          options: [
            { value: 'Replace_siding', label: 'Replace Siding' },
            { value: 'Siding_repair', label: 'Siding Repair' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.sidingType) {
        tempFields.sidingType = {
          type: 'select',
          label: 'Siding Material',
          required: true,
          options: [
            { value: 'Vinyl', label: 'Vinyl' },
            { value: 'Wood', label: 'Wood' },
            { value: 'Metal', label: 'Metal' },
            { value: 'Stucco', label: 'Stucco' },
            { value: 'Brick_or_stone', label: 'Brick or Stone' },
            { value: 'Other', label: 'Other' }
          ]
        };
      }
    }
    
    // Swimming Pool (3 fields)
    if (jobType === 'swimming_pool') {
      if (!fieldDefinitions.swimmingPoolProjectType) {
        tempFields.swimmingPoolProjectType = {
          type: 'radio',
          label: 'Installation Location',
          required: true,
          options: [
            { value: 'Indoor', label: 'Indoor' },
            { value: 'Outdoor', label: 'Outdoor' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.swimmingPoolServiceType) {
        tempFields.swimmingPoolServiceType = {
          type: 'radio',
          label: 'Service Type',
          required: true,
          options: [
            { value: 'Repair', label: 'Repair' },
            { value: 'Install', label: 'New Installation' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.poolType) {
        tempFields.poolType = {
          type: 'select',
          label: 'Pool Type',
          required: true,
          options: [
            { value: 'Swimming_Pool', label: 'Swimming Pool' },
            { value: 'Sauna', label: 'Sauna' },
            { value: 'Hot_Tub', label: 'Hot Tub' }
          ]
        };
      }
    }
    
    // Specialized job types (complex implementations)
    
    // Stair Lift (4 fields - most complex)
    if (jobType === 'stair_lift') {
      if (!fieldDefinitions.stairLiftProjectType) {
        tempFields.stairLiftProjectType = {
          type: 'radio',
          label: 'Installation Type',
          required: true,
          options: [
            { value: 'Private', label: 'Private Residence' },
            { value: 'Public', label: 'Public Building' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.stairLiftStairType) {
        tempFields.stairLiftStairType = {
          type: 'radio',
          label: 'Stair Configuration',
          required: true,
          options: [
            { value: 'Straight_staircase', label: 'Straight Staircase' },
            { value: 'Curved_staircase', label: 'Curved Staircase' }
          ],
          variant: 'card',
          inline: true
        };
      }
      
      if (!fieldDefinitions.numStairs) {
        tempFields.numStairs = {
          type: 'number',
          label: 'Number of Stairs',
          required: true,
          validation: {
            min: 1,
            max: 300,
            pattern: '^[0-9]+$',
            patternMessage: 'Please enter a valid number'
          },
          helpText: 'How many stairs need the lift?'
        };
      }
      
      if (!fieldDefinitions.carryWeight) {
        tempFields.carryWeight = {
          type: 'number',
          label: 'Weight Capacity (lbs)',
          required: true,
          validation: {
            min: 100,
            max: 300,
            pattern: '^[0-9]+$',
            patternMessage: 'Please enter a valid weight'
          },
          helpText: 'What weight capacity is needed?'
        };
      }
    }
    
    // Sunrooms (3 numeric fields)
    if (jobType === 'sunrooms') {
      if (!fieldDefinitions.sunroomNumRooms) {
        tempFields.sunroomNumRooms = {
          type: 'number',
          label: 'Number of Rooms',
          required: true,
          validation: {
            min: 1,
            max: 10,
            pattern: '^[0-9]+$',
            patternMessage: 'Please enter a valid number'
          },
          helpText: 'How many sunrooms?'
        };
      }
      
      if (!fieldDefinitions.sunroomLength) {
        tempFields.sunroomLength = {
          type: 'number',
          label: 'Length (feet)',
          required: true,
          validation: {
            min: 1,
            max: 300,
            pattern: '^[0-9]+$',
            patternMessage: 'Please enter a valid length'
          },
          helpText: 'Length of the sunroom'
        };
      }
      
      if (!fieldDefinitions.sunroomWidth) {
        tempFields.sunroomWidth = {
          type: 'number',
          label: 'Width (feet)',
          required: true,
          validation: {
            min: 1,
            max: 300,
            pattern: '^[0-9]+$',
            patternMessage: 'Please enter a valid width'
          },
          helpText: 'Width of the sunroom'
        };
      }
    }
    
    setJobSpecificFields(tempFields);
  }, [jobType, fieldDefinitions]);
  
  // Get visible fields based on jobType
  const visibleFields = useMemo(() => {
    if (!jobType) return [];
    
    // This should match the structure in conditionalLogic.js
    const jobTypeFieldMap = {
      additions: ['addition_type'],
      bathroom: ['bathroomProjectType'],
      cabinets: ['cabinetsProjectType'],
      deck: ['deckMaterial'],
      doors: ['doorProjectType', 'doorsMaterial', 'preHung'],
      electrical: ['electricalProjectType', 'electricalServiceType'],
      fencing: ['fenceType'],
      flooring: ['flooringInquiyType', 'flooringType'],
      garage_doors: ['garageDoorsProjectType', 'numberOfDoors', 'openers'],
      gutters: ['protection'],
      home_security: ['homeSecurityBuildingType'],
      hvac: ['hvacAirType', 'hvacProjectType', 'hvacSystemType'],
      insulation: ['insulationServiceType'],
      kitchen: ['kitchenProjectType'],
      landscaping: ['landscapingProjectType', 'landscapingServiceType'],
      painting: ['paintingProjectType'],
      pest_control: ['pestControlProjectType'],
      plumbing: ['plumbingProjectType', 'plumbingServiceType'],
      remodeling: ['remodelingLocationInHome', 'remodelingProjectType'],
      roof: ['roofProjectType', 'roofingType'],
      siding: ['sidingProjectType', 'sidingType'],
      stair_lift: ['stairLiftProjectType', 'stairLiftStairType', 'numStairs', 'carryWeight'],
      sunrooms: ['sunroomNumRooms', 'sunroomLength', 'sunroomWidth'],
      swimming_pool: ['swimmingPoolProjectType', 'swimmingPoolServiceType', 'poolType'],
      trees: ['treesProjectType'],
      windows: ['windowsProjectType', 'numberOfWindows']
    };
    
    return jobTypeFieldMap[jobType] || [];
  }, [jobType]);
  
  // Handle field validation
  const handleValidate = (fieldName, value, error) => {
    // Use provided error or validate against field definition
    const fieldDef = getFieldDefinition(fieldName);
    const validationError = error || (fieldDef?.validation ? 
      validateField(fieldName, value, fieldDef.validation) : null);
    
    // Update local errors
    setLocalErrors(prev => ({
      ...prev,
      [fieldName]: validationError
    }));
    
    // Update parent errors if provided
    if (setErrors) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: validationError
      }));
    }
    
    return validationError === null;
  };
  
  // Get merged field definition (from props or auto-generated)
  const getFieldDefinition = (fieldName) => {
    return fieldDefinitions[fieldName] || jobSpecificFields[fieldName] || {};
  };
  
  // If no jobType selected or no visible fields, don't render anything
  if (!jobType || visibleFields.length === 0) {
    return null;
  }
  
  // Render the appropriate field component based on field type
  const renderField = (fieldName) => {
    const fieldDef = getFieldDefinition(fieldName);
    const fieldType = fieldDef.type || 'text';
    
    // Determine if field should have input masking
    const shouldMask = ['tel', 'zip', 'currency', 'number'].includes(fieldType);
    
    // Base props for all field types
    const fieldProps = {
      name: fieldName,
      label: fieldDef.label || formatLabel(fieldName),
      value: formData[fieldName] || '',
      onChange,
      required: fieldDef.required || false,
      error: errors[fieldName] || localErrors[fieldName],
      onValidate: handleValidate,
      helpText: fieldDef.helpText,
      disabled: fieldDef.disabled,
      placeholder: fieldDef.placeholder
    };
    
    switch (fieldType) {
      case 'select':
        return (
          <SelectField
            {...fieldProps}
            options={fieldDef.options || []}
            searchable={fieldDef.searchable}
            grouped={fieldDef.grouped}
            size={fieldDef.size}
          />
        );
        
      case 'radio':
        return (
          <RadioGroup
            {...fieldProps}
            options={fieldDef.options || []}
            inline={fieldDef.inline || false}
            variant={fieldDef.variant}
            size={fieldDef.size}
          />
        );
        
      case 'date':
        return (
          <DateField
            {...fieldProps}
            min={fieldDef.min}
            max={fieldDef.max}
            useDatePicker={fieldDef.useDatePicker !== false}
          />
        );
        
      case 'number':
        return (
          <TextInput
            {...fieldProps}
            type="number"
            mask={shouldMask}
            min={fieldDef.validation?.min}
            max={fieldDef.validation?.max}
          />
        );
        
      case 'tel':
        return (
          <TextInput
            {...fieldProps}
            type="tel"
            mask={shouldMask}
            autoComplete="tel"
          />
        );
        
      case 'zip':
      case 'zipcode':
        return (
          <TextInput
            {...fieldProps}
            type="zip"
            mask={shouldMask}
            autoComplete="postal-code"
          />
        );
        
      case 'currency':
        return (
          <TextInput
            {...fieldProps}
            type="currency"
            mask={shouldMask}
          />
        );
        
      default:
        return (
          <TextInput
            {...fieldProps}
            type={fieldType}
            mask={shouldMask}
          />
        );
    }
  };
  
  // Helper to format field names as labels
  const formatLabel = (name) => {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^\w/, c => c.toUpperCase())
      .trim();
  };
  
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Group title if needed */}
      {visibleFields.length > 0 && (
        <h3 className="text-lg font-medium text-foreground">
          {jobType.charAt(0).toUpperCase() + jobType.slice(1).replace(/_/g, ' ')} Details
        </h3>
      )}
      
      {/* Render fields */}
      <div className="space-y-4">
        {visibleFields.map(fieldName => (
          <React.Fragment key={fieldName}>
            {renderField(fieldName)}
          </React.Fragment>
        ))}
      </div>
      
      {/* Helper text */}
      <p className="text-sm text-muted-foreground">
        Please provide these additional details to help us better understand your project.
      </p>
    </div>
  );
}