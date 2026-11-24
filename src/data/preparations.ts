import type { ImageMetadata } from 'astro';
import tonic from '../assets/preparations/tonic.svg';
import latte from '../assets/preparations/latte.svg';
import naranja from '../assets/preparations/naranja.svg';
import affogato from '../assets/preparations/affogato.svg';

export interface Preparation {
  id: string;
  name: string;
  pairsWith: 'colombia' | 'peru' | 'ambos';
  ingredients: { item: string; amount: string }[];
  steps: string[];
  accent: string;
  /** Dark background: text turns light. */
  dark?: boolean;
  /** Doodle of the drink, drawn in Magnific. */
  art: ImageMetadata;
}

export const pairingLabel: Record<Preparation['pairsWith'], string> = {
  colombia: 'CON COLOMBIA',
  peru: 'CON PERÚ',
  ambos: 'CUALQUIER ORIGEN',
};

// A thin light edge so the black line drawing keeps its outline on a dark background.
const lightEdge = ['1px 0', '-1px 0', '0 1px', '0 -1px']
  .map((offset) => `drop-shadow(${offset} 0 #f7f6f1)`)
  .join(' ');

/** Inline custom properties for a drink's colour block: --bg, --fg (text) and --art-edge
 *  (outline for the drawing on dark). Hex for --fg because blocks set --ink from it. */
export const prepVars = (prep: Preparation) =>
  `--bg:${prep.accent}; --fg:${prep.dark ? '#f7f6f1' : '#181a19'}; --art-edge:${
    prep.dark ? lightEdge : 'none'
  }`;

/** "Cold brew tonic" → "Tonic", for tabs and pickers where "cold brew" repeats. */
export const shortName = (name: string) => {
  const rest = name.replace(/^cold brew /i, '');
  return rest.charAt(0).toUpperCase() + rest.slice(1);
};

// Recipes use one 200 ml botellín as the base.
// Card colours come from the home page: Perú's bottle yellow, clay, the light accent
// orange, and ink for a dark card.
export const preparations: Preparation[] = [
  {
    id: 'tonic',
    name: 'Cold brew tonic',
    pairsWith: 'peru',
    ingredients: [
      { item: 'Cold brew', amount: '1 botellín · 200 ml' },
      { item: 'Agua tónica', amount: '150 ml' },
      { item: 'Hielo', amount: 'al tope' },
      { item: 'Limón', amount: 'una rodaja' },
    ],
    steps: [
      'Llena un vaso alto con hielo.',
      'Vierte la tónica hasta la mitad.',
      'Agrega el cold brew despacio para que quede flotando.',
      'Termina con la rodaja de limón.',
    ],
    accent: '#D9D218',
    art: tonic,
  },
  {
    id: 'latte',
    name: 'Cold brew latte',
    pairsWith: 'ambos',
    ingredients: [
      { item: 'Cold brew', amount: '1 botellín · 200 ml' },
      { item: 'Leche', amount: '120 ml · entera o avena' },
      { item: 'Hielo', amount: 'al tope' },
    ],
    steps: [
      'Pon el hielo en el vaso.',
      'Agrega la leche fría.',
      'Vierte el cold brew encima, sin revolver.',
    ],
    accent: 'var(--clay)',
    art: latte,
  },
  {
    id: 'naranja',
    name: 'Cold brew naranja',
    pairsWith: 'colombia',
    ingredients: [
      { item: 'Cold brew', amount: '1 botellín · 200 ml' },
      { item: 'Jugo de naranja', amount: '100 ml · recién exprimido' },
      { item: 'Hielo', amount: 'al tope' },
      { item: 'Naranja', amount: 'un trozo de cáscara' },
    ],
    steps: [
      'Llena un vaso bajo con hielo.',
      'Vierte el jugo de naranja.',
      'Agrega el cold brew despacio para que quede en capas.',
      'Termina con la cáscara de naranja.',
    ],
    accent: 'var(--accent-on-dark)',
    art: naranja,
  },
  {
    id: 'affogato',
    name: 'Cold brew affogato',
    pairsWith: 'ambos',
    ingredients: [
      { item: 'Cold brew', amount: '1 botellín · 200 ml' },
      { item: 'Helado de vainilla', amount: '2 bolas' },
      { item: 'Cacao rallado', amount: 'una pizca' },
    ],
    steps: [
      'Sirve el helado en una copa fría.',
      'Vierte el cold brew sobre el helado en el momento.',
      'Espolvorea el cacao y sirve de inmediato.',
    ],
    accent: '#181a19', // ink as a hex: blocks redefine --ink as their text colour
    dark: true,
    art: affogato,
  },
];
