import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  authLogin,
  authLoginError,
  authLoginSuccess,
  authLogout
} from './auth.actions';
import { select, Store } from '@ngrx/store';
import { State } from '../../features/examples/examples.state';
import { selectAuth } from './auth.selectors';
import { navigation } from '../../app-routing.module';
import { NotificationService } from '../notifications/notification.service';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  persistAuthState = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLoginSuccess, authLogout),
        withLatestFrom(this.store.pipe(select(selectAuth))),
        tap(([action, authState]) =>
          this.localStorageService.setItem(AUTH_KEY, { ...authState })
        )
      ),
    { dispatch: false }
  );

  login = createEffect(() =>
    this.actions$.pipe(
      ofType(authLogin),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((response) =>
            authLoginSuccess({ user: response.user, token: response.token })
          ),
          catchError((error) => of(authLoginError({ message: error.message })))
        )
      )
    )
  );

  loginError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLoginError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLoginSuccess),
        tap(() => {
          this.router.navigate([navigation.home.path]).then(() => {
            this.notificationService.default('Login successful');
          });
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.router.navigate([navigation.home.path]).then(() => {
            this.notificationService.default('Logout successful');
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}
}
