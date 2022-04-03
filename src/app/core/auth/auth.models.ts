import { User } from '../../shared/models/user.models';

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: User;
}
