import { createAction, props } from '@ngrx/store';
import {
  UpdateUserForm,
  UpdateUserPasswordForm
} from '../../shared/models/user.model';

export const actionSettingsChangeTheme = createAction(
  '[Settings] Change Theme',
  props<{ theme: string }>()
);

export const actionSettingsSwitchUserEdit = createAction(
  '[Settings] Switch User Edit mode'
);

export const actionSettingsUpdateUser = createAction(
  '[Settings] Update User',
  props<{ form: UpdateUserForm }>()
);

export const actionSettingsUpdateUserSuccess = createAction(
  '[Settings] Update User Success',
  props<{ form: UpdateUserForm }>()
);

export const actionSettingsUpdateUserError = createAction(
  '[Settings] Update User Error',
  props<{ message: string }>()
);

export const actionSettingsUpdateUserPassword = createAction(
  '[Settings] Update User Password',
  props<{ form: UpdateUserPasswordForm }>()
);

export const actionSettingsUpdateUserPasswordSuccess = createAction(
  '[Settings] Update User Password Success',
  props<{ form: UpdateUserPasswordForm }>()
);

export const actionSettingsUpdateUserPasswordError = createAction(
  '[Settings] Update User Password Error',
  props<{ message: string }>()
);
