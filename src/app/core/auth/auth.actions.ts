import { createAction, props } from '@ngrx/store';
import { User, UserForm } from 'src/app/shared/models/user.model';

export const authLogin = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);
export const authLoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);
export const authLoginError = createAction(
  '[Auth] Login Error',
  props<{ message: string }>()
);
export const authGetMe = createAction('[Auth] Get me');
export const authGetMeSuccess = createAction(
  '[Auth] Get me Success',
  props<{ user: User }>()
);
export const authGetMeError = createAction(
  '[Auth] Get me Error',
  props<{ message: string }>()
);
export const authLogout = createAction('[Auth] Logout');

export const authRegister = createAction(
  '[Auth] Register',
  props<{ userForm: UserForm }>()
);

export const authRegisterSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: UserForm }>()
);

export const authRegisterError = createAction(
  '[Auth] Register Error',
  props<{ message: string }>()
);
