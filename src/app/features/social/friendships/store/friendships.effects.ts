import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AppState } from '../../../../core/core.state';
import { NotificationService } from '../../../../core/notifications/notification.service';
import {
  actionFriendshipsGetOne,
  actionFriendshipsGetOneError,
  actionFriendshipsGetOneSuccess,
  actionFriendshipsRemoveOne,
  actionFriendshipsRemoveOneError,
  actionFriendshipsRemoveOneSuccess,
  actionFriendshipsRetrieveAll,
  actionFriendshipsRetrieveAllError,
  actionFriendshipsRetrieveAllSuccess
} from './friendships.actions';
import { FriendshipsService } from '../friendships.service';
import { of } from 'rxjs';

@Injectable()
export class FriendshipsEffects {
  retrieveAll = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFriendshipsRetrieveAll),
      exhaustMap(() =>
        this.friendshipsService.retrieveFriends().pipe(
          map((friendships) =>
            actionFriendshipsRetrieveAllSuccess({ friendships })
          ),
          catchError((error) =>
            of(
              actionFriendshipsRetrieveAllError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  getOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFriendshipsGetOne),
      exhaustMap(({ userId }) =>
        this.friendshipsService.retrieveFriendship(userId).pipe(
          map((friendship) => actionFriendshipsGetOneSuccess({ friendship })),
          catchError((error) =>
            of(
              actionFriendshipsGetOneError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  removeOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFriendshipsRemoveOne),
      exhaustMap(({ friendshipId }) =>
        this.friendshipsService.removeFriend(friendshipId).pipe(
          map(() => actionFriendshipsRemoveOneSuccess({ friendshipId })),
          catchError((error) =>
            of(
              actionFriendshipsRemoveOneError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  errors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionFriendshipsRetrieveAllError,
          actionFriendshipsRemoveOneError,
          actionFriendshipsGetOneError
        ),
        tap((action) => {
          this.notificationService.error(action.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private friendshipsService: FriendshipsService
  ) {}
}
