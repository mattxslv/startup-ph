export interface IProfile {
  name: string;
  email: string;
  photo_url?: string;
  permissions: string[];
  with_temporary_password: 0 | 1;
}

export interface IChangePassword {
  current_password: string;
  password: string;
  password_confirmation: string;
}
