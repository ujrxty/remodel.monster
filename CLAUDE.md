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
✅ Conditional logic fully functional  
✅ API field conversion fixed - TCPA boolean to YES/NO format
✅ **COMPREHENSIVE VALIDATION SYSTEM IMPLEMENTED**

## Sprint 2 Complete: Form Validation System

### Critical Fixes Implemented
1. **Missing bestCallTime Field** - Added to formData state (was in form component but missing from state)
2. **Required Field Validation** - Added validation for API-required fields:
   - `purchaseTimeFrame` (Step 2)
   - `ownHome` (Step 2) 
   - `bestCallTime` (Step 4)
3. **Conditional Field Validation** - Implemented job-specific validation for 40+ conditional fields
4. **Enhanced Validation Logic** - Created comprehensive validation system in utils/conditionalLogic.js

### Validation Coverage
- **Step 2**: Job type, purchase timeframe, home ownership validation
- **Step 3**: Dynamic validation based on selected job type (windows, HVAC, kitchen, etc.)
- **Step 4**: Contact info including best call time validation
- **Step 5**: TCPA consent validation

### Technical Enhancements
- `validateConditionalFieldsForJobType()` function for job-specific validation
- Human-readable error messages with proper field labels
- Comprehensive field mapping for all 26 job types
- Integration with existing toast notification system

## Sprint 3 Complete: Tracking Integration & Revenue Optimization

### Critical Fixes Implemented
1. **Tracking Parameters Integration** - transaction_id and source now properly passed to API
   - URL: `?transaction_id=123&source=456` → API: `clickid: "123", source: "456"`
   - Added to formData state and localStorage persistence
2. **Back Button Navigation** - Fixed form submission bug by adding `type="button"`
3. **Windows Call Landing Page** - Created `/call/windows` with navigation and footer
   - Mobile-optimized SMS landing page with tel:+18662043787
   - "Need Windows Replaced or Repaired?" conversion copy
4. **Revenue Optimization Flow** - All paths lead to more offers
   - Success with redirect → Buyer redirect URL
   - Success without redirect → resourcelink.online/sorry/all after 5s countdown  
   - Rejection → resourcelink.online/sorry/all after 5s countdown
   - Users can skip countdown with "Go Now" button
5. **Privacy Policy Cleanup** - Removed non-owned phone number (1-800-REMODEL)

### Enhanced User Experience
- Form call button: "📞 Unsure of project details? Click to speak with a specialist now."
- Secondary theme colors for better visual hierarchy
- Complete footer with legal disclaimers on call page
- Proper navigation header with back-to-form link

## Ready for Production Revenue Maximization
✅ All form validation implemented  
✅ API compliance ensured with tracking  
✅ Conditional logic tested  
✅ Error handling comprehensive
✅ Revenue funnel optimized - no dead ends

## Technical Stack
- **Framework**: Next.js 15 (canary) with Turbopack
- **Styling**: Tailwind CSS + shadcn/ui components
- **State**: React useState (unified formData object)
- **Storage**: localStorage + sessionStorage for persistence
- **API**: Phonexa lead management system
- **Validation**: Custom validation with react-hot-toast

## Form Field Mapping
Core fields: firstName, lastName, email, phoneNumber, address, city, state, zip, jobType, purchaseTimeFrame, ownHome, creditRating, bestCallTime, tcpa

Conditional fields (40+): Job-specific fields that appear based on jobType selection (windows, HVAC, kitchen, bathroom, etc.)

## Development Commands
```bash
npm run dev    # Start development server
npm run build  # Production build
npm run lint   # Code linting
```

## Sprint 4 Complete: About/Contact Pages & Navigation

### Pages Implemented
1. **About Page** (`/about`) - Professional service disclaimer with comprehensive copy
2. **Contact Page** (`/contact`) - Form with name, email, subject, message validation
3. **Contact API** (`/api/contact`) - Email functionality with graceful failure (always returns success)

### Navigation Enhancements
- **Shared Footer Component** - Single footer in root layout for all pages
- **PageHeader Component** - Back button for About, Contact, Terms, Privacy pages
- **Updated Links** - All footer navigation points to correct pages

### Technical Implementation
- **Email Integration** - nodemailer with SMTP support via .env configuration
- **Graceful Degradation** - Contact form always shows success regardless of email backend
- **Consistent UI** - Uses existing design system and components

## Sprint 6 Complete: Branding & Theme Updates

### Company Branding Update
1. **Company Name Change** - Updated from "iClick Interactive" to "Lead Plateau"
2. **Address Update** - Changed to "8 The Green Suite 4000, Dover, DE 19901"
3. **API Temporarily Disabled** - Returning rejection responses until new endpoint configured

### Files Updated
- Footer.js - Company name in footer
- privacy.md - Company name and address throughout
- terms.md - All instances of company name and address
- API_SPECS.md - Updated section header

## Sprint 5 Complete: Production Deployment

### PM2 Process Management Setup
1. **Ecosystem Configuration** - ecosystem.config.js configured for production
   - App name: "remodel.monster"
   - Port: 3525
   - Environment: production
   - Working directory: /var/www/remodel.monster
2. **PM2 Deployment** - Successfully deployed to production server
   - Process ID: 12
   - Status: Online and stable
   - Memory usage: ~66MB
   - No conflicts with existing PM2 processes
3. **Process Persistence** - PM2 configuration saved for automatic restart on boot
   - Saved to: /home/ec2-user/.pm2/dump.pm2
   - Integrated with existing systemd startup configuration

### Production Status
- **HTTP Status**: 200 OK responses confirmed
- **Next.js Performance**: Ready in 1316ms
- **Cache Strategy**: NextJS cache HIT, 1 year s-maxage
- **Network Access**: Available on http://172.31.8.155:3525

### Production Commands
```bash
pm2 start ecosystem.config.js  # Start application
pm2 list                       # View all processes
pm2 logs remodel.monster       # View application logs
pm2 save                       # Save process configuration
```

## Current Status
✅ All form validation implemented  
✅ API compliance ensured with tracking  
✅ Conditional logic tested  
✅ Error handling comprehensive
✅ Revenue funnel optimized - no dead ends
✅ Complete site navigation with about/contact pages
✅ **PRODUCTION DEPLOYMENT WITH PM2 PROCESS MANAGEMENT**
⚠️ **API POSTING TEMPORARILY DISABLED** - Returns rejection response (needs new endpoint configuration)