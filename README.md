# New York, Someday

**A city I haven't explored yet, but can't wait to discover.**

A complete five-page travel wish list about a future first visit to New York City. Cinematic photography and original personal writing accompany destination discovery, persistent favorites, a keyboard-accessible gallery, and a practical local itinerary builder.

Built for a university AI-Assisted Coding assignment. This is a standalone static application with no backend, database, account, API key, paid service, or simulated booking functionality.

**[Live website](https://pandeyp1426.github.io/AI-Project/#/)** · **[Rubric evidence and submission checklist](docs/RUBRIC_CHECKLIST.md)** · **[Actual test results](docs/TEST_REPORT.md)**

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
| Plan My Trip | `#/plan`    | 1–7 days, six interests, morning/afternoon/evening suggestions, save/load/reset/regenerate/print |
| Why NYC      | `#/why-nyc` | Six original editorial sections and an imagined first day                                        |

All pages share sticky navigation, active-route indication, an accessible mobile menu, a skip link, and a footer. Search includes names, locations, descriptions, and details: “Central Park” also finds the Met because its description mentions the park.

The November 22 refinement adds individually removable active filters, helpful empty-result recovery, a lightbox toolbar that stays reachable while scrolling, readable credits and loading/retry feedback. The planner explains interest matches and distinguishes the displayed saved plan, an unsaved draft and changes that still need to be built. These changes preserve the original visual identity and the existing seven-day planning rules.

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
  SITE_PLAN.md, PROMPT_LOG.md, ORIGINAL_PROMPT.txt, REFINEMENT_PROMPT.txt
  TEST_REPORT.md, RUBRIC_CHECKLIST.md
  REFLECTION.md, IMAGE_CREDITS.md, CONTENT_SOURCES.md
  THIRD_PARTY_NOTICES.md
.github/workflows/deploy.yml
```

## Understand the implementation

**Assignment mapping:** JSX renders semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`, buttons and links). The five React page components replace separate traditional HTML files. `src/index.css` is the shared external stylesheet; Vite compiles Tailwind into external production CSS. React event handlers, hooks and imported JavaScript modules fulfill the interactive JavaScript requirement.

**Design:** Midnight navy, warm ivory, restrained terracotta and darker rust for accessible controls; editorial serif headings, modern sans-serif text, distinct page compositions, consistent spacing. Tailwind uses its [current official Vite integration](https://tailwindcss.com/docs/installation/using-vite), not a legacy PostCSS setup.

**Planning rules:** Seven geographic day templates each contain three time blocks with candidate activities. Plans of up to four days draw from the original five templates. Plans of five to seven days also consider Tribeca and the East Village. Matching interests score candidates and areas, with extra weight for the Met when art and museums are selected. Editorial order resolves ties, and a used-ID set prevents duplicates. The harbor day leaves its afternoon flexible for the island visit. The same settings produce the same plan.

**Saving:** `nyc-someday:favorites:v1` stores validated destination IDs; `nyc-someday:itinerary:v1` stores validated duration/interests. The deterministic generator reconstructs the saved itinerary. A later change to planning data could change that reconstruction. Reset does not delete the saved plan. Storage exceptions produce feedback; favorites still work in memory, while failed itinerary writes retain the last successfully saved preferences. Data stays in the current browser/profile/origin, with no cross-device or live cross-tab synchronization.

**Planner feedback:** `planPresentation.js` compares choices without treating interest order as a change. It explains only actual selected tag matches; other stops are described as nearby additions. Saving is disabled until changed controls have been built, and when the displayed plan already matches the saved copy. Reset clears the working view; Load saved restores the saved preferences.

**Dialogs:** A shared native `<dialog>` uses `showModal()` for focus trapping/background inertness, restores focus to its trigger, blocks background scrolling, and closes on Escape or backdrop click. The gallery adds wrapping arrow-key navigation and buttons.

## Accessibility and testing

One primary heading per page, semantic landmarks, descriptive alt text, visible focus, labeled inputs, button state announcements, live status feedback, reduced-motion support, responsive image dimensions, lazy loading, and print styling are included. Widths checked on every page: **320, 375, 768, 1024, 1440, and 1920px**.

Verified on November 22: **11 unit tests** (including all 448 planning combinations) and **25 production browser tests**. Automated axe scans cover all five routes, both dialog types, generated plans and filtered empty results. The suite also checks short mobile landscape and failed-image recovery. Automated checks do not prove complete WCAG compliance; see [TEST_REPORT.md](docs/TEST_REPORT.md) for the commands, evidence and remaining human checks. `.gitattributes` keeps text line endings consistent for formatting checks across Windows and CI.

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

The existing site is hosted at [New York, Someday](https://pandeyp1426.github.io/AI-Project/). The original remote `https://github.com/pandeyp1426/AI-Project.git` is preserved. The workflow runs on `main` pushes or manual dispatch. It checks formatting, lints, runs unit/browser tests, builds, and deploys `dist` with GitHub Pages actions. Confirm each update in [GitHub Actions](https://github.com/pandeyp1426/AI-Project/actions); a passing local build alone does not confirm a deployment.

1. Review the site and complete your prompt-log/reflection fields. Ensure **Settings → Pages → Build and deployment → Source** is **GitHub Actions before pushing**. This repository's setting was verified on November 22. Do not enable competing branch-based publishing of the source files.
2. Commit any new review changes and push:

   ```sh
   git status
   git add .
   git commit -m "docs: add my project review and reflection"
   git push -u origin main
   ```

   If there are no new changes, skip add/commit and push the existing local commits. For a different repository, inspect `git remote -v` and deliberately update the existing origin.

3. Open **Actions** and wait for “Check and deploy to GitHub Pages” for the commit you pushed. Inspect any failures. If Configure Pages returns Not Found, verify the setting in step 1 and rerun the failed job.
4. After successful deployment, open the live site and reload a hash route such as `#/explore`. Verify that the update appears and images load.

`vite.config.js` sets `base: '/AI-Project/'`. Local photos use `import.meta.env.BASE_URL`. HashRouter produces links such as `/AI-Project/#/explore`, allowing refresh without server rewrites. Configuration follows the [official Vite Pages guide](https://vite.dev/guide/static-deploy#github-pages).

If renaming to `nyc-dream-trip`, change Vite's base to `/nyc-dream-trip/`, the base URL in `playwright.config.js`, and the asset-path assertion in `tests/e2e/site.spec.js`. `VITE_BASE_PATH` can override the build base; keep test URLs synchronized. A root user site or custom domain uses `/`. No custom repository secrets are needed beyond the workflow's built-in GitHub token permissions.

## Content and academic ownership

Original descriptions are grounded in [CONTENT_SOURCES.md](docs/CONTENT_SOURCES.md). Photo creators, individual CC licenses, links and modifications are recorded in [IMAGE_CREDITS.md](docs/IMAGE_CREDITS.md), with visible credits on the site. Font notices are in [THIRD_PARTY_NOTICES.md](docs/THIRD_PARTY_NOTICES.md).

[PROMPT_LOG.md](docs/PROMPT_LOG.md) records the actual request, three significant features from that request, and real corrections. It does not invent independent user conversations or approvals. [REFLECTION.md](docs/REFLECTION.md) is a draft requiring your own input. Planned milestones overlapped; Git commits record the actual work rather than a fabricated seven-commit history.

Known boundaries: no live hours/weather/transit, bookings, route optimization, accounts, or cross-device sync. Firefox, Safari/iOS, screen-reader narration and native print dialogs still need the checks listed in the test report. Before submission, complete the short personal fields in the reflection and each feature's student-review record. The [rubric checklist](docs/RUBRIC_CHECKLIST.md) identifies evidence and unfinished human review without predicting a grade.
