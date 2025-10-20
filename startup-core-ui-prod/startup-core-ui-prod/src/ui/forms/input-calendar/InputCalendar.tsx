import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import formatDate from 'utils/formatDate';
import { useFormContext } from '../hooks';
import { getCalendarDays, getNextDate, getPrevDate } from './helpers';
import { IDate } from './types';

interface Props {
  name: string;
  isDateEnabled: (row: IDate) => boolean; // Function that iterates the dates, if it returns true, the date is enabled
  renderEmpty?: React.ReactNode;
  onValueChanged?: (newValue: string) => void;
  startDate?: string; // YYYY-MM-DD
}

function InputCalendar({
  name,
  isDateEnabled,
  renderEmpty,
  onValueChanged,
  startDate,
}: Props) {
  const { values, setFieldValue } = useFormContext();
  const value = values[name];
  const [focus, setFocus] = useState(new Date(startDate!));
  useEffect(() => {
    setFocus(new Date(startDate!));
  }, [startDate]);
  const { days, hasEnabledDays } = useMemo(() => {
    let ed = false;
    const d = getCalendarDays(focus).map((item) => {
      const isDisabled = !isDateEnabled(item);
      if (!isDisabled) ed = true;
      return {
        ...item,
        isDisabled,
      };
    });
    return {
      days: d,
      hasEnabledDays: ed,
    };
  }, [focus, isDateEnabled]);
  const handleSelect = (v: IDate) => {
    if (onValueChanged) onValueChanged(v?.date);
    setFieldValue(name, v.date);
  };
  return (
    <div className="flex flex-auto flex-col">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          type="button"
          onClick={() => setFocus(getPrevDate(focus, 'month'))}
          title="prev"
        >
          <HiChevronLeft className="h-5 w-5" />
        </button>
        <div className="font-semibold">{formatDate(focus, 'MMMM YYYY')}</div>
        <button
          type="button"
          onClick={() => setFocus(getNextDate(focus, 'month'))}
          title="next"
        >
          <HiChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 border-b border-outline bg-fill-dark text-center text-xs leading-4 text-black lg:flex-none">
        <div className="bg-white py-2">
          S<span className="sr-only sm:not-sr-only">un</span>
        </div>
        <div className="bg-white py-2">
          M<span className="sr-only sm:not-sr-only">on</span>
        </div>
        <div className="bg-white py-2">
          T<span className="sr-only sm:not-sr-only">ue</span>
        </div>
        <div className="bg-white py-2">
          W<span className="sr-only sm:not-sr-only">ed</span>
        </div>
        <div className="bg-white py-2">
          T<span className="sr-only sm:not-sr-only">hu</span>
        </div>
        <div className="bg-white py-2">
          F<span className="sr-only sm:not-sr-only">ri</span>
        </div>
        <div className="bg-white py-2">
          S<span className="sr-only sm:not-sr-only">at</span>
        </div>
      </div>

      <div className="relative">
        {!hasEnabledDays ? (
          <div className="bg-white/80 absolute inset-0 h-full w-full flex justify-center items-center z-10">
            <div className="text-danger-base text-sm font-semibold whitespace-pre text-center">
              {renderEmpty ?? 'There are no available dates.'}
            </div>
          </div>
        ) : null}
        <div className="isolate grid w-full grid-cols-7 gap-px">
          {days.map((day) => {
            return (
              <button
                key={day.date}
                type="button"
                className={clsx(
                  day.isCurrentMonth ? 'bg-white' : '',
                  day.date === value && 'text-white',
                  !day.date === value && day.isToday && 'text-primary-base',
                  !day.date === value &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    'text-black',
                  !day.date === value &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    'text-disabled',
                  'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10',
                  !day.isDisabled
                    ? 'cursor-pointer font-bold'
                    : 'disabled:bg-white disabled:text-disabled disabled:font-normal'
                )}
                onClick={() => handleSelect(day)}
                disabled={day.isDisabled}
              >
                <time
                  dateTime={day.date}
                  className={clsx(
                    day.date === value
                      ? 'text-white bg-primary-base rounded px-5 py-2'
                      : '',
                    'm-auto'
                  )}
                >
                  {(day.date.split('-').pop() ?? '').replace(/^0/, '')}
                </time>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

InputCalendar.defaultProps = {
  isDateEnabled: () => true,
  startDate: dayjs().format('YYYY-MM-DD'),
};

export default InputCalendar;
