import { User } from './user.model';

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: User;
}
