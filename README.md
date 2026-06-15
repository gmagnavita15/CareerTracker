# CareerTracker

CareerTracker is a local-first career management dashboard for organizing a job search, portfolio projects, technical development, and interview knowledge. It is designed as a polished SaaS-style product while keeping data private in the browser.

## Features

- Application pipeline with professional fields, status updates, search, filters, sorting, and expandable details
- Dashboard analytics for interview rate, active projects, recent skill practice, pipeline distribution, and workspace activity
- Portfolio project tracking with delivery status, priority, descriptions, GitHub links, and live URLs
- Skill goals with current and target levels, practice dates, notes, and progress visualization
- Searchable career notes organized by category
- Defensive localStorage migration for legacy and malformed saved data
- Responsive desktop, tablet, and mobile layouts
- Accessible labels, keyboard navigation, focus states, semantic HTML, and confirmation dialogs
- Consistent light and dark themes

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- CSS with design tokens and responsive layouts
- Vitest for focused service tests
- react-hot-toast for concise mutation feedback

## Architecture

```text
src/
├── components/    Reusable UI primitives and domain views
├── hooks/         Browser persistence hooks
├── layout/        Responsive application shell
├── pages/         Route-level components
├── services/      Domain operations, migrations, validation, and analytics
├── constants.ts   Typed domain options and storage keys
└── types.ts       Shared domain contracts
```

`App.tsx` currently owns domain state and passes typed setters to route components. Persistence, migrations, validation, formatting, analytics, and record operations are isolated from presentation so state can later move to Context API or a backend without rewriting the user interface.

## Data Reliability

CareerTracker keeps the original browser storage keys to preserve existing installations. Stored collections are parsed inside guarded code, migrated record-by-record, and supplied with defaults for newly introduced fields. Invalid records are skipped instead of crashing the application, and storage failures surface as non-blocking recovery notices.

No secrets or credentials belong in the frontend. Environment files are ignored by Git.

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

### Quality Checks

```bash
npm test -- --run
npm run lint
npm run build
```

## Screenshots

Recommended portfolio captures:

- Dashboard overview in light mode
- Application pipeline on desktop
- Responsive mobile navigation and record cards
- Dashboard or projects page in dark mode

## Accessibility

- Skip link and semantic page landmarks
- Visible focus indicators
- Labeled forms, filters, icon buttons, and status controls
- Native dialog behavior for destructive confirmations
- Mobile navigation with accessible expanded state
- Status text that does not rely on color alone
- Reduced-motion support

## Roadmap

- Edit existing records
- Import and export workspace data
- Optional cloud sync and authentication
- Reminders for follow-ups and interview dates
- Deeper trend analytics and date-range reporting
- Automated component-level accessibility checks

## Privacy

CareerTracker is local-first. Application, project, skill, and note data remain in the current browser unless a future sync feature is explicitly added.
