import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../core/core.state';
import { FollowersService } from '../followers.service';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { NotificationService } from '../../../../core/notifications/notification.service';
import {
  actionFollowersFollow,
  actionFollowersFollowError,
  actionFollowersFollowSuccess,
  actionFollowersGetFromUser,
  actionFollowersGetFromUserError,
  actionFollowersGetFromUserSuccess,
  actionFollowersIsFollowing,
  actionFollowersIsFollowingError,
  actionFollowersIsFollowingSuccess,
  actionFollowersUnfollow,
  actionFollowersUnfollowError,
  actionFollowersUnfollowSuccess,
  actionFollowingsGetFromUser,
  actionFollowingsGetFromUserError,
  actionFollowingsGetFromUserSuccess
} from './follower.actions';
import { of } from 'rxjs';
import { selectUser } from '../../../../core/auth/auth.selectors';

@Injectable()
export class FollowersEffects {
  retrieveFollowersFromUser = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFollowersGetFromUser),
      exhaustMap((action) =>
        this.followersService
          .getFollowers(action.userId, action.limit, action.offset)
          .pipe(
            map(({ followers, totalResults }) =>
              actionFollowersGetFromUserSuccess({ followers, totalResults })
            ),
            catchError((error) =>
              of(
                actionFollowersGetFromUserError({
                  message: error.message.toString()
                })
              )
            )
          )
      )
    )
  );

  retrieveFollowingsFromUser = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFollowingsGetFromUser),
      exhaustMap((action) =>
        this.followersService
          .getFollowings(action.userId, action.limit, action.offset)
          .pipe(
            map(({ followers, totalResults }) =>
              actionFollowingsGetFromUserSuccess({
                followings: followers,
                totalResults
              })
            ),
            catchError((error) =>
              of(
                actionFollowingsGetFromUserError({
                  message: error.message.toString()
                })
              )
            )
          )
      )
    )
  );

  follow = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFollowersFollow),
      withLatestFrom(this.store.pipe(select(selectUser))),
      exhaustMap(([action, user]) =>
        this.followersService.follow(action.userId).pipe(
          map(() =>
            actionFollowersFollowSuccess({
              follower: {
                followerId: user.id,
                followingId: action.userId,
                createdAt: new Date()
              }
            })
          ),
          catchError((error) =>
            of(
              actionFollowersFollowError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  unfollow = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFollowersUnfollow),
      exhaustMap((action) =>
        this.followersService.unfollow(action.userId).pipe(
          map(() =>
            actionFollowersUnfollowSuccess({
              userId: action.userId
            })
          ),
          catchError((error) =>
            of(
              actionFollowersUnfollowError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  isFollowing = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFollowersIsFollowing),
      exhaustMap((action) =>
        this.followersService.isFollowing(action.userId).pipe(
          map((isFollowing) =>
            actionFollowersIsFollowingSuccess({
              isFollowing
            })
          ),
          catchError((error) =>
            of(
              actionFollowersIsFollowingError({
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
          actionFollowersGetFromUserError,
          actionFollowingsGetFromUserError,
          actionFollowersFollowError,
          actionFollowersUnfollowError,
          actionFollowersIsFollowingError
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
    private followersService: FollowersService,
    private notificationService: NotificationService
  ) {}
}
