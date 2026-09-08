import { test, expect } from '@playwright/test';

test('all varieties are visible and reveal their own characteristics', async ({ page }) => {
  await page.goto('/#origenes');
  for (const [id, hours] of [['colombia',24],['peru',16],['honduras',26],['costa-rica',24]] as const) {
    const card = page.locator(`details#${id}`);
    await expect(card.locator('summary')).toBeVisible();
    await expect(card.locator('.variety-details')).toBeHidden();
    await card.locator('summary').click();
    await expect(card.locator('.variety-details')).toContainText(`${hours} horas`);
    await expect(card.locator('.variety-details')).toContainText('200 ml');
    await card.locator('summary').click();
    await expect(card.locator('.variety-details')).toBeHidden();
  }
});

test('keyboard toggles characteristics and shared origin links reveal them', async ({ page }) => {
  await page.goto('/#peru');
  await expect(page.locator('#peru .variety-details')).toBeVisible();
  const summary = page.locator('#honduras summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#honduras .variety-details')).toBeVisible();
  await page.keyboard.press('Space');
  await expect(page.locator('#honduras .variety-details')).toBeHidden();
});

test('expanded cards remain readable with enlarged text on a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/#origenes');
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  for (const summary of await page.locator('.variety summary').all()) await summary.click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
});

test('name, bottle and details interpolate together and can reverse mid-flight', async ({ page }) => {
  await page.setViewportSize({ width: 732, height: 900 });
  await page.goto('/#origenes');
  const card = page.locator('#colombia');
  const summary = card.locator('summary');
  const measure = () => card.evaluate(el => {
    const title = el.querySelector('h3')!.getBoundingClientRect();
    const bottle = el.querySelector('.bottle')!.getBoundingClientRect();
    return { title: title.width, bottle: bottle.left, opacity: Number(getComputedStyle(el.querySelector('.variety-details')!).opacity) };
  });
  const start = await measure();
  await summary.press('Enter');
  await expect.poll(async () => (await measure()).opacity).toBeGreaterThan(.1);
  const middle = await measure();
  expect(middle.opacity).toBeLessThan(1);
  expect(middle.title).toBeLessThan(start.title);
  expect(middle.bottle).toBeLessThan(start.bottle);
  await summary.press('Enter');
  await summary.press('Enter');
  await expect(card).toHaveAttribute('data-expanded', 'true');
  await expect.poll(async () => (await measure()).opacity).toBe(1);
  const end = await measure();
  expect(end.title).toBeLessThan(middle.title);
  await summary.press('Enter');
  await expect(card).not.toHaveAttribute('open');
  expect((await measure()).title).toBeCloseTo(start.title, 0);
});
