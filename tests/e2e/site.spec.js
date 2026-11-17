import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  ['/', 'Home', /Some cities you visit/],
  ['/explore', 'Explore', /Find your New York/],
  ['/gallery', 'Gallery', /The city, in frames/],
  ['/plan', 'Plan My Trip', /A trip that feels like you/],
  ['/why-nyc', 'Why NYC', /Why New York Is/],
];

test('all routes load directly, refresh, and have semantic landmarks with clean console', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const [route, , heading] of routes) {
    await page.goto(`./#${route}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('header.site-header')).toBeVisible();
    await expect(page.locator('footer')).toBeAttached();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
  }
  expect(errors).toEqual([]);
});

test('every desktop navigation link works from every page', async ({ page }) => {
  for (const [from] of routes) {
    for (const [to, label, heading] of routes) {
      await page.goto(`./#${from}`);
      await page
        .getByRole('navigation', { name: 'Main navigation', exact: true })
        .getByRole('link', { name: label, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`#${to.replaceAll('/', '\\/')}$`));
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
      await expect(
        page
          .getByRole('navigation', { name: 'Main navigation', exact: true })
          .getByRole('link', { name: label, exact: true }),
      ).toHaveAttribute('aria-current', 'page');
    }
  }
});

test('search, categories, favorites and refresh work together', async ({ page }) => {
  await page.goto('./#/explore');
  await expect(page.locator('.destination-card')).toHaveCount(12);
  await page.getByRole('searchbox').fill('  CENTRAL PARK  ');
  // The Met's description also mentions Central Park; full-text search correctly finds both.
  await expect(page.locator('.destination-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'Save Central Park to favorites', exact: true }).click();
  await page.getByRole('button', { name: 'Clear search' }).click();
  await page.getByRole('button', { name: 'Parks', exact: true }).click();
  await expect(page.locator('.destination-card')).toHaveCount(3);
  await page.getByRole('button', { name: /My favorites/ }).click();
  await expect(page.locator('.destination-card')).toHaveCount(1);
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Remove Central Park from favorites' }),
  ).toBeVisible();
  await page.getByRole('button', { name: /My favorites/ }).click();
  await page.getByRole('button', { name: 'Remove Central Park from favorites' }).click();
  await expect(
    page.getByRole('heading', { name: 'Your wish list starts with a heart.' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Explore all places' }).click();
  await page.getByRole('searchbox').fill('not-a-place-123');
  await expect(page.getByRole('heading', { name: 'A little off the map.' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(page.locator('.destination-card')).toHaveCount(12);
});

test('detail dialog locks background, traps focus, supports Escape and returns focus', async ({
  page,
}) => {
  await page.goto('./#/explore');
  const trigger = page.getByRole('button', { name: 'View Times Square details', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close destination details' })).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  for (let i = 0; i < 8; i += 1) await page.keyboard.press('Tab');
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test('gallery lightbox wraps with keyboard, closes outside and restores focus', async ({
  page,
}) => {
  await page.goto('./#/gallery');
  const trigger = page.getByRole('button', { name: 'Enlarge A skyline worth waiting for' });
  await trigger.click();
  await expect(page.getByRole('dialog')).toContainText('Image 1 of 13');
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('dialog')).toContainText('Image 13 of 13');
  await page.keyboard.press('ArrowRight');
  await page.getByRole('button', { name: 'Next photo' }).click();
  await expect(page.getByRole('dialog')).toContainText('Image 2 of 13');
  await page.getByRole('button', { name: 'Previous photo' }).click();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.mouse.click(3, 3);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('planner generates each duration, saves, refreshes, reloads, resets and prints', async ({
  page,
}) => {
  await page.goto('./#/plan');
  await expect(page.getByRole('button', { name: 'Load saved' })).toBeDisabled();
  for (const duration of [1, 2, 3, 4]) {
    await page
      .getByRole('button', { name: `${duration} ${duration === 1 ? 'day' : 'days'}`, exact: true })
      .click();
    await page.getByRole('button', { name: 'Build My NYC Itinerary', exact: true }).click();
    await expect(page.locator('.itinerary-day')).toHaveCount(duration);
    await expect(page.locator('.itinerary-stops li')).toHaveCount(duration * 3);
  }
  await page.getByRole('button', { name: 'Save itinerary', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Itinerary saved');
  const before = await page.locator('.itinerary-day h4').allTextContents();
  expect(new Set(before).size).toBe(12);
  await page.reload();
  expect(await page.locator('.itinerary-day h4').allTextContents()).toEqual(before);
  await page.getByRole('button', { name: 'Reset selections' }).click();
  await expect(page.locator('.itinerary-day')).toHaveCount(0);
  await page.getByRole('button', { name: 'Load saved' }).click();
  await expect(page.locator('.itinerary-day')).toHaveCount(4);
  await page.getByRole('button', { name: 'Regenerate', exact: true }).click();
  expect(await page.locator('.itinerary-day h4').allTextContents()).toEqual(before);
  await page.evaluate(() => {
    window.print = () => {
      window.__printRequested = true;
    };
  });
  await page.screenshot({ path: 'test-results/1440-generated-itinerary.png', fullPage: true });
  await page.getByRole('button', { name: 'Print itinerary' }).click();
  expect(await page.evaluate(() => window.__printRequested)).toBe(true);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.planner-controls')).toBeHidden();
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.itinerary-day').first()).toBeVisible();
  await page.screenshot({ path: 'test-results/print-layout.png', fullPage: true });
  await page.pdf({ path: 'test-results/itinerary-print.pdf', format: 'A4', printBackground: true });
});

test('no interests, changed selections, and saved recovery behave clearly', async ({ page }) => {
  await page.goto('./#/plan');
  await page.getByRole('button', { name: 'Reset selections' }).click();
  await page.getByRole('button', { name: 'Build My NYC Itinerary' }).click();
  await expect(page.getByText('An open-minded introduction')).toBeVisible();
  await page.getByRole('button', { name: 'Art & museums' }).click();
  await expect(page.getByText(/Your preferences have changed/)).toBeVisible();
  await page.getByRole('button', { name: 'Build My NYC Itinerary' }).click();
  await expect(page.getByText(/Your preferences have changed/)).toHaveCount(0);
});

test('corrupt and structurally invalid localStorage cannot crash either feature', async ({
  page,
}) => {
  for (const value of [
    '{bad-json',
    JSON.stringify({ version: 1, duration: 999, interests: ['bad'] }),
  ]) {
    await page.goto('./#/explore');
    await page.evaluate((raw) => {
      localStorage.setItem('nyc-someday:favorites:v1', raw);
      localStorage.setItem('nyc-someday:itinerary:v1', raw);
    }, value);
    await page.reload();
    await expect(page.locator('.destination-card')).toHaveCount(12);
    await expect(page.getByText(/Saved data could not be read/)).toBeVisible();
    await page.getByRole('button', { name: 'Save Central Park to favorites' }).click();
    await page.goto('./#/plan');
    await expect(page.getByRole('alert')).toContainText('Saved data could not be read');
    await page.getByRole('button', { name: 'Build My NYC Itinerary' }).click();
    await page.getByRole('button', { name: 'Save itinerary', exact: true }).click();
    await expect(page.getByRole('alert')).toHaveCount(0);
  }
});

test('all displayed gallery images load from local files and have alt text', async ({ page }) => {
  const failed = [];
  page.on('response', (response) => {
    if (response.status() >= 400) failed.push(response.url());
  });
  await page.goto('./#/gallery');
  const images = page.locator('.gallery-grid img');
  await expect(images).toHaveCount(13);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute('alt', /.+/);
    await expect(image).toHaveAttribute('src', /\/AI-Project\/images\/.+\.webp/);
    await expect
      .poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0))
      .toBe(true);
    expect(await image.evaluate((element) => element.getBoundingClientRect().width > 0)).toBe(true);
  }
  expect(failed).toEqual([]);
});

for (const width of [320, 375, 768, 1024, 1440, 1920]) {
  test(`all pages fit ${width}px with no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const [route] of routes) {
      await page.goto(`./#${route}`);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        route,
      ).toBe(true);
      if (width === 375 || width === 1440) {
        for (const image of await page.locator('main img').all()) {
          await image.scrollIntoViewIfNeeded();
          await expect
            .poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0))
            .toBe(true);
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({
          path: `test-results/${width}-${route === '/' ? 'home' : route.slice(1)}.png`,
          fullPage: true,
        });
      }
    }
    if (width < 1024) {
      for (const [, label, heading] of routes) {
        await page.getByRole('button', { name: 'Open navigation' }).click();
        await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute(
          'aria-expanded',
          'true',
        );
        await page
          .getByRole('navigation', { name: 'Mobile navigation', exact: true })
          .getByRole('link', { name: label, exact: true })
          .click();
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
        await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
          'aria-expanded',
          'false',
        );
      }
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
    }
  });
}

test('WCAG A/AA automated scans pass on every page and both dialog types', async ({ page }) => {
  for (const [route] of routes) {
    await page.goto(`./#${route}`);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations,
      `${route}: ${JSON.stringify(results.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => node.target) })))}`,
    ).toEqual([]);
  }
  await page.goto('./#/explore');
  await page.getByRole('button', { name: 'View Times Square details' }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');
  await page.goto('./#/gallery');
  await page.getByRole('button', { name: 'Enlarge A skyline worth waiting for' }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');
  await page.goto('./#/plan');
  await page.getByRole('button', { name: 'Build My NYC Itinerary' }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test('footer credits, experience links, skip link and not-found recovery work', async ({
  page,
}) => {
  await page.goto('./#/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('link', { name: /The slower side/ }).click();
  await expect(page.getByRole('button', { name: 'Parks', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('link', { name: 'Photography & credits' }).click();
  await expect(page.locator('#credits')).toBeInViewport();
  await page.goto('./#/missing');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This street isn’t on our map.');
  await page.getByRole('link', { name: 'Back to New York' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Some cities you visit/);
});
