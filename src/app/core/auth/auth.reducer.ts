import { AuthState } from './auth.models';
import { authLoginSuccess, authLogout } from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { emptyUser } from '../../shared/models/user.models';

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
    token: payload.token,
    user: payload.user
  })),
  on(authLogout, () => ({ ...initialState }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
