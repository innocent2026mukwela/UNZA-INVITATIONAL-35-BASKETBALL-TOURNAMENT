export const NATIONS = [
  { code: 'zm', name: 'Zambia', flag: '/flags/zambia.png' },
  { code: 'mw', name: 'Malawi', flag: '/flags/malawi.png' },
  { code: 'cd', name: 'DRC',    flag: '/flags/drc.png' },
];

export function flagForCountry(country?: string | null) {
  return NATIONS.find(n => n.name === country)?.flag;
}
