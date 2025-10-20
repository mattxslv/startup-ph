import formatDate from 'utils/formatDate';
import { IAuditLogs } from './types';

export const transform = (raw: any): IAuditLogs => ({
  id: String(raw?.id),
  auditable_id: raw?.auditable_id,
  auditable_type: raw?.auditable_type,
  created_at: formatDate(raw?.created_at, 'MMM DD, YYYY hh:mm a'),
  event: raw?.event,
  new_values: raw?.new_values,
  old_values: raw?.old_values,
  user_id: raw?.user_id,
  user_name: raw?.user_name,
  user_type: raw?.user_type,
});
