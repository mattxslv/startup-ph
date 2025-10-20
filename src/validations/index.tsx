import formatMobileNumber from '@/utils/formatMobileNumber';
import { isValidPhoneNumber } from 'react-phone-number-input';
import * as yup from 'yup'

const phMobileSchema = yup.string().matches(/^(09|639)\d{9}$/, 'Invalid phone number format');

export const validateMobileNumber = () => yup
  .string()
  .test('test-time', 'Invalid format', (val) => isValidPhoneNumber(String(val)))