import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../core/core.state';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from '../../../core/notifications/notification.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import {
  actionUsersSearch,
  actionUsersSearchError,
  actionUsersSearchSuccess
} from './users.actions';

@Injectable()
export class UsersEffects {
  search = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUsersSearch),
      exhaustMap((action) =>
        this.usersService.searchUsers(action.search).pipe(
          map((users) =>
            actionUsersSearchSuccess({
              users
            })
          ),
          catchError((error) =>
            of(actionUsersSearchError({ message: error.message }))
          )
        )
      )
    )
  );

  errors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionUsersSearchError),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {}
}
