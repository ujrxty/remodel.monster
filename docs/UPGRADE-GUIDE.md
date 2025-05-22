# Offermage Upgrade Guide (May 2025)

This guide outlines the recent improvements to the Offermage template system and provides instructions for upgrading existing offers.

## Summary of Changes

The following improvements have been made to the template system:

1. **Fixed HTML Encoding Issues**: Templates now correctly handle variable interpolation without HTML encoding problems
2. **Removed External Component Dependencies**: Added inline implementations of UI components that were previously imported from external libraries
3. **Added Missing Components**: Implemented missing components in Main.ejs (TrustStrip, PainSection, UrgencySection, Footer)
4. **Upgraded Dependencies**: Using bleeding-edge versions:
   - Next.js (canary channel - always latest version)
   - React (canary channel - always latest version)
   - All other dependencies set to "latest" or "canary"
   - This ensures you're always using the most current features and fixes
5. **Modernized Next.js Config**: Updated to use modern Next.js features like remotePatterns for images
6. **Fixed Module Format Compatibility**: Changed next.config.js to use CommonJS syntax (module.exports) instead of ES modules (export default)
7. **Improved Data Security**: Added sessionStorage for sensitive user data instead of localStorage
8. **Enhanced UI and Animations**: Added motion effects and better responsive design
9. **Improved Error Handling**: Added better input validation and error messaging
10. **Path Aliases Support**: Added jsconfig.json generation for path aliases, simplifying imports with @/ prefix
11. **Fixed JSX Syntax**: Corrected JSX syntax in array mapping functions to properly wrap mapped items

## How to Upgrade

### Option 1: Rebuild All Offers (Recommended)

The simplest way to upgrade is to rebuild all your offers using the provided script:

```bash
# Install ejs if not already installed
npm install ejs

# Run the rebuild script
node rebuild-all-offers.js
```

This will regenerate all offers in the `build/` directory using the improved templates.

### Option 2: Manual Rebuild

To rebuild a specific offer:

```bash
# Install ejs if not already installed
npm install ejs

# Run the test generator for a specific config
node test-generator.js

# Check the output in build/test/
# If satisfied, run the official build process
npm run build <offer-id>
```

## Testing After Upgrade

After rebuilding your offers, test them thoroughly:

1. Navigate to the build directory of a specific offer
2. Install dependencies and start the development server

```bash
cd build/002
npm install
npm run dev
```

3. Check for any console errors or UI issues
4. Verify that all components render correctly
5. Test form submission if applicable

## Breaking Changes

There are no breaking changes in this upgrade, but be aware of the following:

1. If you had custom UI components in the `components/ui/` directory, they will no longer be used as inline implementations are now provided
2. If you had custom overrides of the template files, you'll need to merge your changes with the new template files

## New Features

### Custom Button and Progress Components

The Hero.ejs template now includes custom Button and Progress components that don't require external dependencies:

```jsx
// Custom Button component
const Button = ({ children, variant, className, onClick, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium transition-all ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

// Custom Progress component
const Progress = ({ value, className }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);
```

### Helper Scripts

Two new scripts have been added to the project:

1. `test-generator.js`: Generates a test build in `build/test/` for quick testing of template changes
2. `rebuild-all-offers.js`: Rebuilds all offers with the latest templates

## Future Improvements

Consider the following improvements for future updates:

1. Add comprehensive tests for template generation
2. Create a template validation system
3. Develop a visual preview system for templates
4. Add support for more UI component libraries
5. Improve form component generation

## Troubleshooting Common Issues

### Module Format Errors

If you encounter errors like "Cannot use import statement outside a module" or "Unexpected token 'export'":

```
Error: Cannot use import statement outside a module
```

This is typically caused by mixing ES modules and CommonJS syntax. Check:

1. Your `next.config.js` file should use `module.exports = nextConfig` instead of `export default nextConfig`
2. Make sure any utility files that are imported by CommonJS files are also using CommonJS syntax

### HTML Encoding Issues

If your UI shows escaped HTML or syntax errors in generated JavaScript:

```
SyntaxError: Unexpected token '<'
```

This is usually caused by improper HTML escaping in templates. Check:

1. The BenefitsList.ejs component should use direct EJS templating rather than JSON.stringify
2. String values in data arrays should properly escape quotes and HTML entities

### Path Alias Issues

If you see errors about modules not being found or imports failing:

```
Error: Cannot find module '@/components/HomePage/Main'
```

This is usually related to path aliases not being configured correctly:

1. Make sure the `jsconfig.json` file is being generated properly
2. Check that all imports consistently use the `@/` prefix (e.g., `@/components/HomePage/Main`) instead of relative paths
3. Verify that your IDE/editor is recognizing the path aliases correctly
4. Restart your development server after making changes to `jsconfig.json`

### JSX Syntax Errors

If you see errors related to JSX syntax or array mapping:

```
Error: Unexpected token '}'
```

This is often caused by improper placement of array mapping functions:

1. Make sure `.map()` functions are placed inside JSX curly braces, not outside
2. Check for correct closing of curly braces and parentheses 
3. Verify that array definitions are properly wrapped in JSX expression syntax

### Component Not Found

If you see errors about missing components or undefined properties:

```
Error: Element type is invalid: expected a string (for built-in components) or a class/function but got: undefined
```

This is usually caused by:

1. Missing imports or components that were expected to be available
2. Check the Main.ejs file to ensure all referenced components are defined or imported

### Storage and Data Handling

If form data isn't being saved between steps or pages:

1. Check that you're using the same storage mechanism (sessionStorage) consistently
2. Make sure you're checking both sessionStorage and localStorage for backward compatibility

## Need Help?

If you encounter any issues with the upgrade, please:

1. Check the console for specific error messages
2. Review the templates in `src/templates` to understand the changes
3. Run the rebuild script with debugging enabled: `DEBUG=1 node rebuild-all-offers.js`
4. Check build logs for any warnings or errors
5. Reach out to the development team for assistance