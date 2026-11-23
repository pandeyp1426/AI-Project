import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('active filters can be removed independently with keyboard and preserve favorites', async ({
  page,
}) => {
  await page.goto('./#/explore');
  await page.getByRole('button', { name: 'Save Central Park to favorites' }).click();
  await page.getByRole('button', { name: 'Parks', exact: true }).click();
  await page.getByRole('button', { name: /My favorites/ }).click();
  await page.getByRole('searchbox').fill('Central');
  const filters = page.getByRole('group', { name: 'Active filters' });
  await expect(filters.getByRole('button')).toHaveCount(3);
  await expect(page.locator('.destination-card')).toHaveCount(1);
  await filters.getByRole('button', { name: 'Remove Search: Central' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('searchbox')).toBeFocused();
  await expect(page.getByRole('button', { name: 'Parks', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('button', { name: /My favorites/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await filters.getByRole('button', { name: 'Remove Category: Parks' }).click();
  await expect(page).not.toHaveURL(/category=/);
  await expect(page.locator('.destination-card')).toHaveCount(1);
  await filters.getByRole('button', { name: 'Remove Favorites only' }).click();
  await expect(filters).toHaveCount(0);
  await expect(page.locator('.destination-card')).toHaveCount(12);
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Remove Central Park from favorites' }),
  ).toBeVisible();
});

test('filtered favorites explain empty results and long searches fit small mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('./#/explore');
  await page.getByRole('button', { name: 'Save Central Park to favorites' }).click();
  await page.getByRole('button', { name: /My favorites/ }).click();
  await page.getByRole('button', { name: 'Views', exact: true }).click();
  await page.getByRole('searchbox').fill('x'.repeat(150));
  await expect(page.getByText(/None of your favorites match/)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.evaluate(() => {
    document.activeElement?.blur();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.screenshot({ path: 'test-results/320-active-filters.png', fullPage: true });
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.getByRole('searchbox')).toBeFocused();
  await expect(page.locator('.destination-card')).toHaveCount(12);
  await expect(
    page.getByRole('button', { name: 'Remove Central Park from favorites' }),
  ).toBeVisible();
});

test('lightbox hints, captions and navigation work in short mobile landscape', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 360 });
  await page.goto('./#/gallery');
  const trigger = page.getByRole('button', { name: 'Enlarge A skyline worth waiting for' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toHaveAttribute('aria-describedby', 'lightbox-help');
  await expect(page.getByRole('button', { name: 'Next photo' })).toBeInViewport();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('dialog')).toContainText('Image 13 of 13');
  await page.locator('#lightbox-help').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: 'Next photo' })).toBeInViewport();
  await expect(page.getByRole('button', { name: 'Close lightbox' })).toBeInViewport();
  expect(
    await page.locator('.lightbox-image').evaluate((el) => getComputedStyle(el).objectFit),
  ).toBe('contain');
  await page.screenshot({ path: 'test-results/640-lightbox-landscape.png' });
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('lightbox reports delayed and failed images, retries and keeps navigation available', async ({
  page,
}) => {
  await page.goto('./#/gallery');
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  await page.route('**/images/manhattan-skyline.webp', async (route) => {
    await gate;
    await route.abort();
  });
  await page.getByRole('button', { name: 'Enlarge A skyline worth waiting for' }).click();
  await expect(page.getByRole('status')).toHaveText('Loading photograph…');
  release();
  await expect(page.getByRole('status')).toHaveText('This photograph could not load.');
  await expect(page.getByRole('button', { name: 'Next photo' })).toBeEnabled();
  await page.unroute('**/images/manhattan-skyline.webp');
  await page.getByRole('button', { name: 'Retry photo' }).click();
  await expect(page.getByRole('button', { name: 'Close lightbox' })).toBeFocused();
  await expect(page.locator('.lightbox-image')).toBeVisible();
  await expect(page.getByRole('status')).toHaveCount(0);
  expect(await page.locator('.lightbox-image').evaluate((el) => el.naturalWidth > 0)).toBe(true);
  await page.getByRole('button', { name: 'Next photo' }).click();
  await expect(page.getByRole('dialog')).toContainText('Image 2 of 13');
});

test('planner explains matches and distinguishes saved plan, draft and changed controls', async ({
  page,
}) => {
  await page.goto('./#/plan?interest=culture');
  await page.getByRole('button', { name: '1 day', exact: true }).click();
  await page.getByRole('button', { name: 'Build My NYC Itinerary' }).click();
  const firstStop = page.locator('.itinerary-stops li').first();
  await expect(firstStop).toContainText('The Metropolitan Museum of Art');
  await expect(firstStop.locator('.stop-reason')).toHaveText(
    'Matches your interests: Art & museums.',
  );
  await expect(page.locator('#plan-save-state')).toHaveText('Unsaved itinerary');
  await expect(page.locator('.stop-reason').last()).toHaveText(
    'A nearby stop to round out this day.',
  );
  await page.getByRole('button', { name: 'Save itinerary', exact: true }).click();
  await expect(page.locator('#plan-save-state')).toHaveText('Saved on this browser');
  await expect(page.getByRole('button', { name: 'Save itinerary', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: '7 days', exact: true }).click();
  await expect(page.getByText(/Your preferences have changed/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save itinerary', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Build My NYC Itinerary' }).click();
  await expect(page.locator('#plan-save-state')).toContainText(
    'Unsaved itinerary · Your saved 1-day plan is unchanged.',
  );
  await page.reload();
  await expect(page.locator('.itinerary-day')).toHaveCount(1);
  await expect(page.locator('#plan-save-state')).toHaveText('Saved on this browser');
  await page.getByRole('button', { name: 'Reset selections' }).click();
  await expect(page.locator('#reset-help')).toContainText('does not delete your saved itinerary');
  await page.getByRole('button', { name: 'Load saved' }).click();
  await expect(page.locator('.itinerary-day')).toHaveCount(1);
  await page.getByRole('button', { name: 'Reset selections' }).click();
  await page.getByRole('button', { name: 'Build My NYC Itinerary' }).click();
  await expect(page.locator('.stop-reason').first()).toHaveText(
    'Part of a balanced introduction to this area.',
  );
});

test('reordering interests does not invent unsaved changes and failed saves retain the old plan', async ({
  page,
}) => {
  await page.goto('./#/plan');
  await page.getByRole('button', { name: 'Build My NYC Itinerary' }).click();
  await page.getByRole('button', { name: 'Save itinerary', exact: true }).click();
  await page.getByRole('button', { name: 'Famous landmarks' }).click();
  await page.getByRole('button', { name: 'Famous landmarks' }).click();
  await expect(page.getByText(/Your preferences have changed/)).toHaveCount(0);
  await page.getByRole('button', { name: 'Regenerate', exact: true }).click();
  await expect(page.locator('#plan-save-state')).toHaveText('Saved on this browser');
  await page.getByRole('button', { name: '7 days', exact: true }).click();
  await page.getByRole('button', { name: 'Build My NYC Itinerary' }).click();
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new Error('Quota');
    };
  });
  await page.getByRole('button', { name: 'Save itinerary', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('could not save');
  await expect(page.locator('#plan-save-state')).toContainText('Unsaved itinerary');
  await page.getByRole('button', { name: 'Load saved' }).click();
  await expect(page.locator('.itinerary-day')).toHaveCount(2);
  await expect(page.locator('#plan-save-state')).toHaveText('Saved on this browser');
});
