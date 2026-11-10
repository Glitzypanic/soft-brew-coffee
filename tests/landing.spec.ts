import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('the page loads with one heading, all images, and no runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Soft Brew Coffee — El lado frío del café');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  for (const img of await page.locator('img').all()) {
    // Images inside closed origin panels are not loaded yet, so only check visible ones.
    if (!(await img.isVisible())) continue;
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() => img.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0))
      .toBeTruthy();
  }
  expect(errors).toEqual([]);
});

test('the hero title and photo render at desktop and phone widths', async ({ page }) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.spec-title')).toContainText('Café de especialidad');
    await expect(page.locator('.spec-photo img')).toHaveCount(1);
  }
});

test('the masthead shows the brand symbol', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const brand = page.getByRole('link', { name: 'Soft Brew Coffee, inicio' });
    await expect(brand.locator('img')).toHaveAttribute('src', '/brand/brew-symbol.svg');
    await expect(brand.locator('img')).toHaveJSProperty('complete', true);
  }
});

test('no horizontal overflow across phone, tablet and desktop widths', async ({ page }) => {
  for (const width of [320, 390, 700, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
      `overflow at ${width}px`,
    ).toBeTruthy();
  }
});

test('the preparations section lists four recipes', async ({ page }) => {
  await page.goto('/#preparaciones');
  await expect(page.locator('.prep')).toHaveCount(4);
  await expect(page.locator('.prep h3').first()).toHaveText('Cold brew tonic');
});

test('the footer offers WhatsApp contact and no Instagram link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.footer-social a')).toHaveAttribute('href', /^https:\/\/wa\.me\//);
  await expect(page.locator('a[href*="instagram.com"]')).toHaveCount(0);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.locator('form')).toHaveCount(0);
});

test('search metadata and canonical URL are set', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://soft-brew-coffee.vercel.app/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /social-cover\.png$/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Colombia y Perú/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
});

test('keyboard skip link works and the page passes automated accessibility checks', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#contenido$/);
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([]);
});

test('reduced motion keeps the content readable and enlarged text does not overflow', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  await expect(page.locator('.spec-title')).toBeVisible();
  await expect(page.locator('#tab-colombia')).toBeVisible();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
      `text enlarged at ${width}px`,
    ).toBeTruthy();
  }
});
