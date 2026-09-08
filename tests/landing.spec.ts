import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('the collection is readable, its anchors work, and every image loads', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Soft Brew Coffee — El lado frío del café');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  for (const origin of ['Colombia', 'Perú', 'Honduras', 'Costa Rica']) {
    await page
      .locator('summary', { hasText: origin })
      .click();
    await expect(
      page.getByRole('heading', { level: 3, name: origin, exact: true }),
    ).toBeInViewport();
  }
  // Scroll each lazy image into view before testing its decoded state.
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBeTruthy();
  }
  await expect(page.locator('.origin-image img')).toHaveCount(4);
  await expect(page.locator('.hero-bottles img')).toHaveCount(2);
  expect(errors).toEqual([]);
  await page.getByRole('link', { name: 'VOLVER ARRIBA' }).click();
  await expect(page.locator('header')).toBeInViewport();
});

test('no horizontal overflow across narrow, tablet and desktop widths', async ({
  page,
}) => {
  for (const width of [320, 390, 700, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
      `overflow at ${width}px`,
    ).toBeTruthy();
  }
});

test('keyboard access and accessibility checks pass', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Saltar al contenido' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#contenido$/);
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(result.violations).toEqual([]);
});

test('published site keeps Instagram unlinked and has search metadata', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.instagram-label')).toHaveText('INSTAGRAM');
  await expect(page.locator('a[href*="instagram.com"]')).toHaveCount(0);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://soft-brew-coffee.vercel.app/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /social-cover\.png$/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'index, follow',
  );
});

test('reduced motion and enlarged text preserve access to content', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto');
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  for (const title of ['Colombia', 'Perú', 'Honduras', 'Costa Rica']) {
    await expect(
      page.getByRole('heading', { level: 3, name: title, exact: true }),
    ).toBeVisible();
  }
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
      `text enlarged at ${width}px`,
    ).toBeTruthy();
  }
});
