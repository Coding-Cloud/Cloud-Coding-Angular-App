import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';

import {
  AppState,
  authLogout,
  LocalStorageService,
  routeAnimations,
  selectEffectiveTheme,
  selectIsAuthenticated
} from '../core/core.module';
import { Link, navigation } from '../app-routing.module';

@Component({
  selector: 'cc-root-component',
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
    (link) => ['settings', 'auth'].indexOf(link.path) === -1
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

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  noAuthLinks(links: Link[]) {
    return links.filter((link) => !link.auth);
  }
}
