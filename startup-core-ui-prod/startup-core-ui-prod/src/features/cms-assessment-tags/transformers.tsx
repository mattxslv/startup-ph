export const transformAssessmentTags = (raw: any): TAssessmentTags => ({
  id: String(raw.id),
  code: raw?.code || '',
  description: raw?.description || '',
  notes: raw?.notes || '',
  is_active: raw?.is_active || 0,
});

export const payloadAssessmentTags = ({ id, ...value }: TAssessmentTags) => ({
  value,
});
