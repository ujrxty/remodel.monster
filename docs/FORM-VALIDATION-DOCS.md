# Enhanced Form System Documentation

This document outlines the enhanced form validation and input formatting system implemented for Offermage.

## Overview

The form system has been completely revamped to provide:

1. **Input Masking & Formatting** - Automatic formatting for phone numbers, zip codes, currencies, etc.
2. **Enhanced Validation** - Real-time validation with helpful error messages
3. **Conditional Fields** - Dynamic field rendering based on job type selections
4. **Improved User Experience** - Better styling, animations, and feedback

## Components

### Core Field Components

All form field components have been enhanced with consistent props and behavior:

#### TextInput

```jsx
<TextInput
  name="fieldName"
  label="Field Label"
  type="text|email|tel|number|zip|currency"
  value={value}
  onChange={onChange}
  onValidate={handleValidate}
  required={true|false}
  error={errorMessage}
  placeholder="Placeholder text"
  helpText="Help text shown below the field"
  mask={true|false}
  min={minValue}
  max={maxValue}
  autoComplete="field type"
  disabled={true|false}
  readOnly={true|false}
/>
```

Special features:
- Automatic formatting for phone numbers, zip codes, and currency
- Real-time validation feedback
- Constrained numeric inputs with min/max values

#### SelectField

```jsx
<SelectField
  name="fieldName"
  label="Field Label"
  value={value}
  onChange={onChange}
  onValidate={handleValidate}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  required={true|false}
  error={errorMessage}
  helpText="Help text shown below the field"
  placeholder="Select an option..."
  searchable={true|false}
  grouped={true|false}
  size="small|default|large"
  disabled={true|false}
  readOnly={true|false}
/>
```

Special features:
- Searchable dropdown option for long lists
- Custom styling with size variations
- Optional grouped options

#### RadioGroup

```jsx
<RadioGroup
  name="fieldName"
  label="Field Label"
  value={value}
  onChange={onChange}
  onValidate={handleValidate}
  options={[
    { value: 'option1', label: 'Option 1', description: 'Optional description' },
    { value: 'option2', label: 'Option 2', description: 'Optional description' }
  ]}
  required={true|false}
  error={errorMessage}
  helpText="Help text shown below the field"
  inline={true|false}
  variant="default|card"
  size="small|default|large"
  disabled={true|false}
/>
```

Special features:
- Card variant with descriptions
- Inline or stacked layout
- Visual feedback for selected state

#### DateField

```jsx
<DateField
  name="fieldName"
  label="Field Label"
  value={value}
  onChange={onChange}
  onValidate={handleValidate}
  required={true|false}
  error={errorMessage}
  helpText="Help text shown below the field"
  min="YYYY-MM-DD"
  max="YYYY-MM-DD"
  useDatePicker={true|false}
  placeholder="MM/DD/YYYY"
  disabled={true|false}
  readOnly={true|false}
/>
```

Special features:
- Native date picker or formatted text input
- Date validation with min/max constraints
- Automatic formatting

### Conditional Field Group

The `ConditionalFieldGroup` component dynamically renders fields based on the selected job type:

```jsx
<ConditionalFieldGroup
  jobType={formData.jobType}
  formData={formData}
  onChange={onChange}
  errors={errors}
  setErrors={setErrors}
  fieldDefinitions={fieldDefinitions}
/>
```

Special features:
- Automatically shows/hides fields based on job type
- Supports all field types with specific configurations
- Handles validation for conditional fields
- Animates field appearance/disappearance

## Utility Functions

### Input Masking

Located in `src/utils/input/inputMasking.js`:

- `formatPhoneNumber(value)` - Formats phone numbers as (XXX) XXX-XXXX
- `unformatPhoneNumber(value)` - Extracts digits from formatted phone number
- `formatZipCode(value)` - Formats zip codes as XXXXX or XXXXX-XXXX
- `formatCurrency(value)` - Formats currency with dollar sign and commas
- `formatDate(value)` - Formats dates as MM/DD/YYYY
- `constrainNumericInput(value, min, max)` - Limits numeric input to range

### Input Validation

Located in `src/utils/input/inputValidation.js`:

- `validateField(fieldName, value, validation)` - Validates field against rules
- `isValidEmail(value)` - Checks email format
- `isValidPhoneNumber(value, requireFormat)` - Validates phone numbers
- `isValidZipCode(value)` - Validates US zip codes
- `isInRange(value, min, max)` - Checks numeric range
- `isValidDate(value, minDate, maxDate)` - Validates dates with constraints

## Configuration

Field validation and conditional logic are defined in the configuration file (e.g., `src/config/002.js`):

```javascript
"phoneNumber": {
  "type": "tel",
  "label": "Phone Number",
  "required": true,
  "validation": {
    "pattern": "^\\(\\d{3}\\) \\d{3}-\\d{4}$",
    "patternMessage": "Please enter a valid phone number in format (XXX) XXX-XXXX"
  },
  "placeholder": "(555) 123-4567",
  "helpText": "Please enter your 10-digit phone number"
},

// Job-specific fields
"windowsProjectType": {
  "type": "select",
  "label": "Window Project Type",
  "required": true,
  "options": [
    { "value": "replacement", "label": "Replacement Windows" },
    { "value": "repair", "label": "Window Repair" },
    { "value": "new", "label": "New Installation" }
  ],
  "helpText": "What type of window project are you planning?"
}
```

## Form Flow

1. User selects a job type (e.g., "windows")
2. Conditional fields appear based on job type
3. Inputs are automatically formatted as user types
4. Validation runs in real-time with helpful feedback
5. Form can be submitted only when all validation passes

## Generator Integration

The entire system is compatible with the generator workflow:

1. Form components are defined in `src/templates/components/form/`
2. Field definitions live in `src/config/002.js`
3. Generator processes templates and creates built components
4. Utilities are copied to build directory

## Extending the System

To add new field types or validation:

1. Add field definitions in the config file
2. Update the `ConditionalFieldGroup` component if needed
3. Add validation rules to `inputValidation.js`
4. Add formatting functions to `inputMasking.js`

## Common Job Types & Fields

The system supports all 27 job types with specific fields for each:

- **Windows**: Window count, window type, etc.
- **Bathroom**: Project focus, fixture types, etc.
- **Kitchen**: Project focus, appliance types, etc.
- **HVAC**: System type, air type, etc.

Each job type has custom fields that appear automatically when selected.