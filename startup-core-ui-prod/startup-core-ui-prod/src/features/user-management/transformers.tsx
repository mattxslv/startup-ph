import { IUser } from './types';

export const transformUser = (raw: any): IUser => ({
  agency: raw.agency || '',
  display_name: raw?.display_name || '',
  email: raw?.email || '',
  first_name: raw?.first_name || '',
  id: raw?.id || '',
  last_name: raw?.last_name || '',
  middle_name: raw?.middle_name || '',
  photo_url: raw?.photo_url || '',
  suffix_name: raw?.suffix_name || '',
  role_name: raw?.roles?.[0]?.name || '',
  role_id: raw?.roles?.[0]?.id || '',
  contact_number: raw?.contact_number || '',
});
