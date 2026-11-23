# Reflection — student draft for review

**Updated November 22, 2026.** Codex helped write this draft from the project record and the facts I supplied. Technical descriptions are supported by the repository. The short personal fields must be completed by me after review; they are not evidence of work I have already done.

## 1. Why I chose New York City

I chose New York because it is somewhere I would like to visit. I have not been there yet, so this website is a future travel wish list rather than a travel diary. That idea connects the personal writing, destination pages, photography and itinerary planner. I wanted the result to be visually attractive and give visitors something useful to interact with.

**My personal detail to add:** The place or experience I most want to see is **[one place or experience]**, because **[my own reason]**.

## 2. Why I chose React and Tailwind CSS

I chose React for reusable components and Tailwind for responsive styling. Navigation, destination cards, photo credits and dialogs are shared across pages, so a change can be made in one place. The shared CSS file controls colors, typography, focus indicators and print styles. React renders semantic HTML, while Vite builds the JavaScript and external CSS for hosting. HashRouter lets the five routes work on GitHub Pages without a backend.

## 3. How Codex assisted development

I used Codex to assist with development. It translated the project brief into pages and reusable components, implemented the interactive features, prepared photo attribution, wrote automated tests and documented corrections. My later instruction asked for three focused refinements and more complete, honest documentation. The prompt log preserves the original request and this follow-up separately.

Codex made the implementation choices recorded in those logs. Submitting a prompt does not mean I personally wrote every component or independently discovered the problems it corrected.

## 4. What the code does

Explore combines text search, a category and an optional favorites filter. Favorites are stored as validated destination IDs in LocalStorage. The gallery opens local photographs in a native dialog, supports keyboard navigation and shows the creator and license.

The planner uses the selected duration and interests to rank geographic day templates and candidate activities. It keeps a set of used IDs to avoid duplicate stops. The current version supports one to seven days; longer trips also consider the additional area templates already present before this refinement. The same choices produce the same plan. Saving stores preferences, which are used to reconstruct the itinerary after refresh. Reset clears the working view without deleting that saved copy.

**My explanation after reading the code:** In **[one component or utility filename]**, **[explain how an input or click changes the output, in two or three sentences]**.

## 5. Actual improvements during development

The first development record includes corrections to focus behavior, accessible labels, contrast and storage feedback. The later refinement made active Explore filters individually removable and clarified empty results without changing saved places. The gallery now keeps labeled navigation controls near Close, explains keyboard shortcuts and offers loading/error/retry feedback.

The planner now explains which selected interests match each stop. It distinguishes an unsaved draft from the saved version and explains reset before it is used. Codex also corrected an order-sensitive comparison: turning an interest off and back on should not label an otherwise identical plan as changed. The ranking rules and seven-day support were preserved.

## 6. Actual challenges recorded in development

The recorded challenges were specific: an image host rate-limited downloads, lazy images were missing from early screenshots, an unsupported font import broke a build, and accessibility checks found issues that needed correction. On Windows, development used `npm.cmd` and a separate production preview for browser tests. These were Codex-observed issues, not problems I can claim I personally diagnosed.

Deployment initially failed at Configure Pages even though the code tests passed. Codex enabled Pages and later selected GitHub Actions as the source to prevent competing branch deployments. In the follow-up, screenshot review caught an old mobile rule making lightbox credits too small. That rule was corrected and checked again.

## 7. Testing and verification

Development included automated unit tests, browser interaction tests, production builds, lint and formatting checks. The current unit coverage exercises all 448 combinations of seven durations and six optional interests, as well as storage, search and the new explanation/comparison helpers. Browser checks cover navigation, persistence, dialogs, all seven durations, small screens, image loading and accessibility scans. The dated test report records actual runs and separates them from human review.

These checks provide useful evidence but do not prove that the site works perfectly for every person or browser. Automated accessibility scans cannot replace listening with a screen reader or using a real phone. No personal manual test is claimed here.

## 8. What I would improve in the future

Useful next steps include testing Safari/iOS and Firefox, completing a screen-reader walkthrough and checking native print pagination. Allowing an individual stop to be swapped could make the planner more flexible, but it would need to preserve nearby grouping and duplicate prevention. Live transport data would introduce dependencies that the current static project does not need.

**My priority:** I would improve **[one specific area]** first because **[my reason after using the site]**.

## 9. My responsibility for the final project

I am responsible for the submitted project, including its content, attribution, functionality and the explanation of how it works. Before submission, I need to review the future-facing personal writing, understand the main components and planning rules, complete the feature review fields and describe only checks I actually performed. I must also follow my course's rules for disclosing AI assistance. The final grade belongs to the instructor, not to the automated checks or this draft.

**My review and ownership record — complete before submission:**

- Date, device/browser and features I personally tried: **[actual details]**
- One result or issue I observed, and any change I made myself: **[actual observation; say if no change was made]**
- One Codex suggestion I accept or would revise, and why: **[my decision]**
- My final statement of what I understand and take responsibility for: **[one or two sentences in my own words]**

Supporting evidence: [prompt log](PROMPT_LOG.md), [test report](TEST_REPORT.md), [rubric and submission checklist](RUBRIC_CHECKLIST.md).
