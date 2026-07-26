# DevFlow AI — Implementation Roadmap

**Duration:** 8 weeks · **Effort:** ~190 hours · **Team:** 1 engineer

**Legend** — `FE` frontend · `BE` backend · `DB` database · `INF` infrastructure

Every task is 1–3 hours. Task IDs are stable; reference them in commits (`feat(issues): add filter bar [M3-T06]`).

---

## Milestone map

| # | Milestone | Week | Hours | Tag |
|---|---|---|---|---|
| M0 | Foundation and infrastructure | 1 | 20 | `v0.1.0` |
| M1 | Auth, tenancy, domain core | 1–2 | 24 | `v0.2.0` |
| M2 | Application shell | 2–3 | 22 | `v0.3.0` |
| M3 | Issues — list and detail | 3–4 | 26 | `v0.4.0` |
| M4 | Board and optimistic drag | 4 | 20 | `v0.5.0` |
| M5 | Realtime and activity | 5 | 16 | `v0.6.0` |
| M6 | AI — triage, proposals, search | 5–6 | 32 | `v0.7.0` |
| M7 | GitHub integration | 7 | 20 | `v0.8.0` |
| M8 | Insights, demo, polish, launch | 8 | 28 | `v1.0.0` |

**Dependency spine:** M0 → M1 → M2 → M3 → M4 → M5 → M6 → M7 → M8

M5 and M7 can swap. M6 cannot start before M1 (events) and M3 (issues exist). Nothing can start before M1.

---

## M0 — Foundation and infrastructure

**Goal:** A deployable empty app with CI, tokens, and lint rules that will hold for eight weeks.

**Branch:** `chore/m0-foundation`

- [ ] **M0-T01** Init Next.js 15 + React 19 + TypeScript, `strict: true`, `noUncheckedIndexedAccess` · `INF` · 1h
- [ ] **M0-T02** Configure path aliases and the `src/` layout from the architecture spec · `INF` · 1h · needs T01
- [ ] **M0-T03** Install Tailwind v4, define the design token layer (color, spacing, radius, type scale, density vars) · `FE` · 3h · needs T01
- [ ] **M0-T04** Load and configure fonts (display + mono), set optical sizing and fallback metrics · `FE` · 1h · needs T03
- [ ] **M0-T05** Init shadcn/ui, install base primitives, verify they consume tokens not hardcoded values · `FE` · 2h · needs T03
- [ ] **M0-T06** ESLint flat config + import boundary rules (no cross-feature deep imports, `server/` cannot import `features/`) · `INF` · 2h · needs T02
- [ ] **M0-T07** Prettier, husky, lint-staged, commitlint with conventional commits · `INF` · 1h · needs T06
- [ ] **M0-T08** Env var schema validation with Zod, fail fast at boot, `.env.example` · `INF` · 1h · needs T01
- [ ] **M0-T09** GitHub Actions CI: typecheck, lint, build on every PR · `INF` · 2h · needs T07
- [ ] **M0-T10** Create Neon project with `main` and `dev` branches, capture pooled + direct connection strings · `DB` · 1h
- [ ] **M0-T11** Init Prisma, configure driver adapter for serverless pooling, verify connection from a route · `DB` · 2h · needs T10, T08
- [ ] **M0-T12** Create Vercel project, wire preview deploys, set env vars per environment · `INF` · 1h · needs T09
- [ ] **M0-T13** Install Sentry (client + server + edge), verify a thrown error reports with source maps · `INF` · 2h · needs T12

**Gate before M1:** CI green on a PR. Preview deploy loads. A deliberate error appears in Sentry with readable stack. `pnpm build` produces no type errors.

**Commit:** Squash to `chore: project foundation and CI`. Tag `v0.1.0`.

---

## M1 — Auth, tenancy, domain core

**Goal:** The layer nothing can be retrofitted into. No UI work until this is done and tested.

**Branch:** `feat/m1-auth-tenancy-core`

- [ ] **M1-T01** Install Clerk, add middleware, protected route matcher · `BE` · 2h
- [ ] **M1-T02** Sign-in / sign-up routes styled with app tokens, not default Clerk theme · `FE` · 2h · needs M1-T01, M0-T03
- [ ] **M1-T03** Enable Clerk Organizations, configure roles (owner, admin, member, viewer) · `INF` · 1h · needs M1-T01
- [ ] **M1-T04** Prisma schema v1: `User`, `Workspace`, `Membership`, `Project`, `Issue`, `Label`, `Event` · `DB` · 3h · needs M0-T11
- [ ] **M1-T05** Add `rank` field to `Issue` as a fractional-index string, plus the rank generation helper · `DB` · 2h · needs M1-T04
- [ ] **M1-T06** Indexes: composite on `(workspaceId, projectId, status, rank)`, plus `Event(workspaceId, createdAt)` · `DB` · 1h · needs M1-T05
- [ ] **M1-T07** Clerk webhook handler to sync users and organizations into Postgres, idempotent by event ID · `BE` · 3h · needs M1-T04, M1-T03
- [ ] **M1-T08** Prisma client extension that injects and asserts `workspaceId` on every model query · `BE` · 3h · needs M1-T04
- [ ] **M1-T09** `authorize()` policy module — single surface, resource + action + actor, typed · `BE` · 3h · needs M1-T08
- [ ] **M1-T10** Server action wrapper: session resolve → Zod parse → authorize → execute → typed error mapping · `BE` · 3h · needs M1-T09
- [ ] **M1-T11** `emitEvent()` helper that writes to `Event` inside the caller's transaction · `BE` · 2h · needs M1-T04
- [ ] **M1-T12** Seed script v1 — one workspace, five users, two projects, forty issues with realistic timestamps · `DB` · 3h · needs M1-T11

**Gate before M2 (do not skip):**
- [ ] Vitest: `authorize()` covers every role × action pair
- [ ] Vitest: a member of workspace A cannot read, update, or delete any record in workspace B — asserted directly against the Prisma extension
- [ ] Vitest: `emitEvent` rolls back with its parent transaction on failure
- [ ] Manual: sign up, create org, invite a second user, both land in the correct workspace

**Commit:** `feat: auth, multi-tenancy, and domain core`. Tag `v0.2.0`.

---

## M2 — Application shell

**Goal:** Every layout region, keyboard system, and shared state component exists before any page uses them.

**Branch:** `feat/m2-app-shell`

- [ ] **M2-T01** Route groups: `(marketing)`, `(auth)`, `(app)/[workspace]` · `FE` · 1h · needs M1-T01
- [ ] **M2-T02** `AppShell` layout — sidebar, content, panel regions, correct scroll containment · `FE` · 3h · needs M2-T01
- [ ] **M2-T03** Sidebar collapse with cookie persistence, server-rendered at the correct width · `FE` · 2h · needs M2-T02
- [ ] **M2-T04** `SidebarNav` — sections, active state with left marker, count badge slot · `FE` · 3h · needs M2-T03
- [ ] **M2-T05** Workspace switcher popover backed by Clerk orgs · `FE` · 2h · needs M2-T04, M1-T03
- [ ] **M2-T06** `PageHeader` — breadcrumb, view switcher slot, action slot, presence slot · `FE` · 2h · needs M2-T02
- [ ] **M2-T07** Keyboard shortcut registry — scoped handlers, conflict detection, no listener leaks · `FE` · 3h · needs M2-T02
- [ ] **M2-T08** `⌘/` shortcut sheet rendered from the registry, so it can never drift · `FE` · 1h · needs M2-T07
- [ ] **M2-T09** Command palette shell — `⌘K`, fuzzy search, grouped results, navigation actions only · `FE` · 3h · needs M2-T07
- [ ] **M2-T10** Theme (light/dark/system) and density (comfortable/compact) providers, persisted, no FOUC · `FE` · 2h · needs M0-T03
- [ ] **M2-T11** `Row` primitive — leading slot, primary, secondary, meta, action slots · `FE` · 2h · needs M0-T05
- [ ] **M2-T12** `DataList` with `empty`, `loading`, and `error` as required props · `FE` · 2h · needs M2-T11
- [ ] **M2-T13** `EmptyState`, `ErrorState`, `Skeleton` — skeletons matching real row dimensions · `FE` · 2h · needs M2-T11
- [ ] **M2-T14** Error boundaries, `not-found`, and global `error.tsx` per route group · `FE` · 2h · needs M2-T01
- [ ] **M2-T15** `PanelShell` — resizable, URL-driven open state, focus trap and focus return · `FE` · 3h · needs M2-T02

**Gate before M3:**
- [ ] Keyboard only: navigate the entire shell, open and close the palette and panel, focus always returns to the trigger
- [ ] axe: zero violations on the shell
- [ ] Reload with sidebar collapsed and dark mode — no flash of wrong state
- [ ] Storybook or a scratch route renders every shared component in all three states

**Commit:** `feat: application shell, keyboard system, shared components`. Tag `v0.3.0`.

---

## M3 — Issues, list and detail

**Goal:** Prove the full vertical slice — action, policy, event, optimistic UI, undo — on the simplest view first.

**Branch:** `feat/m3-issues-core`

- [ ] **M3-T01** Zod schemas for issue create, update, and filter, shared by actions and forms · `BE` · 2h · needs M1-T10
- [ ] **M3-T02** Server actions: create, update, archive — each emitting an event in-transaction · `BE` · 3h · needs M3-T01, M1-T11
- [ ] **M3-T03** Query layer: paginated, filtered, sorted issue fetch with cursor pagination · `BE` · 3h · needs M1-T08
- [ ] **M3-T04** TanStack Query setup — client provider, query keys, hydration from RSC · `FE` · 2h · needs M3-T03
- [ ] **M3-T05** Issue list view — table layout, sticky header, resizable columns · `FE` · 3h · needs M2-T12, M3-T04
- [ ] **M3-T06** `FilterBar` — chips, add/remove, URL encode and decode, shareable links · `FE` · 3h · needs M3-T05
- [ ] **M3-T07** Selection model — click selects, Enter opens, Shift range, `x` toggles · `FE` · 3h · needs M3-T05
- [ ] **M3-T08** `IssueDetailPanel` — title, description, status, assignee, priority, labels, estimate · `FE` · 3h · needs M2-T15, M3-T04
- [ ] **M3-T09** Full issue page at `/[workspace]/issue/[id]`, promoted from the panel via `⌘⏎` · `FE` · 2h · needs M3-T08
- [ ] **M3-T10** Contextual shortcuts on a focused row: `a` `s` `l` `p` `e` with popovers · `FE` · 3h · needs M3-T07, M2-T07
- [ ] **M3-T11** Optimistic mutation hook — apply, rollback, and error toast with `Undo` · `FE` · 3h · needs M3-T04
- [ ] **M3-T12** Undo stack — `⌘Z` reverses the last mutation via an inverse action · `FE` · 3h · needs M3-T11
- [ ] **M3-T13** Comments — create, list, optimistic append, event emission · `BE` `FE` · 3h · needs M3-T02
- [ ] **M3-T14** Virtualize the list past 50 rows, preserve scroll position across navigation · `FE` · 2h · needs M3-T05
- [ ] **M3-T15** Add issue create and search to the command palette · `FE` · 2h · needs M2-T09, M3-T02

**Gate before M4:**
- [ ] Playwright: sign in → create issue → edit title, status, assignee → comment → archive
- [ ] Playwright: a forced server failure rolls the optimistic update back and shows `Undo`
- [ ] Copy a filtered URL into a new session — the same filter state loads
- [ ] Vitest: filter URL encode/decode round-trips every filter type
- [ ] Every issue mutation produces exactly one `Event` row — verified in the database

**Commit:** `feat: issue list, detail panel, optimistic mutations, undo`. Tag `v0.4.0`.

---

## M4 — Board and optimistic drag

**Goal:** The screen recruiters will judge. It must never feel laggy.

**Branch:** `feat/m4-issue-board`

- [ ] **M4-T01** Board layout — status columns from project config, horizontal scroll, sticky headers · `FE` · 3h · needs M3-T05
- [ ] **M4-T02** `IssueCard` — ID in mono, two-line title, label dots, avatar, estimate, PR glyph · `FE` · 3h · needs M2-T11
- [ ] **M4-T03** Install dnd-kit, configure sensors, keyboard drag support · `FE` · 2h · needs M4-T01
- [ ] **M4-T04** Rank recalculation on drop using fractional indexing, with rebalance fallback · `BE` · 3h · needs M1-T05
- [ ] **M4-T05** Optimistic drag — placeholder gap, spring on drop, rollback animation on failure · `FE` · 3h · needs M4-T03, M3-T11
- [ ] **M4-T06** Column virtualization and WIP counts · `FE` · 2h · needs M4-T01
- [ ] **M4-T07** Multi-select on the board with a bulk action bar (status, assignee, label, archive) · `FE` · 3h · needs M3-T07
- [ ] **M4-T08** Saved views — persist filter + grouping + view type, list in the sidebar · `BE` `FE` · 3h · needs M3-T06
- [ ] **M4-T09** Per-project last-used view memory · `FE` · 1h · needs M4-T08

**Gate before M5:**
- [ ] Playwright: drag a card between columns, reload, position persists
- [ ] Vitest: fractional rank generation never collides across 10,000 sequential inserts at the same position
- [ ] Vitest: rebalance triggers correctly when precision is exhausted
- [ ] Manual: drag on a throttled 3G profile still feels instant
- [ ] Keyboard drag works end to end

**Commit:** `feat: kanban board with optimistic drag and bulk actions`. Tag `v0.5.0`.

---

## M5 — Realtime and activity

**Goal:** Highest perceived sophistication per hour in the project.

**Branch:** `feat/m5-realtime-presence`

- [ ] **M5-T01** Provision the realtime provider (Ably or Pusher), configure channel naming per workspace · `INF` · 1h
- [ ] **M5-T02** Token auth endpoint that validates workspace membership before granting channel access · `BE` · 2h · needs M5-T01, M1-T09
- [ ] **M5-T03** Publish events to the workspace channel after transaction commit, never before · `BE` · 3h · needs M1-T11, M5-T02
- [ ] **M5-T04** Client subscription hook that reconciles incoming events into the TanStack cache · `FE` · 3h · needs M5-T03, M3-T04
- [ ] **M5-T05** Suppress reordering while a pointer is down or a menu is open; queue and apply after · `FE` · 2h · needs M5-T04, M4-T05
- [ ] **M5-T06** Presence — join/leave, avatar stack in the page header, idle detection · `FE` · 3h · needs M5-T02
- [ ] **M5-T07** `ActivityItem` component and the project activity feed · `FE` · 2h · needs M2-T11, M5-T04
- [ ] **M5-T08** Remote change highlight — 600ms decay, respects `prefers-reduced-motion` · `FE` · 2h · needs M5-T04

**Gate before M6:**
- [ ] Two browsers side by side: a change in one appears in the other in under a second
- [ ] Dragging in browser A while browser B moves the same card does not corrupt either view
- [ ] Disconnect and reconnect — the client resyncs without a reload
- [ ] Channel auth rejects a user who is not a member of that workspace

**Commit:** `feat: realtime sync, presence, activity feed`. Tag `v0.6.0`.

---

## M6 — AI: triage, proposals, semantic search

**Goal:** The differentiator. Nothing here writes to an issue without human approval.

**Branches:** `feat/m6a-ai-foundation`, `feat/m6b-ai-triage`, `feat/m6c-semantic-search`, `feat/m6d-assistant-console`

### 6a — Foundation

- [ ] **M6-T01** Install Vercel AI SDK, configure the provider registry with model aliases · `BE` · 2h
- [ ] **M6-T02** Prisma schema v2: `AiRun`, `Proposal`, `ProposalField` with a status enum and audit columns · `DB` · 3h · needs M1-T04
- [ ] **M6-T03** Install Inngest, wire the serve route, verify a job runs locally and on preview · `INF` · 3h · needs M0-T12
- [ ] **M6-T04** Prompt module — versioned prompt constants, no inline strings in business logic · `BE` · 2h · needs M6-T01
- [ ] **M6-T05** Run recorder — persist model, tokens, latency, cost on every AI call · `BE` · 2h · needs M6-T02

### 6b — Triage

- [ ] **M6-T06** Zod output schema for a triage proposal (labels, priority, estimate, acceptance criteria, subtasks) · `BE` · 2h · needs M6-T04
- [ ] **M6-T07** Inngest triage job — durable, retried, idempotent per issue version · `BE` · 3h · needs M6-T03, M6-T06
- [ ] **M6-T08** Trigger triage on issue creation, respecting the workspace auto-run setting · `BE` · 2h · needs M6-T07
- [ ] **M6-T09** `DiffField` component — current vs proposed, per-field accept, reject, edit · `FE` · 3h · needs M2-T11
- [ ] **M6-T10** `ProposalCard` in the issue panel, with skeleton-first streaming · `FE` · 3h · needs M6-T09, M3-T08
- [ ] **M6-T11** Accept / reject / edit server actions that apply deltas and emit events · `BE` · 3h · needs M6-T02, M3-T02
- [ ] **M6-T12** Failure and retry UI — error, attempt count, manual retry · `FE` · 2h · needs M6-T10
- [ ] **M6-T13** Proposals surface in the Today attention band with inline accept · `FE` · 2h · needs M6-T10

### 6c — Semantic search

- [ ] **M6-T14** Enable pgvector on Neon, add the embedding column and an HNSW index · `DB` · 2h · needs M1-T04
- [ ] **M6-T15** Embedding job — on create and on meaningful update, debounced, backfill-capable · `BE` · 3h · needs M6-T14, M6-T03
- [ ] **M6-T16** Hybrid search query — vector similarity plus keyword, workspace-scoped · `BE` · 3h · needs M6-T15
- [ ] **M6-T17** Semantic search in the command palette with citation chips · `FE` · 3h · needs M6-T16, M2-T09

### 6d — Console and controls

- [ ] **M6-T18** Assistant run list — status, type, duration, cost, filters · `FE` · 3h · needs M6-T05
- [ ] **M6-T19** Run detail — input, collapsed reasoning trace, proposal diff, outcome, metrics · `FE` · 3h · needs M6-T18
- [ ] **M6-T20** Composer with a scope selector (issue / project / workspace / selection) · `FE` · 3h · needs M6-T16
- [ ] **M6-T21** AI settings — default model, monthly spend cap with live usage, per-trigger toggles · `FE` `BE` · 3h · needs M6-T05
- [ ] **M6-T22** Enforce the spend cap server-side; degrade gracefully with a clear message · `BE` · 2h · needs M6-T21

**Gate before M7:**
- [ ] Vitest: the proposal state machine rejects every invalid transition
- [ ] Vitest: malformed model output fails schema validation and marks the run failed rather than writing partial data
- [ ] Integration: replaying the same Inngest event twice produces one proposal, not two
- [ ] Manual: kill the job mid-run — it retries and completes
- [ ] Manual: no AI path can write to an issue without an accept action
- [ ] Spend cap blocks a run when exceeded

**Commit:** four squashed merges, one per sub-branch. Tag `v0.7.0`.

---

## M7 — GitHub integration

**Goal:** Prove operational maturity, not GitHub feature parity.

**Branch:** `feat/m7-github-integration`

- [ ] **M7-T01** Register a GitHub App, configure permissions and webhook events · `INF` · 2h
- [ ] **M7-T02** Prisma schema v3: `Repository`, `PullRequest`, `Commit`, `WebhookDelivery` · `DB` · 2h · needs M1-T04
- [ ] **M7-T03** Install and callback flow, storing installation tokens encrypted · `BE` · 3h · needs M7-T01, M7-T02
- [ ] **M7-T04** Webhook route handler with HMAC signature verification, rejecting unsigned payloads · `BE` · 2h · needs M7-T03
- [ ] **M7-T05** Idempotent ingestion keyed on delivery ID, persisting the raw payload · `BE` · 3h · needs M7-T04
- [ ] **M7-T06** Hand off processing to Inngest so the webhook responds in under a second · `BE` · 2h · needs M7-T05, M6-T03
- [ ] **M7-T07** Branch-name and PR-body auto-linking by issue key · `BE` · 2h · needs M7-T06
- [ ] **M7-T08** AI link suggestions for unmatched PRs, reusing the proposal model · `BE` · 3h · needs M7-T07, M6-T11
- [ ] **M7-T09** Backfill job for existing PRs and commits on connect, with visible progress · `BE` · 3h · needs M7-T06
- [ ] **M7-T10** Unlinked activity UI with one-click link and dismiss · `FE` · 3h · needs M7-T08
- [ ] **M7-T11** Linked activity stream — two-column Git object to issue mapping · `FE` · 3h · needs M7-T07
- [ ] **M7-T12** Webhook health table — last 25 deliveries, status, duration, retries, replay · `FE` · 3h · needs M7-T05
- [ ] **M7-T13** PR status glyphs on issue cards and rows · `FE` · 2h · needs M7-T07, M4-T02

**Gate before M8:**
- [ ] Vitest: an invalid HMAC signature is rejected with 401
- [ ] Vitest: replaying the same delivery ID twice creates one record
- [ ] Integration: a webhook received for an unknown repo fails gracefully and is logged
- [ ] Manual: webhook responds in under 1s under load; processing happens async
- [ ] Manual: replay from the health table reprocesses correctly

**Commit:** `feat: github app, webhook ingestion, issue linking`. Tag `v0.8.0`.

---

## M8 — Insights, demo mode, polish, launch

**Goal:** The 90 seconds a recruiter actually spends. Everything here is high-leverage.

**Branches:** `feat/m8a-insights`, `feat/m8b-demo-mode`, `chore/m8c-polish-pass`, `docs/m8d-engineering`

### 8a — Insights

- [ ] **M8-T01** Derive cycle time, throughput, and WIP from the event log with a SQL aggregate · `DB` · 3h · needs M1-T11
- [ ] **M8-T02** Insights page — Recharts, real derived data only, no vanity metrics · `FE` · 3h · needs M8-T01

### 8b — Demo mode

- [ ] **M8-T03** Seed script v2 — a fictional team shipping a plausible product, months of realistic history · `DB` · 3h · needs M1-T12
- [ ] **M8-T04** Demo workspace provisioning — ephemeral tenant, instant entry, no signup · `BE` · 3h · needs M8-T03, M1-T09
- [ ] **M8-T05** Nightly reset job for demo tenants · `INF` · 2h · needs M8-T04, M6-T03
- [ ] **M8-T06** Landing page with a single "Explore demo workspace" action · `FE` · 3h · needs M8-T04

### 8c — Polish

- [ ] **M8-T07** Mobile: bottom tab bar, drawer sidebar, board as grouped list · `FE` · 3h · needs M2-T04
- [ ] **M8-T08** Mobile: full-screen issue sheet, bottom-sheet filters, thumb-zone AI actions · `FE` · 3h · needs M8-T07
- [ ] **M8-T09** Accessibility pass — axe on every route, focus order, live regions, contrast · `FE` · 3h
- [ ] **M8-T10** Performance pass — bundle analysis, RSC boundary audit, image and font optimization · `FE` · 3h
- [ ] **M8-T11** Lighthouse CI in the pipeline with a failing budget · `INF` · 2h · needs M8-T10, M0-T09
- [ ] **M8-T12** Empty and error state audit — every list, panel, and page has all three states · `FE` · 2h
- [ ] **M8-T13** `/design` route documenting tokens, scale, and components · `FE` · 2h · needs M0-T03

### 8d — Launch

- [ ] **M8-T14** `/engineering` page with five short ADRs and their tradeoffs · `FE` · 3h
- [ ] **M8-T15** README — problem, demo link, 60-second video, architecture diagram, decisions · `INF` · 2h
- [ ] **M8-T16** Record the 60-second Loom showing the AI triage accept flow · `INF` · 1h · needs M8-T06
- [ ] **M8-T17** Sentry alerts, Vercel Analytics, uptime check on the demo route · `INF` · 2h
- [ ] **M8-T18** Production deploy, custom domain, final smoke test of the full journey · `INF` · 2h

**Gate before launch:**
- [ ] Playwright: the full demo journey passes on Chrome, Safari, and mobile Safari
- [ ] Lighthouse: performance ≥ 90, accessibility ≥ 95 on the three main routes
- [ ] axe: zero critical violations across all routes
- [ ] Every nav item leads somewhere real — no placeholders
- [ ] Cold load of the demo workspace under three seconds
- [ ] A stranger can reach the AI proposal screen in under 30 seconds without instructions

**Commit:** four squashed merges. Tag `v1.0.0`.

---

## Ship checklist

Cross-cutting items that are nobody's task and therefore get forgotten.

### Correctness
- [ ] No query anywhere bypasses the tenancy extension
- [ ] Every mutation emits exactly one event
- [ ] Every AI write path passes through a proposal
- [ ] Every webhook handler is idempotent
- [ ] No secrets in the client bundle — verify with a bundle grep

### Experience
- [ ] Every list has loading, empty, and error states
- [ ] Every destructive action has confirmation and undo where possible
- [ ] Every shortcut appears in `⌘/`
- [ ] Focus returns to the trigger on every panel and dialog close
- [ ] Nothing animates on page load
- [ ] `prefers-reduced-motion` is respected everywhere

### Operations
- [ ] Sentry has release tracking and source maps
- [ ] Inngest failures alert somewhere you will see them
- [ ] Neon has a backup or branch strategy documented
- [ ] AI spend cap is set and tested
- [ ] Demo reset job has run successfully at least twice

### Portfolio
- [ ] Demo requires no account
- [ ] Seed data is plausible, never lorem or "Task 1"
- [ ] README explains decisions, not just the stack
- [ ] ADRs are written and linked
- [ ] Loom is recorded and embedded
- [ ] One blog post drafted on the hardest problem solved

---

## Cut order if you fall behind

Drop in this sequence. Do not deviate — items lower on the list carry more signal per hour.

1. Docs editor (already excluded from this plan)
2. Insights page (M8a)
3. Semantic search (M6c)
4. Bulk actions and saved views (M4-T07, M4-T08)
5. Realtime presence — keep sync, drop avatars (M5-T06)

Never cut: demo mode, the AI proposal flow, the tenancy tests, the polish pass.
