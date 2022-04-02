import { AppState } from '../core.module';

export interface SettingsState {
  theme: string;
}

export interface State extends AppState {
  settings: SettingsState;
}
