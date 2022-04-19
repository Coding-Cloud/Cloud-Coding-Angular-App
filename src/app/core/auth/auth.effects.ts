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
  authGetMe,
  authGetMeError,
  authGetMeSuccess,
  authLogin,
  authLoginError,
  authLoginSuccess,
  authLogout,
  authRegister,
  authRegisterError,
  authRegisterSuccess
} from './auth.actions';
import { select, Store } from '@ngrx/store';
import { selectAuth } from './auth.selectors';
import { navigation } from '../../app-routing.module';
import { NotificationService } from '../notifications/notification.service';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { AppState } from '../core.state';

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
        this.authService.login(action.username, action.password).pipe(
          map((response) => authLoginSuccess({ token: response.accessToken })),
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

  loginSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(authLoginSuccess),
      map(() => {
        this.router.navigate([navigation.home.path]).then(() => {
          this.notificationService.success('Bonjour !');
        });
        return authGetMe();
      })
    )
  );

  getMe = createEffect(() =>
    this.actions$.pipe(
      ofType(authGetMe),
      exhaustMap((action) =>
        this.authService.getMe().pipe(
          map((response) => authGetMeSuccess({ user: response })),
          catchError((error) => of(authGetMeError({ message: error.message })))
        )
      )
    )
  );

  getMeError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authGetMeError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  register = createEffect(() =>
    this.actions$.pipe(
      ofType(authRegister),
      exhaustMap((action) =>
        this.authService.register(action.userForm).pipe(
          map((response) => authRegisterSuccess({ user: response.user })),
          catchError((error) =>
            of(authRegisterError({ message: error.message }))
          )
        )
      )
    )
  );

  registerError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authRegisterError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  registerSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(authRegisterSuccess),
      map((action) =>
        authLogin({
          username: action.user.username,
          password: action.user.password
        })
      )
    )
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.router.navigate([navigation.home.path]).then(() => {
            this.notificationService.warn('Déconnecté');
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}
}
