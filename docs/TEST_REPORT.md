# Test report

**Date:** November 16, 2026. **Environment:** Windows, Node 24.20.0, npm 11.19.0; Vite production build served at `/AI-Project/`; Playwright with installed Microsoft Edge (Chromium). Browser tests use isolated contexts. Screenshots were inspected by Codex; no human manual session is claimed.

## Results

- `npm.cmd run lint`: pass, no findings.
- `npm.cmd test`: **9 tests passed**, including exhaustive checks of **256** duration/interest combinations.
- `npm.cmd run build`: pass, static output generated in `dist/`.
- `npm.cmd run test:e2e` with `PLAYWRIGHT_CHANNEL=msedge` and a separately running preview: **19 tests passed in 45.7 seconds** in the final run after the image crop correction.
- `npm.cmd run format:check`: pass; all matched files use Prettier formatting.
- Axe reported **zero violations** on all five routes, both dialogs, and the generated itinerary in the passing run. This is automated evidence, not a full accessibility certification.

## Executed test matrix

| ID      | Feature / method                     | Procedure                                                           | Expected                                                         | Actual result                                                                  | Status | Fix or correction                                                  |
| ------- | ------------------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------------ |
| NAV-01  | All routes / browser                 | Load all five hash routes directly; reload each                     | Correct page, one h1, header/main/footer                         | All five direct loads and refreshes succeeded                                  | Pass   | HashRouter and correct Vite base                                   |
| NAV-02  | Desktop links / browser              | Every main-nav destination from every page, 25 combinations         | Correct route, heading, active state                             | All 25 succeeded                                                               | Pass   | None                                                               |
| NAV-03  | Mobile navigation / browser          | Open menu, select each route at 320/375/768; Escape                 | Expanded state, correct route, closed menu, focus return         | All succeeded                                                                  | Pass   | None                                                               |
| NAV-04  | Auxiliary links / browser            | Skip link, home theme link, credits anchor, unknown-route recovery  | Correct focus, filter, scroll, return-home                       | All succeeded                                                                  | Pass   | Initial focus no longer bypasses skip link                         |
| IMG-01  | Local assets / unit + browser        | Check files/metadata; scroll and decode all 13 gallery photos       | No missing assets, meaningful alt, positive dimensions           | All 13 loaded from `/AI-Project/images/`; no failing responses                 | Pass   | Screenshot helper now waits for lazy images                        |
| IMG-02  | Cropping / screenshot review         | Inspect Explore, Home, gallery, story and small-mobile views        | Balanced reserved aspect ratios and recognizable subjects        | Layouts reviewed; Statue of Liberty crop adjusted to retain its upper features | Pass   | Added photo-specific crop position                                 |
| IMG-03  | License records / source inspection  | Read individual photo source licenses; compare credit registry      | Creator, source, license, modifications                          | 13 records; 12 CC BY 2.0, one CC BY-SA 2.0                                     | Pass   | Original Flickr sources used after Commons CDN rate limit          |
| JS-01   | Search / unit + browser              | Case/whitespace, description match, no results, clear               | Meaningful combined matches and reset                            | Expected matches and empty-state recovery                                      | Pass   | Corrected test expecting one Central Park result; Met also matches |
| JS-02   | Category/favorites filters / browser | Select Parks, saved-only, then clear                                | AND filtering; visible count updates                             | Correct card counts and feedback                                               | Pass   | None                                                               |
| JS-03   | Favorites / browser                  | Save, refresh, remove, empty view                                   | Persist and update immediately                                   | Passed in production build                                                     | Pass   | None                                                               |
| JS-04   | Detail dialog / browser              | Open, Tab through, Escape, inspect focus/scroll lock                | Trapped focus, inert background, trigger restored                | All assertions passed                                                          | Pass   | Shared native dialog                                               |
| JS-05   | Gallery / browser                    | Arrow-left from first image, arrow-right, buttons, Escape/backdrop  | Wrap 1↔13; correct counter; close and restore                    | All assertions passed, including mobile controls                               | Pass   | None                                                               |
| JS-06   | Planner / exhaustive unit            | All 4 durations × 64 interest subsets                               | 3 blocks/day, unique IDs, repeatability, valid data              | All 256 combinations satisfied invariants                                      | Pass   | Increased Met weight for museum intent                             |
| JS-07   | Planner / browser                    | Build 1–4 days; no interests; change selection; regenerate          | Correct day counts, fallback, change notice, stable result       | All succeeded                                                                  | Pass   | None                                                               |
| JS-08   | Save/load/reset / browser            | Save 4 days, reload page, reset, load saved                         | Same stops after refresh; reset preserves saved plan             | All succeeded                                                                  | Pass   | Explicit save, validated preferences                               |
| JS-09   | Malformed storage / unit + browser   | Invalid JSON, wrong shape, unknown IDs/interests, out-of-range days | Fallback, warning, fresh save recovery                           | No crash; recovery verified                                                    | Pass   | Schema validation                                                  |
| JS-10   | Unavailable storage / unit + browser | Throw on reads/writes; simulate quota failure                       | Temporary favorites; truthful planner error, no fake saved state | All assertions passed                                                          | Pass   | Planner retains prior saved value on failure                       |
| JS-11   | Print / browser                      | Intercept print invocation, emulate print, create A4 PDF            | Calls print; controls hidden; itinerary visible                  | Invocation and CSS verified; PDF created                                       | Pass   | See manual printer limitation below                                |
| RES-01  | Six viewport widths / browser        | All 5 routes at 320/375/768/1024/1440/1920                          | No horizontal overflow                                           | All 30 route/width combinations passed                                         | Pass   | Mobile-first rules                                                 |
| RES-02  | Small-mobile controls / browser      | 320px, four-day plan, lightbox next/close                           | Usable controls and no overflow                                  | Passed                                                                         | Pass   | None                                                               |
| A11Y-01 | Axe scans / browser                  | Scan all routes, both dialogs, generated plan                       | Zero detected violations                                         | Zero in passing run                                                            | Pass   | Fixed duration names, favorite label, day-number contrast          |
| A11Y-02 | Reduced motion / browser             | Emulate reduced motion at 320px                                     | CSS scroll behavior auto; controls functional                    | Passed                                                                         | Pass   | None                                                               |
| CODE-01 | Console / browser                    | Collect page errors and console errors across five routes           | No application errors                                            | None recorded                                                                  | Pass   | None                                                               |
| CODE-02 | Lint / CLI                           | Run ESLint                                                          | Exit 0                                                           | Exit 0, no findings                                                            | Pass   | Removed unused code; consistent imports                            |
| CODE-03 | Production / CLI + browser           | Build, serve subpath, request local assets                          | Successful static bundle and routing                             | Build and production route tests passed                                        | Pass   | Unsupported font-subset import reverted                            |
| CODE-04 | Internal links / browser             | Navigation, theme, credits, home recovery                           | Reach intended destinations                                      | Passed                                                                         | Pass   | None                                                               |
| CODE-05 | External links / research            | Consult official destination/MTA sources and photo records          | Relevant official information and licensed sources               | Sources consulted; older Parks URL replaced                                    | Pass   | Not a guarantee of future third-party availability                 |
| DEP-01  | Deployment preparation / code review | Check main trigger, Pages permissions, base, dist upload            | Standard static Pages workflow                                   | Configuration present and reviewed                                             | Pass   | Live deployment remains untested                                   |

## Visual evidence

Playwright creates full-page screenshots for every route at 375px and 1440px, plus generated itineraries, a 320px lightbox and a print-media layout. Codex inspected the actual screenshot files to check typography, image compositions, spacing and control visibility. No screenshot is a synthetic mockup.

The live visible-browser connector returned “The browser access host is unavailable.” Therefore there was no visible CUA walkthrough. Headless Edge browser automation and visual inspection of its screenshots did occur.

## Actual commands and environment corrections

Commands executed included:

```text
node --version
npm.cmd --version
npm.cmd install react react-dom react-router-dom lucide-react @fontsource-variable/dm-sans @fontsource-variable/playfair-display
npm.cmd install -D vite @vitejs/plugin-react tailwindcss @tailwindcss/vite eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals @playwright/test @axe-core/playwright
npm.cmd install -D prettier
npm.cmd run dev -- --port 5175 --strictPort
npm.cmd run format
npm.cmd run format:check
npm.cmd run lint
npm.cmd test
npm.cmd run build
node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173 --strictPort
npm.cmd run test:e2e
```

The final browser command used `PLAYWRIGHT_CHANNEL=msedge` and `PLAYWRIGHT_EXTERNAL_SERVER=1`. The dev server returned HTTP 200. Port 5173 was occupied, so 5175 was used. Initial npm installation needed approved network access. Git used a per-command safe-directory flag because sandbox ownership differed from the repository owner.

Initial browser runs exposed the actual issues recorded above; they were corrected and rerun. Automatic Windows test-server teardown stalled, so a separately managed preview was used. An attempted external-server run before restarting that preview failed to connect and was stopped. These attempts are not counted as successful test runs. A proposed font subset path failed to resolve; restoring the supported imports fixed the production build.

## Remaining manual checks

| ID     | Check                         | Procedure / expected outcome                                                  | Actual                                                                                                       | Status         |
| ------ | ----------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------- |
| MAN-01 | Student review                | Read all personal copy, explain key modules, complete prompt log/reflection   | Awaiting student                                                                                             | Not yet tested |
| MAN-02 | Physical devices / browsers   | Test on iPhone/Safari, Android and Firefox, including zoom and orientation    | Chromium emulated viewports tested; physical devices/other engines not tested                                | Not yet tested |
| MAN-03 | Screen reader                 | Use NVDA or VoiceOver for navigation, dialogs and status updates              | Automated semantics checked; narration not tested                                                            | Not yet tested |
| MAN-04 | Native print dialog / printer | Open print preview, inspect actual pagination/settings and save or print      | Print invocation, print CSS and headless PDF generation verified; native interaction/paper output not tested | Not yet tested |
| MAN-05 | GitHub Pages deployment       | Enable Actions source, push main, inspect successful workflow and live routes | Files prepared; no push/deployment performed                                                                 | Not yet tested |

No known failing functional tests remain. Automated coverage does not replace these human checks, particularly personal ownership and accessibility use with assistive technology.
