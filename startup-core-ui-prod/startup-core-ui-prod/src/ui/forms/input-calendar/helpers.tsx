import dayjs from 'dayjs';
import { IDate } from './types';

const getDaysArray = function (s: Date, e: Date) {
  const a = [];
  for (let d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
    a.push(new Date(d));
  }
  return a;
};

function getCalendarDays(date: Date): IDate[] {
  const startDate = dayjs(date).startOf('month');
  const endDate = dayjs(date).endOf('month');

  const weekStartAt = startDate.startOf('week').toDate();
  const weekEndAt = endDate.endOf('week').toDate();

  const days = getDaysArray(weekStartAt, weekEndAt);

  const currentMonthIndex = date.getMonth();
  return days.map((day) => ({
    date: dayjs(day).format('YYYY-MM-DD'),
    isCurrentMonth: currentMonthIndex === day.getMonth(),
    isToday: day.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0),
  }));
}

function getPrevDate(currentDate: Date, viewMode: string): Date {
  if (viewMode === 'month')
    return dayjs(currentDate).subtract(1, viewMode).toDate();
  return currentDate;
}

function getNextDate(currentDate: Date, viewMode: string): Date {
  if (viewMode === 'month') return dayjs(currentDate).add(1, viewMode).toDate();
  return currentDate;
}

function shortenTime(t: string) {
  const str = t.replace(':00', '').replace(' ', '').toUpperCase();
  if (str.charAt(0) === '0') return str.substring(1);
  return str;
}

export { getCalendarDays, getPrevDate, getNextDate, shortenTime };
