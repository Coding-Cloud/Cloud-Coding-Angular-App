import { createAction, props } from '@ngrx/store';
import { User, UserForm } from 'src/app/shared/models/user.models';

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

export const authRegister = createAction(
  '[Auth] Register',
  props<{ userForm: UserForm }>()
);

export const authRegisterSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User; token: string }>()
);

export const authRegisterError = createAction(
  '[Auth] Register Error',
  props<{ message: string }>()
);
