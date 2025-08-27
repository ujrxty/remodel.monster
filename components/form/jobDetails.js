"use client";

/**
 * Enhanced Form Step Template - Generated from offer configuration
 * with improved validation and input formatting
 */
import React, { useState } from 'react';
import TextInput from './TextInput';
import SelectField from './SelectField';
import RadioGroup from './RadioGroup';
import DateField from './DateField';
import ConditionalFieldGroup from './ConditionalFieldGroup';
import { validateField } from '@/utils/input/inputValidation';
import { getEnabledJobTypes } from '@/config/jobTypes';

export default function JobDetails(props) {
  // Destructure props to get necessary values
  const { formData = {}, onChange, errors = {}, setErrors = () => {} } = props;
  
  // Local state for field-level validation
  const [localErrors, setLocalErrors] = useState({});
  
  // Handle field validation
  const handleValidate = (fieldName, value, error) => {
    // Get field definition from our config
    const fieldDef = fieldDefinitions[fieldName];
    
    // Use provided error or validate against field definition
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
  
  // Define field definitions
  const fieldDefinitions = {
    
    firstName: {"type":"text","label":"First Name","required":true,"validation":{"minLength":1,"maxLength":254}},
      
    lastName: {"type":"text","label":"Last Name","required":true,"validation":{"minLength":1,"maxLength":254}},
      
    email: {"type":"email","label":"Email Address","required":true,"validation":{"pattern":"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$","patternMessage":"Please enter a valid email address","minLength":5,"maxLength":128}},
      
    phoneNumber: {"type":"tel","label":"Phone Number","required":true,"validation":{"pattern":"^\\d{10}$","patternMessage":"Please enter a valid 10-digit phone number"},"placeholder":"(555) 123-4567","helpText":"Please enter your 10-digit phone number"},
      
    address: {"type":"text","label":"Address","required":true,"validation":{"minLength":1,"maxLength":254}},
      
    city: {"type":"text","label":"City","required":false,"validation":{"minLength":1,"maxLength":254}},
      
    state: {"type":"select","label":"State","required":false,"options":[{"value":"AL","label":"Alabama"},{"value":"AK","label":"Alaska"},{"value":"AZ","label":"Arizona"},{"value":"AR","label":"Arkansas"},{"value":"CA","label":"California"},{"value":"CO","label":"Colorado"},{"value":"CT","label":"Connecticut"},{"value":"DE","label":"Delaware"},{"value":"FL","label":"Florida"},{"value":"GA","label":"Georgia"},{"value":"HI","label":"Hawaii"},{"value":"ID","label":"Idaho"},{"value":"IL","label":"Illinois"},{"value":"IN","label":"Indiana"},{"value":"IA","label":"Iowa"},{"value":"KS","label":"Kansas"},{"value":"KY","label":"Kentucky"},{"value":"LA","label":"Louisiana"},{"value":"ME","label":"Maine"},{"value":"MD","label":"Maryland"},{"value":"MA","label":"Massachusetts"},{"value":"MI","label":"Michigan"},{"value":"MN","label":"Minnesota"},{"value":"MS","label":"Mississippi"},{"value":"MO","label":"Missouri"},{"value":"MT","label":"Montana"},{"value":"NE","label":"Nebraska"},{"value":"NV","label":"Nevada"},{"value":"NH","label":"New Hampshire"},{"value":"NJ","label":"New Jersey"},{"value":"NM","label":"New Mexico"},{"value":"NY","label":"New York"},{"value":"NC","label":"North Carolina"},{"value":"ND","label":"North Dakota"},{"value":"OH","label":"Ohio"},{"value":"OK","label":"Oklahoma"},{"value":"OR","label":"Oregon"},{"value":"PA","label":"Pennsylvania"},{"value":"RI","label":"Rhode Island"},{"value":"SC","label":"South Carolina"},{"value":"SD","label":"South Dakota"},{"value":"TN","label":"Tennessee"},{"value":"TX","label":"Texas"},{"value":"UT","label":"Utah"},{"value":"VT","label":"Vermont"},{"value":"VA","label":"Virginia"},{"value":"WA","label":"Washington"},{"value":"WV","label":"West Virginia"},{"value":"WI","label":"Wisconsin"},{"value":"WY","label":"Wyoming"},{"value":"DC","label":"District of Columbia"}],"validation":{"pattern":"^[A-Z]{2}$"}},
      
    zip: {"type":"zip","label":"Zip Code","required":true,"validation":{"pattern":"^\\d{5,8}$","patternMessage":"Please enter a valid zip code (5-8 digits)","minLength":5,"maxLength":8},"placeholder":"12345","helpText":"Enter your zip code (5-8 digits)"},
      
    jobType: {"type":"select","label":"What service do you need?","required":true,"options":[{"value":"additions","label":"Additions"},{"value":"bathroom","label":"Bathroom"},{"value":"cabinets","label":"Cabinets"},{"value":"deck","label":"Deck"},{"value":"doors","label":"Doors"},{"value":"electrical","label":"Electrical"},{"value":"fencing","label":"Fencing"},{"value":"flooring","label":"Flooring"},{"value":"garage_doors","label":"Garage Doors"},{"value":"gutters","label":"Gutters"},{"value":"handy_man","label":"Handyman"},{"value":"home_security","label":"Home Security"},{"value":"hvac","label":"HVAC"},{"value":"insulation","label":"Insulation"},{"value":"kitchen","label":"Kitchen"},{"value":"landscaping","label":"Landscaping"},{"value":"painting","label":"Painting"},{"value":"pest_control","label":"Pest Control"},{"value":"plumbing","label":"Plumbing"},{"value":"remodeling","label":"Remodeling"},{"value":"roof","label":"Roof"},{"value":"siding","label":"Siding"},{"value":"stair_lift","label":"Stair Lift"},{"value":"sunrooms","label":"Sunrooms"},{"value":"swimming_pool","label":"Swimming Pool"},{"value":"trees","label":"Trees"},{"value":"windows","label":"Windows"}]},
      
    purchaseTimeFrame: {"type":"select","label":"When do you need service?","required":true,"options":[{"value":"Immediately","label":"Immediately"},{"value":"Within_1_month","label":"Within 1 month"},{"value":"1-3_months","label":"1-3 months"},{"value":"more_than_3_months","label":"More than 3 months"}]},
      
    ownHome: {"type":"radio","label":"Do you own your home?","required":true,"options":[{"value":"YES","label":"Yes"},{"value":"NO","label":"No"}],"inline":true},
      
    creditRating: {"type":"select","label":"What is your credit rating?","required":false,"options":[{"value":"excellent","label":"Excellent"},{"value":"good","label":"Good"},{"value":"fair","label":"Fair"},{"value":"poor","label":"Poor"}]},
      
    tcpa: {"type":"checkbox","label":"I agree to be contacted","required":true,"validation":{"value":true}},
      
    tcpaLanguage: {"type":"hidden","value":"By submitting this form, I agree to receive phone calls and text messages from this company and its partners. I understand these calls may be generated using an automated technology."},
      
    conditionalFields: {"type":"dynamic","dependsOn":"jobType"},
      
    numberOfWindows: {"type":"number","label":"Number of Windows","required":true,"validation":{"min":1,"max":100,"pattern":"^[0-9]+$","patternMessage":"Please enter a valid number"},"helpText":"How many windows need to be replaced or repaired?"},
      
    windowsProjectType: {"type":"select","label":"Window Project Type","required":true,"options":[{"value":"Interested_in_replacement_windows","label":"Replacement Windows"},{"value":"Need_repair_services_at_this_time","label":"Repair Services"},{"value":"Need_repair_but_interested_in_new_windows","label":"Repair + Future Replacement"}],"helpText":"What type of window project are you planning?"},
      
    doorProjectType: {"type":"select","label":"Door Project Type","required":true,"options":[{"value":"New_installation","label":"New Installation"},{"value":"Repair","label":"Repair"}],"helpText":"What type of door project are you planning?"},
      
    doorsMaterial: {"type":"radio","label":"Door Material","required":true,"options":[{"value":"Wood","label":"Wood"},{"value":"Metal","label":"Metal"},{"value":"Composite","label":"Composite"},{"value":"Other","label":"Other"}],"variant":"card","inline":true},
      
    preHung: {"type":"radio","label":"Pre-Hung Door?","required":true,"options":[{"value":"YES","label":"Yes"},{"value":"NO","label":"No"}],"inline":true},
      
    hvacSystemType: {"type":"select","label":"HVAC System Type","required":true,"options":[{"value":"Central_AC","label":"Central AC"},{"value":"Heat_pump","label":"Heat Pump"},{"value":"Gas_furnace","label":"Gas Furnace"},{"value":"Electric_furnace","label":"Electric Furnace"},{"value":"Gas_boiler","label":"Gas Boiler"},{"value":"Electric_boiler","label":"Electric Boiler"},{"value":"Ductless","label":"Ductless Mini-Split"},{"value":"Water_heater","label":"Water Heater"}],"searchable":true,"helpText":"What type of HVAC system do you need service for?"},
      
    hvacProjectType: {"type":"radio","label":"Project Type","required":true,"options":[{"value":"New_unit_installed","label":"New Installation"},{"value":"Repair","label":"Repair"}],"variant":"card","inline":true},
      
    kitchenProjectType: {"type":"select","label":"Kitchen Project Focus","required":true,"options":[{"value":"Floor_plan","label":"Floor Plan Changes"},{"value":"Cabinets","label":"Cabinets"},{"value":"Appliances","label":"Appliances"},{"value":"Counter_tops_or_sinks","label":"Countertops/Sinks"},{"value":"Flooring","label":"Flooring"}]},
      
    bathroomProjectType: {"type":"select","label":"Bathroom Project Focus","required":true,"options":[{"value":"Bath_sinks","label":"Sink/Vanity"},{"value":"Full_bathroom","label":"Complete Remodel"},{"value":"Tile","label":"Tile Work"}]}
      
  };
  
  // Render the form fields dynamically
  return (
    <div className="w-full space-y-2">
      <h2 className="text-xl font-semibold mb-4 text-card-foreground">
        Job Details
      </h2>
      
      {/* Render all configured fields for this step */}
      
      <SelectField
        name="jobType"
        label="What service do you need?"
        value={formData.jobType}
        onChange={onChange}
        onValidate={handleValidate}
        options={getEnabledJobTypes()}
        required={true}
        error={errors.jobType || localErrors.jobType}
        helpText=""
        placeholder="Select an option..."
        searchable={false}
        grouped={false}
        size="default"
      />
          
      <SelectField
        name="purchaseTimeFrame"
        label="When do you need service?"
        value={formData.purchaseTimeFrame}
        onChange={onChange}
        onValidate={handleValidate}
        options={[{"value":"Immediately","label":"Immediately"},{"value":"Within_1_month","label":"Within 1 month"},{"value":"1-3_months","label":"1-3 months"},{"value":"more_than_3_months","label":"More than 3 months"}]}
        required={true}
        error={errors.purchaseTimeFrame || localErrors.purchaseTimeFrame}
        helpText=""
        placeholder="Select an option..."
        searchable={false}
        grouped={false}
        size="default"
      />
          
      <RadioGroup
        name="ownHome"
        label="Do you own your home?"
        value={formData.ownHome}
        onChange={onChange}
        onValidate={handleValidate}
        options={[{"value":"YES","label":"Yes"},{"value":"NO","label":"No"}]}
        required={true}
        error={errors.ownHome || localErrors.ownHome}
        helpText=""
        inline={true}
        variant="default"
        size="default"
      />
          
          
    </div>
  );
}