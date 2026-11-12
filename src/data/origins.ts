export interface Origin {
  id: string;
  name: string;
  number: string;
  notes: string[];
  infusionHours: number;
  color: string;
  ink: string;
  comingSoon?: boolean;
  priceCLP: number;
  // Taste profile on a 1–5 scale. Placeholder values (ficticio) until the real profile is confirmed.
  profile: { acidez: number; cuerpo: number; dulzor: number };
}

// Placeholder number (ficticio). Replace with the real WhatsApp number in international format, digits only.
export const whatsappNumber = '56912345678';

export function whatsappOrderUrl(origin: Origin): string {
  const text = `Hola, quiero pedir un botellín de cold brew de ${origin.name} (200 ml).`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
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
    priceCLP: 4500,
    profile: { acidez: 2, cuerpo: 3, dulzor: 4 },
  },
  {
    id: 'peru',
    name: 'Perú',
    number: '02',
    infusionHours: 16,
    notes: ['Avellana tostada', 'Chocolate'],
    color: '#D9D218',
    ink: '#111111',
    priceCLP: 4500,
    profile: { acidez: 3, cuerpo: 4, dulzor: 2 },
  },
];
