import { test, expect, type Page } from '@playwright/test';

// Budgets. They leave some headroom so normal content edits do not fail them.
const PAGE_WEIGHT_BUDGET_KB = 650;
const LCP_BUDGET_MS = 2500;
const FAVICON_BUDGET_BYTES = 25_000;
// Photos must look sharp up to 2x density. Phones at 3x accept that trade-off for speed.
const SHARP_UP_TO_DENSITY = 2;

// Reads the pixel width of a WebP (lossy, lossless or extended) or AVIF file.
function intrinsicWidth(bytes: Buffer): number | null {
  if (
    bytes.toString('ascii', 0, 4) === 'RIFF' &&
    bytes.toString('ascii', 8, 12) === 'WEBP'
  ) {
    const chunk = bytes.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') return bytes.readUInt16LE(26) & 0x3fff;
    if (chunk === 'VP8L') return (bytes.readUInt32LE(21) & 0x3fff) + 1;
    if (chunk === 'VP8X') return bytes.readUIntLE(24, 3) + 1;
    return null;
  }
  // AVIF stores the size in an "ispe" box: version and flags, then width and height.
  const ispe = bytes.indexOf('ispe', 0, 'ascii');
  return ispe === -1 ? null : bytes.readUInt32BE(ispe + 8);
}

// Scrolls the whole page so lazy images start loading, then waits for them.
async function loadEverything(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 300));
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(
    () => [...document.images].every((img) => img.complete),
    null,
    {
      timeout: 20_000,
    },
  );
}

test('photos ship as AVIF with a WebP fallback', async ({ page }) => {
  await page.goto('/');
  const avifSources = await page
    .locator('picture source[type="image/avif"]')
    .count();
  expect(avifSources, 'hero and two bento photos').toBeGreaterThanOrEqual(3);

  const hero = page.locator('.spec-photo img');
  await expect(hero).toHaveAttribute('loading', 'eager');
  await expect(hero).toHaveAttribute('fetchpriority', 'high');
  // Chromium supports AVIF, so the browser must pick the AVIF candidate.
  expect(
    await hero.evaluate((img: HTMLImageElement) => img.currentSrc),
  ).toMatch(/\.avif$/);
});

test('photos and bottles are sharp enough for their displayed size', async ({
  page,
}) => {
  const failures: string[] = [];
  let checked = 0;
  for (const path of ['/', '/#colombia', '/#peru']) {
    await page.goto(path);
    await loadEverything(page);
    const dpr = await page.evaluate(() => window.devicePixelRatio);
    const images = await page.evaluate(() =>
      [...document.images]
        .filter(
          (img) =>
            img.currentSrc &&
            !img.currentSrc.endsWith('.svg') &&
            !img.closest('[inert]'),
        )
        .map((img) => ({
          src: img.currentSrc,
          shown: img.getBoundingClientRect().width,
        }))
        .filter((img) => img.shown > 0),
    );
    for (const image of images) {
      checked += 1;
      const response = await page.request.get(image.src);
      const width = intrinsicWidth(await response.body());
      const needed = image.shown * Math.min(dpr, SHARP_UP_TO_DENSITY);
      if (width === null || width < needed) {
        failures.push(
          `${path} ${image.src.split('/').pop()}: ${width}px for ${Math.round(image.shown)} css px at ${dpr}x`,
        );
      }
    }
  }
  // Guard against passing with nothing checked: the home page shows 3 photos,
  // and each origin page adds its open bottle, so there are at least 10 checks.
  expect(checked, 'images checked').toBeGreaterThanOrEqual(10);
  expect(failures).toEqual([]);
});

test('the home page transfers under the weight budget', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
  await loadEverything(page);
  const kb = await page.evaluate(
    () =>
      performance
        .getEntriesByType('resource')
        .reduce(
          (sum, entry) =>
            sum + (entry as PerformanceResourceTiming).transferSize,
          0,
        ) / 1024,
  );
  expect(kb, 'transferred KB').toBeLessThan(PAGE_WEIGHT_BUDGET_KB);
});

test('the phone hero reaches largest contentful paint in time on a slow network', async ({
  browser,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'mobile',
    'the throttled phone profile runs once',
  );
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const session = await context.newCDPSession(page);
  // Lighthouse-like profile: 1.6 Mbps, 150 ms round trip, 4x slower CPU.
  await session.send('Network.enable');
  await session.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 150,
    downloadThroughput: 209_715,
    uploadThroughput: 98_304,
  });
  await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    const w = window as unknown as {
      __lcp: { time: number; src: string } | null;
    };
    w.__lcp = null;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as PerformanceEntry[]) {
        const element = (
          entry as PerformanceEntry & { element?: HTMLImageElement }
        ).element;
        w.__lcp = { time: entry.startTime, src: element?.currentSrc ?? '' };
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });

  await page.goto('/', { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  const lcp = await page.evaluate(
    () => (window as unknown as { __lcp: { time: number; src: string } }).__lcp,
  );
  await context.close();

  expect(lcp?.time ?? Infinity, 'LCP ms').toBeLessThan(LCP_BUDGET_MS);
  expect(lcp?.src).toContain('hero-flatlay');
});

test('the favicon stays small', async ({ request }) => {
  const response = await request.get('/brand/keep-cold.svg');
  expect(response.ok()).toBeTruthy();
  expect((await response.body()).length).toBeLessThan(FAVICON_BUDGET_BYTES);
});
