export interface Origin {
  id: string;
  name: string;
  number: string;
  notes: string[];
  infusionHours: number;
  color: string;
  ink: string;
  cap: 'silver' | 'gold';
  comingSoon?: boolean;
  notesStatus: 'label' | 'confirmed';
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
    comingSoon: true,
    name: 'Honduras',
    number: '03',
    infusionHours: 26,
    notes: ['Cacao', 'Panela', 'Nuez'],
    color: '#F2529D',
    ink: '#111111',
    cap: 'silver',
    notesStatus: 'confirmed',
  },
  {
    id: 'costa-rica',
    comingSoon: true,
    name: 'Costa Rica',
    number: '04',
    infusionHours: 24,
    notes: ['Naranja dulce', 'Miel', 'Caramelo'],
    color: '#496DFF',
    ink: '#000000',
    cap: 'silver',
    notesStatus: 'confirmed',
  },
];

// Owner approved publication without an Instagram URL. Keep it as plain text.
export const instagramUrl: string | null = null;
