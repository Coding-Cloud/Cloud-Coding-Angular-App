import { createSelector } from '@ngrx/store';

import { SettingsState } from '../../shared/models/settings.model';
import { selectSettingsState } from '../core.state';

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectTheme = createSelector(
  selectSettings,
  (settings) => settings.theme
);

export const selectIsUserEditMode = createSelector(
  selectSettings,
  (settings) => settings.isEditUserMode
);

export const selectEffectiveTheme = createSelector(selectTheme, (theme) =>
  theme.toLowerCase()
);
