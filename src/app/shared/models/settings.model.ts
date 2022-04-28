import { AppState } from '../../core/core.module';

export interface SettingsState {
  isEditUserMode: boolean;
  theme: string;
}

export interface State extends AppState {
  settings: SettingsState;
}
