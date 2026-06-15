# CareerTracker Product Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a stable, responsive, accessible career management SaaS interface with richer typed data, safe localStorage migrations, meaningful analytics, and polished CRUD workflows.

**Architecture:** Keep state ownership in `App.tsx`, but isolate domain behavior in services and persistence behavior in hooks/utilities. Build a small shared component layer and use page-level components for domain-specific presentation, allowing future Context API or backend migration without rewriting UI contracts.

**Tech Stack:** React 19, TypeScript 6, Vite 8, React Router 7, CSS, react-hot-toast, Vitest for focused service tests.

---

## File Map

**Create**

- `src/services/storageService.ts`: versioned parsing, record migrations, and safe defaults.
- `src/services/validationService.ts`: reusable text, URL, and date validation.
- `src/services/activityService.ts`: typed recent-activity derivation.
- `src/components/AppIcon.tsx`: dependency-free SVG icon system.
- `src/components/PageHeader.tsx`: consistent page heading and optional actions.
- `src/components/StatusBadge.tsx`: typed semantic status presentation.
- `src/components/EmptyState.tsx`: reusable onboarding and no-results states.
- `src/components/ConfirmDialog.tsx`: accessible destructive-action confirmation.
- `src/components/FormField.tsx`: labels, hints, and inline errors.
- `src/components/DetailPanel.tsx`: expandable secondary record details.
- `src/components/FilterBar.tsx`: responsive search/filter container.
- `src/services/storageService.test.ts`
- `src/services/dashboardService.test.ts`
- `src/services/validationService.test.ts`

**Modify**

- `src/types.ts`, `src/constants.ts`: expanded domain contracts and storage keys.
- `src/hooks/useLocalStorage.ts`: defensive versioned persistence and recovery status.
- `src/services/applicationService.ts`, `projectService.ts`, `dashboardService.ts`: typed CRUD and analytics.
- `src/App.tsx`, `src/main.tsx`: migrated state setup and global feedback.
- `src/layout/MainLayout.tsx`, `Sidebar.tsx`: responsive accessible product shell.
- `src/pages/*.tsx`, `src/components/*List.tsx`: redesigned workflows.
- `src/index.css`: complete visual system and responsive behavior.
- `src/App.css`: remove unused template styles.
- `package.json`: focused test script and test runner.
- `README.md`: portfolio-ready documentation.

## Task 1: Typed Data And Safe Persistence

- [ ] Add focused failing tests for malformed JSON, legacy record migration, invalid-record skipping, URL validation, and zero-total analytics.
- [ ] Run `npm test -- --run` and confirm failures are caused by missing migration and validation APIs.
- [ ] Expand domain types with all approved professional fields and typed project priorities.
- [ ] Implement migration functions that preserve valid legacy fields, normalize strings, supply timestamp/default values, and skip records without required identity fields.
- [ ] Refactor `useLocalStorage` to accept a parser, catch read/write errors, and return typed recovery information.
- [ ] Refactor creation/update services to trim input and refresh `updatedAt`.
- [ ] Fix the dashboard `position`/`role` build failure.
- [ ] Run tests, lint, and build until green.

## Task 2: Shared Product Shell And UI Primitives

- [ ] Add reusable icon, header, badge, field, empty-state, detail, filter, and confirmation components.
- [ ] Implement keyboard-accessible confirmation behavior using the native dialog API with focus restoration.
- [ ] Redesign the sidebar and main layout for desktop, tablet, and mobile navigation.
- [ ] Add accessible light/dark theme controls and persist the chosen theme safely.
- [ ] Replace the existing CSS with a token-based light/dark visual system and responsive utilities.
- [ ] Verify navigation, keyboard focus, and layout at 1440px, 900px, and 390px widths.

## Task 3: Dashboard Analytics

- [ ] Extend dashboard services with interview rate, active-project count, recently-practiced skills, pipeline distribution, and recent activity.
- [ ] Update analytics tests and verify correct empty-state behavior.
- [ ] Rebuild the dashboard with four meaningful KPIs, pipeline visualization, recent applications, active projects, skill progress, and recent activity.
- [ ] Ensure analytics use real stored data and never render fake values.
- [ ] Run tests, lint, and build.

## Task 4: Applications Workflow

- [ ] Expand the create form with approved fields, labels, limits, and inline validation.
- [ ] Add search, status filtering, and newest/oldest/company sorting.
- [ ] Build a concise desktop table and mobile card presentation.
- [ ] Add expandable secondary details and safe external links.
- [ ] Add status updates with refreshed timestamps and confirmed deletion.
- [ ] Verify add, filter, expand, update, delete, empty, and no-results flows.

## Task 5: Projects Workflow

- [ ] Expand the project form and service contract with description, URLs, priority, and timestamps.
- [ ] Add search plus status and priority filters.
- [ ] Render concise responsive project records with expandable description and links.
- [ ] Add typed status updates and confirmed deletion.
- [ ] Verify all project flows and run lint/build.

## Task 6: Skills Workflow

- [ ] Expand skill creation with target level, last-practiced date, and notes.
- [ ] Add search, category, and level filters.
- [ ] Present current-to-target progress and expandable practice notes.
- [ ] Add typed level updates and confirmed deletion.
- [ ] Verify all skill flows and run lint/build.

## Task 7: Notes Workflow

- [ ] Add timestamps to note creation and migration.
- [ ] Add search and category filters.
- [ ] Render readable responsive note cards with timestamps and accessible content expansion.
- [ ] Add confirmed deletion.
- [ ] Verify all note flows and run lint/build.

## Task 8: Documentation And Final Verification

- [ ] Replace the template README with product, feature, stack, architecture, setup, screenshot, accessibility, persistence, and roadmap sections.
- [ ] Remove unused dependencies and template assets/styles only after confirming no imports remain.
- [ ] Run `npm test -- --run`, `npm run lint`, and `npm run build`.
- [ ] Inspect the final diff for unsafe HTML, unlabelled controls, broken links, secrets, unrelated changes, and malformed storage regressions.
- [ ] Summarize changed files, improvements, residual risks, and recommended next steps.
