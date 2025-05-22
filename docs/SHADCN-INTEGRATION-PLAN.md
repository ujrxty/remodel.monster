# Comprehensive Plan to Integrate shadcn/ui into Offermage Templates

## Phase 1: Core Infrastructure Setup

1. **Create components.json Template**
   - Create `src/templates/config/components.json.ejs`
   - Configure style, rsc mode, tsx support, and tailwind settings
   - Set up path aliases for component imports
   - Parametrize based on offer configuration

2. **Update Package Dependencies**
   - Modify `src/templates/config/package.ejs` to include:
     - Core dependencies: class-variance-authority, clsx, tailwind-merge
     - Radix UI primitives (@radix-ui/react-*)
     - Update Next.js and React versions for compatibility
     - Add installation scripts for shadcn

3. **Configure Tailwind**
   - Update `src/templates/config/tailwind.config.ejs`
   - Add content paths for component scanning
   - Configure color schemes from offer branding
   - Add animation plugins and extensions

4. **Setup Global Styling**
   - Modify `src/templates/styles/globals.ejs`
   - Add CSS variables for theming based on branding colors
   - Configure dark mode support
   - Add base styles for shadcn components

## Phase 2: Component Implementation

1. **Create UI Component Templates**
   - Add `src/templates/components/ui/` directory
   - Create core component templates (button.ejs, card.ejs, etc.)
   - Implement primitive wrappers for Radix UI

2. **Update Existing Components**
   - Refactor `Hero.ejs` to use shadcn components
   - Fix background image rendering with Next/Image
   - Update `BenefitsList.ejs` to use Card components
   - Enhance layout with proper spacing and animations

3. **Implement Form Components**
   - Add form component templates with shadcn styling
   - Update validation and state handling
   - Create consistent input styling
   - Implement multi-step form navigation

## Phase 3: Generator Process Updates

1. **Modify Generator Logic**
   - Update `src/build/generator.js` for shadcn integration
   - Add components.json creation step
   - Ensure UI component directory is generated
   - Handle asset path mapping for images

2. **Post-Generation Processing**
   - Create script to run shadcn initialization after generation
   - Add component installation commands for required components
   - Set up proper directory structure

3. **Test Integration**
   - Enhance `test-generator.js` to verify shadcn setup
   - Add tests for component styling and rendering
   - Create visual comparison tests

## Phase 4: Documentation and Examples

1. **Document Integration Process**
   - Update README with shadcn integration instructions
   - Create examples of component customization
   - Document theming process

2. **Create Sample Configuration**
   - Build example offer with comprehensive UI components
   - Showcase different style variations

## Implementation Strategy

We will implement this plan in a staged approach:

1. First establish the core infrastructure (Phase 1)
2. Build and test basic components (early Phase 2)
3. Implement the generator modifications (Phase 3)
4. Complete remaining components and documentation (Phase 2 completion and Phase 4)

This ensures we have a working system at each step of the process and can test incremental improvements.

## Testing Criteria

For each phase, we will verify:

- Configuration files are correctly generated
- Components render correctly and are properly styled
- The generator process works end-to-end
- The visual appearance matches design specs
- Performance and build compatibility

## Future Considerations

- Add mobile responsiveness testing
- Consider theme switching capabilities
- Create a component library explorer for easier configuration
- Add animation presets and transitions