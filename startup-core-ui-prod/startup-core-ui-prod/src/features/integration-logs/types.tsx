export interface ILogs {
  id?: string;
  created_at: string;
  partner_name: string;
  hit_name: string;
  with_hit: boolean;
  hit_count: number;
  hits: any[]; // TODO: MAP THIS LATER
  query: IQuery;
}

export interface IQuery {
  birth_date: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;
}
