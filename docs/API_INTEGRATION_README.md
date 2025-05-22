# API Spec Integration for Home Services Offer

This branch (`feature/api-spec-integration`) implements a framework for integrating the API specifications from `API_SPECS.md` into the Offermage build process, specifically targeting the home services offer in build/002.

## Current Status

- ✅ Core framework implementation
- ✅ Initial form field definitions
- ✅ Conditional logic handling
- ✅ API route template for fullpost endpoint
- ✅ Component templates for various field types

## Structure

- `src/utils/apiSpecParser.js` - Parses API_SPECS.md to extract field definitions
- `src/utils/fieldValidator.js` - Validation patterns and functions for form fields
- `src/utils/conditionalLogic.js` - Handles conditional field visibility based on jobType
- `src/templates/components/form/` - Form component templates for different field types
- `src/templates/api/process.ejs` - API route template with fullpost endpoint support
- `src/config/002.js` - Updated configuration with form structure
- `docs/API_SPEC_INTEGRATION.md` - Implementation documentation

## Next Steps

1. **Complete API Spec Parser**
   - Run and refine `test-api-parser.js` to validate parsing
   - Add support for extracting all job-specific field dependencies

2. **Form Components Integration**
   - Test form component rendering with the generator
   - Ensure conditional field handling works correctly

3. **API Integration Testing**
   - Test API route with sample form submissions
   - Verify correct handling of fullpost endpoint parameters

4. **Form Steps Refinement**
   - Organize fields into logical steps
   - Add progress tracking between steps

5. **Field Validations**
   - Test validation rules against API requirements
   - Add custom error messages

## Testing

```bash
# Test API spec parser
node test-api-parser.js

# Test generator with updated config
node test-generator.js

# Run development server
npm run dev
```

## Notes

- The current implementation uses fullpost strategy only
- Form fields are conditionally displayed based on jobType selection
- API endpoint and credentials are configured in `src/config/002.js`
- Validation patterns are extracted from API_SPECS.md examples

## Documentation

For detailed implementation information, refer to `docs/API_SPEC_INTEGRATION.md`.