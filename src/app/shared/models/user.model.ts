import { EntityState } from '@ngrx/entity';
import { Project } from './project.model';
import { FriendRequest, Friendship } from './friendship.model';

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

export interface UsersState {
  users: EntityState<User>;
  totalResults: number;
  loading: boolean;
}

export interface UserState {
  user: User;
  isFollowing: boolean;
  friendship: Friendship | null;
  friendRequest: FriendRequest | null;
  projects: Project[];
}
