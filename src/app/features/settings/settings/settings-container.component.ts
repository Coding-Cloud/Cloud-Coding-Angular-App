import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  ROUTE_ANIMATIONS_ELEMENTS,
  selectIsAuthenticated
} from '../../../core/core.module';

import { actionSettingsChangeTheme } from '../../../core/settings/settings.actions';
import { SettingsState, State } from '../../../core/settings/settings.model';
import { selectSettings } from '../../../core/settings/settings.selectors';
import { User } from '../../../shared/models/user.models';
import { selectUser } from '../../../core/auth/auth.selectors';

@Component({
  selector: 'anms-settings',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  settings$: Observable<SettingsState> | undefined;
  isAuthenticated$: Observable<boolean> | undefined;
  user$: Observable<User> | undefined;

  themes = [
    { value: 'DEFAULT-THEME', label: 'Bleu' },
    { value: 'LIGHT-THEME', label: 'Clair' },
    { value: 'NATURE-THEME', label: 'Nature' },
    { value: 'BLACK-THEME', label: 'Sombre' }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.user$ = this.store.pipe(select(selectUser));
  }

  onThemeSelect(event: MatSelectChange) {
    this.store.dispatch(actionSettingsChangeTheme({ theme: event.value }));
  }
}
