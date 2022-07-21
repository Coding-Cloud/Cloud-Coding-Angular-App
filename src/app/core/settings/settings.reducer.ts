import { SettingsState } from '../../shared/models/settings.model';
import {
  actionSettingsChangeTheme,
  actionSettingsSwitchUserEdit,
  actionSettingsUpdateUserPasswordSuccess,
  actionSettingsUpdateUserSuccess
} from './settings.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SettingsState = {
  theme: 'BLACK-THEME',
  isEditUserMode: false
};

const reducer = createReducer(
  initialState,
  on(actionSettingsChangeTheme, (state, action) => ({ ...state, ...action })),
  on(actionSettingsSwitchUserEdit, (state) => ({
    ...state,
    isEditUserMode: !state.isEditUserMode
  })),
  on(
    actionSettingsUpdateUserSuccess,
    actionSettingsUpdateUserPasswordSuccess,
    (state) => ({
      ...state,
      isEditUserMode: false
    })
  )
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
