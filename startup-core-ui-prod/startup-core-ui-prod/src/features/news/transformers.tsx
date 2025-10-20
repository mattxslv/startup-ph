import { omit } from 'lodash';
import { INews } from './types';
import { mdyToYmd } from 'utils/formatDate';

export const transform = (raw: any): INews => ({
  id: String(raw?.id),
  title: raw?.title,
  sub_title: raw?.sub_title,
  publish_date: raw?.publish_date,
  publish_by: raw?.publish_by,
  thumbnail_url: raw?.thumbnail_url,
  body: Array.isArray(raw?.body) ? raw?.body : [],
  tags: Array.isArray(raw?.tags) ? raw?.tags : [],
  is_published: Boolean(+raw?.is_published === 1),
  agency: raw?.agency,
});

export const transformPayload = (payload: INews) => ({
  ...omit(payload, ['id']),
  publish_date: mdyToYmd(payload.publish_date),
});
