import { SettingsState } from './settings.model';
import { actionSettingsChangeTheme } from './settings.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SettingsState = {
  theme: 'BLACK-THEME'
};

const reducer = createReducer(
  initialState,
  on(actionSettingsChangeTheme, (state, action) => ({ ...state, ...action }))
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
