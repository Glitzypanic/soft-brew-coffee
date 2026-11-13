import { animate } from 'motion/mini';

// Panel animation: the wrapper animates its height and the panel fades alongside it.
const EASE = [0.22, 1, 0.36, 1] as const;
const OPEN_DURATION = 0.45;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const section = document.querySelector<HTMLElement>('#origenes');
const tabs = document.querySelectorAll<HTMLButtonElement>('.origin-tab');
const panels = document.querySelectorAll<HTMLElement>('.origin-detail');
const buyBar = document.querySelector<HTMLElement>('.buy-bar');
const buyName = buyBar?.querySelector<HTMLElement>('.buy-bar-name');
const buyPrice = buyBar?.querySelector<HTMLElement>('.buy-bar-price');
const buyCta = buyBar?.querySelector<HTMLAnchorElement>('.buy-bar-cta');

// A wrapper keeps its running animation, so a new click picks up from the current height.
const runners = new WeakMap<HTMLElement, { stop: () => void }>();

function setPanelOpen(panel: HTMLElement, open: boolean) {
  const wrapper = panel.parentElement as HTMLElement;
  if ((wrapper.dataset.open === 'true') === open && !runners.has(wrapper)) {
    return;
  }

  wrapper.dataset.open = String(open);
  panel.inert = !open;
  if (open) panel.style.visibility = 'visible';
  runners.get(wrapper)?.stop();

  const from = wrapper.getBoundingClientRect().height;
  const to = open ? panel.scrollHeight : 0;
  const duration = reducedMotion.matches ? 0 : OPEN_DURATION;
  wrapper.style.height = `${from}px`;

  const height = animate(
    wrapper,
    { height: [`${from}px`, `${to}px`] },
    { duration, ease: EASE },
  );
  const fade = animate(
    panel,
    { opacity: open ? [0, 1] : [1, 0] },
    { duration: duration * 0.8, ease: 'easeOut' },
  );
  runners.set(wrapper, {
    stop: () => {
      height.stop();
      fade.stop();
    },
  });

  height.then(() => {
    runners.delete(wrapper);
    wrapper.style.height = open ? '' : '0px';
    if (!open) panel.style.visibility = 'hidden';
  });
}

function selectOrigin(id: string) {
  const tab = [...tabs].find((item) => item.dataset.origin === id);
  if (!tab) return;

  tabs.forEach((item) =>
    item.setAttribute('aria-expanded', String(item === tab)),
  );
  panels.forEach((panel) => setPanelOpen(panel, panel.dataset.origin === id));

  const active = document.getElementById(`panel-${id}`);
  if (!active || !buyBar) return;
  if (buyName)
    buyName.textContent =
      tab.querySelector('.origin-tab-name')?.textContent ?? '';
  if (buyPrice)
    buyPrice.textContent =
      tab.querySelector('.origin-tab-price')?.textContent ?? '';
  if (buyCta)
    buyCta.href =
      active.querySelector<HTMLAnchorElement>('.detail-cta')?.href ?? '#';
}

// Clicking the open origin closes it; clicking any other origin opens that one.
function closeAll() {
  tabs.forEach((item) => item.setAttribute('aria-expanded', 'false'));
  panels.forEach((panel) => setPanelOpen(panel, false));
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.getAttribute('aria-expanded') === 'true') closeAll();
    else selectOrigin(tab.dataset.origin!);
  });
});

// Sabor and Compra form a tablist: one selected tab, arrow keys and Home/End move between them.
function selectDetailTab(panel: HTMLElement, selected: HTMLButtonElement) {
  const buttons = panel.querySelectorAll<HTMLButtonElement>('.detail-tab');
  buttons.forEach((button) => {
    const active = button === selected;
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
  });
  const sabor = panel.querySelector<HTMLElement>('.detail-sabor');
  const compra = panel.querySelector<HTMLElement>('.detail-compra');
  if (sabor) sabor.hidden = selected.dataset.target !== 'sabor';
  if (compra) compra.hidden = selected.dataset.target !== 'compra';
}

function tabTargetFor(
  key: string,
  current: number,
  count: number,
): number | null {
  switch (key) {
    case 'ArrowRight':
      return (current + 1) % count;
    case 'ArrowLeft':
      return (current - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return null;
  }
}

panels.forEach((panel) => {
  const buttons = [...panel.querySelectorAll<HTMLButtonElement>('.detail-tab')];
  buttons.forEach((button) => {
    button.addEventListener('click', () => selectDetailTab(panel, button));
  });
  panel.querySelector('.detail-tabs')?.addEventListener('keydown', (event) => {
    const current = buttons.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    if (current === -1) return;
    const target = tabTargetFor(
      (event as KeyboardEvent).key,
      current,
      buttons.length,
    );
    if (target === null) return;
    event.preventDefault();
    selectDetailTab(panel, buttons[target]);
    buttons[target].focus();
  });
});

// Deep links such as #peru open that origin directly.
const fromHash = location.hash.slice(1);
if (fromHash) selectOrigin(fromHash);
window.addEventListener('hashchange', () =>
  selectOrigin(location.hash.slice(1)),
);

// The mobile buy bar shows only while the collection is on screen.
if (section && buyBar) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      buyBar.classList.toggle('is-visible', entry.isIntersecting);
      buyBar.setAttribute('aria-hidden', String(!entry.isIntersecting));
      if (buyCta) buyCta.tabIndex = entry.isIntersecting ? 0 : -1;
    },
    { threshold: 0.15 },
  );
  observer.observe(section);
}
