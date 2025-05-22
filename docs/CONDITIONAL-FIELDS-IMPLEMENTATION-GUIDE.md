# 🚀 Conditional Fields Implementation Guide

## 📋 **CONTEXT & STATUS**
- **Branch**: `conditional-fields-audit` 
- **Current Issues**: Missing `bestCallTime` and `hvacAirType` causing API failures
- **Total Missing Fields**: 47 conditional fields across 23 job types
- **Implementation Target**: 2-3 hours total (aggressive timeline)

---

## 🎯 **PHASE 1: CRITICAL FIXES (30 minutes)**
**Goal**: Resolve immediate test failures

### **Files to Modify:**
1. `/components/form/personalInfo.js` - Add bestCallTime field
2. `/utils/conditionalLogic.js` - Add hvacAirType to HVAC mapping
3. `/components/form/ConditionalFieldGroup.js` - Add hvacAirType field definition
4. `/app/api/process/route.js` - Add bestCallTime and price field mappings

### **Implementation Checklist:**
- [ ] Add `bestCallTime` field to personalInfo.js
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

- [ ] Add `hvacAirType` to HVAC conditional fields in ConditionalFieldGroup.js
  ```javascript
  hvacAirType: {
    type: 'radio',
    label: 'Heating/Cooling Needs',
    required: true,
    options: [
      { value: 'Cooling', label: 'Cooling Only' },
      { value: 'Heating', label: 'Heating Only' },
      { value: 'Heating_and_cooling', label: 'Both Heating & Cooling' }
    ],
    variant: 'card'
  }
  ```

- [ ] Update conditionalLogic.js hvac array: `['hvacAirType', 'hvacProjectType', 'hvacSystemType']`

- [ ] Add to API route process.js:
  ```javascript
  bestCallTime: formData.bestCallTime || 'Anytime',
  price: 0.01, // Required for fullpost
  ```

- [ ] Fix hvacProjectType options (remove 'Maintenance', API only accepts 'New_unit_installed'|'Repair')

### **Test After Phase 1:**
```bash
# Test HVAC form submission
curl -X POST http://localhost:3000/api/process \
  -H "Content-Type: application/json" \
  -d '{"jobType":"hvac","hvacAirType":"Heating","hvacProjectType":"Repair","bestCallTime":"Anytime",...}'
```

---

## 🔧 **PHASE 2: MAJOR JOB TYPES (45 minutes)**
**Goal**: Implement 6 most common job types (80% coverage)

### **Priority Job Types:**
1. **Windows** - Fix option values + add missing fields
2. **Doors** - Complete implementation  
3. **Kitchen** - Add missing fields
4. **Bathroom** - Complete implementation
5. **Electrical** - Full implementation
6. **Plumbing** - Full implementation

### **Implementation Strategy:**
- Batch update ConditionalFieldGroup.js with all field definitions
- Update conditionalLogic.js with complete mapping
- Test each job type individually

### **Windows Fields Fix:**
```javascript
windowsProjectType: {
  type: 'select',
  label: 'Window Service Type',
  required: true,
  options: [
    { value: 'Interested_in_replacement_windows', label: 'Replacement Windows' },
    { value: 'Need_repair_services_at_this_time', label: 'Repair Services' },
    { value: 'Need_repair_but_interested_in_new_windows', label: 'Repair + Future Replacement' }
  ]
}
```

### **New Job Type Templates:**
```javascript
// Electrical
electricalProjectType: {
  type: 'radio',
  label: 'Project Type',
  required: true,
  options: [
    { value: 'Install', label: 'New Installation' },
    { value: 'Repair', label: 'Repair Work' }
  ]
},
electricalServiceType: {
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
  ]
}
```

---

## ⚡ **PHASE 3: REMAINING FIELDS (60 minutes)**
**Goal**: Complete all 47 conditional fields for 100% API compliance

### **Batch Implementation Approach:**
1. **Single-field job types** (quick wins - 15 minutes)
2. **Multi-field job types** (complex - 30 minutes) 
3. **Specialized fields** (stair_lift, sunrooms - 15 minutes)

### **Single-Field Jobs (Quick Implementation):**
```javascript
// All single-field job types
const singleFieldJobs = {
  additions: 'addition_type',
  cabinets: 'cabinetsProjectType', 
  deck: 'deckMaterial',
  fencing: 'fenceType',
  gutters: 'protection',
  home_security: 'homeSecurityBuildingType',
  insulation: 'insulationServiceType',
  painting: 'paintingProjectType',
  pest_control: 'pestControlProjectType',
  trees: 'treesProjectType'
};
```

### **Multi-Field Jobs Template:**
```javascript
// Garage Doors (3 fields)
garage_doors: ['garageDoorsProjectType', 'numberOfDoors', 'openers'],

// Flooring (2 fields)  
flooring: ['flooringInquiyType', 'flooringType'],

// Landscaping (2 fields)
landscaping: ['landscapingProjectType', 'landscapingServiceType'],

// Remodeling (2 fields)
remodeling: ['remodelingLocationInHome', 'remodelingProjectType'],

// Roof (2 fields)
roof: ['roofProjectType', 'roofingType'],

// Siding (2 fields)
siding: ['sidingProjectType', 'sidingType'],

// Swimming Pool (3 fields)
swimming_pool: ['swimmingPoolProjectType', 'swimmingPoolServiceType', 'poolType'],
```

### **Specialized Jobs (Stair Lift & Sunrooms):**
```javascript
// Stair Lift (4 fields - most complex)
stair_lift: ['stairLiftProjectType', 'stairLiftStairType', 'numStairs', 'carryWeight'],

// Sunrooms (3 numeric fields)
sunrooms: ['sunroomNumRooms', 'sunroomLength', 'sunroomWidth'],
```

---

## 🧪 **PHASE 4: TESTING & VALIDATION (30 minutes)**
**Goal**: Verify all implementations work correctly

### **Testing Matrix:**
```bash
# Test script for all job types
job_types=(
  "additions" "bathroom" "cabinets" "deck" "doors" "electrical" 
  "fencing" "flooring" "garage_doors" "gutters" "handy_man"
  "home_security" "hvac" "insulation" "kitchen" "landscaping"
  "painting" "pest_control" "plumbing" "remodeling" "roof"
  "siding" "stair_lift" "sunrooms" "swimming_pool" "trees" "windows"
)

for job in "${job_types[@]}"; do
  echo "Testing $job..."
  # Submit test form with jobType=$job and required conditional fields
done
```

### **Validation Checklist:**
- [ ] All 25 job types submit without "Field is required" errors
- [ ] Conditional fields show/hide correctly based on jobType
- [ ] Option values match API spec exactly
- [ ] Form step flow works smoothly
- [ ] Mobile responsiveness maintained
- [ ] Performance acceptable with all fields

---

## 📁 **FILE REFERENCE GUIDE**

### **Primary Files to Modify:**
```
/components/form/ConditionalFieldGroup.js  ← Main field definitions
/utils/conditionalLogic.js                ← Field mapping logic  
/components/form/personalInfo.js          ← Add bestCallTime
/app/api/process/route.js                 ← API field mapping
```

### **Testing Files:**
```
/app/page.js                              ← Form integration
/components/form/FormStep.js              ← Step progression
```

### **Reference Files:**
```
/docs/API_SPECS.md                        ← Complete field reference
/utils/fieldValidator.js                 ← Validation patterns
```

---

## 🎯 **SUCCESS CRITERIA**

### **Phase 1 Success:**
- [ ] HVAC test case passes (no missing bestCallTime/hvacAirType errors)
- [ ] Form submits successfully with required fields

### **Phase 2 Success:**  
- [ ] 6 major job types submit without errors
- [ ] Conditional field rendering works correctly
- [ ] Option values validated against API spec

### **Phase 3 Success:**
- [ ] All 25 job types have complete conditional field coverage
- [ ] No "Field is required" API errors for any job type
- [ ] All option values match API specification exactly

### **Phase 4 Success:**
- [ ] Comprehensive test suite passes
- [ ] Performance metrics acceptable  
- [ ] User experience smooth across all job types
- [ ] Ready for production deployment

---

## 🚨 **COMMON PITFALLS TO AVOID**

1. **Option Value Mismatches**: API requires exact string matches (case-sensitive)
2. **Field Name Typos**: API field names must match exactly (e.g., `flooringInquiyType` not `flooringInquiryType`)
3. **Conditional Logic Errors**: Ensure fields only show for correct jobType
4. **Required vs Optional**: Some fields are required conditionally, others optional
5. **Numeric Fields**: Handle string/number conversion correctly
6. **Form State**: Ensure conditional fields clear when jobType changes

---

## 💡 **OPTIMIZATION NOTES**

- **Bundle Field Definitions**: Group related fields for better organization
- **Progressive Loading**: Consider lazy-loading conditional field definitions
- **Validation Caching**: Cache validation results for better performance  
- **Error Handling**: Graceful degradation if field definitions fail to load
- **Analytics**: Track which job types are most commonly selected

---

Ready to execute phases rapidly! Each phase builds on the previous, so we can pick up context quickly between implementations.