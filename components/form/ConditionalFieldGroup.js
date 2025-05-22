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
    
    // Process windows field
    if (jobType === 'windows' && !fieldDefinitions.numberOfWindows) {
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
    
    // Process door fields
    if (jobType === 'doors') {
      if (!fieldDefinitions.doorProjectType) {
        tempFields.doorProjectType = {
          type: 'select',
          label: 'Door Project Type',
          required: true,
          options: [
            { value: 'New_installation', label: 'New Installation' },
            { value: 'Repair', label: 'Repair' },
            { value: 'Replacement', label: 'Replacement' }
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
            { value: 'Fiberglass', label: 'Fiberglass' },
            { value: 'Composite', label: 'Composite' },
            { value: 'Other', label: 'Other' }
          ],
          variant: 'card',
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