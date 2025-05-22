# Offermage

Offermage is a build system for abstracting marketing offer pages into configurable templates that can be generated based on a schema and AI enhancements.

## Overview

This project provides a complete build process to:

1. Define offer configurations in a structured schema
2. Generate marketing offer pages from these configurations
3. Optionally enhance content using AI generation
4. Build fully-functional NextJS sites ready for deployment

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Install globally to use the CLI from anywhere
npm install -g .
```

### Usage

#### Creating a New Offer Configuration

```bash
# Using NPM script
npm run create

# Or using the CLI
offermage create
```

This will prompt you for essential information about your offer and generate a configuration file in the `src/config` directory.

#### Building Offer Sites

```bash
# Build all offers in the config directory
npm run build

# Build a specific offer
npm run build mva-legal
# or
offermage build mva-legal
```

#### Adding a Theme to a Built Site

After building, you can add a shadcn theme directly to any generated site:

```bash
cd build/002  # Switch to your built site directory
npx shadcn@latest add https://tweakcn.com/r/themes/cmapr0t16000104l2hqxr7v34  # Install a theme
npm run dev  # Run the site with the new theme
```

### Template Requirements

Before building, ensure the following templates exist:

- `src/templates/pages/thanks.ejs` - Thank you page after form submission
- `src/templates/components/HomePage/index.ejs` - Index file for the HomePage component
- `src/templates/config/next.config.ejs` - Next.js configuration template
- `src/templates/config/package.ejs` - Package.json template for generated sites
- `src/templates/assets/` - Directory for static assets

### Directory Structure

- `src/` - Source code for the build system
  - `schemas/` - Schema definition for offer configurations
  - `config/` - Offer configuration files
  - `templates/` - EJS templates for generating code
    - `pages/` - Page templates (index, thanks, etc.)
    - `components/` - React component templates
    - `config/` - Configuration file templates
    - `assets/` - Static assets
  - `build/` - Build system scripts
  - `utils/` - Utility functions
- `build/` - Generated offer sites (output)

## Schema Structure

Offer configurations follow a structured schema that defines all aspects of an offer:

```js
{
  // Core information
  id: "offer-id",
  name: "Offer Name",
  type: "legal", // legal, financial, medical, insurance, etc.
  domain: "example.com",
  
  // API integration
  api: { ... },
  
  // Tracking
  tracking: { ... },
  
  // Brand and design
  branding: { ... },
  
  // Page sections
  sections: {
    hero: { ... },
    trustStrip: { ... },
    painPoints: { ... },
    benefits: { ... },
    urgency: { ... }
  },
  
  // Form configuration
  form: {
    steps: [ ... ],
    fields: { ... },
    redirects: { ... }
  },
  
  // SEO
  seo: { ... },
  
  // Legal
  legal: { ... }
}
```

## AI Content Generation

Offermage can enhance your offer configurations by generating compelling marketing copy using AI. This feature requires an OpenAI API key.

### Setup

Create a `.env` file in the root directory:

```
OPENAI_API_KEY=your-api-key
```

### Requirements

- OpenAI API v4.0+ is required
- Access to GPT-4 models for best results

### Usage

When creating a new offer, you'll be asked if you want to use AI to generate content. If you select yes, the system will enhance your configuration with AI-generated copy for:

- Hero section content
- Benefits descriptions
- Pain points
- Urgency section
- SEO elements

## Customization

### Templates

All templates are in the `src/templates` directory using EJS syntax. You can customize these templates to match your specific needs or technology stack.

### Styling

The generated sites use Tailwind CSS by default. You can customize the theme in the configuration's `branding` section or by using a shadcn theme after building (see "Adding a Theme" above).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Recent Updates (May 2025)

The template system has been upgraded to:

1. Use Next.js 15 (canary) with Turbopack for faster development
2. Fix HTML encoding issues in templates
3. Include inline component implementations instead of external libraries
4. Add missing component implementations
5. Use modern Next.js features like remotePatterns for images
6. Improve security for handling user data
7. Add animations and improved UI interactions
8. Fix module format compatibility (CommonJS vs ESM)
9. Added path aliases support with jsconfig.json generation
10. Added proper Tailwind CSS and PostCSS configuration
11. Added shadcn/ui theme support

### Key improvements:

1. **BenefitsList.ejs**: Fixed JSON encoding issues by using direct EJS templating instead of JSON.stringify
2. **Hero.ejs**: 
   - Added inline Button and Progress components instead of relying on external UI library imports
   - Fixed animation styles by using safer document.createElement approach instead of createPortal
   - Added proper cleanup on component unmount
3. **HomePage/Main.ejs**: 
   - Added inline component implementations for missing sections
   - Enhanced PainSection with proper data handling and animations
   - Fixed JSX syntax in array mapping functions
   - Improved security by using sessionStorage for sensitive user data
   - Fixed proper string escaping for all user inputs
4. **package.ejs**: Updated to use absolute latest packages:
   - Next.js (canary channel) with Turbopack enabled for development
   - React (canary channel)
   - All dependencies set to "latest" or "canary" to ensure newest versions
5. **next.config.ejs**: 
   - Fixed to use CommonJS syntax (module.exports) instead of ES modules (export default)
   - Added allowedDevOrigins to prevent cross-origin warnings during development
   - Added turbopack config for better performance
6. **jsconfig.json**: Added generation of jsconfig.json to support path aliases (@/ imports)
7. **path aliases**: Updated import paths in components to use path aliases for better maintainability
8. **HTML entities**: Added automatic cleaning of HTML entities in JavaScript files to prevent encoding issues
9. **rebuild-all-offers.js**: Enhanced rebuild script with validation and verification steps
10. **Tailwind & PostCSS**: Added proper configuration files for Tailwind CSS and PostCSS to ensure styling works correctly
11. **Theme Support**: Added support for shadcn/ui themes that can be installed after building a site

### Theme Support

Each generated site comes with shadcn/ui support. After building, you can install any shadcn theme:

```bash
cd build/SITENAME  # Navigate to your built site
npx shadcn@latest add https://tweakcn.com/r/themes/cmapr0t16000104l2hqxr7v34
```

This will update the CSS variables in your site's globals.css file.

### Security Improvements:

1. **Better Data Handling**:
   - Moved sensitive user data from localStorage to sessionStorage
   - Improved input sanitization throughout all templates
   - Better phone number formatting and validation

2. **Improved Error Handling**:
   - Added better form validation with helpful error messages
   - Improved build-time validation of configurations
   - Added template verification steps in the rebuild process

### To Rebuild All Offers:

Run the rebuild script to apply all template improvements to existing offers:

```bash
node rebuild-all-offers.js
```

This will:
1. Find all offer configurations
2. Validate each configuration against the schema
3. Generate all files with the latest templates
4. Verify critical files for common issues
5. Create backups of any modified files