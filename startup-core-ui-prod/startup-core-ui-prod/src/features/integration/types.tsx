export interface IIntegration {
  id: string | number | null;
  name: string;
  description: string;
  api_key?: string;
  is_revoked?: boolean;
}
