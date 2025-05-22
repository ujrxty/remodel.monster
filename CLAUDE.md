# Home Improvement Lead Generation Site

## Project Overview
Next.js lead generation website for home improvement services. Collects user information through a multi-step form and submits to Phonexa API for lead processing.

## Recent Major Refactor (Sprint 1 Complete)

### What Was Fixed
1. **State Management Catastrophe** - Replaced 40+ individual `useState` calls with single `formData` object
2. **Step Flow Issues** - Reordered steps to logical progression: intro → job selection → job details → contact → confirmation
3. **Conditional Logic Broken** - Fixed job-specific fields to work with unified state management  
4. **TCPA Compliance** - Added industry-standard consent language with proper disclosures
5. **UI Cleanup** - Removed empty TrustStrip component
6. **Boolean Handling** - Fixed checkbox string/boolean conversion issues

### New Form Flow
1. **Step 1**: Introduction/landing ("Get started")
2. **Step 2**: Job type selection (jobType dropdown)
3. **Step 3**: Job-specific conditional details (based on selection)
4. **Step 4**: Contact information (personal info + address combined)
5. **Step 5**: TCPA consent confirmation

### Architecture Changes
- **Before**: 40+ useState hooks, validation scattered, localStorage chaos
- **After**: Single formData object, centralized onChange handler, clean validation flow

## Current Status
✅ Form step reordering complete  
✅ State management refactored  
✅ TCPA compliance implemented  
✅ Basic conditional logic functional  
✅ API field conversion fixed - TCPA boolean to YES/NO format

## Recent Fixes
- **TCPA Field Conversion** - Fixed API rejection by converting boolean/string "true" to required "YES"/"NO" format in app/api/process/route.js:165

## Next Priority Tasks
1. **Test conditional field rendering** - Ensure job-specific fields show/hide correctly
2. **API integration testing** - Verify form submission to Phonexa endpoint
3. **Response handling** - Success/error states and redirects
4. **End-to-end testing** - Full user flow validation

## Technical Stack
- **Framework**: Next.js 15 (canary) with Turbopack
- **Styling**: Tailwind CSS + shadcn/ui components
- **State**: React useState (unified formData object)
- **Storage**: localStorage + sessionStorage for persistence
- **API**: Phonexa lead management system
- **Validation**: Custom validation with react-hot-toast

## Form Field Mapping
Core fields: firstName, lastName, email, phoneNumber, address, city, state, zip, jobType, purchaseTimeFrame, ownHome, creditRating, tcpa

Conditional fields (40+): Job-specific fields that appear based on jobType selection (windows, HVAC, kitchen, bathroom, etc.)

## Development Commands
```bash
npm run dev    # Start development server
npm run build  # Production build
npm run lint   # Code linting
```

## Ready for Soft Testing
Form flow and validation complete. Conditional logic needs testing with real user interactions.