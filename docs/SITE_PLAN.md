# New York, Someday — site plan

## Original plan
1. Tell a personal, future-facing story about a first visit to New York City.
2. Use five complete routes: Home, Explore, Gallery, Plan My Trip, and Why NYC.
3. Build a static React application with Vite, Tailwind CSS, and HashRouter.
4. Pair warm ivory and midnight navy with restrained terracotta accents and editorial serif headings.
5. Make real, locally stored, licensed photography central to the experience.
6. Help visitors discover places through combined search, category filters, details, and persistent favorites.
7. Turn one to four days and selected interests into a geographically grouped, editable-by-regeneration plan.
8. Support keyboard navigation, native dialogs, reduced motion, clear focus, and small screens.
9. Verify logic, browser interactions, accessibility, production assets, and repository-subpath routing.
10. Record actual AI work and test evidence; leave personal review and reflection to the student.

## Audience and purpose
People curious about a first NYC trip, visitors collecting ideas before booking, and an instructor reviewing an AI-assisted frontend project. The site is an independent wish list, not a booking service or a record of a completed trip.

## Page architecture
| Route | Purpose | Main content and interactions |
| --- | --- | --- |
| `#/` | Introduce the dream | Skyline hero, personal introduction, six featured places, experience links, planning CTA |
| `#/explore` | Discover destinations | Search, categories, saved-only filter, 12 destination cards, accessible detail dialog |
| `#/gallery` | Explore photography | Composed responsive photo grid, credits, keyboard lightbox |
| `#/plan` | Build a practical outline | Duration, interests, deterministic daily suggestions, save/load/reset/print, travel tips |
| `#/why-nyc` | Explain the personal motivation | Six original editorial sections and an imagined first day |

## Design direction
Midnight navy `#101827`, warm ivory `#F8F7F3`, terracotta `#D97745`, slate `#64748B`, ink `#172033`. Darker terracotta supports accessible button/text contrast. Playfair Display headings and DM Sans UI. Use cinematic imagery, small uppercase labels, generous margins, thin rules, subtly rounded controls, and varied page compositions. Tailwind handles layout/responsive utilities; `src/index.css` owns shared tokens, component treatments, focus, motion, and print styles.

## Data and architecture
Destination and photo modules are shared by all pages. Pure planning rules live outside React. A context shares favorites; a validated storage hook handles blocked storage and malformed data. Native HTML dialogs handle modal focus trapping and Escape. Saved itineraries store only validated IDs and selections, not duplicated place descriptions. No backend, accounts, live data, API keys, or booking simulation.

## Milestones and verification
1. Plan and setup: inspect clean repository, preserve origin, record full supplied prompt.
2. Shell: routing, navigation, footer, global styles; compile.
3. Content: original copy, destination records, verified photo assets; check links and asset mapping.
4. Design: responsive layouts and image compositions; inspect viewport screenshots.
5. Interactivity: discovery, favorites, dialogs, and itinerary persistence; exercise edge cases.
6. QA: lint, unit tests, production browser tests, accessibility scans, regression fixes.
7. Delivery: final build, truthful test report, editable reflection, deployment workflow and README.

Commits will record work actually completed; overlapping implementation stages may be combined if necessary. No deployment is claimed until confirmed externally.

## Student review checkpoints
- Review the visual hierarchy and future-facing personal copy; request concrete wording or design revisions.
- Review the discovery/favorites/lightbox behavior using keyboard and phone.
- Inspect generated itineraries and explain the grouping/scoring rules in your own words.
- Complete personal reflection and prompt-log review fields after doing the reviews above.
