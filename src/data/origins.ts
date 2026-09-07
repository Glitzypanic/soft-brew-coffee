export interface Origin {
  id: string;
  name: string;
  number: string;
  notes: string[];
  infusionHours: number;
  color: string;
  ink: string;
  cap: 'silver' | 'gold';
  notesStatus: 'label' | 'provisional';
}

export const origins: Origin[] = [
  {
    id: 'colombia',
    name: 'Colombia',
    number: '01',
    infusionHours: 24,
    notes: ['Chocolate dulce', 'Caramelo'],
    color: '#D2D2D2',
    ink: '#111111',
    cap: 'silver',
    notesStatus: 'label',
  },
  {
    id: 'peru',
    name: 'Perú',
    number: '02',
    infusionHours: 16,
    notes: ['Avellana tostada', 'Chocolate'],
    color: '#D9D218',
    ink: '#111111',
    cap: 'gold',
    notesStatus: 'label',
  },
  {
    id: 'honduras',
    name: 'Honduras',
    number: '03',
    infusionHours: 26,
    notes: ['Cacao', 'Panela', 'Nuez'],
    color: '#FF5A1F',
    ink: '#111111',
    cap: 'silver',
    notesStatus: 'provisional',
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    number: '04',
    infusionHours: 24,
    notes: ['Naranja dulce', 'Miel', 'Caramelo'],
    color: '#2455FF',
    ink: '#FFFFFF',
    cap: 'silver',
    notesStatus: 'provisional',
  },
];

// Set only after the owner confirms the real account. An absent URL renders text,
// never a fake link. Publication is a separate, deferred phase.
export const instagramUrl: string | null = null;
