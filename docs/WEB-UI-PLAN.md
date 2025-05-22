# Offermage Admin Web Interface: Implementation Plan

**Audience:** Senior Developer Team
**Date:** October 26, 2023
**Project:** Web interface for "Offermage" offer management and generation.
**Stack:** Next.js (App Router, JavaScript with JSDoc), Shadcn/ui, Auth.js (NextAuth.js), Prisma, SQLite (for local auth data).

## I. Project Setup & Core Architecture

1.  **Initialize Next.js App Router Project:**
    *   `npx create-next-app@latest offermage-admin --javascript --eslint --tailwind --src-dir --app --import-alias "@/*"`
    *   Choose appropriate options for Tailwind CSS, ESLint.
2.  **Install Dependencies:**
    *   `next-auth` (Auth.js)
    *   `@prisma/client`
    *   `@auth/prisma-adapter` (for `next-auth` Prisma adapter)
    *   `lucide-react` (for icons with Shadcn/ui)
    *   Relevant `shadcn-ui` components (via CLI: `npx shadcn-ui@latest add ...`) - e.g., button, input, card, table, dialog, select, toast.
3.  **Prisma Setup:**
    *   `npx prisma init --datasource-provider sqlite`
    *   Define schema in `prisma/schema.prisma` for User, Account, Session, VerificationToken (standard `next-auth` models). Add an `OfferConfigMetadata` model if tracking web-managed configs.
        ```prisma
        // prisma/schema.prisma
        model User {
          id            String    @id @default(cuid())
          name          String?
          email         String?   @unique
          emailVerified DateTime?
          image         String?
          accounts      Account[]
          sessions      Session[]
          // Optional: Role for admin access
          role          String?   @default("USER") // e.g., USER, ADMIN
        }

        model Account { /* ... next-auth standard ... */ }
        model Session { /* ... next-auth standard ... */ }
        model VerificationToken { /* ... next-auth standard ... */ }

        // Optional: To track offers managed via the UI if needed separately
        // model OfferMetadata {
        //   id          String    @id @default(cuid())
        //   configId    String    @unique // Links to the generated config's ID
        //   name        String
        //   lastBuiltAt DateTime?
        //   createdAt   DateTime  @default(now())
        //   updatedAt   DateTime  @updatedAt
        //   // createdBy   User?     @relation(fields: [userId], references: [id])
        //   // userId      String?
        // }
        ```
    *   Run `npx prisma migrate dev --name init`
    *   Generate Prisma Client: `npx prisma generate`
4.  **Auth.js (NextAuth.js) Setup:**
    *   Create `app/api/auth/[...nextauth]/route.js`.
    *   Configure `authOptions` with Prisma adapter and chosen providers (e.g., Credentials for local admin login, GitHub/Google for OAuth).
        *   For local admin: Implement a Credentials provider, hash passwords (e.g., with `bcrypt`).
    *   Wrap root layout (`app/layout.js`) with `<SessionProvider>`.
5.  **JSDoc Configuration:**
    *   Ensure `jsconfig.json` is set up for JSDoc type hinting.
    *   Adopt a consistent JSDoc style for defining types and documenting functions/components.
        ```json
        // jsconfig.json
        {
          "compilerOptions": {
            "baseUrl": ".",
            "paths": {
              "@/*": ["./src/*"]
            },
            "checkJs": true, // Enables basic type checking based on JSDoc
            "jsx": "preserve"
          },
          "include": ["src/**/*.js", "src/**/*.jsx", "next-env.d.ts"],
          "exclude": ["node_modules"]
        }
        ```
6.  **Project Structure (Illustrative):**
    ```
    src/
    ├── app/
    │   ├── (admin)/                # Protected admin routes group
    │   │   ├── offers/
    │   │   │   ├── page.jsx        # List offers
    │   │   │   ├── create/
    │   │   │   │   └── page.jsx    # Create offer form
    │   │   │   ├── [id]/
    │   │   │   │   ├── page.jsx    # View/Edit offer details
    │   │   │   │   └── layout.jsx  # Layout for offer detail pages
    │   │   │   └── layout.jsx      # Layout for all /offers routes
    │   │   ├── dashboard/
    │   │   │   └── page.jsx
    │   │   └── layout.jsx          # Main admin layout (sidebar, navbar)
    │   ├── api/
    │   │   ├── auth/[...nextauth]/route.js
    │   │   ├── offers/             # API for offer CRUD
    │   │   │   └── route.js
    │   │   ├── offers/[id]/
    │   │   │   └── route.js
    │   │   ├── offers/[id]/build/  # API to trigger build
    │   │   │   └── route.js
    │   │   └── offers/[id]/ai-generate/ # API to trigger AI content
    │   │       └── route.js
    │   ├── (auth)/                 # Auth pages group (signin, etc.)
    │   │   └── signin/page.jsx
    │   ├── layout.jsx              # Root layout (SessionProvider, Toaster)
    │   └── global.css
    ├── components/
    │   ├── ui/                     # Shadcn/ui components
    │   ├── admin-layout/
    │   │   ├── Sidebar.jsx
    │   │   ├── Navbar.jsx
    │   ├── offers/
    │   │   ├── OfferForm.jsx       # Reusable form for create/edit
    │   │   ├── OffersTable.jsx
    │   ├── common/
    │   │   └── LoadingSpinner.jsx
    ├── lib/
    │   ├── auth.js                 # Auth options export
    │   ├── prisma.js               # Prisma client instance
    │   ├── utils.js                # General utilities
    │   ├── offermage-core-wrapper.js # Wrapper/adapter for existing generator logic
    ├── styles/
    ├── prisma/
    │   └── schema.prisma
    └── middleware.js               # Auth protection for admin routes
    ```

## II. Core Feature Implementation

1.  **Authentication & Authorization:**
    *   Implement `middleware.js` to protect `/(admin)` routes, redirecting unauthenticated users to `/signin`.
    *   (Optional) Add role-based access if multiple admin roles are needed (e.g., check `session.user.role` in middleware or Server Components).
    *   Create a sign-in page (`app/(auth)/signin/page.jsx`) using Shadcn components.
2.  **Refactor/Wrap Existing Offermage Core Logic:**
    *   Create `src/lib/offermage-core-wrapper.js`. This module will:
        *   Import functions from your existing `cli.js`, `generator.js`, `aiGenerator.js` (which themselves should be refactored to export reusable functions, not just run as scripts).
        *   Adapt them to be called programmatically (e.g., accept data objects instead of relying on `inquirer`).
        *   Handle file system paths carefully (relative to the main project, or configurable).
        *   Expose functions like `createOffermageConfig(data)`, `triggerOffermageBuild(configId)`, `generateOffermageAIContent(baseConfigData)`.
3.  **API Routes (`app/api/...`):**
    *   These will be Route Handlers in Next.js App Router.
    *   Protect all API routes with `getServerSession` from `next-auth`.
    *   **Offers CRUD:**
        *   `POST /api/offers`: Creates a new offer config file by calling `createOffermageConfig` from the wrapper.
        *   `GET /api/offers`: Lists available offer configs (reads from the `config/` directory of the Offermage core).
        *   `GET /api/offers/[id]`: Retrieves a specific offer config.
        *   `PUT /api/offers/[id]`: Updates an offer config file.
        *   `DELETE /api/offers/[id]`: Deletes an offer config file.
    *   **Actions:**
        *   `POST /api/offers/[id]/build`: Calls `triggerOffermageBuild`. Needs to handle asynchronous nature (see section IV).
        *   `POST /api/offers/[id]/ai-generate`: Calls `generateOffermageAIContent`. Needs to handle asynchronous nature.
4.  **Admin UI - Offer Management (App Router Pages & Components):**
    *   **Layout (`app/(admin)/layout.jsx`):**
        *   Server Component for overall structure.
        *   Include `Sidebar.jsx` and `Navbar.jsx` (Client Components for interactivity if needed, e.g., dropdowns).
    *   **List Offers (`app/(admin)/offers/page.jsx`):**
        *   Server Component to fetch list of offers from `/api/offers`.
        *   Pass data to a Client Component (`OffersTable.jsx`) for rendering, sorting, filtering, and action buttons (Edit, Delete, Build).
    *   **Create/Edit Offer (`app/(admin)/offers/create/page.jsx`, `app/(admin)/offers/[id]/page.jsx`):**
        *   Server Component to fetch existing offer data for editing.
        *   Use a shared Client Component (`OfferForm.jsx`) for the form.
            *   Manage form state (e.g., with `useState`, `react-hook-form`).
            *   Use Shadcn components for inputs, selects, etc.
            *   On submit, call the relevant API endpoints.
            *   Include "Generate with AI" button that calls `/api/offers/[id]/ai-generate` and updates the form with results.
    *   **User Feedback:**
        *   Use `sonner` (or Shadcn `toast`) for success/error notifications from API calls.
        *   Implement loading states (spinners, disabled buttons) during API requests and builds.

## III. JSDoc for Type Safety & DX

*   **Define Core Types:** In a central file (e.g., `src/types/offermage.js`) or alongside relevant modules, define JSDoc `@typedef` for:
    *   `OfferConfig` (mirroring the structure in your core Offermage)
    *   API request/response payloads.
    *   Props for complex React components.
*   **Apply Types:** Consistently use `@type {TypeName}` in function parameters, return values, and variable declarations.
    *   This will enable VS Code's LSP to provide excellent IntelliSense and basic type checking without enforcing full TypeScript compilation.
    ```javascript
    // src/components/offers/OfferForm.jsx
    /**
     * @typedef {import('@/types/offermage').OfferConfig} OfferConfig
     */

    /**
     * @param {{ initialData?: OfferConfig, onSubmit: (data: OfferConfig) => Promise<void> }} props
     */
    export default function OfferForm({ initialData, onSubmit }) {
      /** @type {[OfferConfig, React.Dispatch<React.SetStateAction<OfferConfig>>]} */
      const [formData, setFormData] = useState(initialData || {});
      // ...
    }
    ```

## IV. Handling Asynchronous Operations (Builds, AI Generation)

*   **Challenge:** Builds and AI generation can be long-running. HTTP requests will time out.
*   **Solution Options:**
    1.  **Client-Side Polling (Simpler):**
        *   API endpoint (`/build`, `/ai-generate`) initiates the process (e.g., spawns a child process or calls an async function *without* `await`ing its full completion if it's truly long) and immediately returns a job ID or acknowledges the request.
        *   Frontend polls a status endpoint (`/api/offers/[id]/status`) periodically to check progress.
        *   **Drawback:** Can be inefficient; requires careful server-side state management for job status.
    2.  **WebSockets (More Robust):**
        *   Set up a WebSocket server (can be integrated into Next.js API routes or run as a separate Node.js process).
        *   When a build/AI job starts, the backend sends progress updates over WebSocket to the specific client.
        *   **Benefit:** Real-time updates, more efficient.
        *   **Complexity:** Adds WebSocket setup and management.
    3.  **Server-Sent Events (SSE):**
        *   Simpler than WebSockets for one-way server-to-client communication.
        *   API endpoint keeps the connection open and streams status updates.
        *   **Benefit:** Simpler than WebSockets, good for progress updates.
    4.  **Background Job Queue (Most Scalable):**
        *   Use a library like BullMQ (Redis-based) or Agenda (MongoDB-based).
        *   API endpoint adds a job to the queue and returns.
        *   Separate worker processes pick up jobs from the queue and execute the Offermage core logic.
        *   Workers update job status (in a DB or via WebSockets/SSE).
        *   **Benefit:** Decouples API from long tasks, resilient, scalable.
        *   **Complexity:** Adds a queue system and worker setup.

*   **Initial Recommendation:** Start with SSE or client-side polling for simplicity if builds are moderately fast (< 1-2 minutes). If they are longer or you need more robustness, move to WebSockets or a job queue.

## V. Deployment Considerations

*   **Next.js App:** Deployable to Vercel, Netlify, AWS Amplify, or self-hosted Node.js server.
*   **SQLite:** Suitable for local development and small-scale single-server deployments. For larger scale or multi-instance deployments, switch Prisma to PostgreSQL or MySQL.
*   **Offermage Core Dependency:** The web interface will need access to the Offermage core generator's files (`config/`, `templates/`, and its scripts).
    *   **Monorepo:** If both are in a monorepo (e.g., using Turborepo, Nx), this is easier.
    *   **Separate Repos:** The web app's build/runtime environment needs a way to access/invoke the generator. This could be via a published private NPM package, a submodule, or by packaging the generator logic with the web app deployment.
*   **Environment Variables:** `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, database URL, OpenAI API key, paths to Offermage core.

## VI. Testing Strategy

*   **Unit Tests (Jest/Vitest):** For utility functions, complex form logic, API wrapper functions.
*   **Integration Tests:** Test API route handlers with mocked core Offermage functions. Test interactions between Client Components and Server Components/Actions.
*   **End-to-End Tests (Playwright/Cypress):** Simulate user flows: login, create offer, trigger build, verify basic output.
*   **Focus on API stability:** Ensure the contract between frontend and backend API routes is well-tested.

## VII. Iteration & Future Enhancements

*   Detailed build logs view.
*   Offer config validation UI.
*   Version history for offer configs.
*   Deployment integration (trigger deployment of generated sites).
*   User roles and permissions.

This plan provides a comprehensive roadmap. Prioritize features based on immediate needs and iterate. The focus on JSDoc for quasi-type safety in a JavaScript project is a good compromise for DX.
