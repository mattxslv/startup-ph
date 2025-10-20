import { IDataset } from './types';

export const transformDataset = (raw: any): IDataset => ({
  id: String(raw.id),
  code: raw?.code || '',
  label: raw?.value?.label || '',
  description: raw?.value?.description || '',
});

export const payloadDataset = ({ id, code, ...value }: IDataset) => ({
  code,
  value,
});
