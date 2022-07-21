import { createSelector } from '@ngrx/store';

import { selectAuthState } from '../core.state';
import { AuthState } from '../../shared/models/auth.model';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectJWTToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
