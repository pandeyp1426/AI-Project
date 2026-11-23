# Authentic AI-assisted development log

**Tool:** Codex. **Initial work:** November 16, 2026. **Follow-up refinement:** November 22, 2026. **Project:** New York, Someday.

The original feature records below are preserved as history. Their four-day scope and test counts describe the initial implementation. The dated follow-up records document the current seven-day version. Implementation decisions in this log are Codex's decisions unless explicitly attributed otherwise; student approval is still pending.

## Provenance

One substantial initial user request covered the whole project. Its full supplied text is preserved in [ORIGINAL_PROMPT.txt](ORIGINAL_PROMPT.txt). The three feature records below quote that real prompt. They are **not three invented independent conversations**. “Kept” describes Codex's implementation choices, not student approval. Student review fields remain pending.

The user subsequently asked **“done?”**. Codex reported that the pages, initial build, lint and nine unit tests were complete, while browser checks and documentation remained. This was a status question, not design approval or another feature prompt.

## Feature 1 — discovery and favorites

**Actual prompt excerpts:**

> Users should be able to search destinations by name or description.
>
> Allow users to save and remove destinations.
>
> Persist favorites in LocalStorage.
>
> Category filters and search work together
>
> Invalid LocalStorage data does not crash the application

**Produced:** Shared 12-place data module, destination cards, full-text search, categories, saved-only view, detail dialogs, favorites context and validated storage hook.

**Kept:** Separate data/UI modules, immediate favorite feedback, filter reset, case-insensitive trimmed search and saved-ID validation. Blocked storage allows temporary in-memory favorites with explicit warning.

**Modified or rejected:** The first browser test incorrectly expected one “Central Park” result. The Met's detail also mentions the park, so two matches are correct. The test was corrected rather than hiding a valid result. Native-dialog focus, background locking and Escape were tested.

**Reason:** Search should reflect useful content, and storage problems should not prevent browsing.

**Student review — pending:** Try combined search/category/favorites. Explain `filterDestinations.js` in your own words. What do you accept, change or reject, and why? **[YOUR REVIEW]**

## Feature 2 — photography and lightbox

**Actual prompt excerpts:**

> Include at least 12 properly licensed photographs.
>
> Implement a complete image lightbox.
>
> Keyboard arrow navigation
>
> Escape key closes the lightbox
>
> Proper dialog semantics and focus management

**Produced:** Thirteen genuine NYC photos, responsive gallery, local WebP assets, shared photo/credit components, and native-dialog lightbox with counter, wrapping navigation, Escape/backdrop close, scroll lock and focus return.

**Kept:** Individual license verification, visible creator/license links, expandable complete credits, lazy noncritical images and accurate alt text. [IMAGE_CREDITS.md](IMAGE_CREDITS.md) records sources and modifications.

**Modified or rejected:** Wikimedia's image CDN returned HTTP 429, so original Flickr copies were downloaded after verifying their licenses. Contact-sheet inspection led to stronger Central Park and Grand Central selections. Alt text was corrected for Times Square at dawn and the view from One World Observatory. WebP conversion reduced the total photo payload to about 2.37 MiB. Early full-page screenshots showed unloaded lazy images; the test now scrolls and waits for each image before capture.

**Reason:** Licensing and accurate descriptions are part of quality. Screenshot evidence must account for actual lazy-loading behavior.

**Student review — pending:** Open the lightbox using the keyboard, navigate both directions and close it. Verify focus return and review imagery/credits. **[YOUR REVIEW]**

## Feature 3 — local trip planning

**Actual prompt excerpts:**

> When clicked, generate a useful itinerary using local JavaScript data and deterministic planning rules.
>
> Adapt to trip duration
>
> Consider selected interests
>
> Group nearby attractions when practical
>
> Avoid duplicate attractions
>
> A user should never lose their saved itinerary merely because they refresh the page.

**Produced:** Five geographic templates, morning/afternoon/evening candidates, 1–4 days, six interests, deterministic scoring, unique activity tracking, save/load/reset/regenerate/print and official-source travel tips.

**Kept:** Stable tie-breaking, empty-interest fallback, saved preferences instead of duplicated content, and reset preserving the saved plan. A harbor day leaves the afternoon flexible. Identical settings recreate the same trip.

**Modified or rejected:** The Met received stronger scoring for art/museum interest. Accessibility scans found duration name/visible-text mismatches; native text plus explicit spacing fixed them. A later scan found day-number contrast too low; the darker rust token fixed it. Failed itinerary writes now preserve the prior saved value and cannot be labeled successfully saved. All 256 duration/interest combinations are checked for complete, unique, deterministic results.

**Reason:** Useful plans require understandable grouping, readable controls and honest persistence feedback, rather than random attraction lists.

**Student review — pending:** Compare a museum-focused day and a food-focused plan. Explain scoring, tie-breaking and the used-ID set. Try save/refresh/reset. **[YOUR REVIEW]**

## Other real corrections and limitations

- PowerShell blocked `npm.ps1`; `npm.cmd` avoided changing security policies.
- Git detected sandbox/user ownership differences. Commands used a per-command `safe.directory` flag, not global trust changes.
- Restricted network installation was stopped and rerun with approved download access.
- Port 5173 was occupied; the separate dev preview used 5175 without changing unrelated servers.
- Initial route focus skipped the first skip-link tab stop. Focus now moves only after in-app navigation.
- An attempted font-subset import did not exist. The build caught it; supported package imports were restored.
- Windows automatic test-preview teardown stalled. The final suite used a separately managed preview. One attempted rerun before that preview restarted failed to connect and was stopped; it was not counted as a passing run or product failure.
- The visible browser connector reported an unavailable host. Playwright drove installed headless Edge; Codex inspected actual browser screenshots. No human manual testing is claimed.
- Prettier made the JSX consistently readable. Planning milestones overlapped; actual commits document the real sequence, not an invented seven-commit history.
- Final verification: 9 unit tests and 19 browser tests pass, including axe scans. Details are in [TEST_REPORT.md](TEST_REPORT.md).

## Suggested future review prompts

These are **future checkpoints, not interactions already completed**:

1. “I reviewed Home and Why NYC. Rewrite these passages to sound like me: [text and preferences]. Explain the edits.”
2. “I tested Explore and Gallery with only the keyboard. Here is what felt awkward: [observations]. Improve it and add a relevant regression check.”
3. “I compared the itineraries. Prioritize [interests/pace] for my first visit. Adjust the rules and explain the resulting days.”

Append each actual follow-up prompt, outcome, accepted/rejected changes, reasons and verification. If the instructor requires three separate prompt exchanges, carry out and record those real exchanges. This initial run cannot honestly substitute for student review and iteration.

## Subsequent deployment work and repository changes

The user reported **“the deployement failed”** and later said **“continue”**. Codex inspected the real Actions failure: build and browser tests succeeded, but Configure Pages returned Not Found. Codex enabled Pages, retried deployment, and later found competing branch-based publishing. On November 22, Codex set the source to GitHub Actions, confirmed [the successful existing deployment](https://github.com/pandeyp1426/AI-Project/actions/runs/45067545976), and checked all five live routes and 13 gallery images. Browser UI access was unavailable; authenticated API calls and headless browser checks provided the evidence. An earlier approval-review usage limit interrupted verification; it was not a code defect.

Before this refinement, the existing history included `c6b8b59` and merge `d7d1f73`, extending planning to seven days with additional area templates and 448 duration/interest combinations. This iteration preserves that work. The commit record alone does not establish what the student personally coded or tested.

## Follow-up prompt — November 22, 2026

**Actual source:** [REFINEMENT_PROMPT.txt](REFINEMENT_PROMPT.txt), a full-text copy of the user's supplied follow-up. This is **one new comprehensive prompt covering three refinements**, not three separate conversations. No student review or approval is inferred from submitting it.

> Your job is to review, improve, test, and finalize the current implementation for the highest possible score on my AI-Assisted Coding assignment.
>
> Do not invent separate prompts that were never submitted.
>
> Do not fabricate student approval, personal testing, debugging, or decisions.

Codex audited the requested documents, all five pages, shared components/CSS, storage and planner modules, existing tests, clean Git status and recent history before editing. Baseline lint and nine unit tests passed. Formatting identified eight files with local line-ending differences; Prettier normalized them and `.gitattributes` now keeps text checkouts consistent. The planner's ranking, candidate data, tie-breaking and duplicate prevention were retained.

### Iteration 1 — Explore filter clarity

**Tool:** Codex.

**Actual prompt excerpt** (from the single follow-up above):

> Improve the clarity of the interface.
>
> Make active filters more visually obvious.
>
> Ensure users can easily reset searches and filters.

**Original behavior:** Search, categories, favorites, a full reset and empty states already worked. The category button showed selection, but users could not inspect and remove each active constraint together in one place. The no-match copy did not distinguish filtered favorites from an empty wish list.

**Generated/changed:** `Explore.jsx` now presents labeled, independently removable search/category/favorites chips. Clearing one preserves the other constraints and saved data. Chip removal and full reset return keyboard focus to search. Empty filtered favorites explain why nothing is visible and that saved places remain saved. Filter controls use 44px minimum height and clearer text sizing; long query text wraps within 320px.

**Kept by Codex:** Existing filtering logic, category URLs, persistent favorites, clear-search control, full reset, destination cards and all 12 places.

**Rejected/modified by Codex:** No duplicate favorites system, new destination data or extra filtering rules. A full-page evidence capture was adjusted to scroll to the top before taking the screenshot, avoiding a misleading sticky-header position.

**Reason:** People can see what narrowed the results and undo just one choice without losing their wish list. Focus remains on a useful control when a chip disappears.

**Tests:** Two new browser cases cover independent keyboard removal, preserved filters/favorites after refresh, filtered empty-state wording, reset focus, a 150-character query at 320px, and an axe scan. Existing discovery and storage tests remain in the full passing suite. See current results in [TEST_REPORT.md](TEST_REPORT.md).

**Student review — not yet completed:** Try a saved park with a search and category, remove one chip, then reset. Read `filterDestinations.js` and explain how the conditions combine.

- Review date and device: **[Complete after trying it.]**
- Accept / revise / reject, with one specific reason: **[Your decision.]**
- What you observed or changed yourself: **[Your evidence; “no changes” is acceptable.]**

### Iteration 2 — Gallery controls and image feedback

**Tool:** Codex.

**Actual prompt excerpt:**

> Improve the user experience without changing the existing visual identity.
>
> Clearer interactive navigation hints.
>
> Better image-loading feedback where necessary.

**Original behavior:** The lightbox already wrapped with arrow keys, trapped focus, closed with Escape/backdrop, restored focus, showed captions and credited creators. Previous/next controls sat below the image, so a short viewport could require scrolling to them. A delayed or failed image had no explicit feedback.

**Generated/changed:** Labeled Previous/Next controls share a sticky toolbar with Close. Visible keyboard instructions are linked through `aria-describedby`. A small, keyed image component shows loading/failure status and allows retry without closing the gallery. Retry returns focus to Close before its own button disappears. Lightbox credits are larger and the gallery introduction wraps on narrow screens.

**Kept by Codex:** All 13 local photographs, alt text, creator/license links, original grid identity, full-image `object-fit: contain`, keyboard wrapping, dialog behavior and focus restoration. Image files and licensing records were not altered.

**Rejected/modified by Codex:** No carousel dependency, autoplay, swipe library or new images. Screenshot review found a mobile rule overriding the larger credit text; Codex removed that override and added a font-size assertion. A sticky-toolbar background covers the image behind it when scrolling.

**Reason:** Navigation stays reachable in short mobile landscape. Network failures explain what happened and offer recovery. Attribution remains readable.

**Tests:** Two new browser cases cover 640×360 navigation, scroll visibility, keyboard wrapping, dialog description, full-image sizing, focus return, deliberately delayed/failed requests and successful retry. The existing 320px test now asserts credit text is at least 14px. Existing gallery, image and axe checks were retained and passed.

**Student review — not yet completed:** Open a photo with Enter, use both arrow keys, read the caption/credits and close with Escape. Try your phone in both orientations.

- Review date and device: **[Complete after trying it.]**
- Accept / revise / reject, with one specific reason: **[Your decision.]**
- What you observed or changed yourself: **[Your evidence.]**

### Iteration 3 — Planner explanations and saved state

**Tool:** Codex.

**Actual prompt excerpt:**

> Clearly explaining why suggested destinations match selected interests.
>
> Making saved-versus-unsaved state obvious.
>
> Preserve the existing deterministic itinerary logic.

**Original behavior:** Plans already reflected selected interests and survived save/refresh. Reset already preserved saved preferences. Results did not explain individual matches, and a transient message was the main save confirmation. Preference comparison used JSON serialization, so deselecting/reselecting an interest could incorrectly appear to change the plan because array order changed.

**Generated/changed:** Each stop states its actual matching selected interests, or explains that it rounds out the area. Empty interests receive a balanced-introduction explanation. A persistent label distinguishes the displayed saved plan from an unsaved draft and identifies the older saved duration. Saving is disabled when the displayed plan is already saved or controls have changed without rebuilding. Generation feedback recognizes a plan that already matches saved choices. Reset's visible help explicitly says it does not delete saved data. `planPresentation.js` compares interests as a set, independently of click order.

**Kept by Codex:** All seven duration options, existing geographic templates and activities, deterministic ranking, duplicate prevention, storage schema, load/reset/regenerate/print behavior and failure handling.

**Rejected/modified by Codex:** No random generation, external API, deletion feature or scoring changes. Explanations report actual tag overlap instead of claiming every stop matches every preference. The site metadata was corrected from four days to seven to match the existing feature.

**Reason:** Visitors can distinguish controls from the displayed plan and the saved copy, understand a recommendation, and avoid mistaking an old plan for newly applied choices.

**Tests:** Two new unit tests cover order-independent comparison, changed duration/interests, missing saved state, genuine match explanations and fallback text. Two new browser tests cover culture matches, saved/draft labels, pending controls, seven-day drafts, refresh recovery, reset/load, no interests, interest reorder and failed writes preserving the prior plan. The existing exhaustive test still verifies all 448 combinations and the unchanged generator.

**Student review — not yet completed:** Compare an art-focused day and a seven-day food plan. Save one, change the controls without building, then build/reset/load. Explain the difference between preferences, displayed plan and saved preferences.

- Review date and device: **[Complete after trying it.]**
- Accept / revise / reject, with one specific reason: **[Your decision.]**
- Explain one matching stop and one nearby filler stop: **[Your explanation.]**

### Documentation and ownership decisions

Codex updated the README, site plan, reflection and test report, and added a [rubric/submission checklist](RUBRIC_CHECKLIST.md). Historical results remain dated rather than being rewritten as current evidence. The reflection uses only the facts supplied in this follow-up and repository evidence. Short personal fields remain because neither passing automation nor asking Codex to work proves personal understanding or manual testing. The instructor determines the grade.
