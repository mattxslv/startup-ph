import { IIntegration } from './types';

export const transformIntegration = (raw: any): IIntegration => ({
  id: raw.id,
  name: raw.name,
  description: raw?.description,
  api_key: raw?.api_key,
  is_revoked: raw?.is_revoked === 1,
});

export const payloadIntegration = ({
  id,
  is_revoked,
  api_key,
  ...rest
}: Partial<IIntegration>) => ({
  ...rest,
});
