export interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  createdAt: Date;
}

export interface UserForm {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  birthdate: Date;
}

export type Role = 'admin' | 'user';

export const emptyUser: User = {
  id: '0',
  username: '',
  firstname: '',
  lastname: '',
  birthdate: new Date(),
  email: '',
  createdAt: new Date()
};
