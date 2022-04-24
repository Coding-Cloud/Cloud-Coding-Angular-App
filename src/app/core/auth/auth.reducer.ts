import { AuthState } from '../../shared/models/auth.model';
import {
  authGetMeSuccess,
  authLoginSuccess,
  authLogout,
  authLogoutSuccess
} from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { emptyUser } from '../../shared/models/user.model';

export const initialState: AuthState = {
  isAuthenticated: false,
  token: '',
  user: emptyUser
};

const reducer = createReducer(
  initialState,
  on(authLoginSuccess, (state, payload) => ({
    ...state,
    isAuthenticated: true,
    token: payload.token
  })),
  on(authLogoutSuccess, () => ({ ...initialState })),
  on(authGetMeSuccess, (state, payload) => ({
    ...state,
    user: payload.user
  }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
