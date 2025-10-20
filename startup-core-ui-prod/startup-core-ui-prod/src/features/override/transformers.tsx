import { IOverride } from './types';

function maskString(str: string) {
  return str.replace(/./g, '*');
}

export const transformOverride = (raw: any): IOverride => ({
  id: raw.id,
  name: raw.name,
  code: raw.code,
  _masked_code: maskString(raw.code || ''),
});
