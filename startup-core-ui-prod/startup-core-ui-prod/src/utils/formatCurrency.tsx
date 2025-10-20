import parseNumber from './parseNumber';

const formatCurrency = (number: string | number, currency = 'PHP') =>
  Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(parseNumber(number, 0) as number);

export default formatCurrency;
