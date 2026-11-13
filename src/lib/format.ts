const MONTHS = [
  'ENE',
  'FEB',
  'MAR',
  'ABR',
  'MAY',
  'JUN',
  'JUL',
  'AGO',
  'SEP',
  'OCT',
  'NOV',
  'DIC',
];

/** Chilean peso with dot separators: 4500 becomes "$4.500". */
export function formatCLP(amount: number): string {
  return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

/** Date as "DD MMM YYYY" with Spanish uppercase months: "07 NOV 2026". */
export function formatBottlingDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  return `${day} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
