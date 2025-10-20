import dayjs from 'dayjs';
import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validateMobileNumber = () =>
  yup.string().matches(phoneRegExp, 'Invalid format');

const validateCurrency = () =>
  yup
    .number()
    .typeError('Must be a number')
    .nullable()
    .min(0, 'Must not be negative number');

const validateDate = () =>
  yup
    .date()
    .typeError('Invalid format')
    .transform((value) => {
      return value ? dayjs(value).toDate() : value;
    });

const validateTime = () =>
  yup.string().test('test-time', 'Invalid format', (val) => {
    const [hour, temp] = (val ?? '').split(':');
    const [minute, meridiem] = (temp ?? '').split(' ');
    function isHourValid(h: number) {
      if (isNaN(h)) return false;
      return h >= 0 && h <= 12;
    }
    function isMinuteValid(m: number) {
      if (isNaN(m)) return false;
      return m >= 0 && m <= 59;
    }
    function isMeridiemValid(m: string) {
      return m === 'am' || m === 'pm' || m === 'AM' || m === 'PM';
    }
    return (
      isHourValid(+hour) && isMinuteValid(+minute) && isMeridiemValid(meridiem)
    );
  });

const validateCode = () =>
  yup.string().test('test-code', 'Invalid format', (val) => {
    const str = val ?? '';
    // Check if the string contains any spaces
    if (/\s/.test(str)) {
      return false;
    }
    // Check if the string contains any uppercase letters
    if (/[A-Z]/.test(str)) {
      return false;
    }
    // Check if the string contains any symbols except for the dash
    if (/[^a-z-]/.test(str)) {
      return false;
    }
    // If none of the checks failed, return true
    return true;
  });

const validateNumber = () =>
  yup
    .number()
    .transform((o, v) => parseFloat(`${v ?? ''}`.replace(/,/g, '')))
    .typeError('Must be a number');

export {
  validateCurrency,
  validateDate,
  validateCode,
  validateNumber,
  validateMobileNumber,
  validateTime,
};
