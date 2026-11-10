export interface Preparation {
  id: string;
  name: string;
  pairsWith: 'colombia' | 'peru' | 'ambos';
  ingredients: { item: string; amount: string }[];
  steps: string[];
  accent: string;
}

// Recipes use one 200 ml botellín as the base.
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
    accent: '#d9d218',
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
    accent: '#c8a27a',
  },
  {
    id: 'cacao',
    name: 'Cold brew de cacao',
    pairsWith: 'colombia',
    ingredients: [
      { item: 'Cold brew', amount: '1 botellín · 200 ml' },
      { item: 'Leche', amount: '100 ml' },
      { item: 'Cacao puro', amount: '1 cucharadita' },
      { item: 'Azúcar', amount: 'al gusto' },
    ],
    steps: [
      'Mezcla el cacao y el azúcar con un poco de leche tibia.',
      'Enfría con el resto de la leche.',
      'Agrega el cold brew y termina con hielo.',
    ],
    accent: '#7fb3a0',
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
    accent: '#e94b19',
  },
];
