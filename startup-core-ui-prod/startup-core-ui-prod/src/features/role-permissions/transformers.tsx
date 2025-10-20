import { pick } from 'lodash';
import { IRole } from './types';

export const transformRole = (raw: any): IRole => ({
  id: String(raw.id),
  name: raw?.name,
  permissions: raw?.permissions || [],
  menu: raw?.menu || '',
});

export const payloadRole = (role: Partial<IRole>) => ({
  ...pick(role, ['code', 'name']),
  name: role?.name,
  permissions: role?.permissions || [],
});
