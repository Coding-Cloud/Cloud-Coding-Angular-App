import { AuthState } from '../../shared/models/auth.model';
import {
  authGetMeError,
  authGetMeSuccess,
  authLoginSuccess,
  authLogoutSuccess
} from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { emptyUser } from '../../shared/models/user.model';
import { actionSettingsUpdateUserSuccess } from '../settings/settings.actions';

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
  on(authGetMeSuccess, (state, payload) => ({
    ...state,
    user: payload.user
  })),
  on(actionSettingsUpdateUserSuccess, (state, payload) => ({
    ...state,
    user: {
      ...state.user,
      ...payload.form
    }
  })),
  on(authGetMeError, authLogoutSuccess, () => ({ ...initialState }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
