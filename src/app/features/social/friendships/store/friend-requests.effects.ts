import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { AppState } from '../../../../core/core.state';
import { NotificationService } from '../../../../core/notifications/notification.service';
import {
  actionFriendRequestsAccept,
  actionFriendRequestsAcceptError,
  actionFriendRequestsAcceptSuccess,
  actionFriendRequestsCancel,
  actionFriendRequestsCancelError,
  actionFriendRequestsCancelSuccess,
  actionFriendRequestsReject,
  actionFriendRequestsRejectError,
  actionFriendRequestsRejectSuccess,
  actionFriendRequestsRetrieveAll,
  actionFriendRequestsRetrieveAllReceivedError,
  actionFriendRequestsRetrieveAllReceivedSuccess,
  actionFriendRequestsRetrieveAllSentError,
  actionFriendRequestsRetrieveAllSentSuccess,
  actionFriendRequestsRetrieveOne,
  actionFriendRequestsRetrieveOneError,
  actionFriendRequestsRetrieveOneSuccess,
  actionFriendRequestsSend,
  actionFriendRequestsSendError,
  actionFriendRequestsSendSuccess
} from './friend-requests.actions';
import { FriendshipsService } from '../friendships.service';
import { of } from 'rxjs';
import { selectUser } from '../../../../core/auth/auth.selectors';

@Injectable()
export class FriendRequestsEffects {
  retrieveAllSent = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFriendRequestsRetrieveAll),
      exhaustMap(() =>
        this.friendshipsService.retrieveSentFriendRequests().pipe(
          map((friendRequests) =>
            actionFriendRequestsRetrieveAllSentSuccess({ friendRequests })
          ),
          catchError((error) =>
            of(
              actionFriendRequestsRetrieveAllSentError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  retrieveAllReceived = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFriendRequestsRetrieveAll),
      exhaustMap(() =>
        this.friendshipsService.retrieveReceivedFriendRequests().pipe(
          map((friendRequests) =>
            actionFriendRequestsRetrieveAllReceivedSuccess({ friendRequests })
          ),
          catchError((error) =>
            of(
              actionFriendRequestsRetrieveAllReceivedError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  cancel = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFriendRequestsCancel),
      exhaustMap(({ userId }) =>
        this.friendshipsService.cancelFriendRequest(userId).pipe(
          map(() => actionFriendRequestsCancelSuccess({ userId })),
          catchError((error) =>
            of(
              actionFriendRequestsCancelError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  reject = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFriendRequestsReject),
      exhaustMap(({ userId }) =>
        this.friendshipsService.rejectFriendRequest(userId).pipe(
          map(() => actionFriendRequestsRejectSuccess({ userId })),
          catchError((error) =>
            of(
              actionFriendRequestsRejectError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  accept = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFriendRequestsAccept),
      withLatestFrom(this.store.select(selectUser)),
      exhaustMap(([{ userId }, user]) =>
        this.friendshipsService.acceptFriendRequest(userId).pipe(
          map((friendshipId) =>
            actionFriendRequestsAcceptSuccess({
              friendship: {
                id: friendshipId,
                user1Id: user.id,
                user2Id: userId,
                createdAt: new Date()
              }
            })
          ),
          catchError((error) =>
            of(
              actionFriendRequestsAcceptError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  send = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFriendRequestsSend),
      withLatestFrom(this.store.select(selectUser)),
      exhaustMap(([{ userId }, user]) =>
        this.friendshipsService.sendFriendRequest(userId).pipe(
          map(() =>
            actionFriendRequestsSendSuccess({
              friendRequest: {
                requesterUserId: user.id,
                requestedUserId: userId,
                createdAt: new Date()
              }
            })
          ),
          catchError((error) =>
            of(
              actionFriendRequestsSendError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  retrieveOne = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFriendRequestsRetrieveOne),
      exhaustMap(({ userId }) =>
        this.friendshipsService.retrieveFriendRequest(userId).pipe(
          map((friendRequest) =>
            actionFriendRequestsRetrieveOneSuccess({ friendRequest })
          ),
          catchError((error) =>
            of(
              actionFriendRequestsRetrieveOneError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  cancelSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionFriendRequestsCancelSuccess),
        tap(() => {
          this.notificationService.success("Demande d'ami annulée");
        })
      ),
    { dispatch: false }
  );

  rejectSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionFriendRequestsRejectSuccess),
        tap(() => {
          this.notificationService.success("Demande d'ami refusée");
        })
      ),
    { dispatch: false }
  );

  sentSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionFriendRequestsSendSuccess),
        tap(() => {
          this.notificationService.success("Demande d'ami envoyée");
        })
      ),
    { dispatch: false }
  );

  acceptSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionFriendRequestsAcceptSuccess),
        tap(() => {
          this.notificationService.success("Demande d'ami acceptée");
        })
      ),
    { dispatch: false }
  );

  errors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionFriendRequestsRetrieveAllReceivedError,
          actionFriendRequestsRetrieveAllSentError,
          actionFriendRequestsCancelError,
          actionFriendRequestsRejectError,
          actionFriendRequestsAcceptError,
          actionFriendRequestsSendError,
          actionFriendRequestsRetrieveOneError
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
    private friendshipsService: FriendshipsService,
    private notificationService: NotificationService
  ) {}
}
