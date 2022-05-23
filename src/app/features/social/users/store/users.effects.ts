import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../../core/core.state';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { UsersService } from '../users.service';
import {
  actionUsersGetOne,
  actionUsersGetOneError,
  actionUsersGetOneSuccess,
  actionUsersGetUserProjects,
  actionUsersGetUserProjectsError,
  actionUsersGetUserProjectsSuccess,
  actionUsersSearch,
  actionUsersSearchDialog,
  actionUsersSearchDialogError,
  actionUsersSearchDialogSuccess,
  actionUsersSearchError,
  actionUsersSearchSuccess
} from './users.actions';
import { ProjectsService } from '../../../projects/projects.service';

@Injectable()
export class UsersEffects {
  searchDialog = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUsersSearchDialog),
      exhaustMap((action) =>
        this.usersService.searchUsersDialog(action.search).pipe(
          map((users) =>
            actionUsersSearchDialogSuccess({
              users
            })
          ),
          catchError((error) =>
            of(actionUsersSearchDialogError({ message: error.message }))
          )
        )
      )
    )
  );

  search = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUsersSearch),
      exhaustMap((action) =>
        this.usersService
          .searchUsers(action.page * action.limit, action.limit, action.search)
          .pipe(
            map(({ users, totalResults }) =>
              actionUsersSearchSuccess({
                users,
                totalResults
              })
            ),
            catchError((error) =>
              of(actionUsersSearchError({ message: error.message }))
            )
          )
      )
    )
  );

  getUser = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUsersGetOne),
      exhaustMap((action) =>
        this.usersService.getUser(action.id).pipe(
          map((user) => actionUsersGetOneSuccess({ user })),
          catchError((error) =>
            of(
              actionUsersGetOneError({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  getUserProjects = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUsersGetUserProjects),
      exhaustMap((action) =>
        this.projectsService.getUserProjects(action.id).pipe(
          map((projects) => actionUsersGetUserProjectsSuccess({ projects })),
          catchError((error) =>
            of(
              actionUsersGetUserProjectsError({
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
          actionUsersSearchDialogError,
          actionUsersGetOneError,
          actionUsersGetUserProjectsError,
          actionUsersSearchError
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
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private notificationService: NotificationService
  ) {}
}
