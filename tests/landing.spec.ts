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
  for (const origin of ['Colombia', 'Perú']) {
    await page
      .locator('.variety-summary', { hasText: origin })
      .click();
    await expect(
      page.getByRole('heading', { level: 3, name: origin, exact: true }),
    ).toBeInViewport();
  }
  await expect(page.getByRole('heading', { level: 3, name: 'Próximamente', exact: true })).toHaveCount(0);
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
  await expect(page.locator('.origin-image > .bottle > img')).toHaveCount(2);
  await expect(page.locator('.hero-photo img')).toHaveCount(1);
  await expect(page.locator('.hero-bottle')).toHaveCount(0);
  await expect(page.locator('.hero-logo-title img')).toHaveAttribute('src', '/brand/soft-brew-coffee.svg');
  await expect(page.locator('.footer-brand img')).toHaveAttribute('src', '/brand/soft-brew-coffee.svg');
  const heroCaption = await page.locator('.hero-photo figcaption').evaluate((element) => {
    const style = getComputedStyle(element);
    return { background: style.backgroundColor, color: style.color, blur: style.backdropFilter };
  });
  expect(heroCaption.background).toContain('rgba(233, 230, 219,');
  expect(heroCaption.color).toBe('rgb(24, 26, 25)');
  expect(heroCaption.blur).toContain('blur(');
  for (const caption of await page.locator('.pause-photos figcaption').all()) {
    expect(await caption.evaluate((element) => getComputedStyle(element).backdropFilter)).toContain('blur(');
    expect(await caption.evaluate((element) => getComputedStyle(element).position)).toBe('absolute');
  }
  expect(errors).toEqual([]);
  await page.getByRole('link', { name: 'VOLVER ARRIBA' }).click();
  await expect(page.locator('header')).toBeInViewport();
});

test('the masthead shows the original kettle and V60 symbol without another wordmark', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const brand = page.getByRole('link', { name: 'Soft Brew Coffee, inicio' });
    const symbol = brand.locator('img');
    await expect(brand).toHaveText('');
    await expect(symbol).toHaveAttribute('src', '/brand/brew-symbol.svg');
    await expect(symbol).toHaveJSProperty('complete', true);
    const mastheadBounds = await page.locator('.masthead').boundingBox();
    const symbolBounds = await symbol.boundingBox();
    expect(mastheadBounds).not.toBeNull();
    expect(symbolBounds).not.toBeNull();
    expect(symbolBounds!.height).toBeGreaterThanOrEqual(48);
    expect(symbolBounds!.height).toBeLessThanOrEqual(54);
    expect(symbolBounds!.y).toBeGreaterThanOrEqual(mastheadBounds!.y);
    expect(symbolBounds!.y + symbolBounds!.height).toBeLessThanOrEqual(mastheadBounds!.y + 76);
  }
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

test('mobile imagery stays compact and photographic captions remain inside the images', async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const hero = (await page.locator('.hero-photo').boundingBox())!;
    expect(hero.width).toBeLessThanOrEqual(width - 40);
    expect(hero.height).toBeLessThanOrEqual(width);
    for (const card of await page.locator('.variety').all()) {
      const bottle = (await card.locator('.variety-summary .bottle').boundingBox())!;
      const frame = (await card.locator('.origin-image').boundingBox())!;
      expect(bottle.height).toBeLessThanOrEqual(width / 2);
      expect(bottle.y).toBeGreaterThanOrEqual(frame.y - 1);
      expect(bottle.y + bottle.height).toBeLessThanOrEqual(frame.y + frame.height + 1);
    }
    for (const figure of await page.locator('.pause-photos figure').all()) {
      const image = (await figure.locator('img').first().boundingBox())!;
      const caption = (await figure.locator('figcaption').boundingBox())!;
      expect(image.width).toBeLessThanOrEqual(width - 40);
      expect(image.height).toBeLessThanOrEqual(width);
      expect(caption.x).toBeGreaterThanOrEqual(image.x);
      expect(caption.x + caption.width).toBeLessThanOrEqual(image.x + image.width);
    }
  }
});

test('neutral canvas, original collection colors, restrained orange numbers and small footer logo', async ({ page }) => {
  await page.goto('/');
  const background = (selector: string) =>
    page.locator(selector).evaluate((element) => getComputedStyle(element).backgroundColor);
  for (const selector of ['body', '.hero', '.pause-heading', '.footer']) {
    expect(await background(selector)).toBe('rgb(233, 230, 219)');
  }
  expect(await background('.collection-picker')).toBe('rgb(24, 26, 25)');
  for (const [id, color] of [
    ['colombia', 'rgb(210, 210, 210)'],
    ['peru', 'rgb(217, 210, 24)'],
  ]) {
    expect(await background(`#${id}`)).toBe(color);
  }
  expect(await page.locator('.hero-origin-note .accent-number').first().evaluate((element) => getComputedStyle(element).color)).toBe('rgb(182, 49, 8)');
  expect(await page.locator('.footer').evaluate((element) => getComputedStyle(element).borderTopColor)).toBe('rgb(24, 26, 25)');
  const logo = await page.locator('.footer-brand').boundingBox();
  const footer = await page.locator('.footer').boundingBox();
  expect(logo).not.toBeNull();
  expect(footer).not.toBeNull();
  expect(logo!.width).toBeLessThan(200);
  expect(logo!.x).toBeLessThan(footer!.x + footer!.width / 3);
});

test('the shorter footer keeps its slogan without repeating the origin navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.footer-statement h2')).toHaveText(/EL CAFÉ\s*SE TOMA\s*SU TIEMPO\./);
  await expect(page.locator('.footer-directory')).toHaveCount(0);
  await expect(page.locator('.footer-header')).toContainText('02 ORÍGENES');
  expect((await page.locator('.footer-header').boundingBox())!.height).toBeGreaterThan(70);
  expect(await page.locator('.footer-bottom').evaluate((element) => getComputedStyle(element).alignItems)).toBe('center');
  await page.getByRole('link', { name: /LOS ORÍGENES/ }).click();
  await expect(page).toHaveURL(/#origenes$/);
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
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Colombia y Perú/);
  await expect(page.locator('body')).not.toContainText('Honduras');
  await expect(page.locator('body')).not.toContainText('Costa Rica');
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
  for (const title of ['Colombia', 'Perú']) {
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
