import { IForReviewPayload, IInvestor, IRequirements } from './types';
import formatDate from 'utils/formatDate';
import dayjs from 'dayjs';
import formatCurrency from 'utils/formatCurrency';

export const transformInvestor = (raw: any): IInvestor => ({
  id: String(raw.id),
  company_name: raw?.company_name || '',
  name: raw?.name || '',
  company_nationality: raw?.company_nationality || '',
  company_location: raw?.company_location || '',
  activity_type: raw?.activity_type || '',
  estimated_cost: formatCurrency(raw?.estimated_cost || ''),
  min_estimated_employment: formatCurrency(raw?.min_estimated_employment || ''),
  max_estimated_employment: formatCurrency(raw?.max_estimated_employment || ''),
  estimated_start_date: raw?.estimated_start_date || '',
  description: raw?.description || '',
  representative_first_name: raw?.representative_first_name || '',
  representative_last_name: raw?.representative_last_name || '',
  representative_email: raw?.representative_email || '',
  representative_contact_number: raw?.representative_contact_number || '',

  // READ ONLY
  status: raw?.status || '',
  estimated_start_date_human: formatDate(raw?.estimated_start_date),
  created_at: formatDate(raw?.created_at, 'MM/DD/YYYY hh:mm a'),
  updated_at: formatDate(raw?.updated_at, 'MM/DD/YYYY hh:mm a'),
});

export const transformInvestorRequirements = (raw: any): IRequirements => ({
  id: String(raw?.id),
  file_url: raw?.uploaded_files?.[0]?.url,
  name: raw?.name,
  description: raw?.description,
  status: raw?.status,
  remarks: raw?.remarks,
});

export const payloadInvestor = ({ ...rest }: IInvestor) => ({
  ...rest,
});

const daysToExpiry = (days: string) => {
  const daysInNumber = +days || 0;
  return dayjs().add(daysInNumber, 'days').format('YYYY-MM-DD 00:00:00');
};

export const payloadForReviewPayload = (payload: IForReviewPayload) => ({
  expires_at: daysToExpiry(payload.expiry_date_in_days),
  remarks: `Your application has been approved.`,
});
