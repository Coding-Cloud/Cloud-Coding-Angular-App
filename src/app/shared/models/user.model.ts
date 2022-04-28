export interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
}

export interface UserForm {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  birthdate: Date;
  password: string;
}

export interface UpdateUserForm {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  birthdate: Date;
}

export interface UpdateUserPasswordForm {
  id?: string;
  password: string;
}

export type Role = 'admin' | 'user';

export const emptyUser: User = {
  id: '0',
  username: '',
  firstname: '',
  lastname: '',
  birthdate: new Date(),
  email: ''
};
