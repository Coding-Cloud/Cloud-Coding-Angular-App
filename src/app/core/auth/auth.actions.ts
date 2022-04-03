import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.models';

export const authLogin = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
export const authLoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; token: string }>()
);
export const authLoginError = createAction(
  '[Auth] Login Error',
  props<{ message: string }>()
);
export const authLogout = createAction('[Auth] Logout');
