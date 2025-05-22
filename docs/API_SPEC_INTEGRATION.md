# API Spec Integration Implementation

## Overview
This document outlines the implementation of API specification integration into the Offermage build process for home services offers.

## Objective
Integrate the home services API specifications (as defined in API_SPECS.md) into the build/002 configuration, enabling automatic form generation with all required fields, validations, and conditional logic.

## Architecture

### Components
1. **API Spec Parser** (`src/utils/apiSpecParser.js`)
   - Parses API_SPECS.md to extract field definitions
   - Converts to offermage schema format
   - Handles conditional field requirements

2. **Field Validator** (`src/utils/fieldValidator.js`)
   - Implements validation patterns from API specs
   - Provides regex patterns for common field types

3. **Conditional Logic Handler** (`src/utils/conditionalLogic.js`)
   - Manages field visibility based on jobType
   - Handles dependent field requirements

4. **Form Templates** (new templates in `src/templates/components/form/`)
   - ConditionalFieldGroup.ejs
   - SelectField.ejs
   - RadioGroup.ejs
   - DateField.ejs

## Implementation Phases

### Phase 1: API Spec Parser (In Progress)
- [x] Create parser structure
- [ ] Extract field definitions
- [ ] Parse conditional logic
- [ ] Generate schema-compliant output

### Phase 2: Validation System
- [ ] Create fieldValidator.js
- [ ] Implement regex patterns
- [ ] Add custom validation rules

### Phase 3: Form Templates
- [ ] Create conditional field templates
- [ ] Update form step generator
- [ ] Add dynamic field rendering

### Phase 4: Config Integration
- [ ] Update 002.js with parsed fields
- [ ] Test form generation
- [ ] Verify API mappings

### Phase 5: Testing
- [ ] Unit tests for parser
- [ ] Integration tests
- [ ] E2E form submission

## Field Structure

### Basic Fields
```javascript
{
  firstName: {
    type: 'text',
    label: 'First Name',
    required: true,
    validation: {
      minLength: 1,
      maxLength: 254
    }
  },
  email: {
    type: 'email',
    label: 'Email Address',
    required: true,
    validation: {
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
      minLength: 5,
      maxLength: 128
    }
  }
}
```

### Conditional Fields
```javascript
{
  addition_type: {
    type: 'select',
    label: 'Type of Addition',
    required: false,
    condition: 'jobType === "additions"',
    options: [
      { value: 'Ground_floor', label: 'Ground Floor' },
      { value: 'Second_floor', label: 'Second Floor' },
      { value: 'Other', label: 'Other' }
    ]
  }
}
```

## API Mappings

### Full Post Endpoint
- URL: `https://leads-inst523-client.phonexa.com/fullpost/`
- Method: POST
- Required Fields: See API_SPECS.md

### Field Mapping Strategy
```javascript
mappings: {
  firstName: 'firstname',
  lastName: 'lastname',
  phoneNumber: 'phone',
  userIp: 'userIp',
  // ... etc
}
```

## Development Workflow

1. Parser development and testing
2. Template creation
3. Config generation
4. Integration testing
5. Hot reload verification

## Current Status
- Branch: `feature/api-spec-integration`
- Phase 1 in progress
- Parser structure created

## Next Steps
1. Complete API spec parser
2. Create test cases
3. Implement field templates
4. Update build process

## Testing Commands
```bash
# Test parser
node test/apiSpecParser.test.js

# Test generator
node test-generator.js

# Run dev server
npm run dev
```

## Notes
- Keep existing architecture intact
- Ensure backward compatibility
- Maintain hot reload functionality
- Document all conditional logic
