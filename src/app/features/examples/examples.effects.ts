import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { AppState, TitleService } from '../../core/core.module';
import { actionSettingsChangeLanguage } from '../../core/settings/settings.actions';

@Injectable()
export class ExamplesEffects {
  setTitle = createEffect(
    () =>
      merge(
        this.actions$.pipe(ofType(actionSettingsChangeLanguage)),
        this.router.events.pipe(
          filter((event) => event instanceof ActivationEnd)
        )
      ).pipe(
        tap(() => {
          this.titleService.setTitle(this.router.routerState.snapshot.root);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private titleService: TitleService
  ) {}
}
