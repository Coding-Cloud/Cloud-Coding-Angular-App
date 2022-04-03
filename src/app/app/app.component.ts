import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';

import {
  authLogin,
  authLogout,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectEffectiveTheme,
  AppState
} from '../core/core.module';
import { navigation } from '../app-routing.module';
import { authLoginSuccess } from '../core/auth/auth.actions';

@Component({
  selector: 'root-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  appName = env.appName;
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = 'assets/logo.png';
  routerLinks = navigation;

  navigationMenu = Object.values(navigation).filter(
    (link) => ['settings'].indexOf(link.path) === -1
  );
  navigationSideMenu = [...this.navigationMenu, navigation.settings];

  isAuthenticated$: Observable<boolean> | undefined;
  theme$: Observable<string> | undefined;

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.storageService.testLocalStorage();

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onLoginClick() {
    this.store.dispatch(
      authLogin({ email: 'nou@email.fr', password: '123456' })
    );
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }
}
