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
import { authGetMe } from '../core/auth/auth.actions';
import { selectUser } from '../core/auth/auth.selectors';
import { userViewLink } from '../features/social/users/users-routing.module';
import { socialFriendshipsLink } from '../features/social/social-routing.module';
import { actionConversationsInitSocket } from '../features/conversation/store/conversation.actions';
import { Router } from '@angular/router';
import { emptyUser, User } from '../shared/models/user.model';

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
  logoManitou = 'assets/manitou.jpg';
  routerLinks = navigation;
  readonly userViewLink = userViewLink;

  navigationMenu: Link[] = Object.values(navigation).filter(
    (link) =>
      ['settings', 'auth', 'code-editor', 'examples'].indexOf(link.path) === -1
  );
  navigationSideMenu = [...this.navigationMenu, navigation.settings];
  friendshipsLink = socialFriendshipsLink;

  isAuthenticated$: Observable<boolean> | undefined;
  currentUser: User = emptyUser;
  theme$: Observable<string> | undefined;
  currentUserId = '';

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService,
    public router: Router
  ) {
    this.store.pipe(select(selectUser)).subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.currentUserId = user.id;
      }
    });
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));

    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.store.dispatch(authGetMe());
        this.store.dispatch(actionConversationsInitSocket());
      }
    });
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  noAuthLinks(links: Link[]) {
    return links.filter((link) => !link.auth);
  }

  isOnCodeEditorPage(): boolean {
    return this.router.url.includes('/code-editor');
  }

  checkManitou(): string {
    if (this.isManitou()) {
      return this.logoManitou;
    }
    return this.logo;
  }

  isManitou(): boolean {
    return (
      this.currentUser.username +
      this.currentUser.email +
      this.currentUser.firstname +
      this.currentUser.lastname
    )
      .toLowerCase()
      .includes('sananes');
  }
}
