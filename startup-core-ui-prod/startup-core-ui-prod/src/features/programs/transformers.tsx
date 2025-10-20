import { omit } from 'lodash';
import {
  IApplication,
  IProgram,
  TRequirement,
  TSubmittedRequirement,
} from './types';
import formatDate, { mdyToYmd } from 'utils/formatDate';

const transformRequirement = (raw: any[]) => {
  const value: Record<string, TRequirement> = {};
  (raw || []).forEach((row) => {
    value[String(row.id)] = {
      enabled: true,
      required: Boolean(row.is_required),
    };
  });
  return value;
};

export const transform = (raw: any): IProgram => ({
  id: String(raw.id),
  agency: raw?.agency,
  name: raw?.name,
  thumbnail_url: raw?.thumbnail_url,
  banner_url: raw?.banner_url,
  type: raw?.type,
  date_start: formatDate(raw?.date_start, 'MM/DD/YYYY'),
  date_end: formatDate(raw?.date_end, 'MM/DD/YYYY'),
  description: raw?.description,
  is_verified_required: +raw?.is_verified_required === 1 ? '1' : '0',

  // content
  body: raw?.content?.body,
  requirements: transformRequirement(raw?.requirements),

  is_open_for_application: raw?.is_open_for_application,
  is_published: raw?.is_published,
});

export const transformPayload = ({ body, ...payload }: IProgram) => ({
  ...omit(payload, ['id']),
  date_start: mdyToYmd(payload.date_start),
  date_end: mdyToYmd(payload.date_end),
  content: {
    body,
  },
});

export const transformApplication = (raw: any): IApplication => ({
  id: String(raw?.id),
  program_id: String(raw?.program_id),
  startup_id: String(raw?.startup_id),
  startup_name: raw?.startup_name,
  status: raw?.status,
  submitted_at: formatDate(raw?.submitted_at, 'MMM DD YYYY hh:mmA'),
  approved_at: formatDate(raw?.approved_at, 'MMM DD YYYY hh:mmA'),
  returned_at: formatDate(raw?.returned_at, 'MMM DD YYYY hh:mmA'),
  rejected_at: formatDate(raw?.rejected_at, 'MMM DD YYYY hh:mmA'),
  remarks: raw?.remarks,

  user_name: `${raw?.user?.first_name || ''} ${raw?.user?.last_name || ''} ${
    raw?.user?.suffix_name || ''
  }`,
  user_email: raw?.user?.email,
  user_mobile_no: raw?.user?.mobile_no,

  requirements: (raw?.requirements || []).map(
    (row: any): TSubmittedRequirement => ({
      requirement_id: String(row?.requirement_id),
      label: row?.parent?.name,
      value: row?.value,
      type: row?.parent?.type,
    })
  ),
});
