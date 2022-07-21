import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { selectSettingsState } from '../core.state';
import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  actionSettingsChangeTheme,
  actionSettingsUpdateUser,
  actionSettingsUpdateUserError,
  actionSettingsUpdateUserPassword,
  actionSettingsUpdateUserPasswordError,
  actionSettingsUpdateUserPasswordSuccess,
  actionSettingsUpdateUserSuccess
} from './settings.actions';
import { State } from '../../shared/models/settings.model';
import { selectEffectiveTheme } from './settings.selectors';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../notifications/notification.service';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('cc-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  persistSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSettingsChangeTheme),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([action, settings]) =>
          this.localStorageService.setItem(SETTINGS_KEY, settings)
        )
      ),
    { dispatch: false }
  );

  updateTheme = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(actionSettingsChangeTheme))).pipe(
        withLatestFrom(this.store.pipe(select(selectEffectiveTheme))),
        tap(([action, effectiveTheme]) => {
          const classList =
            this.overlayContainer.getContainerElement().classList;
          const toRemove = Array.from(classList).filter((item: string) =>
            item.includes('-theme')
          );
          if (toRemove.length) {
            classList.remove(...toRemove);
          }
          classList.add(effectiveTheme);
        })
      ),
    { dispatch: false }
  );

  updateUser = createEffect(() =>
    this.actions$.pipe(
      ofType(actionSettingsUpdateUser),
      exhaustMap((action) =>
        this.authService.update(action.form).pipe(
          map(() => actionSettingsUpdateUserSuccess({ form: action.form })),
          catchError((error) =>
            of(actionSettingsUpdateUserError({ message: error.message }))
          )
        )
      )
    )
  );

  updateUserPassword = createEffect(() =>
    this.actions$.pipe(
      ofType(actionSettingsUpdateUserPassword),
      exhaustMap((action) =>
        this.authService.updatePassword(action.form).pipe(
          map(() =>
            actionSettingsUpdateUserPasswordSuccess({ form: action.form })
          ),
          catchError((error) =>
            of(
              actionSettingsUpdateUserPasswordError({ message: error.message })
            )
          )
        )
      )
    )
  );

  updateUserSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSettingsUpdateUserSuccess),
        tap(() => {
          this.notificationService.success('Utilisateur mis à jour');
        })
      ),
    { dispatch: false }
  );

  updateUserUpdatePasswordSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSettingsUpdateUserPasswordSuccess),
        tap(() => {
          this.notificationService.success('Mot de passe mis à jour');
        })
      ),
    { dispatch: false }
  );

  errors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionSettingsUpdateUserError,
          actionSettingsUpdateUserPasswordError
        ),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}
}
