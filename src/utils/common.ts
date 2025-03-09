export const transformBoolean = (value: unknown) =>
  typeof value === 'boolean' ? value : false;
