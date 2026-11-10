import { test, expect } from '@playwright/test';

test('both origins are listed and start closed', async ({ page }) => {
  await page.goto('/#origenes');
  await expect(page.locator('.origin-tab')).toHaveCount(2);
  await expect(page.locator('#origins-title')).toHaveText('Dos orígenes.');
  await expect(page.locator('#tab-colombia')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#tab-peru')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#panel-colombia')).toBeHidden();
  await expect(page.locator('#panel-peru')).toBeHidden();
  await expect(page.locator('body')).not.toContainText('Honduras');
  await expect(page.locator('body')).not.toContainText('Costa Rica');
});

test('clicking another origin switches the panel', async ({ page }) => {
  await page.goto('/#origenes');
  await page.locator('#tab-colombia').click();
  await page.locator('#tab-peru').click();
  await expect(page.locator('#tab-peru')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#panel-peru')).toBeVisible();
  await expect(page.locator('#panel-colombia')).toBeHidden();
  await expect(page.locator('#panel-peru')).toContainText('16 h');
});

test('clicking the open origin closes it and the next click reopens it', async ({ page }) => {
  await page.goto('/#origenes');
  const colombia = page.locator('#tab-colombia');
  await colombia.click();
  await expect(colombia).toHaveAttribute('aria-expanded', 'true');
  await colombia.click();
  await expect(colombia).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#panel-colombia')).toBeHidden();
  await colombia.click();
  await expect(colombia).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#panel-colombia')).toBeVisible();
});

test('the Compra tab shows the price and a WhatsApp link', async ({ page }) => {
  await page.goto('/#origenes');
  await page.locator('#tab-colombia').click();
  const panel = page.locator('#panel-colombia');
  await panel.getByRole('tab', { name: 'COMPRA' }).click();
  await expect(page.locator('#compra-colombia')).toBeVisible();
  await expect(page.locator('#sabor-colombia')).toBeHidden();
  await expect(page.locator('#compra-colombia')).toContainText('$4.500');
  await expect(panel.locator('.detail-cta')).toHaveAttribute('href', /^https:\/\/wa\.me\//);
});

test('keyboard can open a row with Enter', async ({ page }) => {
  await page.goto('/#origenes');
  await page.locator('#tab-colombia').focus();
  await page.locator('#tab-colombia').press('Enter');
  await expect(page.locator('#panel-colombia')).toBeVisible();
  await page.locator('#tab-colombia').press('Enter');
  await expect(page.locator('#panel-colombia')).toBeHidden();
});

test('a hash link opens its origin directly', async ({ page }) => {
  await page.goto('/#peru');
  await expect(page.locator('#panel-peru')).toBeVisible();
  await expect(page.locator('#panel-colombia')).toBeHidden();
});

test('the open panel sits directly below its row without overlap', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/#origenes');
  await page.locator('#tab-peru').click();
  // Wait for the panel's entrance animation to finish, then measure both elements together.
  await expect.poll(() => page.locator('#panel-peru').evaluate((el) => el.getAnimations().filter((a) => a.playState === 'running').length)).toBe(0);
  const gap = await page.evaluate(() => {
    const row = document.querySelector('#tab-peru')!.getBoundingClientRect();
    const panel = document.querySelector('#panel-peru')!.getBoundingClientRect();
    return panel.top - row.bottom;
  });
  expect(Math.abs(gap)).toBeLessThanOrEqual(1);
});

test('origin rows span the full width at phone and desktop widths', async ({ page }) => {
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/#origenes');
    const widths = await page.locator('.origin-tab').evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().width)),
    );
    const section = await page.locator('#origenes').evaluate((el) => Math.round(el.getBoundingClientRect().width));
    expect(widths).toEqual([section, section]);
  }
});
