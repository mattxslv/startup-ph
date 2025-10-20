export interface IRole {
  id: string | number;
  name: string;
  menu: string;
  permissions: IPermission[];
}

export interface IPermission {
  id: number | string;
  group_id: number | string;
  group_name: string;
  name: string;
}
