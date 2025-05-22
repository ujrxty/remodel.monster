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
    }</thinking>

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "p2-1", "content": "Fix Windows field option values to match API spec", "status": "completed", "priority": "high"}, {"id": "p2-2", "content": "Add complete Electrical conditional fields (2 fields)", "status": "in_progress", "priority": "high"}, {"id": "p2-3", "content": "Add complete Plumbing conditional fields (2 fields)", "status": "pending", "priority": "high"}, {"id": "p2-4", "content": "Complete Kitchen conditional fields implementation", "status": "pending", "priority": "medium"}, {"id": "p2-5", "content": "Complete Bathroom conditional fields implementation", "status": "pending", "priority": "medium"}, {"id": "p2-6", "content": "Complete Doors conditional fields (3 fields)", "status": "pending", "priority": "medium"}, {"id": "p2-7", "content": "Test all 6 major job types for API compliance", "status": "pending", "priority": "high"}]
    
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