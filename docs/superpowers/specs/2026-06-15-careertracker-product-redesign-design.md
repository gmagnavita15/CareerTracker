# CareerTracker Product Redesign

## Objective

Transform CareerTracker into a polished, responsive career management product that demonstrates balanced full-stack engineering judgment. The result should feel like a credible SaaS application built by a strong junior-to-mid-level engineer, not a visual showcase or a simple CRUD demo.

## Product Direction

Use the approved "Balanced Product Engineer" direction:

- Clear information hierarchy and practical workflows
- Restrained, professional visual design
- Meaningful dashboard analytics
- Strong React and TypeScript organization
- Accessible and responsive interactions
- Defensive client-side persistence
- Reusable components and service-layer logic

Favor clarity and usability over visual complexity. Preserve all existing working features.

## Architecture

Retain the existing project structure:

- `components/`
- `pages/`
- `services/`
- `hooks/`
- `layout/`
- `constants/`
- `types.ts`

Keep application state in `App` for now. Pages receive domain data and typed update functions through props. Domain creation, updates, validation, migration, filtering, and analytics belong in services or focused utility modules so persistence can later move to Context API or a backend without rewriting the UI.

Add shared UI primitives where they reduce real duplication, including:

- `PageHeader`
- `StatusBadge`
- `EmptyState`
- `ConfirmDialog`
- `FormField`
- Responsive data-list/table patterns

Avoid adding a state library or UI framework. Remove currently unused UI dependencies if verification confirms they are unnecessary.

## Data Model

### Job Applications

Retain `id`, `company`, `role`, and `status`. Add:

- `dateApplied`
- `jobUrl`
- `location`
- `salaryRange`
- `contactName`
- `notes`
- `createdAt`
- `updatedAt`

### Projects

Retain `id`, `name`, `techStack`, and `status`. Add:

- `description`
- `githubUrl`
- `liveUrl`
- `priority`
- `createdAt`
- `updatedAt`

### Skills

Retain `id`, `name`, `category`, and `level`. Add:

- `targetLevel`
- `lastPracticed`
- `notes`
- `createdAt`
- `updatedAt`

### Notes

Retain `id`, `title`, `content`, and `category`. Add:

- `createdAt`
- `updatedAt`

Creation functions set timestamps automatically. Record updates refresh `updatedAt`.

## Persistence And Migration

Replace unsafe direct `JSON.parse` usage with versioned, defensive localStorage handling.

- Parse storage inside `try/catch`.
- Validate the top-level shape before using it.
- Migrate records individually and provide safe defaults for missing fields.
- Preserve valid existing data.
- Skip irrecoverably invalid records without crashing the app.
- Recover from malformed JSON using the supplied initial value.
- Catch storage read/write errors, including quota and security failures.
- Expose a non-blocking recovery message when stored data cannot be fully restored.

No secrets or sensitive credentials are stored. `.env` files remain ignored.

## App Shell And Visual System

Use a fixed desktop sidebar around 248px wide with a simple border and clear active navigation. Tablet and mobile layouts use a compact header and accessible navigation drawer.

The visual system uses:

- Neutral warm-gray surfaces
- A restrained green accent
- Compact 8-10px radii
- Subtle borders and minimal shadows
- Consistent 4/8/12/16/24/32px spacing
- Strong text contrast in light and dark themes
- Predictable focus states and short color/opacity transitions

Avoid gradients, glass effects, oversized cards, decorative dashboard copy, excessive badges, and ornamental animation.

## Dashboard

The dashboard presents meaningful, honest analytics:

- Total applications
- Interview rate
- Active projects
- Recently practiced skills
- Application status distribution
- Recent applications
- Active or high-priority projects
- Skills progressing toward target level
- Recent activity derived from record timestamps and updates

Empty datasets show useful onboarding states rather than fake data or misleading percentages.

## Applications

Provide:

- Search across company, role, location, status, and contact
- Status filtering and practical sorting
- Compact desktop table with company, role, location, applied date, and status
- Responsive mobile cards
- Expandable details for URL, salary, contact, and notes
- Labeled create form with inline validation
- Accessible status updates
- Confirmation before deletion

## Projects

Provide:

- Search plus status and priority filters
- Concise desktop rows or cards with responsive mobile behavior
- Expandable descriptions and repository/live links
- Typed priority and status controls
- Labeled validation and confirmation before deletion

## Skills

Provide:

- Search plus category and level filters
- Current-to-target progress presentation
- Last-practiced information
- Expandable notes
- Typed level controls
- Labeled validation and confirmation before deletion

## Notes

Provide:

- Search and category filters
- Readable note cards with created/updated timestamps
- Content truncation with accessible expansion
- Labeled validation and confirmation before deletion
- Structure that can support editing later without requiring editing in this scope

## Forms And Feedback

Forms use semantic labels, required indicators, sensible defaults, appropriate autocomplete attributes, character limits, and inline error text. Validate required text, dates, and optional URLs. Trim stored text values.

Use restrained toast messages for successful mutations and storage recovery. Do not rely on toast messages alone for validation or critical errors.

## Accessibility

- Use semantic landmarks, headings, forms, tables, buttons, and lists.
- Give every control a visible label or an appropriate accessible name.
- Support keyboard navigation for sidebar, dialogs, expandable details, and forms.
- Trap focus in the confirmation dialog and restore focus when it closes.
- Provide visible focus indicators.
- Preserve readable contrast in both themes.
- Avoid using color as the only status indicator.
- Respect reduced-motion preferences.

## Reliability And Error States

Local data loads synchronously, so do not add artificial loading spinners. Use:

- Empty states for valid empty collections
- Recovery notices for malformed or partially migrated data
- Safe fallbacks for invalid dates and URLs
- Error handling for localStorage access and writes
- Analytics that handle zero totals

## Testing And Verification

Add focused tests only where they provide clear value:

- Storage parsing and migrations
- Malformed JSON recovery
- Domain creation and update services
- Validation and analytics calculations

Final verification includes:

- TypeScript/Vite production build
- ESLint
- Focused automated tests
- Responsive checks at desktop, tablet, and mobile widths
- Keyboard and accessible-label checks for primary flows

## Documentation

Replace the template README with:

- Product description
- Feature overview
- Tech stack
- Architecture and data-flow notes
- Local setup
- Screenshots section
- Accessibility and persistence notes
- Roadmap

## Delivery Strategy

Implement in small, reviewable slices:

1. Fix the existing build failure and establish typed data models.
2. Add defensive persistence, migrations, validation, and focused tests.
3. Build shared UI primitives and the responsive app shell.
4. Modernize dashboard analytics.
5. Upgrade applications, projects, skills, and notes one domain at a time.
6. Finish theme consistency, accessibility, responsive behavior, and README.
7. Run complete verification and review the final diff for regressions.

