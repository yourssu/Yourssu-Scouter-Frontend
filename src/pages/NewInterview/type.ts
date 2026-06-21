export const partNameKo = {
  'Head lead': '리드',
  Android: '안드로이드',
  Backend: '백엔드',
  Frontend: '프론트엔드',
  iOS: 'iOS',
  Marketing: '마케팅',
  'Product Design': '디자인',
  Finance: '회계',
  HR: 'HR',
  Legal: '리걸',
  PM: 'PM',
} as const;

export const partColorMap = {
  'Head lead': { base: '#f04452', light: '#feafb4' },
  Android: { base: '#03b26c', light: '#3fd599' },
  Backend: { base: '#5b4dff', light: '#cbc7ff' },
  Frontend: { base: '#3182f6', light: '#64a8ff' },
  iOS: { base: '#fe9800', light: '#ffa927' },
  Marketing: { base: '#18a5a5', light: '#89d8d8' },
  'Product Design': { base: '#9128b4', light: '#da9bef' },
  Finance: { base: '#ffc342', light: '#ffdd78' },
  HR: { base: '#ffc342', light: '#ffdd78' },
  Legal: { base: '#8b95a1', light: '#e5e8eb' },
  PM: { base: '#f04452', light: '#feafb4' },
} as const;

export const divisionColorMap = {
  디자인: '#f04452',
  개발: '#3182f6',
  운영: '#18a5a5',
} as const satisfies Record<string, string>;
