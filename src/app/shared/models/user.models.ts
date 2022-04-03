export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  pseudo: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}

export type Role = 'admin' | 'user';

export const emptyUser: User = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  pseudo: '',
  role: 'user',
  isActive: false,
  createdAt: ''
};
