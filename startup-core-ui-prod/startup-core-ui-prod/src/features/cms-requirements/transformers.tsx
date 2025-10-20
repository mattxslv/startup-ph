import { IRequirement } from './types';

export const transformRequirement = (raw: any): IRequirement => ({
  id: String(raw.id),
  code: raw?.code,
  name: raw?.name,
  description: raw?.description,
  type: raw?.type,
  ...raw?.meta,
});

export const payloadRequirement = ({
  id,
  code,
  name,
  type,
  description,
  ...meta
}: IRequirement) => ({
  code,
  name,
  type,
  meta: {
    description,
    ...meta,
  },
});
