import { test, expect } from '@playwright/test';

test('blocked storage keeps favorites usable and does not claim an itinerary was saved', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('Storage blocked', 'QuotaExceededError');
    };
  });
  await page.goto('./#/explore');
  await page.getByRole('button', { name: 'Save Central Park to favorites' }).click();
  await expect(
    page.getByRole('button', { name: 'Remove Central Park from favorites' }),
  ).toBeVisible();
  await expect(page.getByText(/Your browser could not save this change/)).toBeVisible();
  await page.goto('./#/plan');
  await page.getByRole('button', { name: 'Build My NYC Itinerary' }).click();
  await page.getByRole('button', { name: 'Save itinerary', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('could not save');
  await expect(page.getByRole('button', { name: 'Load saved' })).toBeDisabled();
  await expect(page.getByText(/day itinerary is saved on this browser/)).toHaveCount(0);
});

test('small-mobile planner and lightbox stay usable with reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/plan?interest=food');
  await expect(page.getByRole('button', { name: 'Food experiences' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: '4 days', exact: true }).click();
  await page.getByRole('button', { name: 'Build My NYC Itinerary' }).click();
  await expect(page.locator('.itinerary-day')).toHaveCount(4);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await page.screenshot({ path: 'test-results/320-generated-itinerary.png', fullPage: true });
  await page.goto('./#/gallery');
  await page.getByRole('button', { name: 'Enlarge A skyline worth waiting for' }).click();
  await expect(page.getByRole('button', { name: 'Next photo' })).toBeInViewport();
  await page.getByRole('button', { name: 'Next photo' }).click();
  await expect(page.getByRole('dialog')).toContainText('Image 2 of 13');
  expect(
    await page
      .locator('.lightbox .photo-credit')
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(14);
  await page.screenshot({ path: 'test-results/320-lightbox.png' });
  await page.getByRole('button', { name: 'Close lightbox' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
