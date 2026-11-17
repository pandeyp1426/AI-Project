# AI-Project
# New York, Someday

**A city I haven't explored yet, but can't wait to discover.**

A complete five-page travel wish list about a future first visit to New York City. Cinematic photography and original personal writing accompany destination discovery, persistent favorites, a keyboard-accessible gallery, and a practical local itinerary builder.

Built for a university AI-Assisted Coding assignment. This is a standalone static application with no backend, database, account, API key, paid service, or simulated booking functionality.

## Run locally

Use **Node.js 24 LTS** (tested with 24.20.0), npm, and a modern browser.

```sh
cd AI-Project
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173/AI-Project/`. Vite chooses another port if necessary. In Windows PowerShell with script execution disabled, use `npm.cmd` instead of `npm`; no policy change is needed.

```sh
npm run build        # production files in dist/
npm run preview      # serve the production build, usually port 4173
npm run lint         # ESLint
npm run format:check # Prettier verification
npm test             # Node unit tests
npm run format       # apply consistent formatting
```

Serve the build with `npm run preview` or a static host; do not open `dist/index.html` as a local file URL.

## Pages and features

| Page         | Route       | Main features                                                                                    |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------ |
| Home         | `#/`        | Skyline hero, personal introduction, six featured places, themed discovery links                 |
| Explore      | `#/explore` | 12 destinations, full-text search, combined category/favorites filters, detail dialogs           |
| Gallery      | `#/gallery` | 13 local photos, responsive masonry composition, keyboard lightbox, full photo credits           |
| Plan My Trip | `#/plan`    | 1–4 days, six interests, morning/afternoon/evening suggestions, save/load/reset/regenerate/print |
| Why NYC      | `#/why-nyc` | Six original editorial sections and an imagined first day                                        |

All pages share sticky navigation, active-route indication, an accessible mobile menu, a skip link, and a footer. Search includes names, locations, descriptions, and details: “Central Park” also finds the Met because its description mentions the park.

## Stack and structure

React 19 with functional components/hooks, Vite 8, Tailwind CSS 4 using `@tailwindcss/vite`, JavaScript/JSX, React Router's HashRouter, Lucide React, and browser LocalStorage. Playfair Display and DM Sans are self-hosted through Fontsource. ESLint, Prettier, Node's built-in test runner, Playwright, and axe support development.

```text
src/
  components/    Navigation, cards, photos/credits, dialogs, gallery and planner
  context/       Shared favorites state
  pages/         Home, Explore, Gallery, PlanTrip, WhyNYC
  data/          destinations.js, photos.js, gallery.js, itinerary.js
  hooks/         useLocalStorage.js
  utils/         Filtering, safe storage, deterministic planning
  App.jsx        Five routes and not-found recovery
  main.jsx       React, HashRouter, fonts and external CSS
  index.css      Tailwind entry, theme, shared styles, responsive/print rules
public/
  images/        13 WebP photographs, about 2.37 MiB total
  licenses/      Distributed font license texts
  favicon.svg
tests/
  unit/          Logic, data, storage and local assets
  e2e/           Production browser tests and accessibility scans
docs/
  SITE_PLAN.md, PROMPT_LOG.md, ORIGINAL_PROMPT.txt, TEST_REPORT.md
  REFLECTION.md, IMAGE_CREDITS.md, CONTENT_SOURCES.md
  THIRD_PARTY_NOTICES.md
.github/workflows/deploy.yml
```

## Understand the implementation

**Assignment mapping:** JSX renders semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`, buttons and links). The five React page components replace separate traditional HTML files. `src/index.css` is the shared external stylesheet; Vite compiles Tailwind into external production CSS. React event handlers, hooks and imported JavaScript modules fulfill the interactive JavaScript requirement.

**Design:** Midnight navy, warm ivory, restrained terracotta and darker rust for accessible controls; editorial serif headings, modern sans-serif text, distinct page compositions, consistent spacing. Tailwind uses its [current official Vite integration](https://tailwindcss.com/docs/installation/using-vite), not a legacy PostCSS setup.

**Planning rules:** Five curated geographic day templates each contain three time blocks with candidate activities. Matching interests score candidates and areas; art/museum interest gives the Met extra weight. Editorial order resolves ties. A used-ID set prevents duplicates. The best one to four areas become the trip. Empty interests use the default order. The harbor day leaves its afternoon flexible for the island visit. The same settings produce the same plan; regeneration is deliberately not random.

**Saving:** `nyc-someday:favorites:v1` stores validated destination IDs; `nyc-someday:itinerary:v1` stores validated duration/interests. The deterministic generator reconstructs the saved itinerary. A later change to planning data could change that reconstruction. Reset does not delete the saved plan. Storage exceptions produce feedback; favorites still work in memory, while failed itinerary writes retain the last successfully saved preferences. Data stays in the current browser/profile/origin, with no cross-device or live cross-tab synchronization.

**Dialogs:** A shared native `<dialog>` uses `showModal()` for focus trapping/background inertness, restores focus to its trigger, blocks background scrolling, and closes on Escape or backdrop click. The gallery adds wrapping arrow-key navigation and buttons.

## Accessibility and testing

One primary heading per page, semantic landmarks, descriptive alt text, visible focus, labeled inputs, button state announcements, live status feedback, reduced-motion support, responsive image dimensions, lazy loading, and print styling are included. Widths checked on every page: **320, 375, 768, 1024, 1440, and 1920px**.

Verified: **9 unit tests** (including all 256 planning combinations) and **19 production browser tests**; lint and production build pass. Automated axe scans cover all five routes, both dialog types, and generated plans. Automated checks do not prove complete WCAG compliance; see [TEST_REPORT.md](docs/TEST_REPORT.md) for evidence and remaining human checks.

To run browser tests after building:

```sh
npx playwright install chromium
npm run test:e2e
```

Playwright normally starts the production preview itself. In this restricted Windows environment, automatic preview teardown stalled. The successful run used installed Edge and a separate preview. Start `npm run preview -- --port 4173 --strictPort` in one terminal, then in another PowerShell terminal:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
$env:PLAYWRIGHT_EXTERNAL_SERVER = '1'
npm.cmd run test:e2e
```

`PLAYWRIGHT_EXTERNAL_SERVER` requires an already-running preview. HTML reports, screenshots, failure traces, and a print test PDF are generated in ignored `playwright-report/` and `test-results/` directories.

## Publish to GitHub Pages

**Prepared, not deployed.** The original remote `https://github.com/pandeyp1426/AI-Project.git` is preserved. The workflow runs on `main` pushes or manual dispatch. It checks formatting, lints, runs unit/browser tests, builds, and deploys `dist` with GitHub Pages actions.

1. Review the site and complete your prompt-log/reflection fields.
2. Commit any new review changes and push:

   ```sh
   git status
   git add .
   git commit -m "docs: add my project review and reflection"
   git push -u origin main
   ```

   If there are no new changes, skip add/commit and push the existing local commits. For a different repository, inspect `git remote -v` and deliberately update the existing origin.

3. Open GitHub **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Open **Actions** and wait for “Check and deploy to GitHub Pages.” Inspect any failures.
5. After successful deployment, the expected URL is `https://pandeyp1426.github.io/AI-Project/`. This is a target URL, not a confirmed live deployment.

`vite.config.js` sets `base: '/AI-Project/'`. Local photos use `import.meta.env.BASE_URL`. HashRouter produces links such as `/AI-Project/#/explore`, allowing refresh without server rewrites. Configuration follows the [official Vite Pages guide](https://vite.dev/guide/static-deploy#github-pages).

If renaming to `nyc-dream-trip`, change Vite's base to `/nyc-dream-trip/`, the base URL in `playwright.config.js`, and the asset-path assertion in `tests/e2e/site.spec.js`. `VITE_BASE_PATH` can override the build base; keep test URLs synchronized. A root user site or custom domain uses `/`. No custom repository secrets are needed beyond the workflow's built-in GitHub token permissions.

## Content and academic ownership

Original descriptions are grounded in [CONTENT_SOURCES.md](docs/CONTENT_SOURCES.md). Photo creators, individual CC licenses, links and modifications are recorded in [IMAGE_CREDITS.md](docs/IMAGE_CREDITS.md), with visible credits on the site. Font notices are in [THIRD_PARTY_NOTICES.md](docs/THIRD_PARTY_NOTICES.md).

[PROMPT_LOG.md](docs/PROMPT_LOG.md) records the actual request, three significant features from that request, and real corrections. It does not invent independent user conversations or approvals. [REFLECTION.md](docs/REFLECTION.md) is a draft requiring your own input. Planned milestones overlapped; Git commits record the actual work rather than a fabricated seven-commit history.

Known boundaries: no live hours/weather/transit, bookings, route optimization, accounts, or cross-device sync. Firefox, Safari/iOS, screen-reader narration, native print dialogs and live deployment still need the manual checks listed in the test report.
