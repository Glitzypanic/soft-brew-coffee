import { test, expect } from '@playwright/test';

// The logo file leaves about 21% of its height empty below the letters.
const LOGO_EMPTY_BOTTOM = 0.212;
const GREY = 'rgb(233, 230, 219)'; // --grey

// Vertical middle of a bounding box.
const mid = (b: { y: number; height: number }) => b.y + b.height / 2;

test('items in each row sit on one baseline', async ({ page }) => {
  await page.goto('/#colombia');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      (img as HTMLImageElement).loading = 'eager';
    });
    await new Promise((resolve) => setTimeout(resolve, 600));
  });

  const rows = await page.evaluate((emptyBottom) => {
    const canvas = document.createElement('canvas').getContext('2d')!;
    // Baseline of the last glyph of an element: range top plus the font's ascent.
    const textBaseline = (el: Element) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let last: Text | null = null;
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.textContent?.trim()) last = node as Text;
      }
      if (!last) return el.getBoundingClientRect().bottom;
      const text = last.textContent!.trimEnd();
      const range = document.createRange();
      range.setStart(last, text.length - 1);
      range.setEnd(last, text.length);
      const cs = getComputedStyle(last.parentElement!);
      canvas.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      return (
        range.getBoundingClientRect().top +
        canvas.measureText('x').fontBoundingBoxAscent
      );
    };
    // Where the logo's letters end: its box bottom minus the empty strip below them.
    const logoInk = (img: Element) => {
      const r = img.getBoundingClientRect();
      return r.bottom - emptyBottom * r.height;
    };
    const q = (selector: string) => document.querySelector(selector)!;
    const result: Record<string, number[]> = {
      masthead: [
        textBaseline(q('.main-nav a:nth-child(1)')),
        textBaseline(q('.main-nav a:nth-child(2)')),
      ],
      spec: [
        logoInk(q('.spec-brand img')),
        textBaseline(q('.spec-brand .mono')),
      ],
    };
    if (window.innerWidth >= 701) {
      // On phones these items stack into columns, so only the wide layout shares one floor.
      result.footer = [
        logoInk(q('.footer-brand img')),
        textBaseline(q('.footer-social .contact-link')),
        textBaseline(q('.footer-return')),
      ];
    }
    return result;
  }, LOGO_EMPTY_BOTTOM);

  for (const [name, values] of Object.entries(rows)) {
    const spread = Math.max(...values) - Math.min(...values);
    expect(spread, `${name} baselines`).toBeLessThanOrEqual(1.5);
  }
});

test('navbar arrows share one size and sit centred with their words', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const arrows = page.locator('.main-nav svg, .masthead-cta svg');
  const count = await arrows.count();
  expect(count).toBeGreaterThanOrEqual(3);
  for (let i = 0; i < count; i++) {
    // Computed width ignores rotation, so every arrow is compared at its layout size.
    // Text is 14px, so each navbar arrow is 1.13em (about 15.8px), down arrow included.
    const size = await arrows.nth(i).evaluate((el) => {
      const cs = getComputedStyle(el);
      return { w: parseFloat(cs.width), h: parseFloat(cs.height) };
    });
    expect(Math.abs(size.w - 15.8), `arrow ${i} width`).toBeLessThanOrEqual(
      0.6,
    );
    expect(Math.abs(size.h - 15.8), `arrow ${i} height`).toBeLessThanOrEqual(
      0.6,
    );
  }

  const right = await page
    .locator('.main-nav a:nth-child(2) svg')
    .evaluate((el) => getComputedStyle(el).transform);
  // The right arrow is drawn pointing right, so it needs no rotation.
  expect(right).toBe('none');

  const centres = await page.evaluate(() =>
    [...document.querySelectorAll('.main-nav a')].map((link) => {
      const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT);
      let text: Text | null = null;
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.textContent?.trim()) {
          text = node as Text;
          break;
        }
      }
      const word = document.createRange();
      word.selectNodeContents(text!);
      const w = word.getBoundingClientRect();
      const arrow = link.querySelector('svg')!.getBoundingClientRect();
      return {
        word: (w.top + w.bottom) / 2,
        arrow: (arrow.top + arrow.bottom) / 2,
      };
    }),
  );
  for (const { word, arrow } of centres) {
    expect(Math.abs(word - arrow), 'word and arrow centre').toBeLessThanOrEqual(
      2,
    );
  }
});

test('the Pedir card aligns its label with Pedir and sets the arrow beside the word', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const card = await page.locator('.bento-cta').boundingBox();
  const band = await page.locator('.bento-data').boundingBox();
  const label = await page.locator('.bento-cta .mono').boundingBox();
  const row = await page.locator('.bento-cta-row').boundingBox();
  const word = await page.locator('.bento-cta-word').boundingBox();
  const arrow = await page.locator('.bento-cta svg').boundingBox();
  const cell = await page.locator('.bento-data > div').first().boundingBox();
  if (!card || !band || !label || !row || !word || !arrow || !cell) {
    throw new Error('bento boxes missing');
  }
  // Content is centred inside the card: space above the label equals space below the row.
  expect(
    Math.abs(label.y - card.y - (card.y + card.height - row.y - row.height)),
    'card padding',
  ).toBeLessThanOrEqual(3);
  // The figures sit centred in the band.
  expect(
    Math.abs(mid(cell) - mid(band)),
    'figures centred',
  ).toBeLessThanOrEqual(2);
  // Pedir's box sits at the optical offset (-0.05em), so its ink starts on the label's edge.
  const wordSizeForOptical = await page
    .locator('.bento-cta-word')
    .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(
    Math.abs(label.x - word.x - 0.05 * wordSizeForOptical),
    'label aligned with Pedir ink',
  ).toBeLessThanOrEqual(2);
  const figureCentres = await page.evaluate(() =>
    [...document.querySelectorAll('.bento-data > div')].map((cellEl) => {
      // Each figure and its label are centred on the cell's own centre line.
      const cell = cellEl.getBoundingClientRect();
      const cellMid = cell.left + cell.width / 2;
      const figure = cellEl
        .querySelector('.bento-figure')!
        .getBoundingClientRect();
      const caption = cellEl.querySelector('.mono')!.getBoundingClientRect();
      return Math.max(
        Math.abs(figure.left + figure.width / 2 - cellMid),
        Math.abs(caption.left + caption.width / 2 - cellMid),
      );
    }),
  );
  for (const gap of figureCentres) {
    expect(gap, 'figure and label centred').toBeLessThanOrEqual(2);
  }
  // The arrow sits beside Pedir, on the same centre line.
  expect(
    Math.abs(mid(arrow) - mid(word)),
    'arrow beside word',
  ).toBeLessThanOrEqual(3);
  expect(arrow.x).toBeGreaterThan(word.x + word.width - 1);
  // The arrow box is 1.125em of the word, so its glyph reaches the cap height of "Pedir".
  const wordSize = await page
    .locator('.bento-cta-word')
    .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(
    Math.abs(arrow.height - 1.125 * wordSize),
    'arrow box height',
  ).toBeLessThanOrEqual(2);
});

test('the origin price is larger than body text and not grey', async ({
  page,
}) => {
  await page.goto('/');
  const price = page.locator('#tab-colombia .origin-tab-price');
  const closed = await price.evaluate((el) => {
    const cs = getComputedStyle(el);
    return {
      size: parseFloat(cs.fontSize),
      color: cs.color,
      opacity: cs.opacity,
    };
  });
  expect(closed.size).toBeGreaterThanOrEqual(17);
  expect(closed.opacity).toBe('1');
  expect(closed.color).not.toBe(GREY);

  await page.locator('#tab-colombia').click();
  await expect(page.locator('#tab-colombia')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  const open = await price.evaluate((el) => getComputedStyle(el).color);
  expect(open).not.toBe(GREY);
});

test('the origin number and price sit centred on the name', async ({
  page,
}) => {
  await page.goto('/');
  const name = await page
    .locator('#tab-colombia .origin-tab-name')
    .boundingBox();
  const num = await page.locator('#tab-colombia .origin-tab-num').boundingBox();
  const price = await page
    .locator('#tab-colombia .origin-tab-price')
    .boundingBox();
  if (!name || !num || !price) throw new Error('origin tab boxes missing');
  expect(Math.abs(mid(num) - mid(name)), 'number centred').toBeLessThanOrEqual(
    3,
  );
  expect(Math.abs(mid(price) - mid(name)), 'price centred').toBeLessThanOrEqual(
    3,
  );
});

test('the Pedir card has no bottom rule and turns ink on hover', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const card = page.locator('.bento-cta');
  const idle = await card.evaluate((el) => {
    const cs = getComputedStyle(el);
    return { bottom: cs.borderBottomWidth, background: cs.backgroundColor };
  });
  expect(idle.bottom).toBe('0px');
  await card.hover();
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).backgroundColor))
    .toBe('rgb(24, 26, 25)'); // --ink
});
