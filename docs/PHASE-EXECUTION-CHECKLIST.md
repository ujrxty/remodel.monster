# ⚡ Phase Execution Checklist

## 🎯 **CURRENT STATUS**
- **Branch**: `conditional-fields-audit`
- **Target**: Fix 47 missing conditional fields in ~2-3 hours
- **Immediate Issue**: Missing `bestCallTime` and `hvacAirType` fields

---

## 🔥 **PHASE 1: CRITICAL FIXES** *(30 min)*

### **Step 1.1: Add bestCallTime Field (10 min)**
```bash
# File: /components/form/personalInfo.js
# Add after phoneNumber field (around line 168)
```
```javascript
<SelectField
  name="bestCallTime"
  label="Best time to call"
  value={formData.bestCallTime}
  onChange={onChange}
  onValidate={handleValidate}
  options={[
    { value: 'Anytime', label: 'Anytime' },
    { value: 'Morning', label: 'Morning (8AM-12PM)' },
    { value: 'Afternoon', label: 'Afternoon (12PM-5PM)' },
    { value: 'Evening', label: 'Evening (5PM-8PM)' }
  ]}
  required={true}
  error={errors.bestCallTime || localErrors.bestCallTime}
  placeholder="Select best time..."
/>
```

**Also add to fieldDefinitions object (around line 49):**
```javascript
bestCallTime: {
  type: 'select',
  label: 'Best time to call',
  required: true,
  options: [
    { value: 'Anytime', label: 'Anytime' },
    { value: 'Morning', label: 'Morning (8AM-12PM)' },
    { value: 'Afternoon', label: 'Afternoon (12PM-5PM)' },
    { value: 'Evening', label: 'Evening (5PM-8PM)' }
  ]
}
```

### **Step 1.2: Fix HVAC Fields (10 min)**
```bash
# File: /components/form/ConditionalFieldGroup.js
# Update HVAC section (around line 86-104)
```
```javascript
// Replace existing HVAC block with:
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
      inline: true
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
      searchable: true
    };
  }
}
```

### **Step 1.3: Update API Route (10 min)**
```bash
# File: /app/api/process/route.js
# Add after line 38 (webSiteUrl)
```
```javascript
bestCallTime: formData.bestCallTime || 'Anytime',
price: 0.01, // Required for fullpost endpoint
```

**Also update hvacAirType mapping (around line 99):**
```javascript
...(formData.hvacAirType ? { hvacAirType: formData.hvacAirType } : {}),
```

### **✅ Phase 1 Test:**
```bash
npm run dev
# Navigate to form, select HVAC, fill required fields including hvacAirType and bestCallTime
# Submit and verify no "Field is required" errors
```

---

## ⚡ **PHASE 2: MAJOR JOB TYPES** *(45 min)*

### **Step 2.1: Fix Windows Fields (10 min)**
```javascript
// In ConditionalFieldGroup.js, replace windows section:
if (jobType === 'windows') {
  if (!fieldDefinitions.windowsProjectType) {
    tempFields.windowsProjectType = {
      type: 'select',
      label: 'Window Service Type',
      required: true,
      options: [
        { value: 'Interested_in_replacement_windows', label: 'Replacement Windows' },
        { value: 'Need_repair_services_at_this_time', label: 'Repair Services' },
        { value: 'Need_repair_but_interested_in_new_windows', label: 'Repair + Future Replacement' }
      ]
    };
  }
  // numberOfWindows stays the same
}
```

### **Step 2.2: Add Electrical Fields (10 min)**
```javascript
// Add to ConditionalFieldGroup.js after HVAC section:
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
      searchable: true
    };
  }
}
```

### **Step 2.3: Add Plumbing Fields (10 min)**
```javascript
// Add to ConditionalFieldGroup.js:
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
      searchable: true
    };
  }
}
```

### **Step 2.4: Complete Kitchen & Bathroom (15 min)**
```javascript
// Kitchen - update existing implementation
if (jobType === 'kitchen') {
  if (!fieldDefinitions.kitchenProjectType) {
    tempFields.kitchenProjectType = {
      type: 'select',
      label: 'Kitchen Project Focus',
      required: true,
      options: [
        { value: 'Floor_plan', label: 'Floor Plan Changes' },
        { value: 'Cabinets', label: 'Cabinets' },
        { value: 'Appliances', label: 'Appliances' },
        { value: 'Counter_tops_or_sinks', label: 'Countertops/Sinks' },
        { value: 'Flooring', label: 'Flooring' }
      ]
    };
  }
}

// Bathroom - update existing implementation  
if (jobType === 'bathroom') {
  if (!fieldDefinitions.bathroomProjectType) {
    tempFields.bathroomProjectType = {
      type: 'select',
      label: 'Bathroom Project Focus',
      required: true,
      options: [
        { value: 'Bath_sinks', label: 'Sink/Vanity' },
        { value: 'Full_bathroom', label: 'Complete Remodel' },
        { value: 'Tile', label: 'Tile Work' }
      ]
    };
  }
}
```

### **✅ Phase 2 Test:**
Test windows, electrical, plumbing, kitchen, bathroom job types

---

## 🔧 **PHASE 3: REMAINING FIELDS** *(60 min)*

### **Step 3.1: Single-Field Jobs (20 min)**
```javascript
// Add all single-field job types to ConditionalFieldGroup.js:

// Additions
if (jobType === 'additions') {
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

// Cabinets
if (jobType === 'cabinets') {
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

// Continue for: deck, fencing, gutters, home_security, insulation, painting, pest_control, trees
```

### **Step 3.2: Multi-Field Jobs (20 min)**
```javascript
// Garage Doors
if (jobType === 'garage_doors') {
  tempFields.garageDoorsProjectType = {
    type: 'select',
    label: 'Garage Door Project',
    required: true,
    options: [
      { value: 'New_Construction', label: 'New Construction' },
      { value: 'Replacement', label: 'Replacement' }
    ]
  };
  
  tempFields.numberOfDoors = {
    type: 'number',
    label: 'Number of Doors',
    required: true,
    validation: { min: 1, max: 10 }
  };
  
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

// Continue for: flooring, landscaping, remodeling, roof, siding, swimming_pool
```

### **Step 3.3: Specialized Jobs (20 min)**
```javascript
// Stair Lift (4 fields)
if (jobType === 'stair_lift') {
  tempFields.stairLiftProjectType = {
    type: 'radio',
    label: 'Installation Type',
    required: true,
    options: [
      { value: 'Private', label: 'Private Residence' },
      { value: 'Public', label: 'Public Building' }
    ]
  };
  
  tempFields.stairLiftStairType = {
    type: 'radio',
    label: 'Stair Type',
    required: true,
    options: [
      { value: 'Straight_staircase', label: 'Straight Staircase' },
      { value: 'Curved_staircase', label: 'Curved Staircase' }
    ]
  };
  
  tempFields.numStairs = {
    type: 'number',
    label: 'Number of Stairs',
    required: true,
    validation: { min: 1, max: 300 }
  };
  
  tempFields.carryWeight = {
    type: 'number',
    label: 'Weight Capacity (lbs)',
    required: true,
    validation: { min: 100, max: 300 }
  };
}

// Sunrooms (3 numeric fields)
if (jobType === 'sunrooms') {
  tempFields.sunroomNumRooms = {
    type: 'number',
    label: 'Number of Rooms',
    required: true,
    validation: { min: 1, max: 10 }
  };
  
  tempFields.sunroomLength = {
    type: 'number',
    label: 'Length (feet)',
    required: true,
    validation: { min: 1, max: 300 }
  };
  
  tempFields.sunroomWidth = {
    type: 'number',
    label: 'Width (feet)',
    required: true,
    validation: { min: 1, max: 300 }
  };
}
```

### **✅ Phase 3 Test:**
Test remaining job types for complete coverage

---

## 🧪 **PHASE 4: TESTING & VALIDATION** *(30 min)*

### **Step 4.1: Comprehensive Test Script (15 min)**
```bash
# Create test file: test-all-job-types.js
# Test each job type with required conditional fields
npm run dev
# Manual testing of each job type
```

### **Step 4.2: Final Validation (15 min)**
- [ ] All 25 job types submit successfully
- [ ] No "Field is required" API errors
- [ ] Conditional fields show/hide correctly
- [ ] Form performance acceptable
- [ ] Mobile experience maintained

---

## 📋 **COMPLETION CHECKLIST**

### **Phase 1 Complete:**
- [ ] bestCallTime field added to personalInfo
- [ ] hvacAirType field added to HVAC conditional logic
- [ ] API route updated with bestCallTime and price
- [ ] HVAC test case passes

### **Phase 2 Complete:**
- [ ] Windows option values fixed
- [ ] Electrical fields implemented
- [ ] Plumbing fields implemented  
- [ ] Kitchen/Bathroom completed
- [ ] Major job types working

### **Phase 3 Complete:**
- [ ] All 47 conditional fields implemented
- [ ] Single-field jobs completed
- [ ] Multi-field jobs completed
- [ ] Specialized jobs (stair_lift, sunrooms) completed

### **Phase 4 Complete:**
- [ ] All 25 job types tested
- [ ] Zero API field validation errors
- [ ] Performance validated
- [ ] Ready for production

**Total Implementation Time: ~2.5 hours**
**Files Modified: 4 primary files**
**Fields Added: 47 conditional fields**
**API Compliance: 100%**