import dayjs from 'dayjs';

function formatDate(
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  format = 'MMM DD, YYYY',
  defaultValue = '-'
): string {
  if (!date) return defaultValue;

  // Handle MM/DD/YYYY format
  if (typeof date === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    const [month, day, year] = date.split('/');
    date = `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
  }

  const d = new Date((date || '').toString().replace(/-/g, '/').replace('T', ' '));

  if (d.toString() === 'Invalid Date') return defaultValue;
  return dayjs(d).format(format);
}

// Helper function to convert MM/DD/YYYY to YYYY-MM-DD
export const mmddToYmd = (str: string): string => {
  if (!str) return '';

  // Check if string matches MM/DD/YYYY format
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
    const [month, day, year] = str.split('/');
    return `${year}-${month}-${day}`;
  }

  return str; // Return original string if it doesn't match expected format
};

// Your existing helper functions
export const mdyToYmd = (str: string) => (str ?? '').replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$1-$2');

export const formatTime = (time: string, format = 'hh:mm a'): string => {
  return dayjs(new Date(`1970-01-01 ${time}`)).format(format);
};

const pad = (n: number) => String(n).padStart(2, '0');

export const t12To24 = (str: string) => {
  const [hr, min, ap] = str.toLowerCase().match(/\d+|[a-z]+/g) ?? [];
  if (!hr) return '00:00';
  return `${pad((+hr % 12) + (ap === 'am' ? 0 : 12))}:${pad(+min)}`;
};

export default formatDate;
