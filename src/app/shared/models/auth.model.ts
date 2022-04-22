import { User } from './user.models';

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: User;
}
