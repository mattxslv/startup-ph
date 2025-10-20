import parseNumber from './parseNumber';

const formatNumber = (v: number | string, decimal = 2) => {
  try {
    const n = parseNumber(v) as number;
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(n)) return v;
    return n.toLocaleString(undefined, {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    });
  } catch (err) {
    return v;
  }
};

export default formatNumber;
