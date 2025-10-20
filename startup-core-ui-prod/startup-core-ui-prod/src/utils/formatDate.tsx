import dayjs from 'dayjs';

function formatDate(
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  format = 'MMM DD, YYYY',
  defaultValue = ''
): string {
  if (!date) return defaultValue;
  const d = new Date(
    (date || '').toLocaleString().replace(/-/g, '/').replace('T', ' ')
  );
  if (d.toString() === 'Invalid Date') return defaultValue;
  return dayjs(d).format(format);
}

export const mdyToYmd = (str: string) =>
  (str ?? '').replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$1-$2');

export const formatTime = (time: string, format = 'hh:mm a'): string => {
  return dayjs(new Date(`'1970-01-01 ${time}`)).format(format);
};

const pad = (n: number) => String(n).padStart(2, '0');

export const t12To24 = (str: string) => {
  const [hr, min, ap] = str.toLowerCase().match(/\d+|[a-z]+/g) ?? [];
  if (!hr) return '00:00';
  return `${pad((+hr % 12) + (ap === 'am' ? 0 : 12))}:${pad(+min)}`;
};

export default formatDate;
