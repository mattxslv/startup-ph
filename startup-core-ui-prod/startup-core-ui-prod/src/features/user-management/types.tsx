export interface IUser {
  agency: string;
  display_name: string;
  email: string;
  first_name: string;
  id: string | number;
  last_name: string;
  middle_name: string | null;
  photo_url: string;
  suffix_name: string | null;
  // id?: string
  // email: string
  // photo_url: string
  // first_name: string
  // middle_name?: string
  // last_name: string

  // _full_name?: string
  // _can_delete?: boolean
  password?: string;
  password_confirmation?: string;

  // Roles Array
  role_name: string;
  role_id: string | number;

  contact_number: string;
}
