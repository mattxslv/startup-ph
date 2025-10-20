import { ILogs, IQuery } from './types';
import formatDate from 'utils/formatDate';

const transformQuery = (raw: any): IQuery => ({
  birth_date: raw?.birth_date,
  first_name: raw?.first_name,
  middle_name: raw?.middle_name,
  last_name: raw?.last_name,
});

export const transformLogs = (raw: any): ILogs => {
  const query = transformQuery(raw?.request);
  return {
    id: String(raw.id),
    created_at: formatDate(raw?.created_at, 'MMM DD, YYYY hh:mm:ssA'),
    partner_name: raw?.api_client_id,
    hit_name: query.first_name,
    with_hit: raw?.result_count > 0,
    hit_count: raw?.result_count,
    hits: [],
    query,
  };
};
