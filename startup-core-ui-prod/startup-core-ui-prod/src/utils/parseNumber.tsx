function parseNumber<T>(
  str: string | number,
  defaultValue?: T
): T | string | number | undefined {
  const v = parseFloat(`${str}`.replace(/,/g, ''));
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(v)) return typeof defaultValue !== 'boolean' ? defaultValue : str;
  return v;
}

export default parseNumber;
