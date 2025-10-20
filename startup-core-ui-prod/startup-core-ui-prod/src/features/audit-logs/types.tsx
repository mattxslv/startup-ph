export interface IAuditLogs {
  id: string | number | null;
  auditable_id: string;
  auditable_type: string;
  created_at: string;
  event: string;
  new_values: any;
  old_values: any;
  user_id: string;
  user_name: string;
  user_type: string;
}
